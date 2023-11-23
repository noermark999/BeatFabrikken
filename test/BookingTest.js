import chai, { expect } from 'chai';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import loginDBFunctions from '../service/loginDBFunctions.js';
import BookingDBFunctions from '../service/BookingDBFunctions.js';

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