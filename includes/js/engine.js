//The is the game engine
//Please Note: You will need an API key from OpenWeather, https://openweathermap.org/api, for JS Adventure to work correctly.

//--- Gloabal Varibles ---
//These variables connect our code with the 'id' on the html page.
var images = document.getElementById("images")
var buttonBox = document.getElementById('buttonBox');
var input = document.getElementById('input');

//This is the variable for the name of the character
var player;

//Varible for Random Weather States
var randomweatherstates

//Holds a Random Varible
var random

//Varible for the random weather state
var randomweather;

//Holds the local weather condition.
var setweather;

//Gameweather holds the data for the in-game weather.
var gameweather;

//Holds the time from the twelve hour clock function.
var v12HourClock;

//Holds the weather data.
var weatherdata;

// This variable holds the Open Weather Map API Key if it has been retrieved.
var appid;

function fetchData(callback) {
  var xhr = new XMLHttpRequest();
  //The location of the publicly available PHP file that calls a PHP containing the API key in a folder outside the websites public folder.
  xhr.open('GET', 'https://js-adventure.stagingurl.dev/includes/php/api-include.inc.php', true);
  xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

  xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status === 200) {
              var responseData = JSON.parse(xhr.responseText);
              callback(responseData); // Call the callback function with responseData.
          } else {
              console.error('AJAX request failed');
          }
      }
  };

  xhr.send();
}

// Fetch the API key and add it to the varbile 'appid'
fetchData(function(calledData) {
  // You cannot use 'calledData' directly outside this funcation as it is asynchronous.
  // 'calledData' must be passed to the varible 'appid' first.
  appid = calledData;
  
  // Warning: This will make you API key visible!
  //console.log('Called AJAX Data:' + ' ' + calledData); // Logs 'calledData' to the Console. DO NOT USE ON LIVE VERSION!
  //console.log('App ID Varible:' + ' ' + appid); // Logs the App ID to the Console. DO NOT USE ON LIVE VERSION!

  if (appid == "NotSet") {
    // Console warning if the 'appid' is set to "NotSet".
    console.log('WARNING!: The varible' + ' ' + '"appid"' + ' ' + 'is not set to an API key!');

    // Call the 'getLocation' function only after it has been confiremed that 'appid' has a set value.
    getLocation();
} else {
    // Console conformation that the variable 'appid is set to an API key.
    console.log('SUCCESS: The varible' + ' ' + '"appid"' + ' ' + 'is set to an API key!');

    // Call the 'getLocation' function only after it has been confiremed that 'appid' has a set value.
    getLocation();}
});
//-------------------------

// Get the geolocation from the BOM.
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
  } else {
    div.innerHTML = "The Browser Does not Support Geolocation";
  }
}

// Set the weather value for the game.
async function showPosition(position) {

  // If the OpenWeather API Key is not set a random weather condition will be set.
  if (appid == "NotSet" ) {
    randomweatherstates = ["Clouds","Rain","Clear","Snow","Extreme","Okay"];
    random = Math.floor((Math.random() * randomweatherstates.length));
    // Saves the weather data to local storage.
    localStorage.setItem('weatherdata', randomweatherstates[random]);
    randomweather = (localStorage.getItem('weatherdata'));

    // This if statement takes the data in randomweather and matches it to an alternative word. The alternative word is added to the variable gameweather, adding randomweather to a scenario text string to display the weather.
    if (randomweather == "Clouds")
      {
      gameweather = "cloudy"
      }
      else if (randomweather == "Sun")
      {
        gameweather = "sunny"
      }
      else if (randomweather == "Rain")
      {
        gameweather = "raining"
      }
      else if (randomweather == "Clear")
      {
        gameweather = "clear"
      }
      else if (randomweather == "Snow")
      {
        gameweather = "snowy"
      }
      else if (randomweather == "Extreme")
      {
        gameweather = "extremly dangerous"
      }
      else if (randomweather == "Okay")
      {
        gameweather = "okay"
      }
      console.log('Random Weather Value:' + ' ' + randomweather);
      console.log('Random Ingame Weather:' + ' ' + gameweather);

  // Place the Coordinates in the Open Weather Maps API and retrieves the players local weather in JSON format and then fillers it down to the current conditions and saves it to local storage before sending it to a varible.
  } else {
    const res = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude + '&appid=' + appid + '')
    const data = await res.json()

    // Saves the weather data to local storage.
    localStorage.setItem('weatherdata', data.weather[0].main);
    setweather = (localStorage.getItem('weatherdata'));
    console.log('API Ingame Weather:' + ' ' + setweather);

    // This if statement takes the data in setweather and matches it to an alternative word. The alternative word is added to the variable gameweather, adding gameweather to a scenario text string to display the current weather.
    if (setweather == "Clouds")
      {
      gameweather = "cloudy"
      }
      else if (setweather == "Sun")
      {
        gameweather = "sunny"
      }
      else if (setweather == "Rain")
      {
        gameweather = "raining"
      }
      else if (setweather == "Clear")
      {
        gameweather = "clear"
      }
      else if (setweather == "Snow")
      {
        gameweather = "snowy"
      }
      else if (setweather == "Extreme")
      {
        gameweather == "extremly dangerous"
      }
      else (gameweather = "okay");

      console.log('Matched API Weather Value:' + ' ' + setweather);
      console.log('Matched API Ingame Weather:' + ' ' + gameweather);
 }
}

// Displays an error if geolocation is off or blocked in the browser.
function showError(error) {
  if (error.PERMISSION_DENIED) {
    div.innerHTML = "The User have denied the request for Geolocation.";
  }
}

