// Get references to DOM elements
const urlShortenForm = document.getElementById('url-shorten-form');
const urlInput = document.getElementById('url-input');
const shortenedUrlContainer = document.getElementById('shortened-url-container');
const shortenedUrl = document.getElementById('shortened-url');
const copyBtn = document.getElementById('copy-btn');

// Event listener for form submission
urlShortenForm.addEventListener('submit', (event) => {
	event.preventDefault(); // Prevent form submission
	const url = urlInput.value.trim(); // Get input value and trim whitespace
	if (!url) return; // Do nothing if input is empty
	// Make AJAX request to server to shorten URL
	const xhr = new XMLHttpRequest();
	xhr.open('POST', '/shorten', true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onreadystatechange = () => {
		if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
			// Display shortened URL to user
			const response = JSON.parse(xhr.responseText);
			shortenedUrl.value = window.location.origin + '/' + response.shortUrl;
			shortenedUrlContainer.classList.remove('hidden');
		}
	};
	xhr.send(JSON.stringify({ url }));
});

// Event listener for copy button click
copyBtn.addEventListener('click', () => {
	shortenedUrl.select();
	document.execCommand('copy');
	alert('Copied to clipboard!');
});
