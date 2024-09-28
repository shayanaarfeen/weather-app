
const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector('.weather-icon');

async function checkWeather(city) {

  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
  if (response.status == 404) {
    document.querySelector('.error').style.display = "block"
    document.querySelector('.weather').style.display = "none"
  } else {
    var data = await response.json();

    document.querySelector(".cityName").innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + " km/h";

    switch (data.weather[0].main) {
      case "Clouds":
        weatherIcon.src = "/public/images/clouds.png";
        break;
      case "Clear":
        weatherIcon.src = "/public/images/clear.png";
        break;
      case "Rain":
        weatherIcon.src = "/public/images/rain.png";
        break;
      case "Drizzle":
        weatherIcon.src = "/public/images/drizzle.png";
        break;
      case "Mist":
        weatherIcon.src = "/public/images/mist.png";
        break;
      default:
        break;
    }
    document.querySelector('.weather').style.display = "block"
    document.querySelector('.error').style.display = "none"
  }

}

searchBtn.addEventListener('click', () => {
  checkWeather(searchBox.value);
})

