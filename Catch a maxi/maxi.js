const signUp = document.querySelector('[data-button]');
const form = document.getElementById('maxi');
const maxiPh = document.getElementById('taxi');
const formDiv = document.getElementById('div_form')
const icon = document.getElementById('taxi_icon')

maxiPh.addEventListener('click', (e) => {
    e.preventDefault()

    if (formDiv.style.display === "none") {
        formDiv.style.display = "block";
        icon.style.display = "none"
    } else {
        formDiv.style.display = "none";
        icon.style.display = "block"
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

    console.log('Data stored in local storage successfully!');

    window.location.href = 'driverDashBoard.html';

});

