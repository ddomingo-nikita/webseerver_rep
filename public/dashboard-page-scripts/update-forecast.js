
let forecast = []

const splitForecast = (rowData) => {
    console.log(rowData)
    return rowData.reduce((acc, obj) => {
        // get the category name
        let key = obj.dt_txt.split(" ")[0];

        // check if the accumulator has an array for this category
        if (!acc[key]) {
            // if not, create an empty array
            acc[key] = [];
        }

        // push the object to the corresponding array
        acc[key].push(obj);

        // return the accumulator
        return acc;
    }, {});
}

const getForecastInfo = async () => {
    const {lat, lon} = await getCityLatLon()
    const url = `https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${lat}&lon=${lon}&appid=${API_KEY}`
    return fetch(url).then((result)=>result.json()).then((res)=>res.list)
}

const createNewCard = (data, index) => {
    const date = new Date(data.dt_txt)
    const div = document.createElement('div');
    div.className = 'card-data';
    div.innerHTML = `
    <p>${date.toLocaleDateString("de-DE", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
    })}</p>
    <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" alt="icon"/>
    <p>${data.weather[0].description}</p>
    <p>${Math.floor(data.main.temp)} C°</p>
  `;
    document.getElementById(`day-${index+1}`).appendChild(div);
}

const updateForecast = async () => {
    const splitArray = await getForecastInfo().then(r => splitForecast(r))
    Object.keys(splitArray).forEach((date, index)=>{
        console.log(index)
        splitArray[date].forEach((data)=>
            createNewCard(data, index)
        )
    })
}