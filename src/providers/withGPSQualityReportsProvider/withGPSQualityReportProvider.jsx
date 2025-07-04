import React from 'react';
import FileSaver from 'file-saver';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchGPSQualityReport, exportGPSQualityReport as exportGPSQualityReportApi, fetchAllGPSQualityReport as fetchAllGPSQualityReportApi } from '../../api/gpsQualityReport';
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
const GPSQualityReportContext = React.createContext({ ...initialState });

// Hook
const useGPSQualityReport = (
  initialStates = { ...initialState },
) => {
  const [gpsQualityReport, setGPSQualityReport] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchGPSQualityReportStart = () => {
    setGPSQualityReport({ isFetching: true, isError: false });
  };

  const fetchGPSQualityReportSuccess = (states) => {
    setGPSQualityReport({ isFetching: false, info: { data: states.data } });
  };

  const fetchGPSQualityReportError = (error) => {
    notifications.pushNotification(error);
    setGPSQualityReport({ isFetching: false, isError: true });
  };

  const getGPSQualityReportList = (queryParams, userConfig) => {
    fetchGPSQualityReportStart();
    fetchGPSQualityReport(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchGPSQualityReportSuccess(res.body);
      })
      .catch((err) => {
        fetchGPSQualityReportError(err);
      });
  };


  // Export of GPSQuality Report

  function exportGPSQualityReportStart() {
    setGPSQualityReport({ isFetchingExports: true, isError: false });
  }

  function exportGPSQualityReportEnd() {
    setGPSQualityReport({ isFetchingExports: false, isError: false });
  }

  function exportGPSQualityreportError(error) {
    notifications.pushNotification(error);
    setGPSQualityReport({ isFetchingExports: false, isError: true });
  }
  function exportGPSQualityReport(listState, userConfig) {
    exportGPSQualityReportStart();
    exportGPSQualityReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const { fileType, fileName } = listState;
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()} ${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        exportGPSQualityReportEnd();
      })
      .catch((error) => {
        exportGPSQualityreportError(error);
      });
  }


  // fetch all GPSQuality Report

  function fetchAllGPSQualityReportStart() {
    setGPSQualityReport({ isFetchingAll: true, isError: false });
  }

  function fetchAllGPSQualityReportEnd(data) {
    setGPSQualityReport({
      isFetchingAll: false,
      info: {
        ...gpsQualityReport.info,
        printAllData: data.data && data.data.gpsReportResources,
      },
    });
  }

  function fetchAllGPSQualityreportError(error) {
    notifications.pushNotification(error);
    setGPSQualityReport({ isFetchingAll: false, isError: true });
  }
  function printAllGPSQualityReport(listState, userConfig) {
    fetchAllGPSQualityReportStart();
    fetchAllGPSQualityReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        fetchAllGPSQualityReportEnd(data);
      })
      .catch((error) => {
        fetchAllGPSQualityreportError(error);
      });
  }

  function resetAllGPSQualityReport() {
    setGPSQualityReport({ info: { ...gpsQualityReport.info, printAllData: null } });
  }

  return {
    gpsQualityReport,
    setGPSQualityReport,
    getGPSQualityReportList,
    exportGPSQualityReport,
    printAllGPSQualityReport,
    resetAllGPSQualityReport,
  };
};

// Provider
function withGPSQualityReportProvider(Component) {
  function GPSQualityReportProvider(props) {
    const gpsQualityReport = useGPSQualityReport();

    return (
      <GPSQualityReportContext.Provider value={gpsQualityReport}>
        <Component
          {...props}
        />
      </GPSQualityReportContext.Provider>
    );
  }

  return GPSQualityReportProvider;
}

export { GPSQualityReportContext, withGPSQualityReportProvider };