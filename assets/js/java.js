var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");
var fiveDayArea = document.querySelector("#five-day-forecast");
var cityListArea = document.querySelector("#city-list");
var selectingCityOnListEl= document.querySelector("#city-list");
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
                city = data.name
            // inserting image 
            
            // imageDailyDisplay.setAttribute("src","http://openweathermap.org/img/wn/"+data.weather[0].icon  +"@2x.png" );

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
           
            fiveDayArea.textContent="";
            
            for(var i=0; i<5; i++){
                
                
               
                var futureForecastArea = document.createElement("div");
                futureForecastArea.classList="list-item card col-md-2 d-flex justify-content-around";


                //adding date//
                var nextFiveForecastDate = document.createElement("h6");
                nextFiveForecastDate.textContent = moment().add(i+1,'days').format("L");
               
                futureForecastArea.appendChild(nextFiveForecastDate);
                

                var icon= document.createElement("img")
                icon.setAttribute("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon  +"@2x.png" )
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





var cityNameHandler =function(event){
    console.log("cityNamehandler on action ")
    event.preventDefault();
    console.log(event);

    var cityName= cityInputEl.value.trim();

    console.log (cityName);
    if(cityName){
        getCityData(cityName);
        cityInputEl.value=" ";
        savingCityList(cityName);
       
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
    citySaved.textContent = city;
    //citySaved.addEventListener("onclick", alert("buttonclicked"));


    citySavedLi.appendChild(citySaved);
    cityListArea.appendChild(citySavedLi);  
}
    

var runCityOnList=function(){
    alert("button clicked");
    console.log(selectingCityOnListEl.textContent);
   // clickingCity.addEventListener("click",alert("clicked!!!!!!!!!!!"));

}


console.log("outside");

cityFormEl.addEventListener('submit',cityNameHandler);
selectingCityOnListEl.addEventListener("click", runCityOnList );