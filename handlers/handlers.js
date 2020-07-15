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

module.exports = { handleFlight };