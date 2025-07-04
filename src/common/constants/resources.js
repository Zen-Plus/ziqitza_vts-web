export const actions = {
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
  READ: 'READ',
  DELETE: 'DELETE',
};

export default {
  CONFIGURATION: {
    key: 'CONFIGURATION',
    PROJECT_CONFIGURATION: {
      key: 'PROJECT_CONFIGURATION',
      resourceKey: 'CONFIGURATION.PROJECT_CONFIGURATION',
    },
  },
  MDM: {
    key: 'MDM',
    ROLES_MASTER: {
      key: 'ROLES_MASTER',
      resourceKey: 'MDM.ROLES_MASTER',
    },
    USER_MASTER: {
      key: 'USER_MASTER',
      resourceKey: 'MDM.USER_MASTER',
    },
    VEHICLE: {
      key: 'VEHICLE',
      VEHICLE_MASTER: {
        key: 'VEHICLE_MASTER',
        resourceKey: 'MDM.VEHICLE.VEHICLE_MASTER',
      },
      VEHICLE_INSURANCE_MASTER: {
        key: 'VEHICLE_INSURANCE_MASTER',
        resourceKey: 'MDM.VEHICLE.VEHICLE_INSURANCE_MASTER',
      },
      VEHICLE_DECLINE_OFFROAD_MASTER: {
        key: 'VEHICLE_DECLINE_OFFROAD_MASTER',
        resourceKey: 'MDM.VEHICLE.VEHICLE_DECLINE_OFFROAD_MASTER',
      },
      PUC_FITNESS_CERTIFICATE_MASTER: {
        key: 'PUC_FITNESS_CERTIFICATE_MASTER',
        resourceKey: 'MDM.VEHICLE.PUC_FITNESS_CERTIFICATE_MASTER',
      },
      EQUIPMENT_AND_ACCESSORIES_MASTER: {
        key: 'EQUIPMENT_AND_ACCESSORIES_MASTER',
        resourceKey: 'MDM.VEHICLE.EQUIPMENT_AND_ACCESSORIES_MASTER',
      },
    },
    CLIENT_MASTER: {
      key: 'CLIENT_MASTER',
      resourceKey: 'MDM.CLIENT_MASTER',
    },
    HOSPITAL_MASTER: {
      key: 'HOSPITAL_MASTER',
      resourceKey: 'MDM.HOSPITAL_MASTER',
    },
    PARKING_BAY_MASTER: {
      key: 'PARKING_BAY_MASTER',
      resourceKey: 'MDM.PARKING_BAY_MASTER',
    },
    VENDOR_MASTER: {
      key: 'VENDOR_MASTER',
      resourceKey: 'MDM.VENDOR_MASTER',
    },
    COMPLAINT: {
      key: 'COMPLAINT',
      PRIMARY_COMPLAINT_MASTER: {
        key: 'PRIMARY_COMPLAINT_MASTER',
        resourceKey: 'MDM.COMPLAINT.PRIMARY_COMPLAINT_MASTER',
      },
      SECONDARY_COMPLAINT_MASTER: {
        key: 'SECONDARY_COMPLAINT_MASTER',
        resourceKey: 'MDM.COMPLAINT.SECONDARY_COMPLAINT_MASTER',
      },
    },
    EVENT: {
      key: 'EVENT',
      EVENT_CASUALTY_MASTER: {
        key: 'EVENT_CASUALTY_MASTER',
        resourceKey: 'MDM.EVENT.EVENT_CASUALTY_MASTER',
      },
      EVENT_ESCALATION_MATRIX_MASTER: {
        key: 'EVENT_ESCALATION_MATRIX_MASTER',
        resourceKey: 'MDM.EVENT.EVENT_ESCALATION_MATRIX_MASTER',
      },
    },
    NAMED_CALLER_MASTER: {
      key: 'NAMED_CALLER_MASTER',
      resourceKey: 'MDM.NAMED_CALLER_MASTER',
    },
    SERVICE_CATEGORY: {
      key: 'SERVICE_CATEGORY',
      SERVICE_CATEGORY_MASTER: {
        key: 'SERVICE_CATEGORY_MASTER',
        resourceKey: 'MDM.SERVICE_CATEGORY.SERVICE_CATEGORY_MASTER',
      },
      SERVICE_SUB_CATEGORY_MASTER: {
        key: 'SERVICE_SUB_CATEGORY_MASTER',
        resourceKey: 'MDM.SERVICE_CATEGORY.SERVICE_SUB_CATEGORY_MASTER',
      },
    },
    SERVICE_REQUEST: {
      key: 'SERVICE_REQUEST',
      SERVICE_REQUEST_SOURCE_SUB_SOURCE_MASTER: {
        key: 'SERVICE_REQUEST_SOURCE_SUB_SOURCE_MASTER',
        resourceKey: 'MDM.SERVICE_REQUEST.SERVICE_REQUEST_SOURCE_SUB_SOURCE_MASTER',
      },
      SERVICE_REQUEST_RESOLUTION_MASTER: {
        key: 'SERVICE_REQUEST_RESOLUTION_MASTER',
        resourceKey: 'MDM.SERVICE_REQUEST.SERVICE_REQUEST_RESOLUTION_MASTER',
      },
      RESOLUTION_QUEUE_MASTER: {
        key: 'RESOLUTION_QUEUE_MASTER',
        resourceKey: 'MDM.SERVICE_REQUEST.RESOLUTION_QUEUE_MASTER',
      },
    },
    OFFICE_LOCATION_MASTER: {
      key: 'OFFICE_LOCATION_MASTER',
      resourceKey: 'MDM.OFFICE_LOCATION_MASTER',
    },
    STATE_MASTER: {
      key: 'STATE_MASTER',
      resourceKey: 'MDM.STATE_MASTER',
    },
    DIVISION_MANDAL_ZONE_MASTER: {
      key: 'DIVISION_MANDAL_ZONE_MASTER',
      resourceKey: 'MDM.DIVISION_MANDAL_ZONE_MASTER',
    },
    DISTRICT_MASTER: {
      key: 'DISTRICT_MASTER',
      resourceKey: 'MDM.DISTRICT_MASTER',
    },
    TEHSIL_MASTER: {
      key: 'TEHSIL_MASTER',
      resourceKey: 'MDM.TEHSIL_MASTER',
    },
    CITY_VILLAGE_MASTER: {
      key: 'CITY_VILLAGE_MASTER',
      resourceKey: 'MDM.CITY_VILLAGE_MASTER',
    },
    SHIFT_MASTER: {
      key: 'SHIFT_MASTER',
      resourceKey: 'MDM.SHIFT_MASTER',
    },
    DEVICE: {
      key: 'DEVICE',
      DEVICE_MASTER: {
        key: 'DEVICE_MASTER',
        resourceKey: 'MDM.DEVICE.DEVICE_MASTER',
      },
      DEVICE_MANUFACTURER_MASTER: {
        key: 'DEVICE_MANUFACTURER_MASTER',
        resourceKey: 'MDM.DEVICE.DEVICE_MANUFACTURER_MASTER',
      },
    },
    RULE_EXCEPTIONS_REASON: {
      key: 'RULE_EXCEPTIONS_REASON',
      resourceKey: 'MDM.RULE_EXCEPTIONS_REASON',
    },
    LEAD_REASON_MASTER: {
      key: 'LEAD_REASON_MASTER',
      resourceKey: 'MDM.LEAD_REASON_MASTER',
    },
    RESOLUTION_REASON_MASTER: {
      key: 'RESOLUTION_REASON_MASTER',
      resourceKey: 'MDM.RESOLUTION_REASON_MASTER',
    },
    DEPARTMENT_MASTER: {
      key: 'DEPARTMENT_MASTER',
      resourceKey: 'MDM.DEPARTMENT_MASTER',
    },
  },
  CONTROL_ROOM: {
    key: 'CONTROL_ROOM',
    ANSWER_CALL: {
      key: 'ANSWER_CALL',
      resourceKey: 'CONTROL_ROOM.ANSWER_CALL',
    },
    ANSWER_CALL_PRIVATE: {
      key: 'ANSWER_CALL_PRIVATE',
      resourceKey: 'CONTROL_ROOM.ANSWER_CALL_PRIVATE',
    },
    OSD: {
      key: 'OSD',
      resourceKey: 'CONTROL_ROOM.OSD',
    },
    JOB_CLOSURE: {
      key: 'JOB_CLOSURE',
      resourceKey: 'CONTROL_ROOM.JOB_CLOSURE',
    },
    ERCP: {
      key: 'ERCP',
      resourceKey: 'CONTROL_ROOM.ERCP',
    },
  },
  VTS: {
    key: 'VTS',
    VTS_DASHBOARD: {
      key: 'VTS_DASHBOARD',
      resourceKey: 'VTS.VTS_DASHBOARD',
    },
    CLUSTERS: {
      key: 'CLUSTERS',
      resourceKey: 'VTS.CLUSTERS',
    },
    SERVICE_STATUS: {
      key: 'SERVICE_STATUS',
      resourceKey: 'VTS.SERVICE_STATUS',
    },
    ALERT_DASHBOARD: {
      key: 'ALERT_DASHBOARD',
      resourceKey: 'VTS.ALERT_DASHBOARD',
    },
    PROTOCOLS: {
      key: 'PROTOCOLS',
      resourceKey: 'VTS.PROTOCOLS',
    },
    NEARBY_ERV: {
      key: 'NEARBY_ERV',
      resourceKey: 'VTS.NEARBY_ERV',
    },
    TRIP_REPLAY: {
      key: 'TRIP_REPLAY',
      resourceKey: 'VTS.TRIP_REPLAY',
    },
    REPORTS: {
      key: 'REPORTS',
      resourceKey: 'VTS.REPORTS',
      DISTANCE_REPORT: {
        key: 'DISTANCE_REPORT',
        resourceKey: 'VTS.REPORTS.DISTANCE_REPORT',
      },
      TRIP_REPORT: {
        key: 'TRIP_REPORT',
        resourceKey: 'VTS.REPORTS.TRIP_REPORT',
      },
      GPS_REPORT: {
        key: 'GPS_REPORT',
        resourceKey: 'VTS.REPORTS.GPS_REPORT',
      },
      TRACKING_ALERTS_REPORT: {
        key: 'TRACKING_ALERTS_REPORT',
        resourceKey: 'VTS.REPORTS.TRACKING_ALERTS_REPORT',
      },
      ZHL_TRIP_REPORT: {
        key: 'ZHL_TRIP_REPORT',
        resourceKey: 'VTS.REPORTS.ZHL_TRIP_REPORT',
      },
    },
  },
  TEAMS: {
    key: 'TEAMS',
    DISPATCHING_POLICE: {
      key: 'DISPATCHING_POLICE',
      resourceKey: 'TEAMS.DISPATCHING_POLICE',
    },
    DISPATCHING_MEDICAL: {
      key: 'DISPATCHING_MEDICAL',
      resourceKey: 'TEAMS.DISPATCHING_MEDICAL',
    },
    DISPATCHING_FIRE: {
      key: 'DISPATCHING_FIRE',
      resourceKey: 'TEAMS.DISPATCHING_FIRE',
    },
    DISPATCHING_AMBULANCE: {
      key: 'DISPATCHING_AMBULANCE',
      resourceKey: 'TEAMS.DISPATCHING_AMBULANCE',
    },
    OSD_REQUESTS: {
      key: 'OSD_REQUESTS',
      resourceKey: 'TEAMS.OSD_REQUESTS',
      APPROVAL_REQUESTS: {
        key: 'APPROVAL_REQUESTS',
        resourceKey: 'TEAMS.OSD_REQUESTS.APPROVAL_REQUESTS',
      },
      VEHICLE_FUEL_REQUESTS: {
        key: 'VEHICLE_FUEL_REQUESTS',
        resourceKey: 'TEAMS.OSD_REQUESTS.VEHICLE_FUEL_REQUESTS',
      },
      VEHICLE_OFFROAD_REQUESTS: {
        key: 'VEHICLE_OFFROAD_REQUESTS',
        resourceKey: 'TEAMS.OSD_REQUESTS.VEHICLE_OFFROAD_REQUESTS',
      },
    },
    LEADS: {
      key: 'LEADS',
      resourceKey: 'TEAMS.LEADS',
    },
    GRIEVANCE_AND_COMPLAINTS: {
      key: 'GRIEVANCE_AND_COMPLAINTS',
      resourceKey: 'TEAMS.GRIEVANCE_AND_COMPLAINTS',
    },
    FEEDBACK: {
      key: 'FEEDBACK',
      resourceKey: 'TEAMS.FEEDBACK',
    },
    JOB_CLOSURE_FIRE: {
      key: 'JOB_CLOSURE_FIRE',
      resourceKey: 'TEAMS.JOB_CLOSURE_FIRE',
    },
    JOB_CLOSURE_AMBULANCE: {
      key: 'JOB_CLOSURE_AMBULANCE',
      resourceKey: 'TEAMS.JOB_CLOSURE_AMBULANCE',
    },
    JOB_CLOSURE_MEDICAL: {
      key: 'JOB_CLOSURE_MEDICAL',
      resourceKey: 'TEAMS.JOB_CLOSURE_MEDICAL',
    },
    JOB_CLOSURE_POLICE: {
      key: 'JOB_CLOSURE_POLICE',
      resourceKey: 'TEAMS.JOB_CLOSURE_POLICE',
    },
    TASK_CLOSURE_ERCP: {
      key: 'TASK_CLOSURE_ERCP',
      resourceKey: 'TEAMS.TASK_CLOSURE_ERCP',
    },
  },
  SUPERVISOR: {
    key: 'SUPERVISOR',
    JOB_CLOSURE_TAT_EXTENSION_MEDICAL: {
      key: 'JOB_CLOSURE_TAT_EXTENSION_MEDICAL',
      resourceKey: 'SUPERVISOR.JOB_CLOSURE_TAT_EXTENSION_MEDICAL',
    },
    JOB_CLOSURE_TAT_EXTENSION_AMBULANCE: {
      key: 'JOB_CLOSURE_TAT_EXTENSION_AMBULANCE',
      resourceKey: 'SUPERVISOR.JOB_CLOSURE_TAT_EXTENSION_AMBULANCE',
    },
    JOB_CLOSURE_TAT_EXTENSION_POLICE: {
      key: 'JOB_CLOSURE_TAT_EXTENSION_POLICE',
      resourceKey: 'SUPERVISOR.JOB_CLOSURE_TAT_EXTENSION_POLICE',
    },
    JOB_CLOSURE_TAT_EXTENSION_FIRE: {
      key: 'JOB_CLOSURE_TAT_EXTENSION_FIRE',
      resourceKey: 'SUPERVISOR.JOB_CLOSURE_TAT_EXTENSION_FIRE',
    },
    CUSTOM_NOTIFICATION: {
      key: 'CUSTOM_NOTIFICATION',
      resourceKey: 'SUPERVISOR.CUSTOM_NOTIFICATION',
    },
    JOB_ST_CORRECTION: {
      key: 'JOB_ST_CORRECTION',
      resourceKey: 'SUPERVISOR.JOB_ST_CORRECTION',
    },
    TASK_TRANSFER_ERCP: {
      key: 'TASK_TRANSFER_ERCP',
      resourceKey: 'SUPERVISOR.TASK_TRANSFER_ERCP',
    },
  },
  SEARCH: {
    key: 'SEARCH',
    resourceKey: 'SEARCH',
  },
  DOCTOR_MODULE: {
    key: 'DOCTOR_MODULE',
  },
  DIRECTORY: {
    key: 'DIRECTORY',
    CONTACT_DIRECTORY_MASTER: {
      key: 'CONTACT_DIRECTORY_MASTER',
      resourceKey: 'DIRECTORY.CONTACT_DIRECTORY_MASTER',
    },
  },
  MIS: {
    key: 'MIS',
    OPERATIONAL_REPORTS: {
      key: 'OPERATIONAL_REPORTS',
      SR_REPORT: {
        key: 'SR_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.SR_REPORT',
      },
      JOBS_REPORT: {
        key: 'JOBS_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.JOBS_REPORT',
      },
      LEADS_REPORT: {
        key: 'LEADS_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.LEADS_REPORT',
      },
      COMPLAINTS_ENQUIRY_REPORT: {
        key: 'COMPLAINTS_ENQUIRY_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.COMPLAINTS_ENQUIRY_REPORT',
      },
      FEEDBACK_REPORT: {
        key: 'FEEDBACK_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.FEEDBACK_REPORT',
      },
      VEHICLE_EVENT_ACTIVITY_REPORT: {
        key: 'VEHICLE_EVENT_ACTIVITY_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.VEHICLE_EVENT_ACTIVITY_REPORT',
      },
      OSD_REPORT: {
        key: 'OSD_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.OSD_REPORT',
      },
      ERCP_REPORT: {
        key: 'ERCP_REPORT',
        resourceKey: 'MIS.OPERATIONAL_REPORTS.ERCP_REPORT',
      },
    },
    PERFORMANCE_REPORTS: {
      key: 'PERFORMANCE_REPORTS',
      GPS_INACTIVITY_REPORT: {
        key: 'GPS_INACTIVITY_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.GPS_INACTIVITY_REPORT',
      },
      PROCESS_PERFORMANCE_REPORT: {
        key: 'PROCESS_PERFORMANCE_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.PROCESS_PERFORMANCE_REPORT',
      },
      VEHICLE_WISE_PERFORMANCE_REPORT: {
        key: 'VEHICLE_WISE_PERFORMANCE_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.VEHICLE_WISE_PERFORMANCE_REPORT',
      },
      JOB_COUNT_KM_RUN_REPORT: {
        key: 'JOB_COUNT_KM_RUN_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.JOB_COUNT_KM_RUN_REPORT',
      },
      OSD_PERFORMANCE_REPORT: {
        key: 'OSD_PERFORMANCE_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.OSD_PERFORMANCE_REPORT',
      },
      CLOSURE_PERFORMANCE_REPORT: {
        key: 'CLOSURE_PERFORMANCE_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.CLOSURE_PERFORMANCE_REPORT',
      },
      CALL_TAKER_PERFORMANCE_REPORT: {
        key: 'CALL_TAKER_PERFORMANCE_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.CALL_TAKER_PERFORMANCE_REPORT',
      },
      VEHICLE_MILEAGE_REPORT: {
        key: 'VEHICLE_MILEAGE_REPORT',
        resourceKey: 'MIS.PERFORMANCE_REPORTS.VEHICLE_MILEAGE_REPORT',
      },
    },
    BILLING_PENALTY_REPORTS: {
      key: 'BILLING_PENALTY_REPORTS',
      RESPONSE_TIME_REPORT: {
        key: 'RESPONSE_TIME_REPORT',
        resourceKey: 'MIS.BILLING_PENALTY_REPORTS.RESPONSE_TIME_REPORT',
      },
      DISPATCH_TIME_REPORT: {
        key: 'DISPATCH_TIME_REPORT',
        resourceKey: 'MIS.BILLING_PENALTY_REPORTS.DISPATCH_TIME_REPORT',
      },
      DAILY_OFFROAD_REPORT: {
        key: 'DAILY_OFFROAD_REPORT',
        resourceKey: 'MIS.BILLING_PENALTY_REPORTS.DAILY_OFFROAD_REPORT',
      },
      '2_5_DAYS_OFFROAD_REPORT': {
        key: '2_5_DAYS_OFFROAD_REPORT',
        resourceKey: 'MIS.BILLING_PENALTY_REPORTS.2_5_DAYS_OFFROAD_REPORT',
      },
      FEEDBACK_REPORT: {
        key: 'FEEDBACK_REPORT',
        resourceKey: 'MIS.BILLING_PENALTY_REPORTS.FEEDBACK_REPORT',
      },
      TRIP_PENALTY_REPORT: {
        key: 'TRIP_PENALTY_REPORT',
        resourceKey: 'MIS.BILLING_PENALTY_REPORTS.TRIP_PENALTY_REPORT',
      },
    },
    JOB_ST_CORRECTION_REPORT: {
      key: 'JOB_ST_CORRECTION_REPORT',
      resourceKey: 'MIS.JOB_ST_CORRECTION_REPORT',
    },
  },
};
