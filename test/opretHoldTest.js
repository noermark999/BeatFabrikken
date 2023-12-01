import chai, { expect } from 'chai';
import supertest from 'supertest';
import appModule from '../app.js';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import loginDBFunctions from '../service/loginDBFunctions.js';
import BookingDBFunctions from '../service/BookingDBFunctions.js';
import administratorDBFunctions.js from '../service/administratorDBFunctions.js';
import e from 'express';
