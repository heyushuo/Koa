const {
    mysql
} = require('../../mysql');

module.exports = async (ctx) => {
    //轮播数据
    const banner = await mysql('nideshop_ad').where({
        ad_position_id: 1
    }).select();
    //类型
    const channel = await mysql('nideshop_channel').select();
    //类型
    const goods = await mysql('nideshop_goods').select();
    ctx.body = {
        "banner": banner,
        "channel": channel,
        'goods': goods,
        "message": null,
        "success": true
    }

}