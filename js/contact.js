const fullName = document.querySelector("#fullname");
const address = document.querySelector("#address");
const email = document.querySelector("#email");
const subject = document.querySelector("#subject");
const button = document.querySelector("button");
const message = document.querySelector(".form--message");
let errorArray = [];


function checkLength(name, len) {
    if (name.value.trim().length > len) {
        return true;
    } else {
        errorArray.push(`${name.placeholder} needs to be at least ${len + 1} letters`);
        return false;
    }
};

function checkEmail(address) {
    const regEx = /\S+@\S+\.\S+/;
    const match = regEx.test(address.value);
    if (match) {
        return match;
    } else {
        errorArray.push(`Email address is invalid`)
        return match;
    }
};

function validateForm() {
    message.innerHTML = ``;
    const validName = checkLength(fullName, 0);
    const validAddress = checkLength(address, 24);
    const validSubject = checkLength(subject, 9);
    const validEmail = checkEmail(email);

    if ((validName) && (validAddress) && (validSubject) && (validEmail)) {
        message.classList.add("form--message__success");
        message.innerHTML = `Form validation successful`;
    } else {
        message.classList.add("form--message__error");
        for (i = 0; i < errorArray.length; i++) {
            message.innerHTML += `<p>${errorArray[i]}</p>`
        }
    }
};

button.addEventListener("click", function (event) {
    event.preventDefault();
    validateForm();
});

