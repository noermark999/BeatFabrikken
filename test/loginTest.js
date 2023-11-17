import chai, { assert } from 'chai';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import loginDBFunctions from '../service/loginDBFunctions.js';

const expect = chai.expect;


describe('getUser Function', () => {
  it('should retrieve a user by username', async () => {
    
    // Hent brugeren fra databasen
    const retrievedUser = await loginDBFunctions.getUser('testuser');

    expect(retrievedUser).to.not.be.null;
    expect(retrievedUser.username).to.equal('testuser');
    expect(retrievedUser.email).to.equal('test@example.com');
    expect(retrievedUser.mobilnummer).to.equal('12345678');
  });
});




