import { expect } from 'chai';
import { describe, it } from 'mocha';
import mailserverFunctions from '../service/mailserverFunctions.js';

describe('sendConfirmationEmail Function', () => {
  it('should send an email successfully', async () => {
    const testEmail = "knud1407@gmail.com";
    
    try {
      await mailserverFunctions.sendConfirmationEmail(testEmail);
      expect(true).to.be.true;
    } catch (error) {
      expect.fail('Email was not sent successfully');
    }
  });
});