import { expect } from 'chai';
import { describe, it } from 'mocha';
import mailserverFunctions from '../service/mailserverFunctions.js';

describe('sendConfirmationEmail Function', () => {
  //Testen kræver at der er en gyldig token til mailserveren. Denne token udløber efter nogle uger og skal refreshes. Hvis testen fejler er det formentligt derfor
  it('should send an email successfully', async () => {
    const testEmail = "knud1407@gmail.com";
    
    try {
      const answer = await mailserverFunctions.sendConfirmationEmail(testEmail);
      expect(answer).to.be.true;
    } catch (error) {
      expect.fail('Email was not sent successfully');
    }
  });
});