import React from 'react';
import useCustomState from '../../common/hooks/useCustomState';
import { fetchReportFilter } from '../../api/reportFilter';
import { NotificationContext } from '../withNotificationProvider';

// inital context state
const initialState = {
  isFetching: false,
  isError: false,
  info: null,
};

// Context
const ReportFilterContext = React.createContext({ ...initialState });

// Hook
const useReportFilter = (
  initialStates = { ...initialState }
) => {
  const [reportFilter, setReportFilter] = useCustomState(initialStates);

  const notifications = React.useContext(NotificationContext);

  const fetchReportFilterStart = () => {
    setReportFilter({ isFetching: true, isError: false });
  }

  const fetchReportFilterSuccess = (states) => {
    setReportFilter({ isFetching: false, info: { data: { ...states.data.vehicleResource, content: [ ...states.data.vehicleResource.content ] } } });
  }

  const fetchReportFilterError = (error) => {
    notifications.pushNotification(error);
    setReportFilter({ isFetching: false, isError: true });
  }

  const getReportFilterList = (queryParams, userConfig) => {
    fetchReportFilterStart();
    fetchReportFilter(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchReportFilterSuccess(res.body);
      })
      .catch((err) => {
        fetchReportFilterError(err);
      });
  }
  const fetchReportFilterLoadMoreStart = () => {
    setReportFilter({ isFetching: true, isError: false });
  }
  const fetchReportFilterLoadMoreSuccess = (states) => {
    setReportFilter({
      ...reportFilter,
      isFetching: false,
      info: {
        ...reportFilter.info,
        data: {
          ...reportFilter.info.data,
          content: [...reportFilter.info.data.content, ...states.data.vehicleResource.content],
        },
      },
    });
  }

  const fetchReportFilterLoadMoreError = (error) => {
    notifications.pushNotification(error);
    setReportFilter({ isFetching: false, isError: true });
  }

  const getReportFilterListLoadMore = (queryParams, userConfig) => {
    fetchReportFilterLoadMoreStart();
    fetchReportFilter(queryParams, userConfig.userConfig)
      .then((res) => {
        fetchReportFilterLoadMoreSuccess(res.body);
      })
      .catch((err) => {
        fetchReportFilterLoadMoreError(err);
      });
  }

  return {
    reportFilter,
    setReportFilter,
    getReportFilterList,
    getReportFilterListLoadMore
  };
};

// Provider
function withReportFilterProvider(Component) {
  function ReportFilterProvider(props) {
    const reportFilter = useReportFilter();

    return (
      <ReportFilterContext.Provider value={reportFilter}>
        <Component
          {...props}
        />
      </ReportFilterContext.Provider>
    );
  }

  return ReportFilterProvider;
};

export { ReportFilterContext, withReportFilterProvider };