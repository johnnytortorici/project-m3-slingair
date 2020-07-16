const { flights } = require('../test-data/flightSeating');
const { reservations } = require('../test-data/reservations');

const handleFlights = (req, res) => {
    res.status(200).json({ flights: Object.keys(flights) });
};

const handleFlight = (req, res) => {
    const _flightNum = req.params.flightNum;
    const seatList = flights[_flightNum];
    if (seatList !== undefined) {
        res.status(200).json({ status: '200', seatList: seatList });
    } else {
        res.status(404).json({ status: '404', error: 'Flight number not found!' });
    }
};

const handleViewReservation = (req, res) => {
    const _id = req.params.id;
    const thisReservation = reservations.find((reservation) => { return reservation.id === _id });

    if (thisReservation !== undefined) {
        const { givenName, surname, email, flight, seat } = thisReservation;
        res.status(200).redirect(`/view-reservation?givenName=${givenName}&surname=${surname}&email=${email}&flightNum=${flight}&selection=${seat}`);
    } else {
        res.status(404).json({ status: 404, error: 'Reservation not found.' });
    }
    
};

const handleAdmin = (req, res) => {
    res.status(200).json({ status: 200, reservations: reservations });
};

const handleUserSubmit = (req, res) => {
    const { givenName, surname, email, flightNum, selection } = req.body;
    const seatObj = flights[flightNum].find((seat) => { return seat.id === selection });
    if (seatObj.isAvailable) {
        seatObj.isAvailable = false;
        res.status(201).json({ givenName, surname, email, flightNum, selection });
    } else {
        res.status(400).json({ error: 'Sorry but that seat is already taken!' });
    }
};

module.exports = { handleFlights, handleFlight, handleViewReservation, handleAdmin, handleUserSubmit };