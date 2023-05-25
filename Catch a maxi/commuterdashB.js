const nameOfCommuter = localStorage.getItem('commuterName');
const dashBCommuter = document.getElementById('commuter_dashBoard');
const commuterDiv = document.createElement('div');
commuterDiv.setAttribute('class', 'commuter_name')
commuterDiv.innerHTML = `<h3>O amogetswe ${nameOfCommuter}, A re tlhole  Dipalangwa!</h3>`
dashBCommuter.appendChild(commuterDiv);

const div = document.createElement('div');
div.setAttribute('id', 'map');
div.setAttribute('class', 'commuterDashB');
dashBCommuter.appendChild(div);

const simuleBtn = document.createElement('div');
simuleBtn.setAttribute('type', 'button');
simuleBtn.setAttribute('class', 'simulate')
simuleBtn.textContent = "Tobetsa fa!, o tlhole!"
dashBCommuter.appendChild(simuleBtn);

let map;
let commuterMarker;
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
                url: './images/commuter.png', // Replace with the path to your custom icon
                scaledSize: new google.maps.Size(42, 42), // Adjust the size as needed
            };

            // Add a marker at the driver's location
            commuterMarker = new google.maps.Marker({
                position: driverLatLng,
                map: map,
                title: nameOfCommuter,
                icon: customIcon
            });

            const nearbyMarkerLatLng = google.maps.geometry.spherical.computeOffset(
                driverLatLng,
                2500, // 2.5 km in meters
                Math.random() * 360 // Random angle in degrees
            );

            new google.maps.Marker({
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
    for (let i = 0; i < 2; i++) {
        const nearbyMarkerLatLng = google.maps.geometry.spherical.computeOffset(
            commuterMarker.getPosition(),
            2500, // 2.5 km in meters
            Math.random() * 360 // Random angle in degrees
        );

        const customIcon = {
            url: './images/taxi.png', // Replace with the path to your custom icon
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
    // Find the nearest marker to the commuterMarker
    let nearestMarker = null;
    let nearestDistance = Infinity;

    markers.forEach((marker) => {
        const distance = google.maps.geometry.spherical.computeDistanceBetween(
            marker.getPosition(),
            commuterMarker.getPosition()
        );

        if (distance < nearestDistance) {
            nearestMarker = marker;
            nearestDistance = distance;
        }
    });

    // Create a route from the nearest marker to the commuterMarker
    directionsService = new google.maps.DirectionsService();
    directionsRenderer = new google.maps.DirectionsRenderer({
        map: map,
    });

    const request = {
        origin: nearestMarker.getPosition(),
        destination: commuterMarker.getPosition(),
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsRenderer.setDirections(response);

            // Move the nearest marker along the route
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
                nearestMarker.setPosition(position);

                step++;
            }, 100); // Adjust the interval duration as needed
        } else {
            console.error('Error creating route:', status);
        }
    });
}

function handleRouteCompletion(marker) {
    directionsRenderer.setDirections({ routes: [] }); // Clear the route
    marker.setMap(null); // Remove the completed marker
}

initMap();