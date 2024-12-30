document.addEventListener('DOMContentLoaded', () => {
    const error = document.querySelector('#error')
    const cityInput = document.getElementById('input');
    const searchBtn = document.getElementById('search');
    const city = document.getElementById('city');
    const temp = document.getElementById('temp');
    const feel = document.getElementById('feel');
    const weatherInfo = document.getElementById('weather-info');
    const sunrise = document.getElementById('sunrise');
    const humidity = document.getElementById('humidity')
    const sunset = document.getElementById('sunset')

    const API_KEY = 'c3cbb7958f4ae883088e9b19e27287a3';
    console.log(cityInput);

    let newImage = []
    
    searchBtn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;
        //may throw an error
        //server/database is always in another continent
        error.innerHTML = ''
        try {
            const weatherData = await fetchWeatherData(city)
            displayWeatherData(weatherData)
            const input = cityInput.value.trim();
            newImage = []
            images.innerHTML = ''
            displayImages(input)
            cityInput.value = ''
        } catch (error) {
            showError()
        }

        cityInput.value = ''
    })

    async function fetchWeatherData(city) {
        //get weather data
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
        const response = await fetch(url);
        console.log(typeof response);
        console.log('RESPONSE', response);
        
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        console.log(data);
        city.innerText = `${data.name}`
        temp.innerText = `${data.main.temp}°C`
        feel.innerText = `${data.weather[0].description}`
        let sunriseTime = (new Date(data.sys.sunrise * 1000)).toLocaleTimeString();
        
        let sunsetTime = (new Date(data.sys.sunset * 1000)).toLocaleTimeString();
       

        console.log(sunriseTime);
        
        sunrise.innerHTML = `<p>${sunriseTime}AM</p>`

        sunset.innerHTML = `<p>${sunsetTime}PM</p>`

        
        humidity.innerHTML = `<p>${data.main.humidity}%</p>`
        
    }

    function showError() {
        // weatherInfo.innerHTML = '';
        // city.innerHTML = '';
        // temp.innerHTML = '';
        // feel.innerHTML = '';
        // sunrise.innerHTML = '';
        // sunset.innerHTML = '';
        // humidity.innerHTML = '';
        error.innerHTML = `Error city couldn't be found.`
        console.log(error);
        
    }

    async function getData(query) {
        try {
            const url = `https://pixabay.com/api/?key=42317628-32c222e73e2bfdc35c65b7a81&q=${query}&image_type=photo`
            const response = await fetch(url);
            const data = await response.json();
            console.log(data);
            return data;
    
        } catch (error) {
            console.log(error);
        }
        
    }
    
    
    const images = document.getElementById('images')
    console.log(images);
    
    function randomNumber() {
        return Math.ceil(Math.random() * 20)
    }
    
    
    
    async function displayImages(query) {
        const imageData = await getData(query)
        // imageData.hits.forEach(e => {
        //     newImage.push(e)
        //     console.log(e);
            const number = randomNumber()
            const image = document.createElement('img')
            image.src = imageData.hits[number].webformatURL
            images.appendChild(image)
            image.style.height = '100%'
            image.style.width = '100%'
            image.style.borderTopLeftRadius = '20px'
            image.style.borderBottomLeftRadius = '20px'
            // image.style.padding = '5px'
            image.style.objectFit = 'cover'
    
        // });   
    }
    


})