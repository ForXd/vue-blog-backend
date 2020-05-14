const Router = require('koa-router');
const pathLib = require('path');

let router = Router();
// router.use(async (ctx, next) => {
//     if (ctx.path === '/favicon.ico') return; 
//     let n = ctx.session.count || 0; 
//     ctx.session.count = ++n;
//     // console.log(ctx.session.count);
//     await next();
// })
router.use('/user', require('./userRouter'));
router.use('/article', require('./articleRouter'));
router.use('/comment', require('./commentRouter'));

router.post('/upload', async ctx => {
    let files = ctx.request.fields['test'];
    let fileList = [];
    Array.from(files).forEach(file => 
        fileList.push({filename: file.name, 
                       path: pathLib.relative('www',file.path)}
        )
    )
    ctx.body = fileList;
})
module.exports = router.routes();