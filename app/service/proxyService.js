const Service = require("egg").Service;
const downloadLoad = require('download');
const fs = require("fs");
class ProxyService extends Service {
	constructor(ctx) {
		super(ctx);
		
  }
  
  async download(req,path) {
    const ctx = this.ctx;
    req.headers["X-Custom-Foo"] = "bar";
		req.headers["Authorization"] = ctx.session.Authorization;
    let result = null;
    let pathProxy = this.config.proxy + "/" + path;
    pathProxy = pathProxy.split(`/${req.query.deviceCode}_${req.query.time}.xls`).join("");
    result = await downloadLoadFunc(pathProxy,{
      headers: req.headers
    },req);
    return result;
  }

	async proxy (req,path) {
    const ctx = this.ctx;
    req.headers["Authorization"] = ctx.session.Authorization;
		let result = null;
		try {
      if (req.method == "POST") {
        result = await ctx.curl(this.config.proxy + "/" + path, {
          method: req.method,
          contentType: "json",
          dataType: "json",
          data: req.body,
          headers: req.headers
        });
      } else {
        result = await ctx.curl(this.config.proxy + "/" + path, {
          contentType: "json",
          dataType: "json",
          headers: req.headers
        });
      }
    } catch (err) {
      return {
        code: 500,
        data: "",
        message: "接口返回异常"
      };
		}

		if (result && result.data) {
      return result.data;
    } else {
      return {
        code: 500,
        data: "",
        message: "请求失败"
      };
		}
	}
}

function downloadLoadFunc(path, opation,req) {
  return new Promise((resolve,reject) => {
    try {
      downloadLoad(path,opation,req).then((data) => {
        if(data) {
          resolve(data);
        }
      })
    } catch (err) {
      resolve({
        code: 500,
        data: "",
        message: "接口返回异常"
      })
    }
  });
}

module.exports = ProxyService;