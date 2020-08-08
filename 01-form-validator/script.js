const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const usernameRegex = /^[a-zA-Z0-9]+$/;

form.addEventListener('submit', (e) => {
    e.preventDefault(); // prevent actual submit, take control with custom js below
    checkRequired([username, email, password, password2]);
    checkLength(username, 3, 16);
    checkLength(password, 6, 32);
    checkRegex(email, emailRegex);
    checkRegex(username, usernameRegex);
    checkPasswordsMatch(password, password2);
});

function showError(input, errorMessage) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = errorMessage;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function checkRegex(input, regex) {
    if (!regex.test(String(input.value.trim()).toLowerCase())) {
        showError(input, `${getFieldName(input)} is not valid`);
    } else {
        showSuccess(input);
    }
}

function checkRequired(inputArray) {
    inputArray.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is a required field!`)
        } else {
            showSuccess(input);
        }
    });
}

function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.substring(1);
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if (input.value.length > max) {
        showError(input, `${getFieldName(input)} must be at most ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    } else {
        showSuccess(input1);
        showSuccess(input2);
    }
}