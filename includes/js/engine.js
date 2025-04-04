//The is the game engine.
//Please Note: You will need an API key from OpenWeather, https://openweathermap.org/api, for JS Adventure to work correctly.

//--- Gloabal Varibles ---
//These variables connect our code with the 'id' on the html page.
let images = document.getElementById("images")
let buttonBox = document.getElementById('buttonBox');
let input = document.getElementById('input');

// This variable contains the scenario data.
let scenario;

//This is the variable for the name of the character.
let player;

//Varible for Random Weather States.
let randomweatherstates;

//Holds a Random Varible.
let random;

//Varible for the random weather state.
let randomweather;

//Holds the local weather condition.
let setweather;

//Holds the alternative word fir the local weather condition.
let gameweather;

//Holds the time from the twelve hour clock function.
let v12HourClock;

//Holds the weather data.
let weatherdata;

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
  try {
    const res = await fetch('https://js-adventure.stagingurl.dev/includes/php/api-proxy.php?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude);
    const data = await res.json();

    if (data && data.weather && data.weather.length > 0) {
      // Use the real API weather data.
      const condition = data.weather[0].main;
      localStorage.setItem('weatherdata', condition);
      setweather = condition;

      switch (setweather) {
        case "Clouds": gameweather = "cloudy"; break;
        case "Sun": gameweather = "sunny"; break;
        case "Rain": gameweather = "raining"; break;
        case "Clear": gameweather = "clear"; break;
        case "Snow": gameweather = "snowy"; break;
        case "Extreme": gameweather = "extremely dangerous"; break;
        default: gameweather = "okay";
      }

      console.log('API Weather:', setweather);
      console.log('In-Game Weather:', gameweather);

    } else {
      // Fallback to random weather.
      useRandomWeather();
    }
  } catch (err) {
    console.error("Weather fetch failed, using random weather instead.", err);
    useRandomWeather();
  }
}

function useRandomWeather() {
  randomweatherstates = ["Clouds", "Rain", "Clear", "Snow", "Extreme", "Okay"];
  random = Math.floor((Math.random() * randomweatherstates.length));
  randomweather = randomweatherstates[random];
  localStorage.setItem('weatherdata', randomweather);

  switch (randomweather) {
    case "Clouds": gameweather = "cloudy"; break;
    case "Sun": gameweather = "sunny"; break;
    case "Rain": gameweather = "raining"; break;
    case "Clear": gameweather = "clear"; break;
    case "Snow": gameweather = "snowy"; break;
    case "Extreme": gameweather = "extremely dangerous"; break;
    default: gameweather = "okay";
  }

  console.log('Random Weather:', randomweather);
  console.log('In-Game Weather:', gameweather);
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
      // Adds the message "I need to know your name first!" to the html id text.
      document.getElementById("text").innerHTML = "I need to know your name first!";
      // Resets the input to any empty value redy for the playsers name.
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

// Runs the in game clock based on the current system time eg. hh:mm:ss AM/PM.
function showTime() {
  // Gets the time values
  let date = new Date();
  let vSec = String(date.getSeconds()).padStart(2, '0');
  let vMin = String(date.getMinutes()).padStart(2, '0');
  let v24hou = String(date.getHours()).padStart(2, '0');
  let vNoString24hou = date.getHours()
  let v12hou = (v24hou % 12) || 12;

  // Builds the 24 hour Clock in the UTC Time Zone.
  let v24HourClock = v24hou + ":" + vMin + ":" + vSec;

  // AM or PM Check.
  if (vNoString24hou >= 12) { var vAMPM = "PM"; } else { var vAMPM = "AM"; }

  // Builds the 12 hour clock.
  v12HourClock = v12hou + ":" + vMin + ":" + vSec + " " + vAMPM;
  setTimeout(showTime, 1000);
}
showTime()

// Replaces the phrase 'Your Name' with the players name where ever it is used.
let changeText = function (words) {
  text.innerHTML = words.replace("Your Name", player);
};

// This takes the image link and puts it in the proper format and sends it to the html page.
let changeImage = function (img) {
  images.setAttribute('src', img);
};

// This looks at the number of options we have set and creates enough buttons.
function changeButtons(buttonList) {
  buttonBox.innerHTML = "";
  for (let i = 0; i < buttonList.length; i++) {
    buttonBox.innerHTML += `<button class="btn btn-secondary" onClick="${buttonList[i][1]}">${buttonList[i][0]}</button>`;
  };
};

// This is what moves the game along.
let advanceTo = function (s) {
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
      buttons: [["continue", "advanceTo(scenario.eight)"]]
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
// This call starts the scenerio.
window.onload = async function () {
  await getLocation(); // Waits for weather to be set.
  scenario = setScenarioText();
  advanceTo(scenario.one); // Start the game from the beginning.
};