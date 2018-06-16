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
   populateList(countries);


}

const populateList = function(countries){
   const ul = document.querySelector('#country-list');
   countries.forEach(function(country){
     const button = document.createElement('button');
     const img = document.createElement("img");
     img.src = country.flag;
     img.height = 15;
     img.padding = 15;
     img.alt = country.name;
     ul.appendChild(button);
     button.appendChild(img);
     button.addEventListener('click', function(){
       handlebuttonclick(country)
     });
   });

   const mapDiv = document.getElementById("main-map");
   const glasgow = [55.854979, -4.243281];
   const zoomLevel = 6;
   mainMap = new MapWrapper(mapDiv, glasgow, zoomLevel);
}

const handlebuttonclick = function(country){
  const newLocation = country.latlng;
  const name = country.name;
  mainMap.moveTo(newLocation, name)
}
window.addEventListener('load', app);
