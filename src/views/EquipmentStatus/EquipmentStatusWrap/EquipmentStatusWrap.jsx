import React, { useEffect, useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import {
  fetchVehicleEquipmentStatus as fetchVehicleEquipmentStatusApi,
  exportEquipmentAccessoriesStatus as exportEquipmentAccessoriesStatusApi,
} from '../../../api/nhmDashboard';
import useService from '../../../common/hooks/useService';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List';
import { getInitialValuesForEquipmentStatus } from './utils';
import SubHeadFilter from './SubHeadFilter';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from '../../../components/Loader';
import { ButtonCustom } from '../../../components/Button';
import navigation from '../../NhmDashboard/navigation';

function EquipmentStatusWrap({ intl, setNhmDashboardView, dailyStatusProps }) {
  const userConfig = useContext(UserConfigContext);
  const [isLoader, setLoader] = useState(false);

  const {
    data: vehicleEquipmentStatusData,
    request: vehicleEquipmentStatusRequest,
    loading: vehicleEquipmentStatusloading,
  } = useService({
    method: fetchVehicleEquipmentStatusApi,
    context: userConfig.userConfig,
    initialValuesMethod: getInitialValuesForEquipmentStatus,
    initialValues: [],
  });

  useEffect(() => {
    vehicleEquipmentStatusRequest();
  }, []);

  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    exportEquipmentAccessoriesStatusApi({ fileType }, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'EquipmentAccessoriesStatus';
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
    <div className="EquipmentStatusWrapper CommonHeader">
      {isLoader && <LoaderWithOverLay />}
      <Header />
      <SubHeader
        isDateRangeVisible
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onJobWiseEquipmentClick: () => { setNhmDashboardView({ type: navigation.JOB_WISE_EQUIPMENT, query: {} }); }
        }}
      />
      <div className="Mt-20">
        <div>
          <ButtonCustom
            className="Box--Shadow Font--S18 ExcelButton BorderButton Bg-Head-Gray"
            onClick={handleExportButtonClick}
            labelText={intl.formatMessage({ id: 'label.excel' })}
            type="link"
            labelClassName="NeutralDark"
          />
        </div>
        <div className="Mt-10">
          <List
            tableData={vehicleEquipmentStatusData}
            isFetching={vehicleEquipmentStatusloading}
            setNhmDashboardView={setNhmDashboardView}
            dailyStatusProps={dailyStatusProps}
          />
        </div>
      </div>
    </div>
  );
}

EquipmentStatusWrap.defaultProps = {
  setNhmDashboardView: () => {},
  dailyStatusProps: {},
};

EquipmentStatusWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
  dailyStatusProps: PropTypes.object,
};

export default injectIntl(EquipmentStatusWrap);
