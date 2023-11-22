import chai, { expect } from 'chai';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import profileDBFunctions from '../service/profileDBFunctions.js';

const assert = chai.assert;

describe('test redigerProfil ', () => {
  it('should update user information', async () => {
    // Assuming there's an existing user with the username 'testuser'
    const usernameToUpdate = 'testupdateuser';

    // Get the initial user data
    const initialUserData = await profileDBFunctions.getUser(usernameToUpdate);

    // Define the new information to update
    const newUserData = {
        newUsername: 'testupdateuser2',
        email: 'newtestUpdateUser@gmail.com',
        mobilnummer: '87654321',
    };

    usernameToUpdate = 'testupdateuser2';

    // Call the function to edit the user
    await profileDBFunctions.updateUser(usernameToUpdate, newUserData);

    // Retrieve the user again to check if the information has been updated
    const updatedUserData = await profileDBFunctions.getUser(usernameToUpdate);

    // Assertions
    expect(updatedUserData).to.not.be.null;
    expect(updatedUserData.username).to.equal(usernameToUpdate);
    expect(updatedUserData.email).to.equal(newUserData.email);
    expect(updatedUserData.mobilnummer).to.equal(newUserData.mobilnummer);
  });
});
