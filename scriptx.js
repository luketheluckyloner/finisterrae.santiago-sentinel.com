document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the guessed number and RUT number
    let guessedNumber = parseInt(document.getElementById('guessNumber').value);
    let rutNumber = document.getElementById('rutNumber').value.trim();
    
    // Define the correct number (you can change this number to any other)
    let correctNumber = 4815162342;
    
    // Check if the RUT number is valid
    if (!validateRUT(rutNumber)) {
        showNotification('RUT no válido. Por favor intentar nuevamente.', 'error');
        return;
    }
    
    // Check if the guessed number is correct
    if (guessedNumber === correctNumber) {
        showNotification('Certificado de ALUMNO EGRESADO emitido con validez.', 'success');
        downloadFile('cert.pdf');
    } else {
        showNotification('Certificado no válido. Por favor intentar nuevamente.', 'error');
    }
    
    // Clear the input fields
    document.getElementById('guessNumber').value = '';
    document.getElementById('rutNumber').value = '';
});

function validateRUT(rut) {
    // Remove dots and dashes
    rut = rut.replace(/\./g, '').replace(/-/g, '');

    // Split the number and the verification digit
    let rutBody = rut.slice(0, -1);
    let dv = rut.slice(-1).toUpperCase();

    // Calculate the verification digit
    let sum = 0;
    let multiplier = 2;

    for (let i = rutBody.length - 1; i >= 0; i--) {
        sum += parseInt(rutBody[i]) * multiplier;
        multiplier = (multiplier == 7) ? 2 : multiplier + 1;
    }

    let expectedDV = 11 - (sum % 11);
    if (expectedDV == 11) expectedDV = '0';
    if (expectedDV == 10) expectedDV = 'K';

    // Return true if the calculated DV matches the provided DV
    return expectedDV == dv;
}

function showNotification(message, type) {
    let successNotification = document.getElementById('successNotification');
    let errorNotification = document.getElementById('errorNotification');

    if (type === 'success') {
        successNotification.textContent = message;
        successNotification.style.display = 'block'; // Show success notification
        errorNotification.style.display = 'none'; // Hide error notification
    } else if (type === 'error') {
        errorNotification.textContent = message;
        errorNotification.style.display = 'block'; // Show error notification
        successNotification.style.display = 'none'; // Hide success notification
    }

    // Hide the notification after 3 seconds
    setTimeout(function() {
        successNotification.style.display = 'none';
        errorNotification.style.display = 'none';
    }, 3000); // 3000 milliseconds = 3 seconds
}

function downloadFile(fileName) {
    // Create a new anchor element
    const link = document.createElement('a');
    link.href = fileName; // Set the href to the file name
    link.download = fileName; // Set the download attribute to the file name
    document.body.appendChild(link); // Append the link to the body
    link.click(); // Programmatically click the link to trigger the download
    document.body.removeChild(link); // Remove the link from the body
}

document.getElementById('rutNumber').addEventListener('input', function(event) {
    this.value = formatRUT(this.value);
});

function formatRUT(rut) {
    // Remove all non-numeric characters except for 'k' or 'K'
    rut = rut.replace(/[^\dkK]/g, '');

    // Add dots and dash for formatting
    let formattedRUT = '';
    let body = rut.slice(0, -1);
    let dv = rut.slice(-1);

    while (body.length > 3) {
        formattedRUT = '.' + body.slice(-3) + formattedRUT;
        body = body.slice(0, -3);
    }
    formattedRUT = body + formattedRUT + '-' + dv;

    return formattedRUT.toUpperCase();
}
