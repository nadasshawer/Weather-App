/**************************************************************************
Name: Nada Shawer
Date: April 22, 2023
Topic: CS Final Project - Weather app

NOTE: If you want to pause the instructions' sound, please click on the "Pause" button. Also, please follow the instructions to get the best experience possible. Thank you!
*********************************************************************************/

var weather; //weather variable
var x; //degree variable

/*API VARIABLES*/
var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="; //API main url

var apiKey = "&APPID=6d8776fc031d81c8bf1a1d93d39ab79e"; //API key

var apiUnits; //API units

var textInput; //text input variable

/*FUNCTIONALITIES VARIABLES*/
let feelsLike;
let humidity;
let maxTeme;
let minTemp;
let pressure;
let windspeed;

/*IMAGES VARIABLES*/
let rain;
let clouds;
let snowing;
let cleared;
let smoke;
let haze;
let mist;
let locate;

/*CHECKBOX VARIABLES*/
let checkC;
let checkF;

/*LOADING IMAGES*/
function preload() {
  //IMAGES
  rain = loadImage("imgs/rain.png"); //rain img
  clouds = loadImage("imgs/clouds.png"); //cloud img
  snowing = loadImage("imgs/snow.png"); //snow img
  cleared = loadImage("imgs/clear.png"); //clear img
  smoke = loadImage("imgs/smoke.png"); //smoke img
  haze = loadImage("imgs/haze.png"); //haze img
  mist = loadImage("imgs/mist.png"); //mist img
  locate = loadImage("imgs/locate.png"); //locate img

  //SOUND
  instructions = loadSound("sfx/instructions.MP3"); //instructions' sound
}

/*SOUND BUTTON FOR INSTRUCTIONS*/
function soundPlaying() {
  if (!instructions.isPlaying()) {
    instructions.play();
  } else {
    instructions.pause(); //pauses instructions' sound
  }
}

/*SETTING UP CHECKBOXES, BUTTONS, SOUND, AND FUNCTIONALITIES*/
function setup() {
  createCanvas(600, 600); //creating the canvas

  //INSTRUCTIONS' SOUND
  var buttonP = select("#pause"); //links the pause button with the HTML button
  buttonP.mousePressed(soundPlaying);

  instructions.play(); //plays instructiosn at the start of the program

  //CHECKBOXES FOR °C AND °F
  //Celsius
  checkC = createCheckbox("Celsius", false); //checkbox for Celsius
  checkC.changed(checkEvent);
  checkC.position(140, 175); //positioning Celsius checkbox
  checkC.size(180, AUTO); //scaling Celsius checkbox

  //Fahrenheit
  checkF = createCheckbox("Fahrenheit", false); //checkbox for Celsius
  checkF.changed(checkEvent);
  checkF.position(280, 175); //positioning Fahrenheit checkbox
  checkF.size(150, AUTO); //scaling Fahrenheit checkbox

  var buttonS = select("#search"); //links the search button with the HTML button
  buttonS.mousePressed(weatherInfo);

  textInput = select("#weather"); //text input - will get the weather for the city inputed in the search box

  /*Functionalities*/
  feelsLike = new Feelslike();
  humidity = new Humidity();
  pressure = new Pressure();
  maxTemp = new Maxtemp();
  minTemp = new Mintemp();
  windSpeed = new Windspeed();
}

/*CHECKING IF A CHECKBOX IS CHECKED*/
function checkEvent() {
  //Celsius
  if (checkC.checked()) {
    apiUnits = "&units=metric";
    x = "°C";
  } //checks if Celsius checkbox is checked
  //Fahrenheit
  if (checkF.checked()) {
    apiUnits = "&units=Imperial";
    x = "°F";
  } //checks if Fahrenheit checkbox is checked
  if (checkC.checked() && checkF.checked()) {
    window.alert("Please select only ONE option!"); //window alert that tells the user to check only one box
    //noLoop(); //pauses the code if both options are checked
  } else {
    //window.alert("Please select an option!"); //window alert that tells the user to check a box if nothing is checked
  }
}

/*CREATING THE API*/
function weatherInfo() {
  var api = apiURL + textInput.value() + apiKey + apiUnits; //API
  loadJSON(api, gotData); //loading data from JSON file
}

/*RECIEVING DATA FROM API*/
function gotData(data) {
  weather = data; //our weather will equal the data recieved from JSON file
}

