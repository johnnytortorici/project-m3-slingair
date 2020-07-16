const flightInput = document.getElementById('flight');
const seatsDiv = document.getElementById('seats-section');
const confirmButton = document.getElementById('confirm-button');

let selection = '';
let flightNumber = '';

const renderSeats = (seatList) => {
    document.querySelector('.form-container').style.display = 'block';

    const alpha = ['A', 'B', 'C', 'D', 'E', 'F'];
    for (let r = 1; r < 11; r++) {
        const row = document.createElement('ol');
        row.classList.add('row');
        row.classList.add('fuselage');
        seatsDiv.appendChild(row);
        for (let s = 1; s < 7; s++) {
            const seatNumber = `${r}${alpha[s-1]}`;
            const seat = document.createElement('li');

            // Two types of seats to render
            const seatOccupied = `<li><label class="seat"><span id="${seatNumber}" class="occupied">${seatNumber}</span></label></li>`
            const seatAvailable = `<li><label class="seat"><input type="radio" name="seat" value="${seatNumber}" /><span id="${seatNumber}" class="avail">${seatNumber}</span></label></li>`        
            
            // DONE: render the seat availability based on the data...
            const thisSeat = seatList.find((seat) => { return seat.id === seatNumber });
            // if thisSeat is avail, render seatAvailable, else render seatOccupied
            (thisSeat.isAvailable) ? seat.innerHTML = seatAvailable : seat.innerHTML = seatOccupied;
            // append seat
            row.appendChild(seat);
        }
    }
    
    let seatMap = document.forms['seats'].elements['seat'];
    seatMap.forEach(seat => {
        seat.onclick = () => {
            selection = seat.value;
            seatMap.forEach(x => {
                if (x.value !== seat.value) {
                    document.getElementById(x.value).classList.remove('selected');
                }
            })
            document.getElementById(seat.value).classList.add('selected');
            document.getElementById('seat-number').innerText = `(${selection})`;
            confirmButton.disabled = false;
        }
    });
}

const toggleFormContent = (event) => {
    flightNumber = flightInput.value;
    console.log('toggleFormContent: ', flightNumber);
    if (flightNumber.startsWith('SA')) {
        fetch(`/flights/${flightNumber}`)
        .then(res => res.json())
        .then(data => {
            (data.status === '200') ? renderSeats(data.seatList) : alert('Flight not found');
        })
    } else {
        alert('Flight number must be SA###');
    }
    
    // DONE: contact the server to get the seating availability
    //      DONE - only contact the server if the flight number is this format 'SA###'.
    //      DONE - Do I need to create an error message if the number is not valid?
    // DONE: Pass the response data to renderSeats to create the appropriate seat-type.
    
}

const handleConfirmSeat = (event) => {
    event.preventDefault();
    // DONE: everything in here!
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify({
            'givenName': document.getElementById('givenName').value,
            'surname': document.getElementById('surname').value,
            'email': document.getElementById('email').value,
            'flightNum': flightNumber,
            'selection': selection
        }),
        headers: {
            'Accept': 'application/json',
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json())
    .then((data) => {
        const { givenName, surname, email, flightNum, selection } = data;
        const url = `/confirmed?givenName=${givenName}&surname=${surname}&email=${email}&flightNum=${flightNum}&selection=${selection}`;
        window.location.href = url;
    });
}

flightInput.addEventListener('blur', toggleFormContent);