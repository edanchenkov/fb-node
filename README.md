ThrottledFB-API
===============

Client for Facebook Graph API v2.* implement with promises.

## Install

```
$ npm install fb-node

```

## Usage

```
var api = require('fb-node');

// Set endpoint and token
api.endpoint = 'https://graph.facebook.com';
api.token = 'Your token';

```


### Methods

api.

- get(url)
- post(url, parameters)
- delete(url)
- put(url, parameters)

All of them returns data that consits from 2 parts: 

- json /payload/
- response 

#### Example

```
api.get('/me').then(function (data) {
  console.dir(data.json);
}).catch(function(e){
  console.dir(e)
}).finally(function(){
  console.dir('Done with the request')
});

api.post('/me', { message: 'Hello, world!' }).then(function (data) {
  console.dir(data.json);
}).catch(function(e){
  console.dir(e)
}).finally(function(){
  console.dir('Done with the request')
});

```