import chai from 'chai';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import loginDBFunctions from '../service/loginDBFunctions.js';

const expect = chai.expect;

describe('addUser Function', () => {
  it('should create a new user in the database', async () => {
    const testUser = {
      username: 'testuser',
      password: 'testpassword',
      email: 'test@example.com',
      mobilnummer: '12345678'
    };

    const userId = await loginDBFunctions.addUser(testUser);

    const db = getFirestore(loginDBFunctions.firebase_app);
    const brugere = collection(db, 'Bruger');
    const docRef = doc(db, 'Bruger', userId);
    const docSnap = await getDoc(docRef);

    expect(docSnap.exists()).to.be.true;
    const addedUser = docSnap.data();

    expect(addedUser.username).to.equal(testUser.username);
    expect(addedUser.email).to.equal(testUser.email);
    expect(addedUser.mobilnummer).to.equal(testUser.mobilnummer);
    expect(addedUser.password).to.equal(testUser.password);
  });
});
