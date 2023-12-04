import chai, { expect } from 'chai';
import supertest from 'supertest';
import appModule from '../app.js';
import { describe, it } from 'mocha';
import request from 'supertest';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import bookingDBFunctions from '../service/BookingDBFunctions.js';
import e from 'express';

const app = appModule.app;

const assert = chai.assert;

const adminUser = supertest.agent(app)
await adminUser.post('/login').send({username: 'test', password: 'test'})


describe('test af opret fast booking', () => {
    it('burde oprette en fast booking over tre uger', async () => {
        // Data for booking
        // Declare and initialize startDato
        let startDato = new Date();
        let Dato = '2023-12-10'

        // Adjust startDato based on the values extracted from the 'date' string
        startDato.setFullYear(Dato.substring(0, 4), Dato.substring(5, 7) - 1, Dato.substring(8, 10));

        // Declare and initialize startDato
        let slutDato = new Date();
        Dato = '2023-12-24'

        // Adjust startDato based on the values extracted from the 'date' string
        slutDato.setFullYear(Dato.substring(0, 4), Dato.substring(5, 7) - 1, Dato.substring(8, 10));


        const bookingData = {
            startDato: startDato,
            lokaleId: 'Sal 2',
            tid: '09:00',
            username: 'test'
        };
        

        // Logger ind
        await supertest(app).post('/login').send({username: 'test', password: 'test'})

        //const response = await supertest(app).post('/admin/opretHold').send({holdData});
        await bookingDBFunctions.addFastBooking(bookingData, bookingData.startDato, slutDato)


        const bookingData1 = {startDato: '2023-12-10',lokaleId: 'Sal 2',tid: '09:00',username: 'test'};
        const bookingData2 = {startDato: '2023-12-17',lokaleId: 'Sal 2',tid: '09:00',username: 'test'};
        const bookingData3 = {startDato: '2023-12-24',lokaleId: 'Sal 2',tid: '09:00',username: 'test'};
        

        // Hent bookinger og tjek
        const fastBooking1 = await bookingDBFunctions.getBooking('2023-12-10', '09:00', 'Sal 2');
        const fastBooking2 = await bookingDBFunctions.getBooking('2023-12-17', '09:00', 'Sal 2');
        const fastBooking3 = await bookingDBFunctions.getBooking('2023-12-24', '09:00', 'Sal 2');

        // Assertions
        //expect(response.status).to.equal(200);
        expect(fastBooking1).to.not.be.null;
        expect(fastBooking1).to.equal(bookingData1);

        expect(fastBooking2).to.not.be.null;
        expect(fastBooking2).to.equal(bookingData1);

        expect(fastBooking3).to.not.be.null;
        expect(fastBooking3).to.equal(bookingData1);
    });
});
