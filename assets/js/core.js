async function addUser() {
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });
    const inputFields = document.querySelectorAll('input')
    let validationFailed = false
    inputFields.forEach(elem => {
        if (elem.value.trim() === '') {
            validationFailed = true;
            return
        }
        if (elem.id === 'floatingEmail') {
            const char1 = '@'
            if (!elem.value.includes(char1)) {
                validationFailed = true;
                return
            }
        }
    })
    if (!validationFailed) {
        const username = inputFields[0].value.trim();
        const password = inputFields[1].value.trim();
        const firstName = inputFields[2].value.trim();
        const lastName = inputFields[3].value.trim();
        const email = inputFields[4].value.trim();
        const mobileNumber = inputFields[5].value.trim();
        let data = { username: username, password: password, firstName: firstName, lastName: lastName, email: email, mobilnummer: mobileNumber }
        let url = '/registrering';
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status == 200) {
            window.location = "/login";
        } else {
            const usernameInput = document.getElementById("floatingUsername")
            usernameInput.classList.add("is-invalid")
            const usernameExistsAlert = document.getElementById("username-exists")
            usernameExistsAlert.classList.remove("visually-hidden")
        }
    }
}

async function addHold() {
    console.log("vi er her")
    document.getElementById('opretHoldForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });
    const inputFields = document.querySelectorAll(".form-control")
    inputFields.forEach(elem => {
        console.log(elem.value)
    })
    let validationFailed = false
    inputFields.forEach(elem => {
        if (elem.value.trim() === '') {
            validationFailed = true;
            return
        }
    })
    if (!validationFailed) {
        const alder = inputFields[0].value.trim();
        const holdNavn = inputFields[1].value.trim();
        const instruktør = inputFields[2].value.trim();
        const pris = inputFields[3].value.trim();
        let data = {alder: alder, holdNavn: holdNavn, instruktør: instruktør, pris: pris}
        let url = '/admin/opretHold'
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status == 200) {
            window.location = "/admin";
        } else {
            const usernameInput = document.getElementById("floatingHoldNavn")
            usernameInput.classList.add("is-invalid")
            const holdNavnExistsAlert = document.getElementById("holdNavn-exists")
            holdNavnExistsAlert.classList.remove("visually-hidden")
        }

    }
}

//Booking function
async function book() {
    //Fjerner alerts
    document.querySelectorAll('[role="alert"]').forEach((e) => {
        e.classList.add("visually-hidden")
    })

    if (document.getElementById('btncheck1').checked) {
        await fastBook();
    } else {

        const date = document.getElementById("datepicker").value;
        const lokaleId = document.getElementById("lokaleSelect").value;
        const tid = document.getElementById("tidSelect").value;
        let idag = new Date();
        let bookDato = new Date();
        bookDato.setHours(tid.substring(0, 2));
        bookDato.setFullYear(date.substring(0, 4), date.substring(5, 7), date.substring(8, 10))
        bookDato.setMonth(bookDato.getMonth() - 1)

        if (bookDato.getTime() < idag.getTime()) {
            const bookingDateFailureAlert = document.getElementById("BookingDateFailureAlert")
            bookingDateFailureAlert.classList.remove("visually-hidden")
        } else {
            let data = { date: date, lokaleId: lokaleId, tid: tid }
            let url = '/booking';
            const response = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' }
            })
            if (response.status == 200) {
                const bookingOprettetAlert = document.getElementById("BookingSuccessAlert")
                bookingOprettetAlert.classList.remove("visually-hidden")
            } else if (response.status == 208) {
                const bookingLoginFailureAlert = document.getElementById("BookingLoginFailureAlert")
                bookingLoginFailureAlert.classList.remove("visually-hidden")
            } else if (response.status == 210) {
                const bookingFailureAlert = document.getElementById("BookingFailureAlert")
                bookingFailureAlert.classList.remove("visually-hidden")
            }
        }
    }
}

async function fastBook() {
    const date = document.getElementById("datepicker").value;
    const lokaleId = document.getElementById("lokaleSelect").value;
    const tid = document.getElementById("tidSelect").value;
    const hold = document.getElementById('holdSelect').value;
    const slutDato = document.getElementById('datepickerSlut').value;
    let data = { date: date, lokaleId: lokaleId, tid: tid, hold: hold, slutDato: slutDato }
    let url = '/booking/fastbooking';
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })

    if (response.status == 200) {
        const bookingOprettetAlert = document.getElementById("BookingSuccessAlert")
        bookingOprettetAlert.classList.remove("visually-hidden")
    } else if (response.status == 208) {
        const bookingLoginFailureAlert = document.getElementById("BookingLoginFailureAlert")
        bookingLoginFailureAlert.classList.remove("visually-hidden")
    } else if (response.status == 210) {
        const bookingFailureAlert = document.getElementById("BookingFailureAlert")
        bookingFailureAlert.classList.remove("visually-hidden")
    }
}

