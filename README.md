# egg-dva


## 技术栈使用  react + redux + lodash + moment + egg + es6+ 等等;

## 关于启动，启动四个服务器，egg服务器，用于前端开发和业务数据交互
## webpack一个服务器，用来打包内存资源
## 剩下两个服务器，用于刷新浏览器，和资源代理

# 启动

## 安装依赖时使用cnpm run ii安装所有依赖

## 启动使用npm run dev

### Development

```bash
$ cnpm ii 安装所有依赖
$ npm run dev
$ open http://127.0.0.1:7002/
```

### Deploy

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.

# 关于图片地址背景图片的引用可以使用相对路径，如果是src引用请在图片前加imgSrc变量