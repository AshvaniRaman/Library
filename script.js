const encryptionForm = document.getElementById('encryption-form');
  const decryptionForm = document.getElementById('decryption-form');
  const copyEncryptedButton = document.getElementById('copy-encrypted');
  const copyDecryptedButton = document.getElementById('copy-decrypted');
  const shareWhatsappButton = document.getElementById('share-whatsapp');

  encryptionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const text = document.getElementById('text').value;
    const key = document.getElementById('encryptionKey').value;

    const response = await fetch('/api/encrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, key }),
    });

    const data = await response.json();
    document.getElementById('encrypted-text').textContent = data.encryptedText;
  });

  decryptionForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const encryptedText = document.getElementById('encryptedText').value;
    const key = document.getElementById('decryptionKey').value;

    const response = await fetch('/api/decrypt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ encryptedText, key }),
    });

    const data = await response.json();
    document.getElementById('decrypted-text').textContent = data.decryptedText;
  });

  copyEncryptedButton.addEventListener('click', () => {
    const encryptedText = document.getElementById('encrypted-text').textContent;
    copyToClipboard(encryptedText);
  });

  copyDecryptedButton.addEventListener('click', () => {
    const decryptedText = document.getElementById('decrypted-text').textContent;
    copyToClipboard(decryptedText);
  });

  shareWhatsappButton.addEventListener('click', () => {
    const encryptedText = document.getElementById('encrypted-text').textContent;
    shareOnWhatsapp(encryptedText);
  });

  // Function to copy text to clipboard
  function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
  }

  // Function to share on WhatsApp
  function shareOnWhatsapp(text) {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
