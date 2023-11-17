import chai from 'chai'
import supertest from 'supertest'
const assert = chai.assert

import express from '../app.js'
import loginDBFunctions from '../service/loginDBFunctions.js'

describe('skal teste alle get endpoints', ()=>{
    it('should return html', ()=>{
        supertest(express.app).get('/').expect(200)
        supertest(express.app).get('/registrering').expect(200)
        supertest(express.app).get('/login').expect(200)
    })
})