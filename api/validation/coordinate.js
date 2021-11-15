const Validator = require("validator");
const ifEmpty = require("./checkForEmpty");

function checkCoords(data)
{
    let errors = {};
    if (ifEmpty(data.latitude) || data.latitude > 90 || data.latitude < -90) {
        errors.latitude = "Invalid latitude";
    }
    if (ifEmpty(data.longitude) || data.longitude < -180 || data.longitude > 180) {
        errors.longitude = "Invalid longitude";
    }

    return {
        errors,
        isValid: ifEmpty(errors)
    };
}

module.exports = {checkCoords};