import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import moment from 'moment';
import dayjs from 'dayjs';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Filter from './Filter';
import useService from '../../../common/hooks/useService';
import { fetchAlsSummaryData, fetchAlsSummaryExportData } from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List/List';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from "../../../components/Loader/LoaderWithOverLay";
import SubHeadFilter from './Filter/SubHeadFilter';
import navigation from '../../NhmDashboard/navigation';

function createAlsSummaryPayload(values = {}) {
  const _values = {};

  if (values.date) {
    _values.fromDate = moment(values.date[0]).startOf('day').valueOf();
    _values.toDate = moment(values.date[1]).endOf('day').valueOf();
  }
  if (values.district && values.district.id) {
    _values.districtId = values.district.id;
  }
  return _values;
}


function getInitialValues(values = {}){
  const _values = { ...values };
  _values.date = [moment().startOf('month').startOf('day'), moment().endOf('day')];
  return _values;
}


function MedicineInventoryWrap({ setNhmDashboardView }) {
  const [filter, setFilter] = useState(getInitialValues());
  const [isLoader, setLoader] = useState(false);
  const userConfig = useContext(UserConfigContext);
  const {
    data: alsSummaryData,
    request: alsSummaryDataRequest,
    loading: alsSummaryLoading,
  } = useService({
    method: fetchAlsSummaryData,
    context: userConfig.userConfig,
    initialValues: {},
  });

  function handleSubmitClick(values) {
    setFilter({ ...values });
  }

  function handleResetClick() { 
    setFilter(getInitialValues());
  }

  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    const _payload = createAlsSummaryPayload(filter);
    _payload.fileType=fileType;
    fetchAlsSummaryExportData(_payload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'AlsSummary';
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
    const _payload = createAlsSummaryPayload(filter);
    alsSummaryDataRequest({ ..._payload });
  }, [filter]);

  return (
    <div className="AlsSummaryWrapper Height-Full CommonHeader">
      <Header />
      <SubHeader
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onAlsDailyClick:  () => { setNhmDashboardView({ type: navigation.ALS_DAILY_DETAIL, query: {} }); },
        }}
      />
      {isLoader && <LoaderWithOverLay />}
      <Filter onSubmit={handleSubmitClick} onReset={handleResetClick} initialValues={filter} />
      <div className="Mt-20">
        <List
          isFetching={alsSummaryLoading}
          alsSummaryData={alsSummaryData}
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
