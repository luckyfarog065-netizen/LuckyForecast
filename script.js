const apiKey = "baa020ac2059339fb778de6420e44c0a";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weatherDescription");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const feelsLike = document.getElementById("feelsLike");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
function getWeatherIcon(weatherMain){

    switch(weatherMain){

        case "Clear":
            return "☀️";

        case "Clouds":
            return "☁️";

        case "Rain":
            return "🌧️";

        case "Thunderstorm":
            return "⛈️";

        case "Snow":
            return "❄️";

        case "Drizzle":
            return "🌦️";

        case "Mist":
        case "Fog":
        case "Haze":
            return "🌫️";

        default:
            return "🌤️";

    }

}
function changeBackground(weatherMain, isNight){

    const body = document.body;

    if(isNight){

        switch(weatherMain){

            case "Clear":
                body.style.background =
                "linear-gradient(135deg,#141E30,#243B55)";
                break;

            case "Clouds":
                body.style.background =
                "linear-gradient(135deg,#0f2027,#203a43,#2c5364)";
                break;

            case "Rain":
                body.style.background =
                "linear-gradient(135deg,#0F2027,#203A43,#2C5364)";
                break;

            default:
                body.style.background =
                "linear-gradient(135deg,#141E30,#243B55)";
        }

    }

    else{

        switch(weatherMain){

            case "Clear":
                body.style.background =
                "linear-gradient(135deg,#f6d365,#fda085)";
                break;

            case "Clouds":
                body.style.background =
                "linear-gradient(135deg,#757f9a,#d7dde8)";
                break;

            case "Rain":
                body.style.background =
                "linear-gradient(135deg,#4b79a1,#283e51)";
                break;

            case "Thunderstorm":
                body.style.background =
                "linear-gradient(135deg,#232526,#414345)";
                break;

            case "Snow":
                body.style.background =
                "linear-gradient(135deg,#e6dada,#274046)";
                break;

            default:
                body.style.background =
                "linear-gradient(135deg,#4facfe,#00f2fe)";
        }

    }

}
function isNightTime(data){

    const currentTime = data.dt;

    const sunrise = data.sys.sunrise;

    const sunset = data.sys.sunset;

    return currentTime < sunrise || currentTime > sunset;

}

async function getWeather(city) {

    try {
        cityName.innerHTML = "🔍 Searching...";
temperature.innerHTML = "...";
weatherDescription.innerHTML = "Loading weather data...";
humidity.innerHTML = "💧 Humidity: ...";
windSpeed.innerHTML = "💨 Wind: ...";
feelsLike.innerHTML = "🌡 Feels Like: ...";

        const url =
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        const response = await fetch(url);

        const data = await response.json();
        const nightMode = isNightTime(data);

changeBackground(
    data.weather[0].main,
    nightMode
);

        if (data.cod !== 200) {
            throw new Error("City not found");
        }

        cityName.innerHTML = `📍 ${data.name}`;

        temperature.innerHTML =
        `${Math.round(data.main.temp)}°C`;

        const icon =
getWeatherIcon(data.weather[0].main);

weatherDescription.innerHTML =
`${icon} ` +
data.weather[0].description
.split(" ")
.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
)
.join(" ");

        humidity.innerHTML =
        `💧 Humidity: ${data.main.humidity}%`;

        windSpeed.innerHTML =
        `💨 Wind: ${data.wind.speed} m/s`;

        feelsLike.innerHTML =
        `🌡 Feels Like: ${Math.round(data.main.feels_like)}°C`;
        const sunriseTime =
new Date(data.sys.sunrise * 1000)
.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

const sunsetTime =
new Date(data.sys.sunset * 1000)
.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

sunrise.innerHTML =
`🌅 Sunrise: ${sunriseTime}`;

sunset.innerHTML =
`🌇 Sunset: ${sunsetTime}`;

    }

    catch (error) {

        cityName.innerHTML = "❌ City Not Found";

        temperature.innerHTML = "--°C";

        weatherDescription.innerHTML =
        "Please enter a valid city name";

        humidity.innerHTML =
        "💧 Humidity: --";

        windSpeed.innerHTML =
        "💨 Wind: --";

        feelsLike.innerHTML =
        "🌡 Feels Like: --";

    }

}

function getCurrentLocation() {

    navigator.geolocation.getCurrentPosition(

        async (position) => {

            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url =
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

            const response = await fetch(url);

            const data = await response.json();
            const nightMode = isNightTime(data);

changeBackground(
    data.weather[0].main,
    nightMode
);

            cityName.innerHTML = `📍 ${data.name}`;

            temperature.innerHTML =
            `${Math.round(data.main.temp)}°C`;

            const icon =
getWeatherIcon(data.weather[0].main);

weatherDescription.innerHTML =
`${icon} ` +
data.weather[0].description
.split(" ")
.map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
)
.join(" ");

            humidity.innerHTML =
            `💧 Humidity: ${data.main.humidity}%`;

            windSpeed.innerHTML =
            `💨 Wind: ${data.wind.speed} m/s`;

            feelsLike.innerHTML =
            `🌡 Feels Like: ${Math.round(data.main.feels_like)}°C`;
            const sunriseTime =
new Date(data.sys.sunrise * 1000)
.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

const sunsetTime =
new Date(data.sys.sunset * 1000)
.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
});

sunrise.innerHTML =
`🌅 Sunrise: ${sunriseTime}`;

sunset.innerHTML =
`🌇 Sunset: ${sunsetTime}`;

        }

    );

}

async function getForecast(city){

    const url =
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    const data = await response.json();

    const forecastContainer =
    document.getElementById("forecastContainer");

    forecastContainer.innerHTML = "";

    const forecastList =
    data.list.slice(0,5);

    forecastList.forEach(item => {

        const time =
        item.dt_txt.split(" ")[1].slice(0,5);

        const temp =
        Math.round(item.main.temp);

        const icon =
        getWeatherIcon(item.weather[0].main);

        forecastContainer.innerHTML += `

            <div class="forecast-item">

                <p>${time}</p>

                <h3>${icon}</h3>

                <p>${temp}°C</p>

            </div>

        `;

    });

}

searchBtn.addEventListener("click", () => {

    const city = cityInput.value.trim();

    if(city !== ""){

    getWeather(city);

    getForecast(city);

}

});
cityInput.addEventListener("keypress", (event) => {

    if(event.key === "Enter"){

        const city = cityInput.value.trim();

        if(city !== ""){

    getWeather(city);

    getForecast(city);

}

    }

});

getCurrentLocation();