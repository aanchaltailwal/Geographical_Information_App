// script.js
const getWeatherData = async (city) => {
  const url = `https://foreca-weather.p.rapidapi.com/location/search/${city}?lang=en`;

  const options = {
      method: 'GET',
      headers: {
          'X-RapidAPI-Key': 'a0efe5bfadmsh56d28667673e9e3p16d39cjsnac7ecc6cccee',
          'X-RapidAPI-Host': 'foreca-weather.p.rapidapi.com'
      }
  };

  try {
      const response = await fetch(url, options);

      console.log('Response status:', response.status); // Log the response status

      if (!response.ok) {
          throw new Error('Network response was not OK');
      }

      const data = await response.json();
      console.log('API Response:', data); // Log the entire API response

      // Check if the locations array exists and has at least one element
      if (data.locations && data.locations.length > 0) {
          const location = data.locations[0]; // Assuming the first element contains the data

          const elements = {
              id: 'id',
              name: 'name',
              country: 'country',
              timezone: 'timezone',
              //language: 'language',
              adminArea: 'adminArea',
              adminArea2: 'adminArea2',
              adminArea3: 'adminArea3',
              lon: 'lon',
              lat: 'lat',
          };

          // Set the city name in the heading
          const cityNameElement = document.getElementById('cityname');
          if (cityNameElement) {
              cityNameElement.textContent = city;
          }

          for (const key in elements) {
              const element = document.getElementById(elements[key]);
              if (element) {
                  element.innerHTML = location[key] || ''; // Set the value or an empty string if it's undefined
                  console.log(`${key.charAt(0).toUpperCase() + key.slice(1)}:`, location[key]);
              } else {
                  console.error(`Element with ID "${elements[key]}" not found.`);
              }
          }
      } else {
          console.error('No location data found in the API response.');
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
};

// Function to handle form submission
const handleSubmit = (event) => {
  event.preventDefault(); // Prevent the default form submission

  const cityInput = document.getElementById('city');
  const city = cityInput.value.trim();

  if (city !== '') {
      getWeatherData(city);
  } else {
      console.error('Please enter a valid city name.');
  }
};

// Add event listener to the form submit button
const submitButton = document.getElementById('submit');
submitButton.addEventListener('click', handleSubmit);

// Show weather data for Delhi by default
document.addEventListener('DOMContentLoaded', () => {
  const defaultCity = 'mumbai';
  const cityInput = document.getElementById('city');
  cityInput.value = defaultCity; // Set the default value for the city input field
  getWeatherData(defaultCity);
});


