import React, { useEffect, useContext, useRef, useState } from 'react';
import { injectIntl } from 'react-intl';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import DataCard from './DataCard';
import DataTable from './DataTable';
import {
  fetchNhmDashboardTiles as fetchNhmDashboardTilesApi,
  fetchVehicleEquipmentCount as fetchVehicleEquipmentCountApi,
  fetchBHAcStatusCount as fetchBHAcStatusCountApi,
  fetchAbandonedCallSummaryData as fetchAbandonedCallSummaryDataApi,
  fetchFeedbackCallSummaryData as fetchFeedbackCallSummaryDataApi
} from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import useService from '../../../common/hooks/useService';
import { convertMillsToHHMMSS } from '../../../common/helpers/collectionUtils';
import LoaderWithOverLay from '../../../components/Loader';
import { getActualData, getGraphDateRangePayload } from './util';
import navigation from '../navigation';
import LiveReportHeader from './LiveReportHeader';
import { Tabs } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import Icon from '../../../components/Icon';
import Logo from '../../../components/Logo';
// import CallFor102ServiceDetailMenu from '../../CallFor102ServiceDetailMenu/CallFor102ServiceDetailMenu';
import CallsLandedOn102DetailMenu from '../../CallsLandedOn102DetailMenu';
const UpDashboard = dynamic(() => import('../../UpDashboard'), { ssr: false });

