// grab reservation list element
const reservationsList = document.getElementById('reservations');
// grab search input
const search = document.getElementById('email');

const handleSearch = () => {
// prevent form from submitting
event.preventDefault();
// reset list if previous search was made
reservationsList.innerHTML = '';

    // fetch reservations list from server
    fetch('/admin/reservations')
        .then((res) => res.json())
        // .then((data) => reservations = data.reservations);
        .then((data) => {
            const reservations = data.reservations;

            // filter reservations for email match
            const userReservations = reservations.filter((reservation) => {
                return reservation.email === search.value;
            });

            if (userReservations[0] !== undefined) {
                // loop through reservations array and insert items in html
                userReservations.forEach((reservation) => {
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
            } else {
                reservationsList.innerHTML = 
                `<p>No reservations found. Please check the email address you entered.</p>`;
            }
    });
};
