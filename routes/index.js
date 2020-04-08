const Router = require('koa-router');
const pathLib = require('path');

let router = Router();

router.use('/user', require('./userRouter'));
router.use('/article', require('./articleRouter'));

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