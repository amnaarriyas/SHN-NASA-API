const API_KEY = 'gqVSIPrJrE6fLCChGWjROzApwd68PhRKPD0LCnz9';

document.getElementById('dob-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const dob = document.getElementById('dob').value;
  if (dob) {
    fetchAPOD(dob);
  } else {
    document.getElementById('result').innerText = "Please enter a valid date!";
  }
});

function fetchAPOD(date) {
  const url = `https://api.nasa.gov/planetary/apod?date=${date}&api_key=${API_KEY}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayAPOD(data);
    })
    .catch(error => {
      document.getElementById('result').innerText = "An error occurred while fetching data.";
      console.error("Error fetching APOD data:", error);
    });
}

function displayAPOD(data) {
  if (data.media_type === "image") {
    document.getElementById('result').innerHTML = `
      <h2>${data.title}</h2>
      <img src="${data.url}" alt="${data.title}" style="max-width: 100%; border-radius: 30px; margin-top: 20px;">
      <p style=margin-bottom: 20px;">${data.explanation}</p>
    `;
  } else {
    document.getElementById('result').innerHTML = `
      <h2>${data.title}</h2>
      <p>date not available</p>
      <p>${data.explanation}</p>
    `;
  }
}
