// script.js
document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById("password");
    const phoneNumberInput = document.getElementById("phonenumber");
    const submitButton = document.querySelector("input[type=submit]");

    passwordInput.addEventListener("input", function() {
        const passwordValue = passwordInput.value;
        const strengthText = document.getElementById("password-strength");

        if (passwordValue.length < 8 || !/\d/.test(passwordValue) || !/[a-zA-Z]/.test(passwordValue)) {
            strengthText.textContent = "Password is weak";
            strengthText.style.color = "red";
        } else {
            strengthText.textContent = "Password is strong";
            strengthText.style.color = "green";
        }
    });

    phoneNumberInput.addEventListener("input", function() {
        const phoneNumberValue = phoneNumberInput.value;
        if (phoneNumberValue.length < 10 || phoneNumberValue.length > 15) {
            submitButton.disabled = true;
        } else {
            submitButton.disabled = false;
        }
    });
});
