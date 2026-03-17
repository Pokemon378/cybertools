function checkStrength() {
    const password = document.getElementById("passwordInput").value;
    const resultElement = document.getElementById("strengthResult");

    // Reset
    resultElement.className = "";

    // ❌ Empty input
    if (!password) {
        resultElement.innerText = "Please enter a password";
        resultElement.className = "warning";
        return;
    }

    let score = 0;
    let feedback = [];

    // Length check
    if (password.length >= 8) {
        score++;
    } else {
        feedback.push("Use at least 8 characters");
    }

    // Uppercase
    if (/[A-Z]/.test(password)) {
        score++;
    } else {
        feedback.push("Add uppercase letters");
    }

    // Lowercase
    if (/[a-z]/.test(password)) {
        score++;
    } else {
        feedback.push("Add lowercase letters");
    }

    // Numbers
    if (/[0-9]/.test(password)) {
        score++;
    } else {
        feedback.push("Include numbers");
    }

    // Symbols
    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score++;
    } else {
        feedback.push("Add special characters");
    }

    // 🎯 Strength decision
    let strengthText = "";
    let className = "";

    if (score <= 2) {
        strengthText = "Weak";
        className = "danger";
    } else if (score === 3 || score === 4) {
        strengthText = "Medium";
        className = "warning";
    } else {
        strengthText = "Strong";
        className = "safe";
    }

    // 🧾 Final output
    let output = strengthText;

    if (feedback.length > 0) {
        output += "\nSuggestions:\n" + feedback.join("\n");
    }

    resultElement.innerText = output;
    resultElement.className = className;
}