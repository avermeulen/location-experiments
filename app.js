
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

        var subjectName = byId('subjectName');
        var addSubjectButton = byId('addSubjectButton');
        var addSubjectList = byId('subjectList');
        var captureLocation = byId('captureLocation');
        var locations = byId('locations');
        var content = byId('content');

        var subjectLength = 0;

        /*
        subjectName.addEventListener('input', function(){
            subjectLength = subjectName.value.length;
            if (subjectLength > 3){
                //console.log(subjectName.value);
            }
        });
        */

        addSubjectButton.addEventListener('click', function(evt){
            if (subjectName.value.length >= 3){
                addSubjectList.innerHTML += "<li>" + subjectName.value + "</li>";
                subjectName.value = "";
            }

        });

        addSubjectList.addEventListener('click', function(){
            //alert(event.target.innerHTML);
            content.className = "";
        });

        captureLocation.addEventListener('click', function () {
            navigator.geolocation.getCurrentPosition(function(position) {
                var lat_long = position.coords.latitude + ", " + position.coords.longitude;
                locations.innerHTML += "<li>" + lat_long + "</li>";
            });
        });


    });

})(document)
