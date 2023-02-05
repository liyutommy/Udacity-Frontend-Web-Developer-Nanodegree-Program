const request = require('supertest');
const app = require('../src/server/server');


describe('GET /projectData', () => {
    it('responds with json', (done) => {
        request(app)
            .get('/projectData')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                if (err) return done(err);
                return done();
            })
    })

});