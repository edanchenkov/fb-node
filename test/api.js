'use strict'

var should = require('should');
var api = require('./../lib/api');

var endpoint = 'https://graph.facebook.com';
var token = 'CAACEdEose0cBAK4IzFurnALAoy21gsp5XimvWtQvnYJWhxFbJayMjrrYOUm0xmaZALbd7oZBVVhFeddYaFQiG2G93YTlZBJCnPUdsVPziKZAtj9oZBdonDyb89yv7EZCAoZCTZCAPkDgbrNq9Y1eeSfsY1zsHCAH9kKo2QwIO44buciMeJIJJl2pBc9JNPrKypATx9ClQ9pXyz1IEejx7Hi26zUNowaG4ZBkZD';

var post = null;

describe('Throttled library for Facebook Graph API v2.*', function(){

  it('should set api token', function(done){
    api.token = 'this token';
    api.token.should.equal('this token');
    done();
  });

  it('should set api endpoint', function(done){
    api.endpoint = 'this endpoint';
    api.endpoint.should.equal('this endpoint');
    done();
  });
  
  it('should recieved status code 200, when GET /me', function(done){
    api.endpoint = endpoint;
    api.token = token;
    var url = '/me';
    api.get(url).then(function (data) {
      data.response.statusCode.should.be.equal(200);
    }).finally(function(){
      done();
    });
  });

  it('should recieved status code 200, when POST /me/feed', function(done){
    this.timeout(5000);
    var url = '/me/feed';
    var params = { message: 'Test message' };   
    api.post(url, params).then(function (data) {
      data.json.should.have.property('id');
      post = data.json.id;
      data.response.statusCode.should.be.equal(200);
    }).finally(function(){
      done();
    });
  });

  it('should recieved status code 200, when DELETE /{post-id}', function(done){
    this.timeout(5000);
    var url = '/' + post;
    api.delete(url).then(function (data) {
      data.response.statusCode.should.be.equal(200);
    }).finally(function(){
      done();
    });
  });

});