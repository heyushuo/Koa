const {
  mysql
} = require('../../mysql');

/**
 * 添加或者跟新收货地址
 * @param {*} ctx 
 */
async function saveAction(ctx) {
  var addressId = ctx.request.body;
  const {
    userName,
    telNumber,
    address,
    detailadress,
    checked
  } = ctx.request.body


  const addressData = {
    name: userName,
    mobile: telNumber,
    address: address,
    address_detail: detailadress,
    user_id: openId,
    is_default: checked === true ? 1 : 0
  };
  if (!addressId) {
    //添加地址
    const data = mysql("nideshop_address").insert(addressData)
    if (data) {
      ctx.body = {
        data: "添加成功"
      }
    } else {
      ctx.body = {
        data: "添加失败"
      }
    }
  } else {
    //跟新地址
    const data = mysql("nideshop_address").where({
      id: addressId
    }).update(addressData)
  }

}

/**
 * 收货地址列表
 * @param {*} ctx 
 */


module.exports = {
  saveAction,
}