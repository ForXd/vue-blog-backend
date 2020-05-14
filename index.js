const Koa = require('koa');
const body = require('koa-better-body');
const pathLib = require('path');
const convert = require('koa-convert');
const session = require('koa-session');

const config = require('./config');
const errorHandle = require('./libs/errorHandle');
const database = require('./libs/database');
const routers = require('./routes');
const logger = require('./libs/logger');
const cors = require('./libs/cors');


let app = new Koa();

// 注意中间件的使用顺序，链式调用
// 首先错误处理   后续调用的代码都属于next()方法的内容
app.use(errorHandle);

// 使用日志
app.use(logger);
// 然后使用数据库中间件
app.use(database);
// 最后调用路由中间件
app.use(cors);
app.use(convert(body({
  uploadDir: pathLib.resolve(__dirname, './www/upload') //指定文件上传路径
})))
var staticCache = require('koa-static-cache')
 
app.use(staticCache(pathLib.join(__dirname, 'www'), {
  maxAge: 365 * 24 * 60 * 60,
  dynamic: true,
  preload: false
}))
app.keys = config.keys;
const CONFIG = {
  key: 'koa:sess', /** 默认 */
  maxAge: 10000,  /*  cookie的过期时间 */
  overwrite: true, /** (boolean) can overwrite or not (default true)    没有效果，默认 */
  httpOnly: true, /**  true表示只有服务器端可以获取cookie */
  signed: true, /** 默认 签名 */
  rolling: true, /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） */
  renew: false, /** (boolean) renew session when session is nearly expired      */
};
app.use(session(CONFIG, app));
app.use(routers);


app.listen(config.port);