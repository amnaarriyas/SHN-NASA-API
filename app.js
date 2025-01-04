const API_KEY = 'gqVSIPrJrE6fLCChGWjROzApwd68PhRKPD0LCnz9'; // Replace with your actual API key

document.getElementById('dob-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const dob = document.getElementById('dob').value;
  if (dob) {
    setLoading(true);
    fetchAPOD(dob);
  } else {
    displayMessage("Please enter a valid date!");
  }
});

document.getElementById('clear-button').addEventListener('click', function() {
  document.getElementById('dob').value = '';
  document.getElementById('result').innerHTML = '<p>No data yet. Enter a date to get started!</p>';
});

function setLoading(isLoading) {
  const resultDiv = document.getElementById('result');
  if (isLoading) {
    resultDiv.innerHTML = '<p>Loading...</p>';
  }
}

function fetchAPOD(date) {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      setLoading(false);
      displayAPOD(data);
    })
    .catch(error => {
      setLoading(false);
      displayMessage("An error occurred while fetching APOD data.");
      console.error("Error fetching APOD data:", error);
    });
}

function displayAPOD(data) {
  if (data.media_type === "image") {
    document.getElementById('result').innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.url}" alt="${data.title}">
      <p>${data.explanation}</p>
    `;
  } else {
    document.getElementById('result').innerHTML = `
      <h2>${data.title}</h2>
      <a href="${data.url}" target="_blank">Watch the video</a>
      <p>${data.explanation}</p>
    `;
  }
}

function displayMessage(message) {
  document.getElementById('result').innerHTML = `<p>${message}</p>`;
}
