function generateQRCode() {
    const uuid = crypto.randomUUID();
    qrcode.toCanvas(document.getElementById('qrcodeCanvas'), uuid, function (error) {
      if (error) console.error(error);
      console.log('QR code auto-generated:', uuid);
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
  window.onload = generateQRCode;
  
