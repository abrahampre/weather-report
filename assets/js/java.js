var cityInputEl = document.querySelector("#city-name");
var cityFormEl = document.querySelector("#city-form");

var getCityData = function(city) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=e883e4d86e346084de47b4212521fedc";
    
    //make request for api url
    
    
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid=e883e4d86e346084de47b4212521fedc").then(function(response){
    response.json().then(function(data){
        console.log(data);
    });
});
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