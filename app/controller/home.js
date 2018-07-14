'use strict';

const Controller = require('egg').Controller;
const fs = require("fs");

class HomeController extends Controller {
  constructor(ctx) {

    super(ctx);

    const timestamp = this.config.timestamp;
    let rootPath = `http://${this.ctx.host.split(":")[0]}:${this.config.listen.port}/public/dist`;
    if(this.config.env !== "production") {
      rootPath = `http://${this.ctx.host.split(":")[0]}:${this.config.webpack.port}`;
    }
    
    this.timestamp = { timestamp, rootPath };
  }
  async seaPage() {
    await this.ctx.render("index.html",this.timestamp);
  }


}

const getPath = async that => {
  return that.ctx.url
    .split("/")
    .slice(2)
    .join("/");
};


module.exports = HomeController;

