import CLEAR from '../assets/images/clear.svg';
import CLOUDS from '../assets/images/clouds.svg';
import MIST from '../assets/images/mist.svg';
import RAIN from '../assets/images/rain.svg';
import SNOW from '../assets/images/snow.svg';
import THUNDERSTORM from '../assets/images/thunderstorm.svg';

const apiKey = 'f53b18e8611267b98faa272a1039e762';

const searchButtonElement = document.getElementById('button-search');
const weatherBoxElement = document.getElementById('weather-box');
const locationInputElement = document.getElementById('input-location');
const weatherImgElement = document.getElementById('weather-img');
const temperatureElement = document.getElementById('temperature-number');
const descriptionElement = document.getElementById('description');
const humidityElement = document.getElementById('humidity');
const windSpeedElement = document.getElementById('wind');
const precipitationElement = document.getElementById('precipitation');
const maxTemperatureElement = document.getElementById('max-temperature');
const minTemperatureElement = document.getElementById('min-temperature');
const errorElement = document.getElementById('error')

const weatherImages = {
	Clear: CLEAR,
	Clouds: CLOUDS,
	Drizzle: RAIN,
	Mist: MIST,
	Rain: RAIN,
	Snow: SNOW,
    Thunderstorm: THUNDERSTORM,
	Haze: MIST
};

const getWeatherData = () => {
	const location = locationInputElement.value;
	fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric&lang=es`
	)
		.then(response => response.json())
		.then(data => {
			console.log(data);
            errorElement.classList.add('hidden');
            weatherBoxElement.classList.remove('hidden');

			const weatherMain = data.weather[0].main;
			const weatherImageSrc = weatherImages[weatherMain];
			weatherImgElement.src = weatherImageSrc || 'assets/images/clouds.png';

			temperatureElement.textContent = Math.ceil(data.main.temp);
			descriptionElement.textContent = data.weather[0].description;
			humidityElement.textContent = `${data.main.humidity}%`;
			windSpeedElement.textContent = `${data.wind.speed} Km/h`;
            maxTemperatureElement.textContent = `${Math.ceil(data.main.temp_max)}°C`
            minTemperatureElement.textContent = `${Math.ceil(data.main.temp_min)}°C`
            if (data.rain && data.rain['1h']) {
                const precipitation = data.rain['1h']; 
                precipitationElement.textContent = `${precipitation} mm`;
            } else {
                precipitationElement.textContent = '0mm';
            }

		})
		.catch(error => {
			console.error('Error fetching weather data:', error);
            errorElement.classList.remove('hidden');
            weatherBoxElement.classList.add('hidden');
		});
};

searchButtonElement.addEventListener('click', getWeatherData);