//Gets the players name from the input field when the enter key is pressed.
input.onkeydown = function (event) {
  if (event.key == "Enter" || event.keyCode == 13) {
    // Checks to see of the input field is null.
    if(input.value  === "" || null ) {
      // Adds the message "I need to know your name first!" to the html id text
      document.getElementById("text").innerHTML = "I need to know your name first!"; //Adds the 
      // Resets the input to any empty value redy for the playsers name
      input.value ="";
    } else {
      // Outputs the Player Name from the BOM local storage.
      localStorage.setItem('playersname', input.value);
      player = (localStorage.getItem('playersname'));
      input.parentNode.removeChild(input)
      scenario = setScenarioText()
      advanceTo(scenario.two)
    return
    }  
  }
}

// Runs the in game clock based on the current system time eg. hh:mm:ss AM/PM
function showTime() {
  // Gets the time values
  var date = new Date();
  var vSec = String(date.getSeconds()).padStart(2, '0');
  var vMin = String(date.getMinutes()).padStart(2, '0');
  var v24hou = String(date.getHours()).padStart(2, '0');
  var vNoString24hou = date.getHours()
  var v12hou = (v24hou % 12) || 12;

  // Builds the 24 hour Clock in the UTC Time Zone
  var v24HourClock = v24hou + ":" + vMin + ":" + vSec;

  // AM or PM Check
  if (vNoString24hou >= 12) { var vAMPM = "PM"; } else { var vAMPM = "AM"; }

  // Builds the 12 hour clock
  v12HourClock = v12hou + ":" + vMin + ":" + vSec + " " + vAMPM;
  setTimeout(showTime, 1000);
}
showTime()

// Replaces the phrase 'Your Name' with the players name where ever it is used.
var changeText = function (words) {
  text.innerHTML = words.replace("Your Name", player);
};

// This takes the image link and puts it in the proper format and sends it to the html page.
var changeImage = function (img) {
  images.setAttribute('src', img);
};

// This looks at the number of options we have set and creates enough buttons.
function changeButtons(buttonList) {
  buttonBox.innerHTML = "";
  for (var i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += `<button class="btn btn-secondary h-100" onClick="${buttonList[i][1]}">${buttonList[i][0]}</button>`;
  };
};

// This is what moves the game along.
var advanceTo = function (s) {
  changeImage(s.image)
  changeText(s.text)
  if (s.buttons) {
    changeButtons(s.buttons)
  }
};

// This is function holds each scenario, the more you add the more options there are.
function setScenarioText() {
  return ({
    one: {
      image: "https://images.unsplash.com/photo-1484069560501-87d72b0c3669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      text: "Hello adventurer, what is your name?\n",
    },
    two: {
      image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "Hello " + player + ". The story starts with you on holiday inside your campervan by a lake.",
      buttons: [["Let get started.", "advanceTo(scenario.three)"]]
    },
    three: {
      image: "https://images.unsplash.com/photo-1496450681664-3df85efbd29f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You look out the door of the campervan, and the weather is " + gameweather + ". Next, you look at your watch, and the time is " + v12HourClock + ". " + "What do you want to do?",
      buttons: [["Stay in the campervan", "advanceTo(scenario.four)"], ["Go Outside", "advanceTo(scenario.five)"]]
    },
    four: {
      image: "https://images.unsplash.com/photo-1419833173245-f59e1b93f9ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You stay in the campervan. You wake up the next morning to a sunny day and continue your holiday. The End.",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    five: {
      image: "https://images.unsplash.com/photo-1518504361720-82ccdc540022?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "A wild gang of rabid dogs chase you away from the campervan. Against your better judgement, you enter a creepy house for safety.",
      buttons: [["Continue", "advanceTo(scenario.eight)"]]
    },
    six: {
      image: "https://images.unsplash.com/photo-1678962855748-d012ea7a2f10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Hi " + player +  ", did you forget about the rabid dogs?",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    seven: {
      image: "https://images.unsplash.com/photo-1515876305430-f06edab8282a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You have made it back to the campervan safely. You start the engine and leave. The End",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    eight: {
      image: "https://images.unsplash.com/photo-1616555670626-09496d2eed9e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "The door of the creepy house is boarded up, but one of its windows is missing. What will you do?",
      buttons: [["Go in through the window", "advanceTo(scenario.nine)"], ["Try and return to the campercan", "advanceTo(scenario.six)"]]
    },
    nine: {
      image: "https://images.unsplash.com/photo-1526547237232-8e04be9a6d8d?q=80&w=2074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Inside the house, there are two paths to follow. Which one will you take?",
      buttons: [["Go to the back door", "advanceTo(scenario.twelve)"], ["Go up stairs", "advanceTo(scenario.ten)"]]
    },
    ten: {
      image: "https://images.unsplash.com/photo-1563905463861-7d77975b3a44?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "Upstairs, you see a shadowed figure at the end of the hall. What do you do?",
      buttons: [["Go towards the figure.", "advanceTo(scenario.eleven)"], ["Go back the way you came.", "advanceTo(scenario.nine)"]]
    },
    eleven: {
      image: "https://images.unsplash.com/photo-1678962855748-d012ea7a2f10?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      text: "Well, " + player + " wasn't very smart. So, in the words of Ron Perlman from the game Fallout 'Boy, you're stupid and dead.'",
      buttons: [["Choose a different path?", "advanceTo(scenario.two)"]]
    },
    twelve: {
      image: "https://images.unsplash.com/photo-1440549770084-4b381ce9d988?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      text: "You step out of the house, and the dogs have stopped following you. What do you want to do?",
      buttons: [["Try and go back to the campervan.", "advanceTo(scenario.seven)"], ["Go back in to the house", "advanceTo(scenario.nine)"]]
    },
  })
}
var scenario = setScenarioText()

// This call starts the scenerio.
advanceTo(scenario.one);