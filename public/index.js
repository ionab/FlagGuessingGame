const app = function(){
 const url = "https://restcountries.eu/rest/v2/all";
 makeRequest(url, requestComplete);
}

const makeRequest = function(url, callback){
 // back in the day was XML but now returns JSON, still called XML.
 const request = new XMLHttpRequest();
 request.open("GET", url);
 request.addEventListener("load", callback);
 request.send();

}
const requestComplete = function(){
   if(this.status !== 200) return;
   const countries = JSON.parse(this.response);
   console.log(this);
   populateFlagList(countries);
   populateDropdown(countries);

}
const populateFlagList = function(countries){
   const ul = document.querySelector('#country-list');
   countries.forEach(function(country){
     const button = document.createElement('button');
     const img = document.createElement("img");
     img.src = country.flag;
     img.height = 60;
     img.alt = country.name;
     ul.appendChild(button);
     button.appendChild(img);
     button.addEventListener('click', function(){
       handlebuttonclick(country, countries)
     });
   });
   const mapDiv = document.getElementById("main-map");
   const glasgow = [55.854979, -4.243281];
   const zoomLevel = 6;
   mainMap = new MapWrapper(mapDiv, glasgow, zoomLevel);
}

const handlebuttonclick = function(country, countries){
  //button brings up a bigger picture of flag
  //with an input for a guess the country
  const clues = document.querySelector("#guess-pannel");
  //clears the previous flag clues
  clues.innerHTML = "";
  //shows bigger picture of flag
  const flag = document.createElement('img');
  flag.src = country.flag;
  flag.height = 100;
  flag.padding = 15;
  flag.alt = country.name;
  clues.appendChild(flag);
  //shows clues list
  const cluesList = document.createElement('ul');
  const capital = document.createElement('li');
  const population = document.createElement('li');
  const region = document.createElement('li');
  capital.textContent = "Capital: " + country.capital;
  population.textContent = "Population: " + country.population;
  region.textContent = "Region: " + country.region;
  clues.appendChild(cluesList);
  cluesList.appendChild(capital);
  cluesList.appendChild(population);
  cluesList.appendChild(region);

  //creates an input box for the user to guess which country they think it is.
  const guess = document.querySelector('#guess');
  guess.addEventListener('change', function(){
    var submittedAnswer = countries[guess.value];
    handleSubmit(country, submittedAnswer, countries);
  });
}
correctGuesses = 0;
wrongGuesses = 0;
const handleSubmit = function(country, submittedAnswer, countries){
  if (submittedAnswer === country){
    //move map and tag it
    const newLocation = country.latlng;
    const img = document.createElement("img");
    img.src = country.flag;
    img.height = 60;
    const name = country.name;
    mainMap.moveTo(newLocation, name, img);
    //increment counter
    const score = document.querySelector("#counter");
    correctGuesses++;
    let totalCountries = countries.length
    score.textContent = `You have ${correctGuesses} of ${totalCountries} correct.`
  } else if (submittedAnswer !== country) {
    wrongGuesses++;
    // const incorrect = document.querySelector("#wrong-guesses");
    // incorrect.textContent = `${wrongGuesses} wrong answers`;
  }
}

const populateDropdown = function(countries){
  const dropdown = document.querySelector('#guess');
  countries.forEach(function(country){
    const option = document.createElement('option');
    option.value = countries.indexOf(country);
    option.textContent = country.name;
    dropdown.appendChild(option);
  });
}

window.addEventListener('load', app);
