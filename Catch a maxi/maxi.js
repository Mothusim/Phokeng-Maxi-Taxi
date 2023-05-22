///------DRIVER SCRIPT-------///

//const signUp = document.querySelector('[data-button]');
const form = document.getElementById('maxi');
const maxiPh = document.getElementById('taxi');
const formDiv = document.getElementById('div_form')
const icon = document.getElementById('taxi_icon')

maxiPh.addEventListener('click', (e) => {
    e.preventDefault()

    if (formDiv.style.display === "none") {
        formDiv.style.display = "block";
        icon.style.display = "none"
        commuterIcon.style.display = "none"
    } else {
        formDiv.style.display = "none";
        icon.style.display = "block"
        commuterIcon.style.display = "block"
    }

});

form.addEventListener('submit', function(e) {
    e.preventDefault()

    let driver = document.getElementById('driverName').value;
    let email = document.getElementById('emailId').value;
    let password = document.getElementById('password').value;

    //storing driver data to localstorage
    
    localStorage.setItem('driverName', driver);
    localStorage.setItem('emailId', email);
    localStorage.setItem('password', password);

    form.reset();

    console.log('Driver stored in local storage successfully!');

    window.location.href = 'driverDashBoard.html';

});

///------COMMUTER SCRIPT-------///

const formCommuter = document.getElementById('commuter');
const commuterCustomer = document.getElementById('customer');
const commuterDiv = document.getElementById('commuter_form');
const commuterIcon = document.getElementById('commuter_icon');

commuterCustomer.addEventListener('click', (e) => {
    e.preventDefault()

    if (commuterDiv.style.display === "none") {
        commuterDiv.style.display = "block";
        commuterIcon.style.display = "none"
        icon.style.display = "none"
    } else {
        commuterDiv.style.display = "none";
        commuterIcon.style.display = "block"
        icon.style.display = "block"
    }

});

formCommuter.addEventListener('submit', function(e) {
    e.preventDefault()

    let commuter = document.getElementById('commuterName').value;
    let emailCommuter = document.getElementById('commuterEmail').value;
    let passwordCommuter = document.getElementById('commuterPassword').value;

    //storing driver data to localstorage
    
    localStorage.setItem('commuterName', commuter);
    localStorage.setItem('commuterEmail', emailCommuter);
    localStorage.setItem('commuterPassword', passwordCommuter);

    formCommuter.reset();

    console.log('Commuter stored in local storage successfully!');

    window.location.href = 'commuterDashB.html';

});