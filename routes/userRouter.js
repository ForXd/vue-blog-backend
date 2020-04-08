const Router = require('koa-router');
const crypto = require('crypto');
const config = require('../config');

function encode(str) {
    function md5(str) {
        let obj = crypto.createHash('md5');
        obj.update(str);
        return obj.digest('base64');
    }
    return md5(md5(str) + config._key);
}

function valid_user(username, password) {
    if (!username) {
        return {'success': false, 'msg': 'username is required'};
    } else if (!(/\w|\d[3, 10]/.test(username))) {
        return {'success': false, 'msg': 'username is not leagal'};
    } else if (!password) {
        return {'success': false, 'msg': 'password is required'}; 
    } else if (!(/\w|\d|_[6, 10]/.test(password))) {
        return {'success': false, 'msg': 'password is not leagal'};
    } else {
        return {'success': true, 'msg': ''};
    }
}

let router = Router();
router.get('/detail/:id', async ctx => {
    ctx.body = {'msg': `user:${ctx.params.id}`};
})

router.post('/detail/:id', async ctx => {
    console.log(JSON.parse(ctx.request.body));
    // console.log(ctx.request.fields);
    ctx.set('Content-Type', 'application/json')
    ctx.body = {'msg': `recv:${ctx.params.id}`};
})

router.post('/login', async ctx => {
    let { username, password } = JSON.parse(ctx.request.body);
    let json = valid_user(username, password);
    if (json.success) {
        let R = await ctx.db.execute(`select password from user_table where username='${username}'`);
        if (R.length == 1 && R[0].password == encode(password)) {
            ctx.body = {'success': true};
        } else {
            ctx.body = {'success': false, 'msg': 'username or password not correct'};
        }
    } else {
        ctx.body = json;
    }
})

router.post('/register', async ctx => {
    let { username, password } = JSON.parse(ctx.request.body);
    let json = valid_user(username, password);
    if (json.success) {
        let user = await ctx.db.execute(`select username from user_table where username='${username}'`);
        if (user.length != 0) {
            ctx.body = {'success': false, 'msg': 'username exist'};
        } else {
            let realPassword = encode(password);
            await ctx.db.execute(`insert into user_table (username, password)values('${username}','${realPassword}')`);
            ctx.body = {'success': true};
        }
    } else {
        ctx.body = json;
    }
})


module.exports = router.routes();