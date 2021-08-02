var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
//daily Displays
var cityDailyDisplay = document.querySelector("#daily-city");
var temperatureDailyDisplay = document.querySelector("#daily-temp");
var windDailyDisplay = document.querySelector("#daily-wind");
var uvDailyDisplay = document.querySelector("#daily-uv");
var lat= " ";
var long= " ";


var getCityData = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=e883e4d86e346084de47b4212521fedc";
    
    //make request for api url

    fetch(apiUrl).then(function(response){

        if (response.ok){
            response.json().then(function(data){
                console.log(data);
            
            cityDailyDisplay.textContent=" "+data.name;
            temperatureDailyDisplay.textContent=" "+data.main.temp;
            windDailyDisplay.textContent=" "+data.wind.speed;
            
            lat = data.coord.lat;
            console.log(lat);
            long = data.coord.lon;
            console.log(long);

            createFiveDays(lat, long)
        });
        }else{
            alert("Error, City not found!");
        };    
    })

    .catch(function(error){
        alert("Unable to connect to the system!")
    })
};

var createFiveDays = function(lat, long){
    var apiUrlfive = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+long+"&exclude=minutely,hourly,alerts&units=imperial&appid=e883e4d86e346084de47b4212521fedc";
    
    //make request for api url

    fetch(apiUrlfive).then(function(response){

        if (response.ok){
            response.json().then(function(data){
                console.log(data);
            uvDailyDisplay.textContent = " "+data.current.uvi;
            
        });
        }else{
            alert("Error, City not found!");
        };    
    })
};





var cityNameHandler =function(event){
    console.log("cityNamehandler on action ")
    event.preventDefault();
    console.log(event);

    var cityName= cityInputEl.value.trim();
    console.log (cityName);
    if(cityName){
        getCityData(cityName);
        cityInputEl.value=" ";
    }else{
        alert("Please type a City")
    }

}


console.log("outside");

cityFormEl.addEventListener('submit',cityNameHandler);