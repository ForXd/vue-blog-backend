const config = require('../config');
const fs = require('fs');

async function logger(ctx, next) {
    await new Promise((resolve, reject) => {
        fs.appendFile(config.logDir, `${ctx.method} ${ctx.url}\r\n`, (err) => {
            resolve();
        })
    })
    await next();
}


module.exports = logger;