/*CHECKING FOR SPELLING MISTAKES
function checkSpelling() {
  if (weather.cod === 404) {
    console.log("Please check your spelling!");
  } else {
    console.log("WORKING!");
  }
}*/

/*DISPLAYING DATA*/
function draw() {
  background("#B0E0E6"); //background color

  //WRAPPER BOX
  rect(80, 10, 500, 500, 25, 25, 25, 25); //wrapper box that contains weather info

  /*DISPLAYING FUNCTIONALITIES*/
  push();
  feelsLike.display();
  humidity.display();
  pressure.display();
  maxTemp.display();
  minTemp.display();
  windSpeed.display();
  pop();

  if (weather) {
    weatherImg(); //calling the weather image function
    image(locate, 300, 15, 50, 50); //location image

    //checkSpelling(); //calling the checkSpelling function

    push();
    textFont("Trebuchet MS"); //font style
    textSize(35); //font size for city name
    textAlign(CENTER); //aligns text in the center

    //CITY NAME
    text(textInput.value(), 325, 100); //city name display
    pop();

    //CURRENT WEATHER
    push();
    textSize(100); //font size for current temp
    textFont("Impact"); //font style
    text(round(weather.main.temp) + x, 240, 210); //current temp in °C rounded to nearest integer
    pop();

    //STATUS
    textSize(25); //font size for current temp
    textFont("Trebuchet MS");
    text("''" + weather.weather[0].main + "''", 280, 250); //weather status

    //FEELS LIKE TEMP
    push();
    textSize(40); //text size for feels like temp
    textFont("Trebuchet MS");
    fill("red"); //text color
    text(round(weather.main.feels_like) + x, 115, 345); //feels like temp in °C rounded to nearest integer
    pop();

    //HUMIDITY
    push();
    textSize(40); //text size for humidity
    textFont("Trebuchet MS");
    fill("red"); //text color
    text(round(weather.main.humidity) + "%", 300, 345); //humidity in % rounded to nearest integer
    pop();

    //PRESSURE
    push();
    textSize(30); //text size for pressure
    textFont("Trebuchet MS");
    fill("red"); //text color
    text(round(weather.main.pressure) + "mb", 445, 340); //pressure in mb rounded to nearest integer
    pop();

    //MAX TEMP
    push();
    textSize(40); //text size for max temp
    textFont("Trebuchet MS");
    fill("red"); //text color
    text(round(weather.main.temp_max) + x, 460, 465); //max temp in °C rounded to nearest integer
    pop();

    //MIN TEMP
    push();
    textSize(40); //text size for min temp
    textFont("Trebuchet MS");
    fill("red"); //text color
    text(round(weather.main.temp_min) + x, 290, 465); //min temp in °C rounded to nearest integer
    pop();

    //WIND SPEED
    push();
    textSize(40); //text size for wind speed
    textFont("Trebuchet MS");
    fill("red"); //text color
    text(round(weather.wind.speed) + "k/h", 115, 465); //wind speed in km/hr rounded to nearest integer
    pop();
  }
}

/*IMAGES FUNCTION*/
function weatherImg() {
  //RAINY WEATHER
  if (weather.weather[0].main == "Rain") {
    image(rain, 105, 30, 100, 100);
    image(rain, 460, 30, 100, 100);
  }
  //SNOWY WEATHER
  if (weather.weather[0].main == "Snow") {
    image(snowing, 100, 30, 100, 100);
    image(snowing, 460, 30, 100, 100);
  }
  //CLEAR WEATHER
  if (weather.weather[0].main == "Clear") {
    image(cleared, 100, 30, 100, 100);
    image(cleared, 460, 30, 100, 100);
  }
  //SMOKY WEATHER
  if (weather.weather[0].main == "Smoke") {
    image(smoke, 70, 10, 160, 160);
    image(smoke, 430, 10, 160, 160);
  }
  //CLOUDY WEATHER
  if (weather.weather[0].main == "Clouds") {
    image(clouds, 100, 25, 100, 100);
    image(clouds, 455, 25, 100, 100);
  }
  //HAZY WEATHER
  if (weather.weather[0].main == "Haze") {
    image(haze, 100, 30, 100, 100);
    image(haze, 460, 30, 100, 100);
  }
  //MISTY WEATHER
  if (weather.weather[0].main == "Mist") {
    image(mist, 100, 30, 100, 100);
    image(mist, 440, 30, 100, 100);
  }
}
