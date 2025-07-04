import React, { useState, useContext } from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import ContentWrap from '../../../../components/ContentWrap';
import HeaderRow from './HeaderRow';
import ListItemIterator from '../../../../components/ListUtils/ListItemIterator';
import ListRow from './ListRow';
import Pagination from '../../../../components/Pagination';
import Icon from '../../../../components/Icon';
import { ButtonCustom } from '../../../../components/Button';
import PcfModal from '../PcfModal';
import { UserConfigContext } from '../../../../providers/withUserConfigProvider';
import { getPcfHafData } from '../../../../api/nhmDashboard';
import LoaderWithOverLay from '../../../../components/Loader';


function List({
  intl,
  isFetching,
  alsDailyDetail,
  pageBackward,
  pageForward,
  onExportClick,
}) {
  const userConfig = useContext(UserConfigContext);
  const [pcfData, setPcfData] = useState([]);
  const [isLoader, setIsLoader] = useState(false);
  const listDetails = (alsDailyDetail && alsDailyDetail.data && alsDailyDetail.data.content) || [];

  function handlePcfDocumentModalCancel() {
    setPcfData([]);
  }

  function getDocumentsData(jobId) {
    setIsLoader(true);
    getPcfHafData(jobId, userConfig.userConfig)
      .then((res) => {
        const data = res.body && res.body.data;
        setPcfData(data);
        setIsLoader(false);
      })
      .catch(() => {
        setIsLoader(false);
      });
  }

  return (
    <div className="ListDashboardMaster">
      {isLoader && (<LoaderWithOverLay />)}
      <div className="Flex justify-content-between ">
        <ButtonCustom className="ExcelButton" onClick={onExportClick} labelText={intl.formatMessage({ id: 'label.excel' })} />
        <Pagination
          listDetails={(alsDailyDetail && alsDailyDetail.data) || {}}
          isFetching={isFetching}
          pageBackward={pageBackward}
          pageForward={pageForward}
        />
      </div>
      <div style={{ overflowX: 'auto', minHeight: 300 }}>
        <ContentWrap isFetching={isFetching}>
          <table className="table Mt-10" style={{ minWidth: '4000px' }}>
            <HeaderRow />
            <ListItemIterator
              listDetails={listDetails}
              ListItem={ListRow}
              getDocumentsData={getDocumentsData}
            />
          </table>
          {!listDetails.length &&
            <div
              style={{
                width: '25%',
                margin: '91px auto',
              }}
            >
              <div style={{
                textAlign: 'center',
              }}
              >
                <Icon name="search-not-found" />
              </div>

              <div style={{ marginTop: '24px', textAlign: 'center' }}>
                {intl.formatMessage({ id: 'label.noRecordsFound' })}
              </div>
            </div>
          }
        </ContentWrap>
      </div>
      {!!pcfData.length && (
        <PcfModal
          pcfList={pcfData}
          handleModalCloseClick={handlePcfDocumentModalCancel}
        />
      )}
    </div>
  );
}

List.defaultProps = {
  isFetching: false,
  alsDailyDetail: {},
  onExportClick: () => { },
  pageBackward: () => { },
  pageForward: () => { },
};

List.propTypes = {
  intl: PropTypes.object.isRequired,
  isFetching: PropTypes.bool,
  alsDailyDetail: PropTypes.object,
  onExportClick: PropTypes.func,
  pageBackward: PropTypes.func,
  pageForward: PropTypes.func,
};

export default injectIntl(List);
