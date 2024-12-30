document.addEventListener('DOMContentLoaded', () => {
    const inputItem = document.getElementById('input')
    const search = document.getElementById('search')
    
    
let newImage = []

search.addEventListener('click', () => {
    const input = inputItem.value.trim();
    newImage = []
    images.innerHTML = ''
    displayImages(input)
    inputItem.value = ''
    
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


async function displayImages(query) {
    const imageData = await getData(query)
    imageData.hits.forEach(e => {
        newImage.push(e)
        console.log(e);
        const image = document.createElement('img')
        image.src = e.webformatURL
        images.appendChild(image)
        image.height = 100

    });

    
}


})