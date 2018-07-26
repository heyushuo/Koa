const {
  mysql
} = require('../../mysql');

async function listAction(ctx) {
  var page = ctx.query.page || 1;
  var size = 10;
  const data = await mysql('nideshop_brand').column('id', 'name', 'floor_price', 'app_list_pic_url').limit(size).offset((page - 1) * size).select();
  ctx.body = {
    data
  }
}

async function detailAction(ctx) {
  const id = ctx.query.id;
  let data = [{}];
  if (id) {
    data = await mysql("nideshop_brand").where({
      id: id
    }).select();
  }


  ctx.body = {
    "data": data[0] || {}
  }
}

module.exports = {
  listAction,
  detailAction
}