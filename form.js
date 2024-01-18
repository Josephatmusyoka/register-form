document.addEventListener("DOMContentLoaded", function() {
    var password = document.getElementById("password");
    var confirmPassword = document.getElementById("confirm_password");
    var phoneNumber = document.getElementById("phone");
    var passwordStrengthText = document.getElementById("password-strength");

    // Password strength validation
    password.addEventListener("input", function() {
        var strength = checkPasswordStrength(password.value);
        passwordStrengthText.innerHTML = "Strength: " + strength;
    });

    // Check if passwords match
    confirmPassword.addEventListener("input", function() {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity("Passwords do not match!");
        } else {
            confirmPassword.setCustomValidity("");
        }
    });

    // Phone number length check
    phoneNumber.addEventListener("input", function() {
        if (phoneNumber.value.length < 10 || phoneNumber.value.length > 15) {
            phoneNumber.setCustomValidity("Phone number must be between 10 and 15 characters.");
        } else {
            phoneNumber.setCustomValidity("");
        }
    });
});

function checkPasswordStrength(password) {
    var strength = 0;
    if (password.length >= 8) {
        strength += 1;
    }
    if (password.match(/[a-z]+/)) {
        strength += 1;
    }
    if (password.match(/[A-Z]+/)) {
        strength += 1;
    }
    if (password.match(/[0-9]+/)) {
        strength += 1;
    }
    if (password.match(/[\W]+/)) {
        strength += 1;
    }

    switch (strength) {
        case 1:
            return "Very Weak";
        case 2:
            return "Weak";
        case 3:
            return "Medium";
        case 4:
            return "Strong";
        case 5:
            return "Very Strong";
        default:
            return "Very Weak";
    }
}
