import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import moment from 'moment';
import { injectIntl } from 'react-intl';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Filter from './Filter';
import useService from '../../../common/hooks/useService';
import { fetchTotalFeedbackTakenData, fetchTotalFeedbackTakenExportData } from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List/List';
import useList from '../../../common/hooks/useList';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from "../../../components/Loader/LoaderWithOverLay";
import SubHeadFilter from './Filter/SubHeadFilter';


function createTotalFeedbackTakenPayload(values = {}) {
  const _values = {};

  if (values.date) {
    _values.fromDate = moment(values.date[0]).startOf('day').valueOf();
    _values.toDate = moment(values.date[1]).endOf('day').valueOf();
  }
  return _values;
}

  function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day} 00:00:00`;
  }

  function totalFeedbackDataPayload() {
    const now = new Date();
    const callEndTime = formatDate(now)

    const payload = {
      "callSartTime" : callEndTime,
      "callEndTime": callEndTime,
      "campaignIds" : [1]
    }
    return payload;
  }

function getInitialValues(values = {}) {
  const _values = { ...values };
  _values.date = [moment().startOf('month').startOf('day'), moment().endOf('day')];
  return _values;
}

function TotalFeedbackTakenWrap({ intl, setNhmDashboardView }) {
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
    data: totalFeedbackTakenData,
    request: totalFeedbackTakenRequest,
    loading: totalFeedbackTakenLoading,
  } = useService({
    method: fetchTotalFeedbackTakenData,
    context: userConfig.userConfig,
    initialValues: [],
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
    const _payload = createTotalFeedbackTakenPayload(filter);
    _payload.fileType = fileType;
    fetchTotalFeedbackTakenExportData(_payload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'TotalFeedbackTaken';
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
    const _payload = totalFeedbackDataPayload();
    totalFeedbackTakenRequest(_payload, '745c6e324593029ee6b008ae08b5af8b');
  }, []);

  return (
    <div className="TotalFeedbackTakenWrapper Height-Full CommonHeader">
      <Header />
      <SubHeader
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: '', query: {} }); },
        }}
      />
      {isLoader && <LoaderWithOverLay />}
      {/* <Filter onSubmit={handleSubmitClick} initialValues={filter} /> */}

      <div className="Mt-20">
        <List
          isFetching={totalFeedbackTakenLoading}
          totalFeedbackTakenData={totalFeedbackTakenData}
          pageBackward={pageBackward}
          pageForward={pageForward}
          onExportClick={handleExportButtonClick}
        />
      </div>
    </div>
  );
}

TotalFeedbackTakenWrap.defaultProps = {
  setNhmDashboardView: () => { },
};

TotalFeedbackTakenWrap.propTypes = {
  setNhmDashboardView: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(TotalFeedbackTakenWrap);
