import React from 'react';
import FileSaver from 'file-saver';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchDistanceReport, exportDistanceReport as exportDistanceReportApi, fetchAllDistanceReport as fetchAllDistanceReportApi } from '../../api/distanceReport';
import { NotificationContext } from '../withNotificationProvider';
import { fileTypes } from '../../common/constants/fileTypes';

// inital context state
const initialState = {
  isFetching: false,
  isFetchingExports: false,
  isError: false,
  info: {},
  printAllData: null,
};

// Context
const DistanceReportContext = React.createContext({ ...initialState });

// Hook
const useDistanceReport = (
  initialStates = { ...initialState },
) => {
  const [distanceReport, setDistanceReport] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchDistanceReportStart = () => {
    setDistanceReport({ isFetching: true, isError: false });
  };

  const fetchDistanceReportSuccess = (states) => {
    setDistanceReport({ isFetching: false, info: { data: states.data } });
  };

  const fetchDistanceReportError = (error) => {
    notifications.pushNotification(error);
    setDistanceReport({ isFetching: false, isError: true });
  };

  const getDistanceReportList = (queryParams, userConfig) => {
    fetchDistanceReportStart();
    fetchDistanceReport(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchDistanceReportSuccess(res.body);
      })
      .catch((err) => {
        fetchDistanceReportError(err);
      });
  };


  // Export of Distance Report

  function exportDistanceReportStart() {
    setDistanceReport({ isFetchingExports: true, isError: false });
  }

  function exportDistanceReportEnd() {
    setDistanceReport({ isFetchingExports: false, isError: false });
  }

  function exportDistancereportError(error) {
    notifications.pushNotification(error);
    setDistanceReport({ isFetchingExports: false, isError: true });
  }
  function exportDistanceReport(listState, userConfig) {
    exportDistanceReportStart();
    exportDistanceReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const { fileType, fileName } = listState;
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()} ${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        exportDistanceReportEnd();
      })
      .catch((error) => {
        exportDistancereportError(error);
      });
  }


  // fetch all Distance Report

  function fetchAllDistanceReportStart() {
    setDistanceReport({ isFetchingAll: true, isError: false });
  }

  function fetchAllDistanceReportEnd(data) {
    setDistanceReport({
      isFetchingAll: false,
      info: {
        ...distanceReport.info,
        printAllData: data.data
       && data.data.distanceReportResources,
      },
    });
  }

  function fetchAllDistancereportError(error) {
    notifications.pushNotification(error);
    setDistanceReport({ isFetchingAll: false, isError: true });
  }
  function printAllDistanceReport(listState, userConfig) {
    fetchAllDistanceReportStart();
    fetchAllDistanceReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        fetchAllDistanceReportEnd(data);
      })
      .catch((error) => {
        fetchAllDistancereportError(error);
      });
  }

  function resetAllDistanceReport() {
    setDistanceReport({ info: { ...distanceReport.info, printAllData: null } });
  }

  return {
    distanceReport,
    setDistanceReport,
    getDistanceReportList,
    exportDistanceReport,
    printAllDistanceReport,
    resetAllDistanceReport,
  };
};

// Provider
function withDistanceReportProvider(Component) {
  function DistanceReportProvider(props) {
    const distanceReport = useDistanceReport();

    return (
      <DistanceReportContext.Provider value={distanceReport}>
        <Component
          {...props}
        />
      </DistanceReportContext.Provider>
    );
  }

  return DistanceReportProvider;
}

export { DistanceReportContext, withDistanceReportProvider };
