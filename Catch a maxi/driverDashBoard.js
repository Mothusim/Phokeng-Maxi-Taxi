const driverDashB = document.getElementById('driver_dashBoard');
const nameOfDriver = localStorage.getItem('driverName')

if ('geolocation' in navigator) {
    // Geolocation API is available
    navigator.geolocation.getCurrentPosition(
        function (position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
    
            // Create a map centered on the user's location
            const map = L.mapquest.map('map', {
                center: [latitude, longitude],
                layers: L.mapquest.tileLayer('map'),
                zoom: 12
            });
    
            // Add a marker at the user's location
            L.marker([latitude, longitude], {
                icon: L.mapquest.icons.marker(),
                draggable: false
            }).addTo(map);
        },
        function (error) {
            // Error callback
            console.log('Error occurred. Error code: ' + error.code);
        }
    );
    
} else {
    console.log('Geolocation is not supported');
}

// Replace 'YOUR_API_KEY' with your actual MapQuest API key
L.mapquest.key = 'KEY&from=Denver%2C+CO&to=Boulder%2C+CO&outFormat=json&ambiguities=ignore&routeType=fastest&doReverseGeocode=false&enhancedNarrative=false&avoidTimedConditions=true';


// Obtain the user's latitude and longitude
const driverDiv = document.createElement('div')
driverDiv.setAttribute('class', 'driver_name')
driverDiv.innerHTML =  `<h3>O amogetswe ${nameOfDriver}, a re batle  Bapagami!</h3>`
driverDashB.appendChild(driverDiv)

const div = document.createElement('div');
div.setAttribute('id', 'map');
div.setAttribute('class', 'driver_dashB');
driverDashB.appendChild(div);


  



