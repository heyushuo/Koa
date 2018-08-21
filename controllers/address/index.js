const {
  mysql
} = require("../../mysql");

/**
 * 添加或者跟新收货地址
 * @param {*} ctx
 */
async function saveAction(ctx) {
  var addressId = ctx.request.body.addressId;
  const {
    userName,
    telNumber,
    address,
    detailadress,
    checked,
    openId
  } = ctx.request.body;

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
    const data = await mysql("nideshop_address").insert({
      name: userName,
      mobile: telNumber,
      address: address,
      address_detail: detailadress,
      user_id: openId,
      is_default: checked === true ? 1 : 0
    });
    if (data) {
      ctx.body = {
        data: true
      };
    } else {
      ctx.body = {
        data: false
      };
    }
  } else {
    //跟新地址
    const data = mysql("nideshop_address")
      .where({
        id: addressId
      })
      .update(addressData);
    if (data) {
      ctx.body = {
        data: true
      };
    } else {
      ctx.body = {
        data: false
      };
    }
  }
}

/**
 * 收货地址列表
 * @param {*} ctx
 */
async function getListAction(ctx) {
  var openId = ctx.query.openId;
  const addressList = await mysql("nideshop_address")
    .where({
      user_id: openId
    })
    .select();

  ctx.body = {
    data: addressList
  };
}

/**
 * 获取收货地址详情
 * @param {*} ctx
 */
async function detailAction(ctx) {
  var id = ctx.query.id;
  const detailData = await mysql("nideshop_address")
    .where({
      id: id
    })
    .select();

  ctx.body = {
    data: detailData[0]
  };
}

/**
 * 删除收货地址
 * @param {*} ctx
 */
async function deleteAction(ctx) {
  var id = ctx.query.id;
  const delData = await mysql("nideshop_address")
    .where({
      id: id
    })
    .del();
  if (delData) {
    ctx.body = {
      data: "删除成功"
    };
  } else {
    ctx.body = {
      data: "删除失败"
    };
  }

}

module.exports = {
  saveAction,
  getListAction,
  detailAction,
  deleteAction
};