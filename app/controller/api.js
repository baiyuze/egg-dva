const Controller = require("egg").Controller;

class ApiController extends Controller {

  async checkIsLogin() {
    const ctx = this.ctx;
    if(ctx.session.Authorization) {
      return true;
    } else {
      return false;
    }
  }
  
	async proxy() {
    const path = await getPath(this);
    if(await this.checkIsLogin()) {
      this.ctx.body = await this.service.proxyService.proxy(
        this.ctx.request,
        path
      );
    } else {
      this.ctx.body = {
        code: 10001,
        data: null,
        message: "登录过期，请重新登录"
      }
    }

  }

  async download() {
    const path = await getPath(this);
    if(await this.checkIsLogin()) {
      this.ctx.body = await this.service.proxyService.download(
        this.ctx.request,
        path
      );
      
    } else {
      this.ctx.body = {
        code: 10001,
        data: null,
        message: "登录过期，请重新登录"
      }
    }
  }

  async startLogin() {
		const path = await getPath(this);
    this.ctx.body = await this.service.login.proxy(
      this.ctx.request,
      path
    );
  }

  async loginOut() {
    const path = await getPath(this);
    this.ctx.session["Authorization"] = "";
    this.ctx.body = {
      code: 10001,
      data: null,
      message: "登录过期，请重新登录"
    }

  }

}

const getPath = async that => {
  return that.ctx.url
    .split("/")
    .slice(2)
    .join("/");
};

module.exports = ApiController;