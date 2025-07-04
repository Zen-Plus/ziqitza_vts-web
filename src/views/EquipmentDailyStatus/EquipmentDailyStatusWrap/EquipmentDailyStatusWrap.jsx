import React, { useEffect, useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import SubHeaderFiler from './SubHeaderFiler';
import navigation from '../../NhmDashboard/navigation';
import {
  fetchVehicleDailyEquipmentStatus as fetchVehicleDailyEquipmentStatusApi,
  exportDailyEquipmentAccessoriesStatus as exportDailyEquipmentAccessoriesStatusApi,
} from '../../../api/nhmDashboard';
import useService from '../../../common/hooks/useService';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import { getInitialValuesForEquipmentDailyStatus } from './utils';
import List from './List';
import LoaderWithOverLay from '../../../components/Loader';
import Form from './Form';
import { fileTypes } from '../../../common/constants/fileTypes';
import { ButtonCustom } from '../../../components/Button';

function EquipmentDailyStatusWrap({ intl, setNhmDashboardView, dailyStatusProps }) {
  const userConfig = useContext(UserConfigContext);
  const [isLoader, setLoader] = useState(false);
  const [filterDates, setFilterDates] = useState({
    fromDate: dailyStatusProps.fromDate,
    toDate: dailyStatusProps.toDate,
  });

  const {
    data: fetchVehicleDailyEquipmentStatusData,
    request: fetchVehicleDailyEquipmentStatusRequest,
    loading: fetchVehicleDailyEquipmentStatusloading,
  } = useService({
    method: fetchVehicleDailyEquipmentStatusApi,
    context: userConfig.userConfig,
    initialValuesMethod: (val) => 
      getInitialValuesForEquipmentDailyStatus(val, dailyStatusProps.vehicleRegistrationNumber)
    ,
    initialValues: {},
  });

  useEffect(() => {
    fetchVehicleDailyEquipmentStatusRequest({
      fromDate: dailyStatusProps.fromDate,
      toDate: dailyStatusProps.toDate,
      vehicleId: dailyStatusProps.vehicleId,
    });
  }, []);

  function handleSubmitClick(fromDate, toDate) {
    setFilterDates({
      fromDate,
      toDate,
    });
    fetchVehicleDailyEquipmentStatusRequest({
      fromDate: fromDate,
      toDate: toDate,
      vehicleId: dailyStatusProps.vehicleId,
    });
  }

  function handleExcelClick(fileType = 'EXCEL') {
    setLoader(true);
    exportDailyEquipmentAccessoriesStatusApi(
      {
        fileType,
        fromDate: filterDates.fromDate,
        toDate: filterDates.toDate,
        vehicleId: dailyStatusProps.vehicleId,
      },
      userConfig.userConfig
    )
      .then((res) => {
        const data = res.body;
        const fileName = 'DailyEquipmentAccessoriesStatus';
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()}${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        setLoader(false);
      }).catch((error) => {
        setLoader(false);
      });
  }

  return (
    <div className="EquipmentDailyStatusWrapper CommonHeader">
      {(isLoader || fetchVehicleDailyEquipmentStatusloading) && <LoaderWithOverLay />}
      <Header />
      <SubHeader
        isDateRangeVisible
        Component={SubHeaderFiler}
        componentRestProps={{
          onHomeClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onBackClick: () => { setNhmDashboardView({ type: navigation.EQUIPMENT_STATUS, query: { ...dailyStatusProps } }); },
        }}
      />
      <div className="Mt-40">
        <div>
          <Form
            fromDate={dailyStatusProps.fromDate}
            toDate={dailyStatusProps.toDate}
            onSubmit={handleSubmitClick}
          />
        </div>
        <div className="Mt-20">
          <ButtonCustom
            className="Box--Shadow Font--S18 ExcelButton"
            onClick={handleExcelClick}
            labelText={intl.formatMessage({ id: 'label.excel' })}
            type="link"
          />
        </div>
        <div className="Mt-10">
          <List
            headerData={fetchVehicleDailyEquipmentStatusData.listHeaderData || []}
            bodyData={fetchVehicleDailyEquipmentStatusData.listBodyData || []}
          />
        </div>
      </div>
    </div>
  );
}

EquipmentDailyStatusWrap.defaultProps = {
  setNhmDashboardView: () => {},
  dailyStatusProps: {},
};

EquipmentDailyStatusWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
  dailyStatusProps: PropTypes.object,
};

export default injectIntl(EquipmentDailyStatusWrap);
