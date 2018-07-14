"use strict";

const path = require("path");
const fs = require("fs");

module.exports = appInfo => {
  const config = (exports = {});
	config.env = 'production';
	config.listen = {
    port: 8001,
    hostname: '127.0.0.1',
  }
  return config;
};