export function getInitialValuesForEquipmentStatus(values) {
    const _districtWiseDetail = [];

    if (values.length) {

        const total = {
            districtName: 'Grand Total',
            totalAmbulance: 0,
            onRoad: 0,
            offRoad: 0,
            totalEquipment: 0,
            workingEquipment: 0,
            notWorkingEquipment: 0,
            vehicles: [],
        };

        let currentDistrict = '';

        values.map((vehicle) => {
                total.totalAmbulance += vehicle.vehicleRegistrationNumber ? 1 : 0;
                total.onRoad += vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'ON_ROAD' ? 1 : 0;
                total.offRoad += vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'OFF_ROAD' ? 1 : 0;
                total.totalEquipment += vehicle.totalEquipment;
                total.workingEquipment += vehicle.workingEquipment;
                total.notWorkingEquipment += vehicle.notWorkingEquipment;

                vehicle.onRoad = vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'ON_ROAD' ? 1 : 0;
                vehicle.offRoad = vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'OFF_ROAD' ? 1 : 0;

                if (vehicle.districtName === currentDistrict) {
                    const tempDistrict = _districtWiseDetail[_districtWiseDetail.length - 1];

                    tempDistrict.vehicles.push(vehicle);
                    tempDistrict.totalAmbulance += vehicle.vehicleRegistrationNumber ? 1 : 0;
                    tempDistrict.onRoad += vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'ON_ROAD' ? 1 : 0;
                    tempDistrict.offRoad += vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'OFF_ROAD' ? 1 : 0;
                    tempDistrict.totalEquipment += vehicle.totalEquipment;
                    tempDistrict.workingEquipment += vehicle.workingEquipment;
                    tempDistrict.notWorkingEquipment += vehicle.notWorkingEquipment;
                    _districtWiseDetail[_districtWiseDetail.length - 1] = tempDistrict;
                } else {
                    currentDistrict = vehicle.districtName;
                    const district = {
                        districtName: vehicle.districtName,
                        totalAmbulance: vehicle.vehicleRegistrationNumber ? 1 : 0,
                        onRoad: vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'ON_ROAD' ? 1 : 0,
                        offRoad: vehicle.vehicleStatus && vehicle.vehicleStatus.id === 'OFF_ROAD' ? 1 : 0,
                        totalEquipment: vehicle.totalEquipment,
                        workingEquipment: vehicle.workingEquipment,
                        notWorkingEquipment: vehicle.notWorkingEquipment,
                        vehicles: vehicle.vehicleRegistrationNumber ? [vehicle] : [],
                    };
                    _districtWiseDetail.push(district);
                }

            return null;

        });

        _districtWiseDetail.push(total);
    }

    return _districtWiseDetail;
}

export default {
    getInitialValuesForEquipmentStatus,
};
