const {
    mysql
} = require('../../mysql');
async function addCollect(ctx) {
    const {
        openId,
        goodsId
    } = ctx.request.body


    //判断是否收藏过
    const iscollect = await mysql("nideshop_collect").where({
        "user_id": openId,
        "value_id": goodsId
    }).select()
    if (iscollect.length == 0) {
        await mysql('nideshop_collect').insert({
            "user_id": openId,
            "value_id": goodsId
        })
    } else {
        await mysql("nideshop_collect").where({
            "user_id": openId,
            "value_id": goodsId
        }).del()
    }
    ctx.body = {
        data: "success"
    }
}
async function deleteCollect() {

}

module.exports = {
    addCollect,
    deleteCollect
}