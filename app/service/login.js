'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  constructor(ctx) {
    super(ctx);
  }
	
	async proxy(req,path) {
    const ctx = this.ctx;
    let result = null;
    
		try {
        result = await ctx.curl(this.config.proxy + "/" + path, {
          method: req.method,
          contentType: "json",
          dataType: "json",
          data: req.body,
          headers: req.headers
        });
        ctx.session["Authorization"] = result.data.data.token;
        ctx.session.maxAge = this.config.maxAge;
    } catch (err) {
      return {
        code: 500,
        data: "",
        message: "登录失败"
      };
		}

		if (result && result.data) {
      return result.data;
    } else {
      return {
        code: 500,
        data: "",
        message: "登录失败"
      };
		}
		
  }
}

module.exports = HomeController;

