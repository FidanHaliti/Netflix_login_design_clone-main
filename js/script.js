const inputTouched = {
    email: false,
    password: false,
    name: false,
    card: false,
    expiration: false
};

const inputEmail = document.getElementById("inputEmail");
const inputName = document.getElementById("inputName");
const inputCard = document.getElementById("inputCard");
const inputPassword = document.getElementById("inputPassword");
const inputExpiration = document.getElementById("inputExpiration"); // Add this line
const inputWrapperEmail = document.getElementById("input-wrapper-email");
const inputWrapperName = document.getElementById("input-wrapper-name");
const inputWrapperPassword = document.getElementById("input-wrapper-password");
const warningEmail = document.getElementById("warningEmail");
const warningName = document.getElementById("warningName");
const warningCard = document.getElementById("warningCard");
const warningPassword = document.getElementById("warningPassword");

const inputOnBlur = (ev) => {
    if (inputTouched.email) {
        if (!validateEmail(inputEmail.value) && !validatePhone(inputEmail.value)) {
            warningEmail.style.display = "block";
            inputEmail.style.borderBottom = '2px solid #e87c03';
        } else {
            warningEmail.style.display = "none";
            inputEmail.style.borderBottom = "none";
        }
    }
    if (inputTouched.name) {
        if (!validateName(inputName.value) && !validatePhone(inputName.value)) {
            warningName.style.display = "block";
            inputName.style.borderBottom = '2px solid #e87c03';
        } else {
            warningName.style.display = "none";
            inputName.style.borderBottom = "none";
        }
    }
    if (inputTouched.card) { // Changed from 'creditCard' to 'card'
        if (!validateCard(inputCard.value) && !validatePhone(inputCard.value)) {
            warningCard.style.display = "block";
            inputCard.style.borderBottom = '2px solid #e87c03';
        } else {
            warningCard.style.display = "none";
            inputCard.style.borderBottom = "none";
        }
    }
    if (inputTouched.expiration) {
        if (!validateCard(inputExpiration.value) && !validatePhone(inputExpiration.value)) {
            warningCard.style.display = "block";
            inputExpiration.style.borderBottom = '2px solid #e87c03';
        } else {
            warningCard.style.display = "none";
            inputExpiration.style.borderBottom = "none";
        }
    }

    if (inputTouched.password) {
        if (!(inputPassword.value.length >= 4 && inputPassword.value.length <= 60)) {
            warningPassword.style.display = "block";
            inputPassword.style.borderBottom = '2px solid #e87c03';
        } else {
            warningPassword.style.display = "none";
            inputPassword.style.borderBottom = "none";
        }
    }
};

const inputOnFocus = (ev) => {
    inputTouched[ev.name] = true;
};

const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

const validateName = name => {
    const re = /^[a-zA-Z\-']+$/;
    return re.test(name);
};

const validateCard = number => {
    const sanitizedNumber = number.replace(/\D/g, ''); // Remove non-digit characters
    if (sanitizedNumber.length < 13 || sanitizedNumber.length > 19) {
        return false; // Credit card numbers typically range from 13 to 19 digits
    }

    let sum = 0;
    let double = false;
    for (let i = sanitizedNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(sanitizedNumber.charAt(i), 10);
        if (double) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }
        sum += digit;
        double = !double;
    }
    return sum % 10 === 0;
};

const validatePhone = email => {
    const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(String(email).toLowerCase());
};
