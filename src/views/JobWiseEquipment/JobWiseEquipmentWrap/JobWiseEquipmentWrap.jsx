import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Filter from './Filter';
import useService from '../../../common/hooks/useService';
import { fetchJobWiseEquipmentData, fetchJobWiseEquipmentExportData } from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List/List';
import useList from '../../../common/hooks/useList';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from "../../../components/Loader/LoaderWithOverLay";
import SubHeadFilter from './Filter/SubHeadFilter';
import navigation from '../../NhmDashboard/navigation';


function createJobWiseEquipmentPayload(values = {}) {
  const _values = {};

  if (values.date) {
    _values.fromDate = moment(values.date[0]).startOf('day').valueOf();
    _values.toDate = moment(values.date[1]).endOf('day').valueOf();
  }
  return _values;
}


function getInitialValues(values = {}) {
  const _values = { ...values };
  _values.date = [moment().startOf('month').startOf('day'), moment().endOf('day')];
  return _values;
}


function JobWiseEquipmentWrap({ intl, setNhmDashboardView }) {
  const [filter, setFilter] = useState(getInitialValues());
  const { listState, setListStateValues } = useList({
    initialState: {
      pageSize: 25,
      pageNo: 0,
      sortBy: '',
      sortDirection: '',
      searchText: '',
    },
  });
  const [isLoader, setLoader] = useState(false);
  const userConfig = useContext(UserConfigContext);
  const {
    data: jobWiseEquipmentData,
    request: jobWiseEquipmentRequest,
    loading: jobWiseEquipmentLoading,
  } = useService({
    method: fetchJobWiseEquipmentData,
    context: userConfig.userConfig,
    initialValues: {},
  });

  function handleSubmitClick(values) {
    setListStateValues({ pageNo: 0 });
    setFilter({ ...values });
  }

  function pageBackward() {
    setListStateValues({ pageNo: listState.pageNo - 1 });
  }

  function pageForward() {
    setListStateValues({ pageNo: listState.pageNo + 1 });
  }


  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    const _payload = createJobWiseEquipmentPayload(filter);
    _payload.fileType = fileType;
    fetchJobWiseEquipmentExportData(_payload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'JobWiseEquipment';
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
    const _payload = createJobWiseEquipmentPayload(filter);
    jobWiseEquipmentRequest({ ..._payload, ...listState });
  }, [filter, listState]);

  return (
    <div className="AlsDailyDetailWrapper Height-Full CommonHeader">
      <Header />
      <SubHeader
        Component={SubHeadFilter}
        componentRestProps={{
          onHomeClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onBackClick: () => { setNhmDashboardView({ type: navigation.EQUIPMENT_STATUS, query: {} }); },
        }}
      />
      {isLoader && <LoaderWithOverLay />}
      <Filter onSubmit={handleSubmitClick} initialValues={filter} />

      <div className="Mt-20">
        <List
          isFetching={jobWiseEquipmentLoading}
          jobWiseEquipmentData={jobWiseEquipmentData}
          pageBackward={pageBackward}
          pageForward={pageForward}
          onExportClick={handleExportButtonClick}
        />
      </div>
    </div>
  );
}

JobWiseEquipmentWrap.defaultProps = {
  setNhmDashboardView: () => { },
};

JobWiseEquipmentWrap.propTypes = {
  setNhmDashboardView: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(JobWiseEquipmentWrap);
