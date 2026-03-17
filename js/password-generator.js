function generatePassword() {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()";

    const allChars = lower + upper + numbers + symbols;

    const length = 16; // 🔒 Fixed length 

    let password = [];

    // Ensure at least one of each type
    password.push(lower[Math.floor(Math.random() * lower.length)]);
    password.push(upper[Math.floor(Math.random() * upper.length)]);
    password.push(numbers[Math.floor(Math.random() * numbers.length)]);
    password.push(symbols[Math.floor(Math.random() * symbols.length)]);

    // Fill remaining
    for (let i = 4; i < length; i++) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle
    password = password.sort(() => Math.random() - 0.5);

    document.getElementById("generatedPassword").value = password.join("");
}