/** Dependencies */
var Promise = require('./bluebird-extended');
var request = Promise.promisify(require("request"));

'use strict'

var options = {
  url: null,
  method: null
};

module.exports = {

  get: function(url) {
    return doRequest('GET', url, this.endpoint, this.token, null);
  },
 
  post: function(url, payload) {
    return doRequest('POST', url, this.endpoint, this.token, payload);
  },

  put: function(url, payload) {
    return doRequest('PUT', url, this.endpoint, this.token, payload);
  },

  delete: function(url) {
    return doRequest('DELETE', url, this.endpoint, this.token, null);
  }

};

var doRequest = function(method, url, endpoint, access_token, payload) {
  return new Promise(function (resolve, reject) {
    limiter.removeTokens(1, function() {
      if(!method) {
        return reject('Method is required');
      } else {
        if(typeof method === 'string') {
          options.method = method;
        };
      };

      if(!url) {
        return reject('URL is required')
      };

      if(!endpoint) {
        return reject('Endpoint is required')
      };

      if(!access_token) {
        return reject('Token is required')
      };

      options.url = endpoint + url;

      if(!payload) {
        payload = false;
      } else {

        if(typeof payload !== 'object') {
          return reject('Data must be a JSON object');
        };

        var params = '';

        for(var k in payload) {
          if(options.url.indexOf('?') === -1){
            params += '?';
          } else {
            params += '&'
          }
          params += k + '="' + payload[k] + '"';
        };

        options.url += params;
      };

      options.url += ~options.url.indexOf('?') ? '&' : '?';
      options.url += 'access_token=' + access_token;

      request(options).spread(function(response, json){
        // Hadnling cases of bad request
        if(response.statusCode !== 200) {
          json = JSON.parse(json);
          var message = json.error.message;
          var err = new Error(message);
          // logger.writeIn(message, options.method, options.url);
          reject(err);
        } else {
          json = JSON.parse(json);
          var data = {
            json: json,
            response: response
          };
          resolve(data);
        };
      }).catch(function(e){
         // logger.writeIn(e, options.method, options.url);
         reject(e);
      });
    });
  });
};


