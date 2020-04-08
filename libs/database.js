const Client = require('mysql-pro');
const config = require('../config');

let client = new Client({
    mysql: {
        host: config.db_host,
        port: config.db_port,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_name,
    }
})


client.execute = async (sql) => {
    await client.startTransaction();

    let res;
    if (typeof sql == 'string') {
        res = await client.executeTransaction(sql);
    } else {
        sql.forEach(async item => {
            res = await client.executeTransaction(item);
        })
    }
    await client.stopTransaction();
    return res;
} 


async function dbMiddleWare(ctx, next) {
    ctx.db = client;
    await next();
}
module.exports = dbMiddleWare;