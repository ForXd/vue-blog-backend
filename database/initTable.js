const Client = require('mysql-pro');
const config = require('../config');
const fs = require('fs');
const path = require('path');

let client = new Client({
    mysql: {
        host: config.db_host,
        port: config.db_port,
        user: config.db_user,
        password: config.db_pass,
        database: config.db_name,
    }
})

let sql = fs.readFileSync('./createTable.sql').toString().split(';');
sql = sql.slice(0, 3);

function generatePostSql(blogDir) {
    let files = fs.readdirSync(blogDir);
    let sql = [];
    files.forEach(file => {
        if (file.endsWith('.md')) {
            let realPath = path.join(blogDir, file);
            let blog = fs.readFileSync(realPath).toString();
            let author_id = 1;
            let title = blog.match(/title: (.+)\n/)[1];
            let description = blog.match(/- (.*)/m);
            if (description) description = description[1].slice(0, 50);
            else description = '';
            let category = blog.match(/tags: (.+)\n/);
            if (category) category = category[1];
            else category = '';
            let content_url = path.join('blog', file);
            let item = `('${author_id}', '${title}', '${description}', '${category}', '${content_url}')`;
            sql.push(item);
        }
    })
    return sql.join(',');
}   



async function insertPost(sql) {
    await client.startTransaction();
    await client.executeTransaction(`insert into post_table
                                    (author_id, title, description, category, content_url)values${sql}`);
    await client.stopTransaction();
}
(async () => {
    let sql = generatePostSql('../www/blog');
    await insertPost(sql);
    // await client.startTransaction();
    // sql.forEach(async item => {
    //     await client.executeTransaction(item);
    // })
    // await client.stopTransaction();
})();
