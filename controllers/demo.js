
const {mysql} = require('../mysql');
module.exports = async (ctx) => {
    const bookData = await mysql.select('*').from('nideshop_channel');

    ctx.body={
        "success":'成功',
        "data":bookData
    }
}