"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRegisterInput = void 0;
const validateRegisterInput = ({ username, email, password, confirmPassword }) => {
    const errors = {};
    if (username.trim() === '')
        errors.username = 'Username must not be empty';
    if (email.trim() === '') {
        errors.email = 'Email must not be empty';
    }
    else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx))
            errors.mail = 'Email must be a valid email address';
    }
    if (password === '') {
        errors.password = 'Password must not be empty';
    }
    else if (password !== confirmPassword)
        errors.confirmPassword = 'Passwords do not match';
    return {
        errors,
        valid: Object.keys(errors).length < 1
    };
};
exports.validateRegisterInput = validateRegisterInput;
