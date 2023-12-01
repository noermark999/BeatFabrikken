import chai, { expect } from 'chai';
import supertest from 'supertest';
import appModule from '../app.js';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import administratorDBFunctions from '../service/administratorDBFunctions.js';
import e from 'express';

const app = appModule.app;
const request = supertest(app);

const assert = chai.assert;

describe('test af opret hold', () => {
    it('burde oprette et hold', async () => {
      // data for at lave holdet
      const alder = "13"
      const holdNavn = "TEST HOLD"
      const instruktør = "JAKOB"
      const pris = "100"
  
      supertest(app).post('/opretHold').send({hold})
      
      // kald på funktionen der opretter bookningen
      await administratorDBFunctions.addHold(hold);
  
      
      // hent bookningen og tjek om det er korrekt
      const oprettetHold = await administratorDBFunctions.getHold(holdNavn)
  
      // Assertions
      expect(response.status).to.equal(200);
      expect(oprettetHold).to.not.be.null;
      expect(oprettetHold.holdNavn).to.equal(holdNavn);
    });
  });
  