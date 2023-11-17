import chai, { assert } from 'chai';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import loginDBFunctions from '../service/loginDBFunctions.js';

const expect = chai.expect;

describe('getUser Function', () => {
  it('should retrieve a user by username', async () => {
    // Tilføj en testbruger til databasen
    const testUser = { username: 'testuser', password: 'hashedpassword', email: 'test@example.com', mobilnummer: '12345678' };
    await loginDBFunctions.addUser(testUser);

    // Hent brugeren fra databasen
    const retrievedUser = await loginDBFunctions.getUser(testUser.username);

    expect(retrievedUser).to.not.be.null;
    expect(retrievedUser.username).to.equal(testUser.username);
    expect(retrievedUser.email).to.equal(testUser.email);
    expect(retrievedUser.mobilnummer).to.equal(testUser.mobilnummer);
  });
});

