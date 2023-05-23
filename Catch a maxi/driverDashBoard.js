const nameOfDriver = localStorage.getItem('driverName');
const driverDashB = document.getElementById('driver_dashBoard');
const driverDiv = document.createElement('div')
driverDiv.setAttribute('class', 'driver_name')
driverDiv.innerHTML = `<h3>O amogetswe ${nameOfDriver}, a re batle  Bapagami!</h3>`
driverDashB.appendChild(driverDiv)

const div = document.createElement('div');
div.setAttribute('id', 'map');
div.setAttribute('class', 'driver_dashB');
driverDashB.appendChild(div);

const simuleBtn = document.createElement('div');
simuleBtn.setAttribute('type', 'button');
simuleBtn.setAttribute('class', 'simulate')
simuleBtn.textContent = "Tobetsa fa!, re spane!"
driverDashB.appendChild(simuleBtn)

let map;
let driverMarker;
let markers = [];
let directionsService;
let directionsRenderer;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    const { geometry } = await google.maps.importLibrary('geometry');

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

            const customIcon = {
                url: './images/taxi.png', // Replace with the path to your custom icon
                scaledSize: new google.maps.Size(42, 42), // Adjust the size as needed
            };

            // Add a marker at the driver's location
            driverMarker = new google.maps.Marker({
                position: driverLatLng,
                map: map,
                title: nameOfDriver,
                icon: customIcon
            });

            const nearbyMarkerLatLng = google.maps.geometry.spherical.computeOffset(
                driverLatLng,
                2500, // 2.5 km in meters
                Math.random() * 360 // Random angle in degrees
            );

            commuterMarker = new google.maps.Marker({
                position: nearbyMarkerLatLng,
                map: map,
                title: 'Nearby Marker'
            });

            generateMarkers();

            simuleBtn.addEventListener('click', simulateRoute);

        },
        (error) => {
            // Handle geolocation error
            console.error("Error getting driver's location:", error);

        }
    );
}

function generateMarkers() {
    for (let i = 0; i < 5; i++) {
        const nearbyMarkerLatLng = google.maps.geometry.spherical.computeOffset(
            driverMarker.getPosition(),
            2500, // 2.5 km in meters
            Math.random() * 360 // Random angle in degrees
        );

        const customIcon = {
            url: './images/commuter.png', // Replace with the path to your custom icon
            scaledSize: new google.maps.Size(42, 42), // Adjust the size as needed
        };

        const marker = new google.maps.Marker({
            position: nearbyMarkerLatLng,
            map: map,
            title: `Marker ${i + 1}`,
            icon: customIcon
        });

        markers.push(marker);
    }
}

function simulateRoute() {
    if (markers.length === 0) {
        console.log("No markers available.");
        return;
    }

    if (!directionsService) {
        directionsService = new google.maps.DirectionsService();
    }

    if (!directionsRenderer) {
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map
        });
    }

    const nearestMarker = findNearestMarker();

    if (!nearestMarker) {
        console.log("No nearest marker found.");
        return;
    }

    const request = {
        origin: driverMarker.getPosition(),
        destination: nearestMarker.getPosition(),
        travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);

            const route = response.routes[0];
            const routePath = route.overview_path;
            const numSteps = routePath.length;

            let step = 0;
            const intervalId = setInterval(() => {
                if (step >= numSteps) {
                    clearInterval(intervalId);
                    handleRouteCompletion(nearestMarker);
                    return;
                }

                const position = routePath[step];
                driverMarker.setPosition(position);

                step++;
            }, 100); // Adjust the interval duration as needed
        } else {
            console.error('Error creating route:', status);
        }
    });
}

// function handleRouteCompletion() {
//     directionsRenderer.setDirections({ routes: [] }); // Clear the route
//     commuterMarker.setMap(null); // Remove the added marker
// }

function findNearestMarker() {
    let nearestMarker = null;
    let nearestDistance = Infinity;

    markers.forEach(marker => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            driverMarker.getPosition(),
            marker.getPosition()
        );

        if (distance < nearestDistance) {
            nearestDistance = distance;
            nearestMarker = marker;
        }
    });

    return nearestMarker;
}

function handleRouteCompletion(marker) {
    directionsRenderer.setDirections({ routes: [] }); // Clear the route
    marker.setMap(null); // Remove the marker

    const markerIndex = markers.indexOf(marker);
    if (markerIndex > -1) {
        markers.splice(markerIndex, 1);
    }

    if (markers.length > 0) {
        simulateRoute();
    } else {
        console.log("All markers visited.");
    }
}


initMap();






