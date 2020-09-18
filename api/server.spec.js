const supertest = require('supertest');
const server = require('./server.js');
const db = require('../database/dbConfig.js');
const { SERVFAIL } = require('dns');

const userObject = {username:'newUser', password:'testpass'}

describe("server", () =>{
    describe('env', () =>{
        it('it should return status code 200', () =>{
            return supertest(server)
            .get('/')
            .then(res =>{
                expect(res.status).toBe(200)
            })
        })
    })

    // describe("test auth functionality, including register and login", () =>{
    //     it('/login should take username/password compare vs hashed password create token return statuscode 200 if correct', async () =>{
    //          const res = await supertest(server)
    //         .post('/api/auth/login')
    //         .send({username:'newUser', password:'testpass'})

    //         expect(res.status).toBe(200)
    //         expect(res.body).toHaveProperty('token')
    //     })
    // })

    describe('test get user functionality', () =>{
        it('should get 401 and shall not pass message', () =>{
            return supertest(server)
            .get('/api/users')
            .then(res =>{
                expect(res.status).toBe(401)
                expect(res.body.message).toBe('shall not pass!')
            })
        })
    })
        beforeEach(async () =>{
            await db('users').truncate();
        })
        
        it('/register should take a username&password and return that user and a token', () =>{
            return supertest(server)
            .post('/api/auth/register')
            .send(userObject)
            .then(res =>{
                expect(res.status).toBe(201)
                expect(res.body.data).toHaveProperty('id')
                expect(res.body).toHaveProperty('token')
                expect(res.body.data.password).toEqual(expect.not.stringMatching("this is my password"))
            })
    })    
        

       

})