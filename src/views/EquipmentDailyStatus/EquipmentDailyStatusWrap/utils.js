export function getInitialValuesForEquipmentDailyStatus(values, vehicleRegistrationNumber) {
  let equipmentName = '';
  let header = [vehicleRegistrationNumber ? vehicleRegistrationNumber : 'NA'];
  let equipmentDetails = [];

  values.forEach(equipment => {

      if (equipment.equipmentName === equipmentName) {
          const tempEquipment = equipmentDetails[equipmentDetails.length - 1];
          tempEquipment.push(equipment.status);
          equipmentDetails[equipmentDetails.length - 1] = tempEquipment;
      } else {
          equipmentName = equipment.equipmentName;
          const newEquipment = [equipment.equipmentName, equipment.status];
          equipmentDetails.push(newEquipment);
      }

      if(equipmentDetails.length === 1) {
          header.push(equipment.date);
      }

  });
  
  return {listBodyData: equipmentDetails, listHeaderData: header};
};


export default {
  getInitialValuesForEquipmentDailyStatus,
};
