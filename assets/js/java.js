var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var fiveDayArea = document.querySelector("#five-day-forecast");

var cityListArea = document.querySelector("#city-list");//para agregar la lista
var selectingCityOnListEl= document.querySelector("#city-list"); /////para selectionar la lista 
var clickingCity= document.querySelector("#single-city")
//daily Displays
var cityDailyDisplay = document.querySelector("#daily-city");
var imageDailyDisplay = document.querySelector("#daily-image")
var temperatureDailyDisplay = document.querySelector("#daily-temp");
var humidityDailyDisplay = document.querySelector("#daily-humidity");
var windDailyDisplay = document.querySelector("#daily-wind");
var uvDailyDisplay = document.querySelector("#daily-uv");
var lat= " ";
var long= " ";
var currentDate = moment().format("L");
var city=" ";

var getCityData = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=e883e4d86e346084de47b4212521fedc";
    
    //make request for api url

    fetch(apiUrl).then(function(response){

        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                cityDailyDisplay.textContent=" "+data.name + " " + "("+ currentDate+") ";
                city = data.name;
                localStorage.setItem("City", city);
            // inserting image 
            
            imageDailyDisplay.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon  +"@2x.png" );
            imageDailyDisplay.height="50";
            imageDailyDisplay.width="50";

            temperatureDailyDisplay.textContent=" "+data.main.temp;
            windDailyDisplay.textContent=" "+data.wind.speed;
            humidityDailyDisplay.textContent= " "+data.main.humidity;
            
            lat = data.coord.lat;
            console.log(lat);
            long = data.coord.lon;
            console.log(long);
            
            
            savingCityList(city);
            createFiveDays(lat, long)
        });
        }else{
            alert("Error, City not found!");
            return;
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
            var uvi = data.current.uvi
            uvDailyDisplay.textContent = " "+uvi;
                if (uvi>8){
                    uvDailyDisplay.className="bg-danger rounded";
                }else if(uvi<8 && uvi>6){
                    uvDailyDisplay.className="bg-warning rounded";
                }else if(uvi<6 && uvi>3){
                    uvDailyDisplay.className="bg-info rounded";
                }else if(uvi<3){
                    uvDailyDisplay.className="bg-success rounded";
                }
            fiveDayArea.textContent="";
            
            for(var i=0; i<5; i++){
                
                
               
                var futureForecastArea = document.createElement("div");
                futureForecastArea.classList="list-item card col-md-2 d-flex justify-content-around bg-secondary text-white";


                //adding date//
                var nextFiveForecastDate = document.createElement("h6");
                nextFiveForecastDate.textContent = moment().add(i+1,'days').format("L");
               
                futureForecastArea.appendChild(nextFiveForecastDate);
                

                var icon= document.createElement("img")
                icon.setAttribute("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon  +"@2x.png" )
                icon.height ="50";
                icon.width="50";
                futureForecastArea.appendChild(icon);

                
                var nextFiveTemperatures = document.createElement("h8");
                nextFiveTemperatures.textContent = "Temp: " +data.daily[i].temp.day +"°F";
                futureForecastArea.appendChild(nextFiveTemperatures);

                var nextFiveWind= document.createElement("h8");
                nextFiveWind.textContent= "Wind: " +data.daily[i].wind_speed + "MPH";
                futureForecastArea.appendChild(nextFiveWind);

                var nextFiveHum = document.createElement("h8");
                nextFiveHum.textContent="Humidity: "+data.daily[i].humidity +"%";
                futureForecastArea.appendChild(nextFiveHum);

                ///last append//
                fiveDayArea.appendChild(futureForecastArea);

            } 
        });
        }else{
            alert("Error, City not found!");
        };   
    
    })
};

///Takes the name and trims, verification of input.

var cityNameHandler =function(event){
   
    event.preventDefault();
 
    var cityName= cityInputEl.value.trim();

    console.log (cityName);
    if(cityName){
        getCityData(cityName);
        cityInputEl.value=" ";
       
    }else{
        alert("Please type a City")
    }

}

var savingCityList= function(city){
    var citySavedLi= document.createElement("li")
    citySavedLi.classlist="btn-block"
    citySavedLi.setAttribute("id","city-added")

    var citySaved = document.createElement("button");
    citySaved.classList ="text-uppercase btn btn-primary btn-lg";
    citySaved.setAttribute("id","single-city");
    citySaved.setAttribute("type","button");
    console.log(city);
    citySaved.textContent = city;
    
    citySaved.addEventListener("click", function(){
        alert("city selected! "+city);
        console.log(city);
        secondGetCityData(city);
    })
    citySavedLi.appendChild(citySaved);
    cityListArea.appendChild(citySavedLi);  
}
    
var secondGetCityData = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=e883e4d86e346084de47b4212521fedc";
    
    //make request for api url

    fetch(apiUrl).then(function(response){

        if (response.ok){
            response.json().then(function(data){
                console.log(data);
                cityDailyDisplay.textContent=" "+data.name + " " + "("+ currentDate+") ";
                city = data.name
            // inserting image 
            
            imageDailyDisplay.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon  +"@2x.png" );
            imageDailyDisplay.height="50";
            imageDailyDisplay.width="50";

            temperatureDailyDisplay.textContent=" "+data.main.temp;
            windDailyDisplay.textContent=" "+data.wind.speed;
            humidityDailyDisplay.textContent= " "+data.main.humidity;
            
            lat = data.coord.lat;
            console.log(lat);
            long = data.coord.lon;
            console.log(long);
            
            createFiveDays(lat, long)
        });
        }else{
            alert("Error, City not found!");
            return;
        };    
    })

    .catch(function(error){
        alert("Unable to connect to the system!")
    })
};

cityFormEl.addEventListener('submit',cityNameHandler);
