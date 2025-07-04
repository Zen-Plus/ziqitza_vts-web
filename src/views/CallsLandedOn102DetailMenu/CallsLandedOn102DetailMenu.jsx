import React, { useContext, useEffect, useRef, useState } from "react";
import useService from "../../common/hooks/useService";
import TooltipTable from "../../components/TooltipTable";
import { fetchCallsLandedOn102 } from "../../api/nhmDashboard";
import { UserConfigContext } from "../../providers/withUserConfigProvider";
import { getActualData } from "../NhmDashboard/NhmDashboardWrap/util";

export default function CallsLandedOn102DetailMenu() {
  const userConfig = useContext(UserConfigContext);
  const [data, setData] = useState();
  const intervalRef = useRef(null);

  const {
    data: dataMenu,
    request: CallsLandedRequest,
    loading: loading,
  } = useService({
    method: fetchCallsLandedOn102,
    context: userConfig.userConfig,
    initialValuesMethod: getActualData,
    initialValues: {},
  });

  const dataOption = [
    {
      key: 'Non-EM Calls',
      value: data && data?.nonEmergencyCallCount || 0
    },
    {
      key: 'EM Calls',
      value: data && data?.emergencyCallCount || 0
    }
  ]

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    CallsLandedRequest();
    intervalRef.current = setInterval(() => {
      CallsLandedRequest();
    }, 5 * 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    setData(dataMenu);
  }, [dataMenu])

  const title = "Calls for 102 Service";
  return (
    <TooltipTable data={dataOption} title={title} />
  );
};