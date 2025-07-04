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
  exportNonAvailabilityOfMedicines as exportNonAvailabilityOfMedicinesApi,
  fetchNonAvailabilityOfMedicines as fetchNonAvailabilityOfMedicinesApi,
} from '../../../api/nhmDashboard';
import { fileTypes } from '../../../common/constants/fileTypes';
import LoaderWithOverLay from '../../../components/Loader';
import { createNonAvailabilityOfMedicinesPayload } from './utils';
import { UserConfigContext } from '../../../providers/withUserConfigProvider';
import useService from '../../../common/hooks/useService';
import List from './List';
import Pagination from '../../../components/Pagination';

function getInitialValues() {
  const _values = {};
  _values[fieldNames.DATE_RANGE] = [moment().startOf('month'), moment().endOf('day')];
  return _values;
}

function NonAvailabilityOfMedicinesWrap({ intl, setNhmDashboardView }) {
  const userConfig = useContext(UserConfigContext);
  const [filter, setFilter] = useState(getInitialValues());
  const [isLoader, setLoader] = useState(false);
  const [pageNo, setPageNo] = useState(0);

  const {
    data: nonAvailabilityOfMedicinesData,
    request: nonAvailabilityOfMedicinesRequest,
    loading: nonAvailabilityOfMedicinesLoading,
  } = useService({
    method: fetchNonAvailabilityOfMedicinesApi,
    context: userConfig.userConfig,
    initialValues: {},
  });

  useEffect(() => {
    const _payload = {
      pageNo,
      pageSize: 25,
      ...createNonAvailabilityOfMedicinesPayload(filter),
    };
    nonAvailabilityOfMedicinesRequest(_payload);
  }, [filter, pageNo]);

  function handleExportButtonClick(fileType = 'EXCEL') {
    setLoader(true);
    const _exportPayload = {
      fileType,
      ...createNonAvailabilityOfMedicinesPayload(filter)
    };
    exportNonAvailabilityOfMedicinesApi(_exportPayload, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const fileName = 'NonAvailabilityOfMedicines';
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
    setPageNo(0);
  }

  function handlePageForwardBackwardClick(type = 'backward') {
    if (type === 'forward') {
      setPageNo((pre) => pre + 1);
    } else {
      setPageNo((pre) => pre - 1);
    }
  }

  return (
    <div className="OffRoadDetailsWrapper NonAvailabilityOfMedicinesWrapper CommonHeader">
      {isLoader && <LoaderWithOverLay />}
      <Header />
      <SubHeader
        isDateRangeVisible
        Component={SubHeaderFiler}
        componentRestProps={{
          onBackClick: () => { setNhmDashboardView({ type: navigation.INVENTORY, query: {} }); },
          onHomeClick: () => { setNhmDashboardView({ type: '', query: {} }); },
        }}
      />
      <div className="Mt-20">
        <div>
          <Form onSubmit={handleSubmitClick} />
        </div>
        <div className="Mt-20 Flex justify-content-between">
          <div>
            <ButtonCustom
              className="Box--Shadow Font--S18 ExcelButton"
              onClick={handleExportButtonClick}
              labelText={intl.formatMessage({ id: 'label.excel' })}
              type="link"
              disabled={
                (nonAvailabilityOfMedicinesData
                  && nonAvailabilityOfMedicinesData.data
                  && nonAvailabilityOfMedicinesData.data.content
                  && nonAvailabilityOfMedicinesData.data.content.length)
                ? false
                : true
              }
            />
          </div>
          <div>
            <Pagination
              listDetails={(nonAvailabilityOfMedicinesData && nonAvailabilityOfMedicinesData.data) || {}}
              isFetching={false}
              pageBackward={() => {
                handlePageForwardBackwardClick();
              }}
              pageForward={() => {
                handlePageForwardBackwardClick('forward');
              }}
            />
          </div>
        </div>
        <div className="Mt-10">
          <List
            isFetching={nonAvailabilityOfMedicinesLoading}
            nonAvailabilityOfMedicinesData={nonAvailabilityOfMedicinesData}
            pageNo={pageNo}
          />
        </div>
      </div>
    </div>
  );
}

NonAvailabilityOfMedicinesWrap.defaultProps = {
  setNhmDashboardView: () => {},
};

NonAvailabilityOfMedicinesWrap.propTypes = {
  intl: PropTypes.object.isRequired,
  setNhmDashboardView: PropTypes.func,
};

export default injectIntl(NonAvailabilityOfMedicinesWrap);
