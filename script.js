document.getElementById('guessForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get the guessed number
    let guessedNumber = parseInt(document.getElementById('guessNumber').value);
    
    // Define the correct number (you can change this number to any other)
    let correctNumber = 337548;
    
    // Check if the guessed number is correct
    if (guessedNumber === correctNumber) {
        showNotification('Certificado de ALUMNO EGRESADO emitido con validez.', 'success');
        downloadFile('Certificado_Titulo_16092025.pdf')
    } else {
        showNotification('Certificado no válido. Por favor intentar nuevamente.', 'error');
    }
    
    // Clear the input field
    document.getElementById('guessNumber').value = '';
});

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
