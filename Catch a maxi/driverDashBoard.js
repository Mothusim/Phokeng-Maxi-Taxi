const driverDashB = document.getElementById('driver_dashBoard');
const nameOfDriver = localStorage.getItem('driverName')

let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  // Get the driver's location
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const driverLatLng = new google.maps.LatLng(latitude, longitude);

      // Initialize the map with the driver's location as the center
      map = new Map(document.getElementById("map"), {
        center: driverLatLng,
        zoom: 8,
      });

      // Add a marker at the driver's location
      new google.maps.Marker({
        position: driverLatLng,
        map: map,
        title: nameOfDriver,
      });
    },
    (error) => {
      // Handle geolocation error
      console.error("Error getting driver's location:", error);

      // Initialize the map with a default center if geolocation fails
      map = new Map(document.getElementById("map"), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
      });
    }
  );
}

initMap();





// Obtain the user's latitude and longitude
const driverDiv = document.createElement('div')
driverDiv.setAttribute('class', 'driver_name')
driverDiv.innerHTML =  `<h3>O amogetswe ${nameOfDriver}, a re batle  Bapagami!</h3>`
driverDashB.appendChild(driverDiv)

const div = document.createElement('div');
div.setAttribute('id', 'map');
div.setAttribute('class', 'driver_dashB');
driverDashB.appendChild(div);


  



