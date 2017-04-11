var Promise = require('./bluebird-extended');
var request = Promise.promisify(require("request"));

var options = {
    url : '',
    method : ''
};

var host = 'https://graph.facebook.com';

module.exports = {

    get : function (url) {
        return doRequest('GET', url, host, this.token, null);
    },

    post : function (url, payload) {
        return doRequest('POST', url, host, this.token, payload);
    },

    put : function (url, payload) {
        return doRequest('PUT', url, host, this.token, payload);
    },

    delete : function (url) {
        return doRequest('DELETE', url, host, this.token, null);
    }

};

var doRequest = function (method, url, host, accessToken, payload) {
    return new Promise(function (resolve, reject) {
        if (!method) {
            return reject('Method is required');
        } else {
            if (typeof method === 'string') {
                options.method = method;
            }
        }

        if (!url) {
            return reject('URL is required')
        }

        if (!host) {
            return reject('Host is required')
        }

        if (!accessToken) {
            return reject('Token is required')
        }

        options.url = host + url;

        if (typeof payload === 'object') {
            var params = '';

            for (var k in payload) {
                if (payload.hasOwnProperty(k)) {
                    if (options.url.indexOf('?') === -1) {
                        params += '?';
                    } else {
                        params += '&'
                    }
                    params += k + '="' + payload[k] + '"';
                }
            }

            options.url += params;
        }

        options.url += ~options.url.indexOf('?') ? '&' : '?';
        options.url += 'access_token=' + accessToken;

        request(options).spread(function (response, json) {
            // Handling cases of bad request
            if (response.statusMessage !== 'OK') {
                json = JSON.parse(json);
                var message = json.error.message;
                var err = new Error(message);
                reject(err);
            } else {
                json = JSON.parse(json);
                var data = {
                    json : json,
                    response : response
                };
                resolve(data);
            }
        }).catch(function (e) {
            reject(e);
        });
    });
};


