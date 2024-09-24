// Auto-generate QR code based on random UUID (simulating student info)
function generateQRCode() {
    // Generate a unique identifier (UUID) for each QR code
    const uuid = crypto.randomUUID();
    
    // Display QR code in the canvas
    qrcode.toCanvas(document.getElementById('qrcodeCanvas'), uuid, function (error) {
      if (error) console.error(error);
      console.log('QR code auto-generated:', uuid);
      
      // Send auto-generated QR code data to backend for storage
      fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ qr_code_data: uuid })
      }).then(response => {
        if (response.ok) {
          alert('Student enrollment with QR code data saved successfully!');
        } else {
          alert('Error saving enrollment data.');
        }
      });
    });
  }
  
  // Automatically generate QR code when page loads
  window.onload = generateQRCode;
  