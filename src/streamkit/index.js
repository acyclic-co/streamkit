const axios = require('axios');
const http = require('http');
const chalk = require('chalk');
const fs = require('fs');
const os = require('os');

const { HOST } = require('../settings');

function getAuthToken() {
  try {
    const res = fs.readFileSync(`${os.homedir()}/.streamkitrc`);
    const token = JSON.parse(res).token;
    
    if (token === undefined)
      throw 'Invalid token';
    else
      return token;
    
  } catch(error) {
    throw 'Session data not found. You need to login first';
  }
}

const getHeaders = () => {
  return {
    headers: {
      'Authorization': 'Bearer ' + getAuthToken()
    }
  };
}

module.exports = {
  login: (data) => {
    return axios.post(`${HOST}/login`, data);
  },

  newStream: (name, endpoint, streamType, frequency, headers) => {
    try {
      return axios.post(`${HOST}/streams`,
                        { name: name,
                          endpoint: endpoint,
                          type: streamType,
                          frequency: frequency,
                          headers: JSON.stringify(typeof(headers) === 'string' ? [headers] : headers) },
                        getHeaders());
    } catch(error) {
      return Promise.reject(error);
    }      
  },
  
  addEndpoint: (id, endpoint, headers) => {
    try {
      return axios.put(`${HOST}/stream/${id}`,
                        { endpoint: endpoint,
                          headers: JSON.stringify(typeof(headers) === 'string' ? [headers] : headers) },
                        getHeaders());
    } catch(error) {
      return Promise.reject(error);
    }      
  },

  getStreams: () => {
    try {
      return axios.get(`${HOST}/streams`, getHeaders());
    } catch(error) {
      return Promise.reject(error);
    }
  },

  getQuota: () => {
    try {
      return axios.get(`${HOST}/quota`, getHeaders());
    } catch(error) {
      return Promise.reject(error);
    }
  },

  remove: (id) => {
    try {
      return axios.delete(`${HOST}/stream/${id}`, getHeaders());
    } catch(error) {
      return Promise.reject(error);
    }
  },

  getEvents: (id, onData) => {
    try {
      return axios.get(`${HOST}/stream/${id}/events`, { ...getHeaders(), responseType: 'stream' });
    } catch(error) {
      return Promise.reject(error);
    }    
  }
};
