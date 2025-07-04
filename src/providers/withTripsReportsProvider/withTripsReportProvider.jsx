import React from 'react';
import FileSaver from 'file-saver';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchTripsReport, exportTripsReport as exportTripsReportApi, fetchAllTripsReport as fetchAllTripsReportApi } from '../../api/tripsReport';
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
const TripsReportContext = React.createContext({ ...initialState });

// Hook
const useTripsReport = (
  initialStates = { ...initialState },
) => {
  const [tripsReport, setTripsReport] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchTripsReportStart = () => {
    setTripsReport({ isFetching: true, isError: false });
  };

  const fetchTripsReportSuccess = (states) => {
    setTripsReport({ isFetching: false, info: { data: states.data } });
  };

  const fetchTripsReportError = (error) => {
    notifications.pushNotification(error);
    setTripsReport({ isFetching: false, isError: true });
  };

  const getTripsReportList = (queryParams, userConfig) => {
    fetchTripsReportStart();
    fetchTripsReport(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchTripsReportSuccess(res.body);
      })
      .catch((err) => {
        fetchTripsReportError(err);
      });
  };


  // Export of Trips Report

  function exportTripsReportStart() {
    setTripsReport({ isFetchingExports: true, isError: false });
  }

  function exportTripsReportEnd() {
    setTripsReport({ isFetchingExports: false, isError: false });
  }

  function exportTripsreportError(error) {
    notifications.pushNotification(error);
    setTripsReport({ isFetchingExports: false, isError: true });
  }
  function exportTripsReport(listState, userConfig) {
    exportTripsReportStart();
    exportTripsReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        const { fileType, fileName } = listState;
        const metadata = {
          type: fileTypes[fileType].type,
        };
        const fileNameWithExt = `${fileName}${new Date().toISOString()} ${fileTypes[fileType].ext}`;
        const file = new File([data], fileNameWithExt, metadata);
        FileSaver.saveAs(file, fileNameWithExt);
        exportTripsReportEnd();
      })
      .catch((error) => {
        exportTripsreportError(error);
      });
  }


  // fetch all Trips Report

  function fetchAllTripsReportStart() {
    setTripsReport({ isFetchingAll: true, isError: false });
  }

  function fetchAllTripsReportEnd(data) {
    setTripsReport({
      isFetchingAll: false,
      info: {
        ...tripsReport.info,
        printAllData: data.data && data.data.tripReportResources,
      },
    });
  }

  function fetchAllTripsreportError(error) {
    notifications.pushNotification(error);
    setTripsReport({ isFetchingAll: false, isError: true });
  }
  function printAllTripsReport(listState, userConfig) {
    fetchAllTripsReportStart();
    fetchAllTripsReportApi(listState, userConfig.userConfig)
      .then((res) => {
        const data = res.body;
        fetchAllTripsReportEnd(data);
      })
      .catch((error) => {
        fetchAllTripsreportError(error);
      });
  }

  function resetAllTripsReport() {
    setTripsReport({ info: { ...tripsReport.info, printAllData: null } });
  }

  return {
    tripsReport,
    setTripsReport,
    getTripsReportList,
    exportTripsReport,
    printAllTripsReport,
    resetAllTripsReport,
  };
};

// Provider
function withTripsReportProvider(Component) {
  function TripsReportProvider(props) {
    const tripsReport = useTripsReport();

    return (
      <TripsReportContext.Provider value={tripsReport}>
        <Component
          {...props}
        />
      </TripsReportContext.Provider>
    );
  }

  return TripsReportProvider;
}

export { TripsReportContext, withTripsReportProvider };
