// const API_KEY = "2ab6eb761ae66ffc39e2ca459cc44eb1"


let resultStirng = ""
const _getCity = async () => {
    return document.getElementById("city-input").value
}

const _getCityLatLon = async () => {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${await _getCity()}&limit=1&appid=${API_KEY}`
    return await fetch(url).then((result) => result.json()).then((res) => {
        resultStirng = res[0].name
        return {lat: res[0].lat, lon: res[0].lon}
    }).catch(e => {
        return {lat: 0, lon: 0}
    })
}

const _getWeatherShortInfo = async (lat, lon) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    return await fetch(url).then((result) => result.json()).then((res) => res)
}


const getTemperatureByCity = async () => {
    if(!await _getCity()){
        document.getElementById("error-text").style.display="block"
        return false
    }
    else{
        document.getElementById("error-text").style.display="none"
    }
    const {lat, lon} = await _getCityLatLon()
    const weather = await _getWeatherShortInfo(lat, lon)
    document.getElementById("current-temperature").textContent = `Current temperature in ${resultStirng}, ${weather.sys.country} : ${weather.main.temp} C°`
}

