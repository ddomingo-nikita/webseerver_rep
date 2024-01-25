const emojiArray = ["☀️", "☁️", "🌧️", "⛈️", "⛅", "🌨️", "🌩️"]


const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
}

const getRandomEmoji = () => {
    const span = document.getElementById("easter-egg")
    span.textContent = emojiArray[Math.round(getRandomNumber(0, emojiArray.length-1))]
}

window.onload = () => getRandomEmoji()