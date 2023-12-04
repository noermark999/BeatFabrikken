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


        let startDato = '2023-12-10'

        let slutDato = '2023-12-24'

        const bookingData = {
            date: startDato,
            lokaleId: 'Sal 2',
            tid: '09:00',
            hold: 'test',
            slutDato: slutDato
        };

        const bookingData1 = {dato: '2023-12-10',lokaleId: 'Sal 2',tid: '09:00',username: 'test'};
        const bookingData2 = {dato: '2023-12-17',lokaleId: 'Sal 2',tid: '09:00',username: 'test'};
        const bookingData3 = {dato: '2023-12-24',lokaleId: 'Sal 2',tid: '09:00',username: 'test'};
        

        // Hent bookinger og tjek
        const fastBooking1 = await bookingDBFunctions.getBooking('2023-12-10', '09:00', 'Sal 2');
        const fastBooking2 = await bookingDBFunctions.getBooking('2023-12-17', '09:00', 'Sal 2');
        const fastBooking3 = await bookingDBFunctions.getBooking('2023-12-24', '09:00', 'Sal 2');

        await bookingDBFunctions.deleteBooking(fastBooking1.docID)
        await bookingDBFunctions.deleteBooking(fastBooking2.docID)
        await bookingDBFunctions.deleteBooking(fastBooking3.docID)

        await adminUser.post('/booking/fastbooking').send(bookingData).expect(200);
        //await bookingDBFunctions.addFastBooking(bookingData, bookingData.startDato, slutDato)

        // Assertions
        //expect(response.status).to.equal(200);
        expect(fastBooking1).to.not.be.null;
        expect(fastBooking1.dato).to.equal(bookingData1.dato);
        expect(fastBooking1.lokaleId).to.equal(bookingData1.lokaleId);
        expect(fastBooking1.tid).to.equal(bookingData1.tid);

        expect(fastBooking2).to.not.be.null;
        expect(fastBooking2.dato).to.equal(bookingData2.dato);
        expect(fastBooking2.lokaleId).to.equal(bookingData3.lokaleId);
        expect(fastBooking2.tid).to.equal(bookingData2.tid);

        expect(fastBooking3).to.not.be.null;
        expect(fastBooking3.dato).to.equal(bookingData3.dato);
        expect(fastBooking3.lokaleId).to.equal(bookingData3.lokaleId);
        expect(fastBooking3.tid).to.equal(bookingData3.tid);
    });
});
