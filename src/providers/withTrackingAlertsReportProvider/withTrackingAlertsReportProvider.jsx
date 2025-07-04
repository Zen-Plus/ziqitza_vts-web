import React from 'react';
import FileSaver from 'file-saver';
import useCustomState from '../../common/hooks/useCustomState';
import {
  fetchTrackingAlertsReport as fetchTrackingAlertsReportApi,
  exportTrackingAlertsReport as exportTrackingAlertsReportApi,
  fetchAllTrackingAlertsReport as fetchAllTrackingAlertsReportApi,
} from '../../api/trackingAlertsReport';
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
const TrackingAlertsReportContext = React.createContext({ ...initialState });

// Hook
const useTrackingAlertsReport = (
  initialStates = { ...initialState },
) => {
  const [trackingAlertsReport, setTrackingAlertsReport] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchTrackingAlertsReportStart = () => {
    setTrackingAlertsReport({ isFetching: true, isError: false });
  };

  const fetchTrackingAlertsReportSuccess = (states) => {
    setTrackingAlertsReport({ isFetching: false, info: { data: states.data } });
  };

  const fetchTrackingAlertsReportError = (error) => {
    notifications.pushNotification(error);
    setTrackingAlertsReport({ isFetching: false, isError: true });
  };

  const getTrackingAlertsReportList = (queryParams, userConfig) => {
    fetchTrackingAlertsReportStart();
    fetchTrackingAlertsReportApi(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTrackingAlertsReportSuccess(res.body);
      })
      .catch((err) => {
        fetchTrackingAlertsReportError(err);
      });
  };


  // Export of Tracking Alerts  Report

  function exportTrackingAlertsReportStart() {
    setTrackingAlertsReport({ isFetchingExports: true, isError: false });
  }

  function exportTrackingAlertsReportEnd() {
    setTrackingAlertsReport({ isFetchingExports: false, isError: false });
  }

  function exportTrackingAlertsReportError(error) {
    notifications.pushNotification(error);
    setTrackingAlertsReport({ isFetchingExports: false, isError: true });
  }
  function exportTrackingAlertsReport(listState, userConfig) {
    exportTrackingAlertsReportStart();
    exportTrackingAlertsReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const { fileType, fileName } = listState;
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()} ${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        exportTrackingAlertsReportEnd();
      })
      .catch((error) => {
        exportTrackingAlertsReportError(error);
      });
  }


  // fetch all Tracking Alerts  Report

  function fetchAllTrackingAlertsReportStart() {
    setTrackingAlertsReport({ isFetchingAll: true, isError: false });
  }

  function fetchAllTrackingAlertsReportEnd(data) {
    setTrackingAlertsReport({
      isFetchingAll: false,
      info: {
        ...trackingAlertsReport.info,
        printAllData: data.data && data.data.trackingAlertReportResources,
      },
    });
  }

  function fetchAllTrackingAlertsReportError(error) {
    notifications.pushNotification(error);
    setTrackingAlertsReport({ isFetchingAll: false, isError: true });
  }
  function printAllTrackingAlertsReport(listState, userConfig) {
    fetchAllTrackingAlertsReportStart();
    fetchAllTrackingAlertsReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        fetchAllTrackingAlertsReportEnd(data);
      })
      .catch((error) => {
        fetchAllTrackingAlertsReportError(error);
      });
  }

  function resetAllTrackingAlertsReport() {
    setTrackingAlertsReport({ info: { ...trackingAlertsReport.info, printAllData: null } });
  }

  return {
    trackingAlertsReport,
    setTrackingAlertsReport,
    getTrackingAlertsReportList,
    exportTrackingAlertsReport,
    printAllTrackingAlertsReport,
    resetAllTrackingAlertsReport,
  };
};

// Provider
function withTrackingAlertsReportProvider(Component) {
  function TrackingAlertsReportProvider(props) {
    const trackingAlertsReport = useTrackingAlertsReport();

    return (
      <TrackingAlertsReportContext.Provider value={trackingAlertsReport}>
        <Component
          {...props}
        />
      </TrackingAlertsReportContext.Provider>
    );
  }

  return TrackingAlertsReportProvider;
}

export { TrackingAlertsReportContext, withTrackingAlertsReportProvider };
