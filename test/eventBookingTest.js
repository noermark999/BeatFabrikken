import chai, { expect } from 'chai';
import supertest from 'supertest';
import appModule from '../app.js';
import bookingDBFunctions from '../service/BookingDBFunctions.js';

const app = appModule.app;
const request = supertest(app);
const assert = chai.assert;

const adminUser = supertest.agent(app)
await adminUser.post('/login').send({username: 'test', password: 'test'})

/*
describe('test af event booking via DB', () => {
    it('burde oprette en event', async () => {
        // data for at lave bookningen
        const date = "2024-01-20"
        const tid = "20:00"
        const lokaleId = "Sal 2"
        const eventNavn = "Testing event"
        const slutDato = "2024-01-20"
        const sluttid = "22:00"

        let startDate = new Date();
        startDate.setHours(tid.substring(0, 2));
        startDate.setFullYear(date.substring(0, 4), date.substring(5, 7), date.substring(8, 10))
        startDate.setMonth(startDate.getMonth() - 1)

        let slutDate = new Date();
        slutDate.setHours(sluttid.substring(0, 2));
        slutDate.setFullYear(slutDato.substring(0, 4), slutDato.substring(5, 7), slutDato.substring(8, 10))
        slutDate.setMonth(slutDate.getMonth() - 1)
      
        let eventBooking = { dato: date, lokaleId: lokaleId, tid: tid, username: eventNavn, isEvent: true }
  
        // kald på funktionen der opretter bookningen
        await bookingDBFunctions.addEventBooking(eventBooking, startDate, slutDate);
    
        // hent bookningen og tjek om det er korrekt
        const oprettetBooking20 = await bookingDBFunctions.getBooking(date, tid, lokaleId)
        const oprettetBooking21 = await bookingDBFunctions.getBooking(date, "21:00", lokaleId)
        const oprettetBooking22 = await bookingDBFunctions.getBooking(date, "22:00", lokaleId)

        // Assertions
        // 20
        expect(oprettetBooking20).to.not.be.null;
        expect(oprettetBooking20.dato).to.equal(date);
        expect(oprettetBooking20.tid).to.equal("20:00");
        // 21
        expect(oprettetBooking21).to.not.be.null;
        expect(oprettetBooking21.dato).to.equal(date);
        expect(oprettetBooking21.tid).to.equal("21:00");
        // 22
        expect(oprettetBooking22).to.not.be.null;
        expect(oprettetBooking22.dato).to.equal(date);
        expect(oprettetBooking22.tid).to.equal("22:00");
    });
  });*/

  
  describe('test af event booking post route', () => {
    /*it('burde oprette en event', async () => {
        // data for at lave bookningen
        const date = "2024-01-21"
        const tid = "20:00"
        const lokaleId = "Sal 2"
        const eventNavn = "Testing event"
        const antalDeltagere = 25
        const slutDato = "2024-01-21"
        const sluttid = "22:00"

        const payload = {date: date, lokaleId: lokaleId, tid: tid, eventNavn: eventNavn, antalDeltagere: antalDeltagere, slutDato: slutDato, sluttid: sluttid}
        
        // kald på route der opretter bookningen
        await adminUser.post('/booking/eventbooking').send(payload).expect(200)
        // hent bookningen og tjek om det er korrekt
        const oprettetBooking20 = await bookingDBFunctions.getBooking(date, tid, lokaleId)
        const oprettetBooking21 = await bookingDBFunctions.getBooking(date, "21:00", lokaleId)
        const oprettetBooking22 = await bookingDBFunctions.getBooking(date, "22:00", lokaleId)

        // Assertions
        // 20
        expect(oprettetBooking20).to.not.be.null;
        expect(oprettetBooking20.dato).to.equal(date);
        expect(oprettetBooking20.tid).to.equal("20:00");
        // 21
        expect(oprettetBooking21).to.not.be.null;
        expect(oprettetBooking21.dato).to.equal(date);
        expect(oprettetBooking21.tid).to.equal("21:00");
        // 22
        expect(oprettetBooking22).to.not.be.null;
        expect(oprettetBooking22.dato).to.equal(date);
        expect(oprettetBooking22.tid).to.equal("22:00");
    });*/
    it('burde fejle uden login ved at oprette en event', async () => {
        // data for at lave bookningen
        const date = "2024-01-21"
        const tid = "20:00"
        const lokaleId = "Sal 2"
        const eventNavn = "Testing event"
        const antalDeltagere = 25
        const slutDato = "2024-01-21"
        const sluttid = "22:00"

        const payload = {date: date, lokaleId: lokaleId, tid: tid, eventNavn: eventNavn, antalDeltagere: antalDeltagere, slutDato: slutDato, sluttid: sluttid}
        
        // kald på route der opretter bookningen
        await request.post('/booking/eventbooking').send(payload).expect(200)
    });
  });