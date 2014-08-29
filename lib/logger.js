'use strict'
var fs = require('fs');

var PATH = './request_log.txt'

module.exports.writeIn = function(error, method, query, path) {

  if(typeof path === 'string') {
    PATH = path;
  };

  if(typeof query !== 'string') {
    query = 'Not spicified';
  };

  if(typeof method !== 'string') {
    method = 'Not spicified';
  };

  var buffer = new Buffer('\n***\nDate: ' + new Date() +
    '\nQuery: ' + method + ' ' + query + '\nError: ' + error + '\n***\n');
  fs.appendFile(PATH, buffer, 0, buffer.length, null, function(err) {
    if(err){
      throw(err);
    } else {
      console.log('ERROR! Add new line to log-file (%s)', PATH);
    }
  });

}
