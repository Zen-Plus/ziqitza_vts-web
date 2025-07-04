import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import moment from 'moment';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Filter from './Filter';
import useService from '../../../common/hooks/useService';
import { fetchAlsDailyDetail, fetchAlsDetailExportData } from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List/List';
import useList from '../../../common/hooks/useList';
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
    _values.districtName = values.district.name;
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
    data: alsDailyDetail,
    request: alsDailyDetailRequest,
    loading: alsSummaryLoading,
  } = useService({
    method: fetchAlsDailyDetail,
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
    const _payload = createAlsSummaryPayload(filter);
    _payload.fileType=fileType;
    fetchAlsDetailExportData(_payload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'AlsDetail';
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
    alsDailyDetailRequest({ ..._payload, ...listState });
  }, [filter, listState]);

  return (
    <div className="AlsDailyDetailWrapper Height-Full CommonHeader">
      <Header />
      <SubHeader
        Component={SubHeadFilter}
        componentRestProps={{ onBackClick: () => { setNhmDashboardView({ type: navigation.ALS_SUMMARY, query: {} }); } }}
      />
      {isLoader && <LoaderWithOverLay />}
      <Filter onSubmit={handleSubmitClick} onReset={handleResetClick} initialValues={filter} />
      <div className="Mt-20">
        <List
          isFetching={alsSummaryLoading}
          alsDailyDetail={alsDailyDetail}
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
