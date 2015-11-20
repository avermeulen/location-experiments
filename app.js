
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function byId(id){
    return document.getElementById(id);
}

(function(document){

    ready(function(){

        var locationName = byId('locationName');
        var addLocationButton = byId('addLocationButton');
        var addSubjectList = byId('subjectList');
        var captureLocation = byId('captureLocation');
        var locations = byId('locations');
        var content = byId('content');
        var displayLocation = byId('displayLocation');

        var locationDatabase = new PouchDB('locations');
        var currentKey = "";
        var currentLocation = "";

        locationDatabase.allDocs({}, function(err, docs){
            if (err) return alert(err);

            var rows = docs.rows;
            for (var itemIndex in rows){
                var item = rows[itemIndex];
                addSubjectList.innerHTML += "<li>" + item.key + "</li>";
            }
        });

        addLocationButton.addEventListener('click', function(evt){
            if (locationName.value.length >= 3){

                var location = {
                    _id : locationName.value,
                    locations : []
                };

                locationDatabase.put(location, function(err, result){

                    if (err) return alert(err);

                    addSubjectList.innerHTML += "<li>" + locationName.value + "</li>";
                    locationName.value = "";
                });

            }

        });

        addSubjectList.addEventListener('click', function(){
            content.className = "";
            //
            currentKey = event.target.innerHTML;
            displayLocation.innerHTML = currentKey;

            locationDatabase
                .get(currentKey)
                .then(function(theLocation){
                    currentLocation = theLocation;
                    locations.innerHTML = "";
                    var locationList = currentLocation.locations;
                    for (var i = 0; i < locationList.length; i++) {
                        var loc = locationList[i];
                        var locationString = loc.lat + ", " + loc.long;
                        locations.innerHTML += "<li>" + locationString + "</li>";
                    }
                });

        });

        captureLocation.addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat_long = { lat  : position.coords.latitude,
                                 long : position.coords.longitude};

                currentLocation.locations = currentLocation.locations || [];
                currentLocation.locations.push(lat_long);

                locationDatabase.put(currentLocation, function(err, location){
                    if (err) return alert(err);

                    var locationString = lat_long.lat + ", " + lat_long.long;
                    locations.innerHTML += "<li>" + locationString + "</li>";

                });
            });
        });


    });

})(document)
