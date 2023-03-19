"use stict"

const weatherBlock = document.querySelector('#weather');

async function loadweather(e) {
    weatherBlock.innerHTML = `
    <div class="weather__loading">
    <img src="img/loading.gif" alt="Loading..."
    </div>`;

    const server = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=Kyiv&appid=bc62b99193c873607d21a7d9b3e1be3c';
    const response = await fetch(server, {
        method: 'GET',
    });
    const responseResult = await response.json();

    if (response.ok) {
        getWeather(responseResult);
    } else {
        weatherBlock.innerHTML = responseResult.message;
    }
}

function getWeather(data) {
    console.log(data);

    const location = data.name;
    const temp = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const weatherStatus = data.weather[0].main;
    const weatherIcon = data.weather[0].icon;

    const template = `
    <div id="weather__header">
        <div class="weather__main">
            <div class="weather__city">${location}</div>
            <div class="weather__status">${weatherStatus}</div>
        </div>
        <div class="weather__icon">
            <img src="http://openweathermap.org/img/w/${weatherIcon}.png" alt="${weatherIcon}">
        </div>
    </div>
    <div class="weather__temp">${temp}</div>
    <div class="weather__feels-like">Feels like: ${feelsLike}</div>`;

    weatherBlock.innerHTML = template;
}

if (weatherBlock) {
    loadweather();
}