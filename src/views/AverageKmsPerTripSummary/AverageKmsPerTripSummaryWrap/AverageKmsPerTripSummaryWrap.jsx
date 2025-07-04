import React, { useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeadFilter from './SubHeadFilter';
import {
  exportAverageKmsPerTripSummary as exportAverageKmsPerTripSummaryApi,
} from '../../../api/nhmDashboard';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import List from './List';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from '../../../components/Loader';
import SummaryModal from '../SummaryModal';

function AverageKmsPerTripSummaryWrap({ intl, setNhmDashboardView }) {
  const userConfig = useContext(UserConfigContext);
  const [isLoader, setLoader] = useState(false);
  const [isSummaryModal, setSummaryModal] = useState(false);

  function handleExport(query) {
    setLoader(true);
    exportAverageKmsPerTripSummaryApi(query, userConfig.userConfig)
      .then((res) => {
        const fileType = query.fileType;
        const data = res.body;
        const fileName = 'AverageKmsPerTripSummary';
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
    <div className="AverageKmsPerTripSummaryWrapper CommonHeader">
      {isLoader && <LoaderWithOverLay />}
      {isSummaryModal && (
        <SummaryModal
          isVisible={isSummaryModal}
          onCancelClick={() => { setSummaryModal(false); }}
          setLoader={setLoader}
        />
      )}
      <Header />
      <SubHeader
        isDateRangeVisible={false}
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          // onMonthlyOffRoadClick: () => { setNhmDashboardView({ type: navigation.MONTHLY_OFF_ROAD, query: {} }); },
          onSummaryClick: () => { setSummaryModal(true); }
        }}
      />
      <div className="Mt-20">
        <List exportAction={handleExport} />
      </div>
    </div>
  );
}

AverageKmsPerTripSummaryWrap.defaultProps = {
  setNhmDashboardView: () => {},
};

AverageKmsPerTripSummaryWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
};

export default injectIntl(AverageKmsPerTripSummaryWrap);
