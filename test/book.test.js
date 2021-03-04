var chai = require('chai');
var should =chai.should();
var expect = chai.expect;
var assert = chai.assert;

const request = require('supertest');
const app = require('../server');

describe('GET /books', function() {
  it('return list of books', function(done) {
    request(app)
      .get('/api/v1/books')
      .expect(200)
      .expect((res) =>{
          console.log("book list >>> " + JSON.stringify(res.text))
      }).end(done)
  })
})