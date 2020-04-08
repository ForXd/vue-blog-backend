const Koa = require('koa');
const body = require('koa-better-body');
const pathLib = require('path');
const convert = require('koa-convert');

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
app.use(routers);


app.listen(config.port);