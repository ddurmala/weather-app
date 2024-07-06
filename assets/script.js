const apiKey = 'c665f65b2f687a79553423b8d6a7fbd0';

const searchBtn = document.querySelector('#searchButton');

// creay an array to store input values for search history
const searchHistory = [];


// Current Forecast
function outputWeather(event) {

    event.preventDefault();

    // just to make sure everything is working properly in this function
    console.log('outputWeather function is triggered');

    const cityInput = document.querySelector('#city-input');

    const searchText = cityInput.value;

    if (!searchText) {
        alert('type in city name');
        return
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=imperial`;

    // Get the date
    function getWrittenMonth(month) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return months[month];
    }

    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = getWrittenMonth(currentDate.getMonth());

    // fetch the data
    fetch(url)
        .then(function (responseObj) {
            return responseObj.json();
        })
        .then(function (data) {
            // to see the data object in console
            console.log(data);

            const coord = data.coord;

            const html = `
        <h3 class="title is-3">${data.name}</h3>

        <p>${month} ${day}</p>

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">

        <hr>

        <h5>Temperature: ${data.main.temp}&deg;F</h5>
        <h6>Feels Like: ${data.main.feels_like}&deg;F</h6>
        <h6>Humidity: ${data.main.humidity}%</h6>
        <h6>Wind Speed: ${data.wind.speed}mph</h6>
        `;
            const outputDiv = document.querySelector('#temp-output');

            outputDiv.innerHTML = html;

            // add the search input to the search history - put not added twice to list

            const cityExists = searchHistory.some(city => city === cityInput.value);

            if (!cityExists) {

                searchHistory.push(cityInput.value);
            };

            // update search history section
            const historyList = document.querySelector('#search-history');

            // clear previous history
            historyList.innerHTML = '';

            // loop through each city input add to list and given a class of "history"
            searchHistory.forEach((searchItem) => {
                const listItem = document.createElement('li');
                listItem.classList.add('history');
                listItem.textContent = searchItem;
                historyList.appendChild(listItem);
            })

            cityInput.value = '';

            getForecast(coord.lat, coord.lon);

        })

        .catch(function (error) {
            console.log(error);
        });
}

// 5 day weather forecast


function getForecast(lat, lon) {

    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;


    fetch(forecastURL)
        .then(function (responseObj) {
            return responseObj.json();
        })

        .then(function (data) {
            console.log(data);

            const filtered = data.list.filter(function (weatherObj) {
                return weatherObj.dt_txt.includes('12:00:00');
            });

            console.log(filtered);

            const outputDiv = document.querySelector('#forecast');

            outputDiv.innerHTML = '';

            filtered.forEach(weatherObj => {

                const html = `<div class="cell">
        <p>date</p>

        <img src="https://openweathermap.org/img/wn/${weatherObj.weather[0].icon}@2x.png" alt="weather icon">

        <hr>

        <h5>Temperature: ${weatherObj.main.temp}&deg;F</h5>
        <h6>Feels Like: ${weatherObj.main.feels_like}&deg;F</h6>
        <h6>Humidity: ${weatherObj.main.humidity}%</h6>
        <h6>Wind Speed: ${weatherObj.wind.speed}mph</h6>
        </div>`;

                outputDiv.innerHTML += html;

            });
        })

        .catch(function (error) {
            console.log(error);
        });
}


searchBtn.addEventListener('click', outputWeather);

// $('#history-list').on('click', '.history', function (event) {
//     // event.preventDefault();
//     const citynput = event.target.textContent;
//     console.log(cityInput);

//     outputWeather(cityInput.value);
// });


