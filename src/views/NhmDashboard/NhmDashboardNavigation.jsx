import React from 'react';
import NhmDashboardWrap from './NhmDashboardWrap';
import EquipmentStatusWrap from '../EquipmentStatus/EquipmentStatusWrap';
import MedicineInventoryWrap from '../MedicineInventory/MedicineInventoryWrap';
import EquipmentDailyStatusWrap from '../EquipmentDailyStatus/EquipmentDailyStatusWrap';
import AlsSummaryWrap from '../AlsSummary/AlsSummaryWrap';
import AlsDailyDetailWrap from '../AlsDailyDetail/AlsDailyDetailWrap';
import OffRoadCountDetailWrap from '../OffRoadCountDetail/OffRoadCountDetailWrap';
import TotalCasesServedSummaryWrap from '../TotalCasesServedSummary/TotalCasesServedSummaryWrap';
import TotalAmbulanceSummaryWrap from '../TotalAmbulanceSummary/TotalAmbulanceSummaryWrap';
import TotalPregnancyCasesServedSummaryWrap from '../TotalPregnancyCasesServedSummary/TotalPregnancyCasesServedSummaryWrap';
import AverageKmsPerTripSummaryWrap from '../AverageKmsPerTripSummary/AverageKmsPerTripSummaryWrap';
import AverageResponseTimeUrbanRuralSummaryWrap from '../AverageResponseTimeUrbanRuralSummary/AverageResponseTimeUrbanRuralSummaryWrap';
import MonthlyOffroadDetailWrap from '../MonthlyOffroadDetail/MonthlyOffroadDetailWrap';
import OffRoadDetailsWrap from '../OffRoadDetails/OffRoadDetailsWrap';
import JobWiseEquipmentWrap from '../JobWiseEquipment/JobWiseEquipmentWrap';
import NonAvailabilityOfMedicinesWrap from '../NonAvailabilityOfMedicines/NonAvailabilityOfMedicinesWrap';
import useCustomState from '../../common/hooks/useCustomState';
import navigation from './navigation';
import TotalFeedbackTakenWrap from '../TotalFeedbackTaken/TotalFeedbackTaken';
import TotalNoOfCasesBookedWrap from '../TotalNoOfCasesBooked/TotalNoOfCasesBookedWrap';
import DailyAcStatusWrap from '../DailyAcStatus/DailyAcStatusWrap';
import SickNewBornCaseServedDetailWrap from '../SickNewBornCaseServedDetail/SickNewBornCaseServedDetailWrap';
import SeniorCitizenCaseServedDetailWrap from '../SeniorCitizenCaseServedDetail/SeniorCitizenCaseServedDetailWrap';

function NhmDashboardNavigation() {
  const [viewState, setViewState] = useCustomState({ type: '', query: {} });

  const handleViewStateKey = (key) => {
    const { type, query = {} } = key;
    setViewState({ type, query });
  }

  if (viewState.type === navigation.EQUIPMENT_STATUS) {
    return (
      <EquipmentStatusWrap
        setNhmDashboardView={handleViewStateKey}
        dailyStatusProps={viewState.query}
      />

    );
  }

  if (viewState.type === navigation.TOTAL_FEEDBACK_TAKEN) {
    return (
      <TotalFeedbackTakenWrap
        setNhmDashboardView={handleViewStateKey}
      />
    );
  }

  if (viewState.type === navigation.INVENTORY) {
    return <MedicineInventoryWrap setNhmDashboardView={handleViewStateKey} />
  }

  if (viewState.type === navigation.EQUIPMENT_DAILY_STATUS) {
    return (
      <EquipmentDailyStatusWrap
        setNhmDashboardView={handleViewStateKey}
        dailyStatusProps={viewState.query}
      />
    );
  }

  if (viewState.type === navigation.ALS_SUMMARY) {
    return (
      <AlsSummaryWrap
        setNhmDashboardView={handleViewStateKey}
      />
    );
  }

  if (viewState.type === navigation.ALS_DAILY_DETAIL) {
    return (
      <AlsDailyDetailWrap
        setNhmDashboardView={handleViewStateKey}
      />
    );
  }

  if (viewState.type === navigation.OFF_ROAD_COUNT_DETAIL) {
    return (
      <OffRoadCountDetailWrap
        setNhmDashboardView={handleViewStateKey}
      />
    );
  }

  if (viewState.type === navigation.MONTHLY_CASE_SERVED ) {
    return <TotalCasesServedSummaryWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.TOTAL_AMBULANCE ) {
    return <TotalAmbulanceSummaryWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.TOTAL_PREGNANCY_LADY_CASE ) {
    return <TotalPregnancyCasesServedSummaryWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.SICK_BORN_BABY ) {
    return <SickNewBornCaseServedDetailWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.SENIOR_CITIZEN ) {
    return <SeniorCitizenCaseServedDetailWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.AVERAGE_TRIP_KM ) {
    return <AverageKmsPerTripSummaryWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.AVERAGE_RESPONSE_TIME_URBAN_RURAL ) {
    return <AverageResponseTimeUrbanRuralSummaryWrap
      setNhmDashboardView={handleViewStateKey}
    />
  }

  if (viewState.type === navigation.TOTAL_NO_OF_CASES_BOOKED) {
    return <TotalNoOfCasesBookedWrap setNhmDashboardView={handleViewStateKey} />
  }

  if (viewState.type === navigation.DAILY_AC_STATUS) {
    return <DailyAcStatusWrap setNhmDashboardView={handleViewStateKey} />
  }

  if (viewState.type === navigation.MONTHLY_OFF_ROAD) {
    return <MonthlyOffroadDetailWrap setNhmDashboardView={handleViewStateKey} />
  }

  if (viewState.type === navigation.MONTHLY_OFF_ROAD_DETAIL) {
    return <OffRoadDetailsWrap setNhmDashboardView={handleViewStateKey} />
  }

  if (viewState.type === navigation.JOB_WISE_EQUIPMENT) {
    return (
      <JobWiseEquipmentWrap
        setNhmDashboardView={handleViewStateKey}
      />
    );
  }
  if(viewState.type === navigation.NON_AVAILABILITY_OF_MEDICINES) {
    return <NonAvailabilityOfMedicinesWrap setNhmDashboardView={handleViewStateKey} />
  }

  return <NhmDashboardWrap setNhmDashboardView={handleViewStateKey} />;
}

export default NhmDashboardNavigation;
