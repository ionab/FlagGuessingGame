const MapWrapper = function(element, coords, zoom){
    //dynamic API for tiles
    const osmLayer = new L.TileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");
    //sets parameters of map
    this.map = L.map(element)
      .addLayer(osmLayer)
      .setView(coords, zoom);
    //add marker on click
    this.map.on("click", function(event){
      this.addMarker(event.latlng);
    }.bind(this));
}

//writes move to function which takes in a co-ord
MapWrapper.prototype.moveTo = function(place, name){
    this.map.flyTo(place, 6);
    L.marker(place).addTo(this.map).bindPopup(name).openPopup()
    //adds in a pop up with hyperlink to the wiki page
}

//function for moving to current location
MapWrapper.prototype.currentLocation = function () {
  this.map.locate({setView: true})
};

//function for adding a marker
MapWrapper.prototype.addMarker = function (coords) {
  L.marker(coords).addTo(this.map);

};
