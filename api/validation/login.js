const Validator = require("validator");
const ifEmpty = require("./checkForEmpty");

function checkLoginFields(data){
    // data: email, password

    let errors = {};

    data.email = !ifEmpty(data.email) ? data.email : "";
    data.password = !ifEmpty(data.password) ? data.password : "";

    if (!Validator.isEmail(data.email)) {
        errors.email = "Invalid email";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email is required";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Password is required";
    }

    return {
        errors,
        isValid: ifEmpty(errors)
    };
};

module.exports = {
    checkLoginFields
}