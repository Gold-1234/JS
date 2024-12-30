document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('input');
const searchBtn = document.getElementById('search');
const error = document.querySelector('#error')


let newImage = []

searchBtn.addEventListener('click', () => {
    const input = cityInput.value.trim();
    newImage = []
    error.innerHTML = ''
    displayImages(input)
    cityInput.value = ''
    
})

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
        image.src = imageData.hits[number].previewURL
        error.appendChild(image)
        image.height = 100

    // });   
}

})