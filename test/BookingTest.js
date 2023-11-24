import chai, { expect } from 'chai';
import supertest from 'supertest';
import appModule from '../app.js';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import loginDBFunctions from '../service/loginDBFunctions.js';
import BookingDBFunctions from '../service/BookingDBFunctions.js';
import e from 'express';

const app = appModule.app;
const request = supertest(app);

const assert = chai.assert;

describe('test af booking', () => {
  it('burde oprette en booking', async () => {
    // data for at lave bookningen
    const user = loginDBFunctions.getUser("testbooking");
    const lokale = BookingDBFunctions.getLokale("DanceZone-sal")
    const dato = "2023-11-29"
    const tid = "10:00"

    // kald på funktionen der opretter bookningen
    await profileDBFunctions.updateUser(newUserData, usernameToUpdate);

    // hent bookningen og tjek om det er korrekt
    const oprettetBooking = await BookingDBFunctions.getBooking()
    const updatedUserData = await loginDBFunctions.getUser(newUsername);

    // Assertions
    expect(updatedUserData).to.not.be.null;
    expect(updatedUserData.username).to.equal(newUserData.username);
    expect(updatedUserData.email).to.equal(newUserData.email);
    expect(updatedUserData.firstname).to.equal(newUserData.firstname);
    expect(updatedUserData.lastname).to.equal(newUserData.lastname);
    expect(updatedUserData.mobilnummer).to.equal(newUserData.mobilnummer);
  });
});

describe('Booking ikke logget ind', () => {
  it('skal returnere 208, når brugeren ikke er logget ind', (done) => {
    supertest(app)
    .post('/booking')
    .send({ date: '2023-01-01', lokeleId: '1', tid: '10:00' })
    .expect(208)
    .end((err, res) => {
      if(err) return done(err);
      done();
    })
  })
})

describe('getBooking test', () => {
  it('skal finde en eksisterende booking', async () => {
    const expectedDato = '2023-11-24';
    const expectedTid = '15:00';
    const expectedLokaleId = 'Sal 1';

    const booking = await BookingDBFunctions.getBooking(expectedDato, expectedTid, expectedLokaleId);

    expect(booking).to.not.be.undefined;
    expect(booking.dato).to.equal(expectedDato);
    expect(booking.tid).to.equal(expectedTid);
    expect(booking.lokaleId).to.equal(expectedLokaleId)
  });

  it('skal returnere undefined for en ikke-eksisterende booking', async () => {
    const dato = '2024-01-01';
    const tid = '10:00';
    const lokaleId = 'UkendtLokale';

    const booking = await BookingDBFunctions.getBooking(dato, tid, lokaleId);

    expect(booking).to.be.undefined;
  });
});