async function updateUser() {
    document.getElementById('redigeringsForm').addEventListener('submit', function (event) {
        event.preventDefault();
    });
    const inputFields = document.querySelectorAll('input')
    let validationFailed = false
    inputFields.forEach(elem => {
        if (elem.value.trim() === '') {
            validationFailed = true;
            return
        }
        if (elem.id === 'floatingEmail') {
            const char1 = '@'
            if (!elem.value.includes(char1)) {
                validationFailed = true;
                return
            }
        }
    })
    if (!validationFailed) {
        const username = inputFields[0].value.trim();
        const email = inputFields[1].value.trim();
        const firstName = inputFields[2].value.trim();
        const lastName = inputFields[3].value.trim();
        const mobileNumber = inputFields[4].value.trim();
        let data = { username: username, email: email, firstname: firstName, lastname: lastName, mobilnummer: mobileNumber }
        let url = '/profil/edit';
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
        if (response.status == 200) {
            window.location = "/profil";
        } else {
            const usernameInput = document.getElementById("floatingUsername")
            usernameInput.classList.add("is-invalid")
            const usernameExistsAlert = document.getElementById("username-exists")
            usernameExistsAlert.classList.remove("visually-hidden")
        }
    }
}

const getPreviousMonday = (date = null) => {
    const prevMonday = date && new Date(date.valueOf()) || new Date()
    prevMonday.setDate(prevMonday.getDate() - (prevMonday.getDay() + 6) % 7)
    return prevMonday
}

if (window.location.pathname == '/booking') {
    document.getElementById('datepicker').valueAsDate = new Date();
    let date = document.getElementById("datepicker").value;
    let getPrevMonday = getPreviousMonday(date).toISOString().slice(0, 10)
    const inputField = document.getElementById("datepicker")
    inputField.addEventListener("input", function () {
        date = document.getElementById("datepicker").value;
        const currentMonday = getPreviousMonday(date).toISOString().slice(0, 10)
        if (currentMonday != getPrevMonday) {
            clearCalendar()
            getPrevMonday = getPreviousMonday(date).toISOString().slice(0, 10)
        }
    });
    updateCalendar()
}

async function updateCalendar() {
    const tbodyTr = document.querySelectorAll("tbody tr")
    const theadTh = document.querySelectorAll("thead th")
    const lokaleId = document.getElementById("lokaleSelect").value;
    const date = document.getElementById("datepicker").value;
    const getPrevMonday = getPreviousMonday(date).toISOString().slice(0, 10);
    const time = document.querySelectorAll("tbody td")

    let url = '/booking/' + getPrevMonday + '/' + lokaleId;
    const response = await fetch(url)
    const data = await response.json();

    console.log(data);

    for (let i = 0; i < theadTh.length - 1; i++) {
        let currentDay = new Date(getPreviousMonday(date).setDate(getPreviousMonday(date).getDate() + i)).toISOString().slice(0, 10)
        let h = 0
        tbodyTr.forEach(tr => {
            let boxCreated = false
            for (let k = 0; k < data.length; k++) {
                if (data[k].tid === time[h].innerHTML && data[k].dato === currentDay) {
                    const td = tr.insertCell(-1)
                    td.classList.add("text-bg-danger")
                    if (data[k].username == "åben træning") {
                        td.classList.add("aaben")
                        td.innerHTML = "åben træning"
                    }
                    boxCreated = true
                    break
                }
            }
            if (!boxCreated) {
                const td = tr.insertCell(-1)
                td.classList.add("text-bg-success")
            }
            h++
        });
    }
}

function clearCalendar() {
    const tbodyTr = document.querySelectorAll("tbody tr")
    tbodyTr.forEach(tr => {
        const tds = tr.querySelectorAll("td")
        tds.forEach(td => {
            if (td.innerHTML == '' || td.innerHTML == "åben træning") {
                td.remove()
            }
        })
    })
    updateCalendar()
}

function showHideTab(number) {
    const tab1 = document.getElementById('tab1')
    const tab2 = document.getElementById('tab2')
    switch (number) {
        case 1:
            if (tab1.classList.contains('visually-hidden')) {
                tab1.classList.remove('visually-hidden')
            }
            tab2.classList.add('visually-hidden')
            break;
        case 2:
            if (tab2.classList.contains('visually-hidden')) {
                tab2.classList.remove('visually-hidden')
            }
            tab1.classList.add('visually-hidden')
        default:
            break;
    }
}