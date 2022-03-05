const checkEmail = email => {
    let hasPeriod = false, hasAt = false; // Simple email validation, only checks if email has both '@' and '.'

    for (let i = 0; i < email.length; i++) {
        if (email[i] === ".") {
            hasPeriod = true;
        } else if (email[i] === "@") {
            hasAt = true;
        }
    }

    if (hasPeriod && hasAt) {
        console.log(" || Accepted");
        return true;
    }

    if (!hasAt) {
        console.log(" || Invalid email, no '@' detected");
    } else if (!hasPeriod) {
        console.log(" || Invalid email, no '.' detected");
    }
    
    return false;
}

const validate = (inputToValidate, inputType = 'input') => { // For most cases, simply validates that there is input
    if (inputType === 'email') {
        return checkEmail(inputToValidate); // For emails only, run extra validation to ensure valid email
    } else if (inputToValidate) {
        return true;
    } else {
        console.log("This field is required! Please try again.");
        return false;
    }
}

module.exports = validate;