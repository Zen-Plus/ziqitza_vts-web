import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import moment from 'moment';
import dayjs from 'dayjs';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Filter from './Filter';
import useService from '../../../common/hooks/useService';
import {
  fetchMedicineInventory as fetchMedicineInventoryApi,
} from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List/List';
import useList from '../../../common/hooks/useList';
import { exportReport } from '../../../../../apis/reports';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from "../../../components/Loader/LoaderWithOverLay";
import SubHeadFilter from './Filter/SubHeadFilter';
import navigation from '../../NhmDashboard/navigation';

function createInventoryAsOfReportPayload(values = {}) {
  const _values = {
    districtId: [],
    baseLocationId: [],
    vehicleId: [],
    clusterLeaderId: [],
    districtName: [],
    baseLocationName: [],
    vehicleName: [],
    clusterLeaderName: [],
  };

  if (values.fromDate) {
    _values.fromDate = dayjs(values.fromDate).endOf('day').valueOf();
  }
  if (values.district && values.district.id) {
    _values.districtId = [values.district.id];
    _values.districtIds = [values.district.id];
    _values.districtName = [values.district.name];
  }
  if (values.vehicleRegistrationNo && values.vehicleRegistrationNo.id) {
    _values.vehicleId = [values.vehicleRegistrationNo.id];
    _values.vehicleIds = [values.vehicleRegistrationNo.id];
    _values.vehicleName = [values.vehicleRegistrationNo.name];
  }
  return _values;
}


function getInitialValues(values = {}){
  const _values = { ...values };
  _values.fromDate = moment();
  return _values;
}


function MedicineInventoryWrap({ setNhmDashboardView }) {
  const [filter, setFilter] = useState(getInitialValues());
  const [isLoader, setLoader] = useState(false);
  const { listState, setListStateValues } = useList({
    initialState: {
      pageSize: 25,
      pageNo: 0,
      sortBy: '',
      sortDirection: '',
      searchText: '',
    },
  });
  const userConfig = useContext(UserConfigContext);
  const {
    data: vehicleMedicineData,
    request: vehicleMedicineRequest,
    loading: vehicleMedicineLoading,
  } = useService({
    method: fetchMedicineInventoryApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  function handleSubmitClick(values) {
    setFilter({ ...values });
    setListStateValues({ pageNo: 0 })
  }

  function handleResetClick() {
    setFilter(getInitialValues());
    setListStateValues({ pageNo: 0 });
  }

  function pageBackward() {
    setListStateValues({ pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ pageNo: listState.pageNo + 1 });
  }

  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    const _payload = createInventoryAsOfReportPayload(filter);
    exportReport({
      fileType,
      reportCategory: 'INVENTORY',
      reportSubCategory: 'INVENTORY_AS_OF_REPORT_NHM_DASHBOARD',
      reportFilter: _payload,
    })
      .then((res) => {
        const data = res.body;
        const fileName = 'InventoryAsOfReport';
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

  useEffect(() => {
    const _payload = createInventoryAsOfReportPayload(filter);
    vehicleMedicineRequest({ ..._payload, ...listState });
  }, [filter, listState]);

  return (
    <div className="MedicineInventoryWrapper Height-Full CommonHeader">
      <Header />
      <SubHeader
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onNonAvailabilityOfMedicinesClick: () => { setNhmDashboardView({ type: navigation.NON_AVAILABILITY_OF_MEDICINES, query: {} }); },
        }}
      />
      {isLoader && <LoaderWithOverLay />}
      <Filter onSubmit={handleSubmitClick} onReset={handleResetClick} initialValues={filter} />
      <div className="Mt-20">
        <List
          isFetching={vehicleMedicineLoading}
          vehicleMedicine={vehicleMedicineData}
          pageBackward={pageBackward}
          pageForward={pageForward}
          onExportClick={handleExportButtonClick}
        />
      </div>
    </div>
  );
}

MedicineInventoryWrap.defaultProps = {
  setNhmDashboardView: () => {},
};

MedicineInventoryWrap.propTypes = {
  setNhmDashboardView: PropTypes.func.isRequired,
};

export default MedicineInventoryWrap;
