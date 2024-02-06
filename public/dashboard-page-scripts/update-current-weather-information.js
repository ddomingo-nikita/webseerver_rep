const API_KEY = "2ab6eb761ae66ffc39e2ca459cc44eb1"
const city = "Texas"

const getCity = async () => {
    const currentUser = sessionStorage.getItem("username")
    return await fetch(`/api/${currentUser}/city`).then((res)=>(res.json())).then((result)=>result.city)
}

const appropriateSrc = ["clouds", "rain", "snow", "storm", "clear"]
const getCityLatLon = async () => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${await getCity()}&limit=1&appid=${API_KEY}`
    return await fetch(url).then((result) => result.json()).then((res) => {
        return {lat: res[0].lat, lon: res[0].lon}
    }).catch(e => {
        return {lat: 0, lon: 0}
    })
}

const getWeatherShortInfo = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    return await fetch(url).then((result) => result.json()).then((res) => res)
}

const updateCurrentWeatherInformation = async () => {
    const {lat, lon} = await getCityLatLon()
    const weather = await getWeatherShortInfo(lat, lon)
    document.getElementById("current-weather").textContent = `Currently, ${await getCity()} has a temperature of ${weather.main.temp} C°`
    const name = weather.weather[0].main.toLowerCase()
    document.getElementById("weather-icon").src=`../weather-pictures/${appropriateSrc.includes(name)?name:"clouds"}.png`
    document.getElementById("weather-icon").style.display="block"
    updateForecast()

}