// grab and define url
const url = new URL(window.location.href);

// define query params
const givenName = url.searchParams.get('givenName');
const surname = url.searchParams.get('surname');
const email = url.searchParams.get('email');
const flightNum = url.searchParams.get('flightNum');
const selection = url.searchParams.get('selection');

// insert params into html elements
document.getElementById('flight').innerText = flightNum;
document.getElementById('seat').innerText = selection;
document.getElementById('name').innerText = givenName + ' ' + surname;
document.getElementById('email').innerText = email;
