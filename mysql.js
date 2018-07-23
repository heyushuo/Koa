/**
 * 数据库操作
 */
const { mysql: config } = require('./config');


//链接数据库
const DB = require('knex')({
    client: 'mysql',
    connection: {
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.pass,
        database: config.db,
        charset: config.char,
        multipleStatements: true
    }
})

 module.exports={
     mysql:DB
 }