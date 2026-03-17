function encodeMessage() {
    const fileInput = document.getElementById("imageInput");
    const message = document.getElementById("secretMessage").value;

    if (!fileInput.files[0]) {
        alert("Please upload an image");
        return;
    }

    if (!message) {
        alert("Please enter a message");
        return;
    }

    const img = new Image();
    img.src = URL.createObjectURL(fileInput.files[0]);

    img.onload = function () {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");

        canvas.width = img.width;
        canvas.height = img.height;

        ctx.drawImage(img, 0, 0);

        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        let data = imageData.data;

        // Add signature + end marker
        const fullMessage = "STEGO|" + message + "|END|";

        // Safety check: message too large
        if (fullMessage.length * 4 > data.length) {
            alert("Message too long for this image");
            return;
        }

        // Encode message into red channel
        for (let i = 0; i < fullMessage.length; i++) {
            data[i * 4] = fullMessage.charCodeAt(i);
        }

        ctx.putImageData(imageData, 0, 0);

        // Enable download
        const link = document.getElementById("downloadLink");
        link.href = canvas.toDataURL();
        link.download = "encoded.png";
        link.style.display = "block";
        link.innerText = "Download Encoded Image";
    };
}


function decodeMessage() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Safety check: no image loaded
    if (!canvas.width || !canvas.height) {
        alert("Please upload and encode an image first");
        return;
    }

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    let decoded = "";
    let found = false;

    // Extract characters from red channel
    for (let i = 0; i < data.length; i += 4) {
        let char = String.fromCharCode(data[i]);
        decoded += char;

        if (decoded.includes("|END|")) {
            decoded = decoded.replace("|END|", "");
            found = true;
            break;
        }
    }

    const output = document.getElementById("decodedMessage");

    // Validate signature
    if (found && decoded.startsWith("STEGO|")) {
        decoded = decoded.slice(6); // remove "STEGO|"

        output.innerText = decoded;
        output.style.color = "#22c55e"; // green
    } else {
        output.innerText = "No hidden message found";
        output.style.color = "#ef4444"; // red
    }
}