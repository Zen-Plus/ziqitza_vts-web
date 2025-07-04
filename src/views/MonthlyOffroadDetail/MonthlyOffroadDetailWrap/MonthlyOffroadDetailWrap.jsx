import React, { useContext, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeadFilter from './SubHeadFilter';
import { ButtonCustom } from '../../../components/Button';
import {
  fetchMonthlyOffroadDetail as fetchMonthlyOffroadDetailApi,
  exportMonthlyOffroadDetail as exportMonthlyOffroadDetailApi,
} from '../../../api/nhmDashboard';
import useService from '../../../common/hooks/useService';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from '../../../components/Loader';
import Filter from './Filter'
import { fieldNames } from './Filter/formConfig';
import moment from 'moment';
import { createMonthlyIncentivePayload } from './util';
import navigation from '../../NhmDashboard/navigation';

function getInitialValues(values = {}) {
  const _values = { ...values };
  _values[fieldNames.MONTH] = moment();

  return _values;
}

function MonthlyOffroadDetailWrap({ intl, setNhmDashboardView }) {
  const userConfig = useContext(UserConfigContext);
  const [isLoader, setLoader] = useState(false);
  const [filter, setfilter] = useState(getInitialValues());

  function handleSubmitClick(values) {
    setfilter({ ...values });
  }

  const {
    data: monthlyOffRoadDetailData,
    request: monthlyOffroadDetailRequest,
    loading: monthlyOffroadDetailLoading,
  } = useService({
    method: fetchMonthlyOffroadDetailApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  useEffect(() => {
    const _payload = createMonthlyIncentivePayload(filter);
    monthlyOffroadDetailRequest(_payload);
  }, [filter]);

  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    const _exportPayload = { fileType, ...createMonthlyIncentivePayload(filter) };
    exportMonthlyOffroadDetailApi(_exportPayload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'MonthlyOffroad';
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()}${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        setLoader(false);
      }).catch(() => {
        setLoader(false);
      });
  }

  return (
    <div className="MedicineInventoryWrapper CommonHeader">
      {isLoader && <LoaderWithOverLay />}
      <Header />
      <SubHeader
        isDateRangeVisible
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: navigation.OFF_ROAD_COUNT_DETAIL, query: {} }); },
          onHomeClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onOffRoadClick: () => { setNhmDashboardView({ type: navigation.MONTHLY_OFF_ROAD_DETAIL, query: {} }) }
        }}
      />
      <Filter onSubmit={handleSubmitClick} />
      <div className="Mt-20">
        <div>
          <ButtonCustom
            className="Box--Shadow Font--S18 ExcelButton"
            onClick={handleExportButtonClick}
            labelText={intl.formatMessage({ id: 'label.excel' })}
            type="link"
          />
        </div>
        <div className="Mt-10">
          <List
            isFetching={monthlyOffroadDetailLoading}
            offRoadData={monthlyOffRoadDetailData}
          />
        </div>
      </div>
    </div>
  );
}

MonthlyOffroadDetailWrap.defaultProps = {
  setNhmDashboardView: () => { },
};

MonthlyOffroadDetailWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
};

export default injectIntl(MonthlyOffroadDetailWrap);
