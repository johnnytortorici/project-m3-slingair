// fetch reservations list from server
fetch('/admin/reservations')
.then((res) => res.json())
// .then((data) => reservations = data.reservations);
.then((data) => {
    const reservations = data.reservations;

    // grab reservation list element
    const reservationsList = document.getElementById('reservations');
    // loop through reservations array and insert items in html
    reservations.forEach((reservation) => {
    const reservationItem = document.createElement('li');
    reservationItem.innerHTML = 
    `<ul>
        <li>Reservation Link: <a href="/view-reservation/${reservation.id}" target="_self">view reservation</a></li>
        <li>Flight: ${reservation.flight}</li>
        <li>Seat: ${reservation.seat}</li>
        <li>Name: ${reservation.givenName} ${reservation.surname}</li>
        <li>Email: ${reservation.email}</li>
    </ul>`;
    reservationsList.appendChild(reservationItem);
});
});

