import React, {useContext, useState } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import SubHeader from '../../NhmDashboard/NhmDashboardWrap/SubHeader';
import Header from '../../NhmDashboard/NhmDashboardWrap/Header';
import SubHeadFilter from './SubHeadFilter';
import List from './List';
import LoaderWithOverLay from '../../../components/Loader';
import navigation from '../../NhmDashboard/navigation'
import SummaryModal from '../SummaryModal';
import { exportOffRoadCountDetail as exportOffRoadCountDetailApi } from '../../../api/nhmDashboard';
import { fileTypes } from '../../../common/constants/fileTypes';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import FileSaver from 'file-saver';

function OffRoadCountDetailWrap({ intl, setNhmDashboardView }) {
  const [isLoader, setLoader] = useState(false);
  const [isSummaryModal, setSummaryModal] = useState(false);
  const userConfig = useContext(UserConfigContext);

  function handleExport(query, payload) {
    setLoader(true);
    exportOffRoadCountDetailApi(query, userConfig.userConfig, payload)
      .then((res) => {
        const fileType = query.fileType;
        const data = res.body;
        const fileName = 'OffroadVehicleDetail';
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()}${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        setLoader(false);
      }).catch((error) => {
        console.error('Error exporting off-road count detail:', error);
        setLoader(false);
      });
  }

  return (
    <div className="OffRoadCountDetailWrapper CommonHeader">
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
        isDateRangeVisible
        Component={SubHeadFilter}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: '', query: {} }); },
          onMonthlyOffRoadClick: () => { setNhmDashboardView({ type: navigation.MONTHLY_OFF_ROAD, query: {} }); },
          onSummaryClick: () => { setSummaryModal(true); }
        }}
      />
      <div className="Mt-20">
        <div className="Mt-10">
          <List exportAction={handleExport} />
        </div>
      </div>
    </div>
  );
}

OffRoadCountDetailWrap.defaultProps = {
  setNhmDashboardView: () => {},
};

OffRoadCountDetailWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
};

export default injectIntl(OffRoadCountDetailWrap);
