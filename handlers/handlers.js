const { flights } = require('../test-data/flightSeating');

const handleFlight = (req, res) => {
    const _flightNum = req.params.flightNum;
    const seatList = flights[_flightNum];
    if (seatList !== undefined) {
        res.status(200).json({ status: '200', seatList: seatList });
    } else {
        res.status(404).json({ status: '404', error: 'Flight number not found!' });
    }
};

const handleUserConfirm = (req, res) => {
    const { givenName, surname, email, flightNum, selection } = req.body;
    const seatObj = flights[flightNum].find((seat) => { return seat.id === selection });
    seatObj.isAvailable = false;
    res.status(200).json({ givenName, surname, email, flightNum, selection });
};

module.exports = { handleFlight, handleUserConfirm };