import React, { useState, useContext, useEffect } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import moment from 'moment';
import FileSaver from 'file-saver';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeaderFiler from './SubHeaderFiler';
import { ButtonCustom } from '../../../components/Button';
import Form from './Form';
import { fieldNames } from './Form/formConfig';
import navigation from '../../NhmDashboard/navigation';
import {
  exportOffRoadDetails as exportOffRoadDetailsApi,
  fetchOffRoadDetails as fetchOffRoadDetailsApi,
} from '../../../api/nhmDashboard';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from '../../../components/Loader';
import { createMonthlyOffRoadDetailsPayload } from './utils';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import useService from '../../../common/hooks/useService';
import List from './List';

function getInitialValues() {
  const _values = {};

  _values[fieldNames.MONTH] = moment();

  return _values;
}

function OffRoadDetailsWrap({ intl, setNhmDashboardView }) {
  const userConfig = useContext(UserConfigContext);
  const [filter, setFilter] = useState(getInitialValues());
  const [isLoader, setLoader] = useState(false);

  const {
    data: offRoadDetailsData,
    request: offRoadDetailsRequest,
    loading: offRoadDetailsLoading,
  } = useService({
    method: fetchOffRoadDetailsApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  useEffect(() => {
    const _payload = createMonthlyOffRoadDetailsPayload(filter);
    offRoadDetailsRequest(_payload);
  }, [filter]);

  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    const _exportPayload = {
      fileType,
      ...createMonthlyOffRoadDetailsPayload(filter)
    };
    exportOffRoadDetailsApi(_exportPayload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'MonthlyOffRoadDetails';
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

  function handleSubmitClick(val) {
    setFilter({ ...val });
  }

  return (
    <div className="OffRoadDetailsWrapper CommonHeader">
      {isLoader && <LoaderWithOverLay />}
      <Header />
      <SubHeader
        isDateRangeVisible
        Component={SubHeaderFiler}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: navigation.MONTHLY_OFF_ROAD, query: {} }); },
          onHomeClick: () => { setNhmDashboardView({ type: '', query: {} }); },
        }}
      />
      <div className="Mt-20">
        <div>
          <Form onSubmit={handleSubmitClick} />
        </div>
        <div className="Mt-20">
          <ButtonCustom
            className="Box--Shadow Font--S18 ExcelButton"
            onClick={handleExportButtonClick}
            labelText={intl.formatMessage({ id: 'label.excel' })}
            type="link"
            disabled={
              (offRoadDetailsData
                && offRoadDetailsData.data
                && offRoadDetailsData.data.length)
              ? false
              : true
            }
          />
        </div>
        <div className="Mt-10">
          <List
            isFetching={offRoadDetailsLoading}
            offRoadData={offRoadDetailsData}
          />
        </div>
      </div>
    </div>
  );
}

OffRoadDetailsWrap.defaultProps = {
  setNhmDashboardView: () => {},
};

OffRoadDetailsWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
};

export default injectIntl(OffRoadDetailsWrap);
