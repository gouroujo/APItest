var should = require('should');
var request = require('supertest');
var server = require('../../../app');

describe('controllers', function() {

  describe('user', function() {

    describe('GET user with no parameter', function() {

      it('should return a string', function(done) {

        request(server)
          .get('/users')
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.type('string')

            done();
          });
      });

      it('should accept a radius parameter', function(done) {

        request(server)
          .get('/users')
          .query({ radius: 300})
          .set('Accept', 'application/json')
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, res) {
            should.not.exist(err);

            res.body.should.be.type('string');

            done();
          });
      });

    });

  });

});
