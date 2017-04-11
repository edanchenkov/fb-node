'use strict'

var should = require('should');
var api = require('./../lib/api');

var endpoint = 'https://graph.facebook.com';
var token = '';

var post = null;

describe('Library for Facebook Graph API v2.*', function () {

    if(!token) {
        console.error(new Error('No token provided, check set access token in test/api.js'));
        return;
    }

    it('should set api token', function (done) {
        api.token = 'this token';
        api.token.should.equal('this token');
        done();
    });

});
