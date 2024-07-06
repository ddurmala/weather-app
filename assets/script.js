
const searchBtn = document.querySelector('#searchButton');

// creay an array to store input values for search history
const searchHistory = [];


function outputWeather(event) {

    event.preventDefault();

    // just to make sure everything is working properly in this function
    console.log('outputWeather function is triggered');

    const apiKey = 'c665f65b2f687a79553423b8d6a7fbd0';

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

            const html = `
        <h3 class="title is-3">${data.name}</h3>

        <p>${month} ${day}</p>

        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="weather icon">

        <hr>

        <h5>Temperature: ${data.main.temp}&deg;C</h5>
        <h6>Feels Like: ${data.main.feels_like}&deg;C</h6>
        <h6>Humidity: ${data.main.humidity}%<h/6>
        <h6>Wind Speed: ${data.wind.speed}mph<h/6>
        `;
            const outputDiv = document.querySelector('#temp-output');

            outputDiv.innerHTML = html;

            // add the search iinput to the search history
            searchHistory.push(cityInput.value);

            // update search history section
            const historyList = document.querySelector('#search-history');

            // clear previous history
            historyList.innerHTML = '';

            searchHistory.forEach((searchItem) => {
                const listItem = document.createElement('li');
                listItem.textContent = searchItem;
                historyList.appendChild(listItem);
            })

            cityInput.value = '';
        })

        .catch(function (error) {
            console.log(error);
        });
}

searchBtn.addEventListener('click', outputWeather);