function NhmDashboardWrap({ intl, setNhmDashboardView }) {
  const userConfig = useContext(UserConfigContext);
  const intervalRef = useRef(null);
  const now = new Date();

  // Format the current time as HH:MM:SS
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  // Combine into the desired format
  const currentTime = `${hours}:${minutes}:${seconds}`;
  const currentDate = now.toLocaleDateString();

  const [showDot, setShowDot] = useState(0); // '● Live' dot blinking
  const [initialLoading, setInitialLoading] = useState(true);
  const {
    data: nhmDashboardTilesData,
    request: nhmDashboardTilesRequest,
    loading: nhmDashboardTilesloading,
  } = useService({
    method: fetchNhmDashboardTilesApi,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  // const {
  //   data: vehicleEquipmentCountData,
  //   request: vehicleEquipmentCountRequest,
  //   loading: vehicleEquipmentCountloading,
  // } = useService({
  //   method: fetchVehicleEquipmentCountApi,
  //   context: userConfig.userConfig,
  //   initialValuesMethod: getActualData,
  //   initialValues: {},
  // });

  const {
    data: acCountData,
    request: acCountRequest,  
  } = useService({
    method: fetchBHAcStatusCountApi,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  const {
    data: abandonedCallData,
    request: abandonedCallRequest,  
  } = useService({
    method: fetchAbandonedCallSummaryDataApi,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  const {
    data: feedbackData,
    request: feedbackRequest,  
  } = useService({
    method: fetchFeedbackCallSummaryDataApi,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setShowDot((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    const getAbandonedCallSummaryPayload = getAbandonedSummaryCallPayload();
    nhmDashboardTilesRequest();
    acCountRequest({ ApiKey: userConfig.userConfig.config.plexitechApiKey })
    abandonedCallRequest(getAbandonedCallSummaryPayload, '745c6e324593029ee6b008ae08b5af8b');
    feedbackRequest('745c6e324593029ee6b008ae08b5af8b');
    // vehicleEquipmentCountRequest();
    intervalRef.current = setInterval(() => {
      nhmDashboardTilesRequest();
      // vehicleEquipmentCountRequest();
    }, 60 * 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    // display loader initially only
    if (initialLoading && Object.keys(nhmDashboardTilesData).length !== 0) {
        setInitialLoading(false);
    }
  }, [nhmDashboardTilesData]);

  // function handleTotalEquipmentsClick() {
  //   setNhmDashboardView({
  //     type: navigation.EQUIPMENT_STATUS,
  //     query: {
  //       fromDate: vehicleEquipmentCountData.fromDate,
  //       toDate: vehicleEquipmentCountData.toDate,
  //     },
  //   });
  // }

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
  }

  function getAbandonedSummaryCallPayload() {
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const callSartTime = formatDate(startOfMonth);
    const callEndTime = formatDate(now)

    const payload = {
      "callSartTime" : callSartTime,
      "callEndTime": callEndTime,
      "campaignIds" : [1]
    }
    return payload;
  }

  function handleTotalFeedbackTakenClick() {
    setNhmDashboardView({
      type: navigation.TOTAL_FEEDBACK_TAKEN,
    });
  }

  return (
    <div className="NhmDashboardWrapper CommonHeader">
      {initialLoading && (<LoaderWithOverLay />)}
      <LiveReportHeader />
      <div className="card-container">
        <Tabs type='card' tabBarStyle={{ background: '#F3F5F7', paddingLeft: '80px', paddingTop: '10px' }} defaultActiveKey="1">
          <Tabs.TabPane
            tab={<div className='Flex Align-Items-Center'><AppstoreOutlined /><span className='TabHeader'>Dashboard</span></div>}
            key="1">
            <div style={{ height: '100%' }}>
              <div className="Mt-50 Flex Align-Items-Baseline">
                <span className="DashboardHeader Text_NoWrap Black">Cumulative Statistics&nbsp;</span>
                <span className="Text_NoWrap Black Mr-8">( Till Date )&nbsp;</span>
                <hr className="Width-Full Align_Self_End" style={{ color: "#9A9A9A" }}/>
              </div>
              <div
                className="row d-flex flex-wrap Mt-20"
                style={{ alignItems: 'stretch', zIndex: 1 }}
              >
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.totalAmbulanceCapitalize' })}
                    value={nhmDashboardTilesData.totalAmbulance
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.TOTAL_AMBULANCE, query: {} })
                          }}
                        >{nhmDashboardTilesData.totalAmbulance}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.onRoadOffRoadLive' })}
                    component={{
                      OffRoadCountDetail: () => (
                        <div className="Flex DataCard__Value Font--WB">
                          <div>{nhmDashboardTilesData.onRoadCount || 'NA'}</div>
                          &nbsp;/&nbsp;
                          {nhmDashboardTilesData.offRoadCount
                            ? (
                              <div
                                className='text-info Text-Decoration-Underline Cursor-Pointer'
                                onClick={() => { setNhmDashboardView({ type: navigation.OFF_ROAD_COUNT_DETAIL, query: {} }); }}
                              >{nhmDashboardTilesData.offRoadCount}</div>
                            ) : (
                              <div>{'0'}</div>
                            )
                          }
                        </div>
                      ),
                    }}
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.avgResponseUrbanRural' })}
                    value={(nhmDashboardTilesData.avgUrbanResponseTime || nhmDashboardTilesData.avgRuralResponseTime)
                      ? (
                      <div
                        className='text-info Text-Decoration-Underline Cursor-Pointer'
                        onClick={() => {
                          setNhmDashboardView({ type: navigation.AVERAGE_RESPONSE_TIME_URBAN_RURAL, query: {} })
                      }}>
                        {`${convertMillsToHHMMSS(nhmDashboardTilesData.avgUrbanResponseTime)}
                        /${convertMillsToHHMMSS(nhmDashboardTilesData.avgRuralResponseTime)}`}
                      </div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                    />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.totalCasesServed' })}
                    value={nhmDashboardTilesData.monthlyJobAvailed
                      ? (
                        <div
                        className='text-info Text-Decoration-Underline Cursor-Pointer'
                        onClick={() => {
                          setNhmDashboardView({ type: navigation.MONTHLY_CASE_SERVED, query: {} })
                        }}
                        >{nhmDashboardTilesData.monthlyJobAvailed}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
              </div>
              <div className="Flex Align-Items-Center">
                <span className="DashboardHeader Text_NoWrap Black Mr-20">KPI Statistics&nbsp;</span>
                <span style={{
                    backgroundColor: '#ec3832',
                    borderRadius: '16px',
                    padding: '6px 12px',
                    color: 'white',
                    marginRight: '6px',
                    letterSpacing: '1px',
                }}>
                  <span style={{ color: (showDot? 'white': '#ec3832'), fontSize: '10px', marginRight: '6px' }}>●</span>
                  Live
                </span>
                <div style={{ width: "250px" }}>{currentTime}{' '}{currentDate}</div>
                <hr className="Width-Full Align_Self_End" style={{ color: "#9A9A9A" }}/>
              </div>
              <div
                className="row d-flex flex-wrap Mt-20"
                style={{ alignItems: 'stretch', zIndex: 1 }}
              >
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.calls102' })}
                    value={nhmDashboardTilesData.dailyCalls || '0'}
                    iconName="ambulance"
                    iconBgColor="#184296"
                    tooltip
                    toolTipComponent={CallsLandedOn102DetailMenu}
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.callsService' })}
                    value={nhmDashboardTilesData.totalDailyEmergencySrCount || '0'}
                    iconName="ambulance"
                    iconBgColor="#184296"
                    // tooltip
                    // toolTipComponent={CallFor102ServiceDetailMenu}
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.noOfCases' })}
                    value={nhmDashboardTilesData.dailyJobCreated
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.TOTAL_NO_OF_CASES_BOOKED, query: {} })
                          }}
                        >{nhmDashboardTilesData.dailyJobCreated}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.totalPregnancyCases' })}
                    value={nhmDashboardTilesData.monthlyPregnantLadyCaseServed
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.TOTAL_PREGNANCY_LADY_CASE, query: {} })
                          }}
                        >{nhmDashboardTilesData.monthlyPregnantLadyCaseServed}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.sickBornBaby' })}
                    value={(nhmDashboardTilesData.monthlySickNewBornCaseCount)
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.SICK_BORN_BABY, query: {} })
                          }}
                        >{nhmDashboardTilesData.monthlySickNewBornCaseCount}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.seniorCitizenCasesServed' })}
                    value={(nhmDashboardTilesData.monthlySeniorCitizenCaseServedCount
                    )
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.SENIOR_CITIZEN, query: {} })
                          }}
                        >{nhmDashboardTilesData.monthlySeniorCitizenCaseServedCount
}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.avgKmsPerTrip' })}
                    value={nhmDashboardTilesData.avgTripKm
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.AVERAGE_TRIP_KM, query: {} })
                          }}
                        >{nhmDashboardTilesData.avgTripKm}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.callCenterAgents' })}
                    // value={nhmDashboardTilesData.avgTripKm || '0'}
                    value={100}
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div>
                {/* <div className="col-sm-6 col-md-4 col-lg-4">
                  <DataCard
                    title={intl.formatMessage({ id: 'label.acActiveStatus' })}
                    value={acCountData?.data?.recordCount
                      ? (
                        <div
                          className='text-info Text-Decoration-Underline Cursor-Pointer'
                          onClick={() => {
                            setNhmDashboardView({ type: navigation.DAILY_AC_STATUS, query: {} })
                          }}
                        >{acCountData?.data?.recordCount}</div>
                      ) : (
                        <div>{'0'}</div>
                      )
                    }
                    iconName="ambulance"
                    iconBgColor="#184296"
                  />
                </div> */}
                {/* <div className="col-sm-12 col-md-6 col-lg-4">
                  <DataTile
                    headerBgColor="#61677642"
                    headerText={intl.formatMessage({ id: 'label.today' })}
                    keyOne={intl.formatMessage({ id: 'label.totalCalls' })}
                    keyTwo={intl.formatMessage({ id: 'label.caseAssigned' })}
                    totalCallsValue={nhmDashboardTilesData.dailyCalls}
                    caseAssignedValue={nhmDashboardTilesData.dailyJobCreated}
                    keyOneIcon="ambulance"
                    keyTwoIcon="ambulance"
                  />
                </div> */}
                {/* <div className="col-sm-12 col-md-6 col-lg-4">
                  <DataTile
                    headerBgColor="#61677642"
                    headerText={intl.formatMessage({ id: 'label.mtd' })}
                    keyOne={intl.formatMessage({ id: 'label.totalCalls' })}
                    keyTwo={intl.formatMessage({ id: 'label.caseAssigned' })}
                    totalCallsValue={nhmDashboardTilesData.monthlyCalls}
                    caseAssignedValue={nhmDashboardTilesData.monthlyJobCreated}
                    keyOneIcon="ambulance"
                    keyTwoIcon="ambulance"
                  />
                </div> */}
                {/* <div className="col-sm-12 col-md-6 col-lg-4">
                  <DataTile
                    headerBgColor="#61677642"
                    headerText={intl.formatMessage({ id: 'label.launchToDate' })}
                    keyOne={intl.formatMessage({ id: 'label.totalCalls' })}
                    keyTwo={intl.formatMessage({ id: 'label.caseAssigned' })}
                    totalCallsValue={nhmDashboardTilesData.totalCalls}
                    caseAssignedValue={nhmDashboardTilesData.totalJobCreated}
                    keyOneIcon="ambulance"
                    keyTwoIcon="ambulance"
                  />
                </div> */}
                {/* <div className="col-sm-12 col-md-6 col-lg-6">
                  <DetailTile
                    headerText={intl.formatMessage({ id: 'label.top5DistrictsAverageTripsPerDay' })}
                    keyOne={intl.formatMessage({ id: 'label.totalTaken' })}
                    keyTwo={intl.formatMessage({ id: 'label.callerFeedback' })}
                    keyThree={intl.formatMessage({ id: 'label.callCenterFeedback' })}
                    totalTaken={nhmDashboardTilesData.totalCalls}
                    caseAssignedValue={nhmDashboardTilesData.totalJobCreated}
                    callCenterFeedback="1234"
                    callerFeedback="8765"
                  />
                </div>
                <div className="col-sm-12 col-md-6 col-lg-6">
                  <DetailTile
                    headerText={intl.formatMessage({ id: 'label.feedback' })}
                    keyOne={intl.formatMessage({ id: 'label.totalTaken' })}
                    keyTwo={intl.formatMessage({ id: 'label.callerFeedback' })}
                    keyThree={intl.formatMessage({ id: 'label.callCenterFeedback' })}
                    totalTaken={nhmDashboardTilesData.totalCalls}
                    caseAssignedValue={nhmDashboardTilesData.totalJobCreated}
                    callCenterFeedback="1234"
                    callerFeedback="8765"
                    isViewChart
                  />
                </div> */}
              </div>
              <div
                className="row d-flex flex-wrap Mt-20"
                style={{ alignItems: 'stretch', zIndex: 1 }}
              >
                {/* <div className="col-sm-12 col-md-6 col-lg-12">
                  <DataTable
                    headerData={[
                      intl.formatMessage({ id: 'label.totalAbandonedCalls' }),
                      intl.formatMessage({ id: 'label.callBackMadeIn5Min' }),
                      intl.formatMessage({ id: 'label.callBacksMadeWithinThreshold' }),
                    ]}
                    headerTextColor="#1E1E1E"
                    headerBgColor="#F0F0F0"
                    listData={[
                      abandonedCallData.total_abandoned_calls,
                      abandonedCallData.callback_within_5_mins,
                      abandonedCallData.percent_callback_within_threshold,
                    ]}
                    headerBorderColor="#DDDDDD"
                  />
                </div> */}
                {/* Total Feedback Card */}
                {/* <div className="col-sm-12 col-md-6 col-lg-6">
                  <DataTable
                    headerData={[
                      // intl.formatMessage({ id: 'label.totalCasesServed' }),
                      intl.formatMessage({ id: 'label.totalFeedbackTaken' }),
                      intl.formatMessage({ id: 'label.feedbackTakenAboveRating3' }),
                    ]}
                    headerTextColor="#1E1E1E"
                    headerBgColor="#F0F0F0"
                    headerBorderColor="#DDDDDD"
                    listData={[
                      // feedbackData.monthlyJobAvailed,
                      feedbackData.menu_input_1_feedback_taken,
                      feedbackData.menu_input_1_rating_above_3,
                    ]}
                    isTotalFeedbackTakenClickable
                    onClickTotalFeedbackTaken={handleTotalFeedbackTakenClick}
                  />
                </div> */}
                {/* <div className="col-sm-12 col-md-6 col-lg-6">
                  <DataTable
                    headerData={[
                      intl.formatMessage({ id: 'label.totalEquipments' }),
                      intl.formatMessage({ id: 'label.equipmentsWorking' }),
                      intl.formatMessage({ id: 'label.equipmentsNotWorking' }),
                    ]}
                    headerTextColor="#1E1E1E"
                    headerBgColor="#F0F0F0"
                    headerBorderColor="#DDDDDD"
                    listData={[
                      vehicleEquipmentCountData.totalCount,
                      vehicleEquipmentCountData.workingCount,
                      vehicleEquipmentCountData.nonWorkingCount,
                    ]}
                    listBgColor="#ff968f"
                    isClickAble
                    onClick={handleTotalEquipmentsClick}
                  />
                </div> */}
              </div>
            </div>
            <UpDashboard dateRangeFilter={getGraphDateRangePayload()} />
          </Tabs.TabPane>
          <Tabs.TabPane
          disabled
            tab={
                  <div className='Flex Align-Items-Center'>
                    <span className='Mr-14'><Icon name='open_book'/></span>
                    <span className='TabHeader'>Reports</span>
                  </div>
                }
            // tab="Tab"
            key="2">
            {/* <ReportsWrap /> */}
            Content of Tab Pane 2
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={
                  <div className='Flex Align-Items-Center'>
                    <span className='Mr-14'><Icon name='route' /></span>
                    <span className='TabHeader' onClick={()=> window.open("https://zhl.utwiz.com/?userguid=B4EE92C7-CDAD-4BC5-BD95-F80AC966617C&source=zenplus", "_blank")}>Tracking</span>
                  </div>
                }
            // tab="Tab"
            key="3">
          </Tabs.TabPane>
        </Tabs>
      </div>
    </div>
  );
}

NhmDashboardWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func.isRequired,
};

export default injectIntl(NhmDashboardWrap);
