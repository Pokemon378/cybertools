function checkURL() {
    const urlInput = document.getElementById("urlInput").value.trim();
    const resultElement = document.getElementById("urlResult");

    // Reset
    resultElement.className = "";

    // ❌ Empty input check
    if (!urlInput) {
        resultElement.innerText = "Please enter a URL";
        resultElement.className = "warning";
        return;
    }

    let warnings = [];
    let danger = false;

    // Normalize URL (add https if missing for parsing)
    let url = urlInput;
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
    }

    let parsed;

    // ❌ Invalid URL check
    try {
        parsed = new URL(url);
    } catch (e) {
        resultElement.innerText = "Invalid URL format";
        resultElement.className = "danger";
        return;
    }

    const hostname = parsed.hostname;

    // 🚨 Check 1: HTTP
    if (parsed.protocol === "http:") {
        warnings.push("Uses HTTP (not secure)");
        danger = true;
    }

    // 🚨 Check 2: IP address
    const ipPattern = /^\d+\.\d+\.\d+\.\d+$/;
    if (ipPattern.test(hostname)) {
        warnings.push("Uses IP address instead of domain");
        danger = true;
    }

    // ⚠️ Check 3: Long URL
    if (urlInput.length > 75) {
        warnings.push("URL is very long");
    }

    // 🚨 Check 4: Suspicious keywords
    const keywords = ["login", "verify", "bank", "secure", "account"];
    for (let word of keywords) {
        if (urlInput.toLowerCase().includes(word)) {
            warnings.push(`Contains suspicious word: ${word}`);
            danger = true;
        }
    }

    // ⚠️ Check 5: Too many dots (subdomains trick)
    if ((hostname.match(/\./g) || []).length > 3) {
        warnings.push("Too many subdomains");
    }

    // 🎯 Final result
    let resultText = "";
    let className = "";

    if (warnings.length === 0) {
        resultText = "Safe";
        className = "safe";
    } else {
        resultText = "Warnings:\n" + warnings.join("\n");
        className = danger ? "danger" : "warning";
    }

    resultElement.innerText = resultText;
    resultElement.className = className;
}