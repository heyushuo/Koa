const {
  mysql
} = require('../../mysql');

/**
 * 商品详情页数据
 * 
 */
async function detailAction(ctx) {
  //ctx.query 获取get请求的参数对象的形式
  const goodsId = ctx.query.id;
  //商品信息
  const info = await mysql('nideshop_goods').where({
    'id': goodsId
  }).select();
  //商品相关图片
  const gallery = await mysql('nideshop_goods_gallery').where({
    goods_id: goodsId
  }).limit(4).select();
  //相关属性
  //关联查询两个表  leftJoin
  const attribute = await mysql('nideshop_goods_attribute').column("nideshop_goods_attribute.value", "nideshop_attribute.name").leftJoin('nideshop_attribute', 'nideshop_goods_attribute.attribute_id', 'nideshop_attribute.id').where({
    'nideshop_goods_attribute.goods_id': goodsId
  }).select();
  //常见问题
  const issue = await mysql('nideshop_goods_issue').select();
  //品牌
  const brand = await mysql('nideshop_brand').where({
    id: info[0].brand_id
  }).select();
  //评论条数
  const commentCount = await mysql('nideshop_comment').where({
    value_id: goodsId,
    type_id: 0
  }).count('id  as number ');
  //热门评论
  const hotComment = await mysql('nideshop_comment').where({
    value_id: goodsId,
    type_id: 0
  }).select();
  let commentInfo = {};
  if (hotComment.length != 0) {
    const commentUser = await mysql('nideshop_user').column('nickname', 'username', 'avatar').where({
      id: hotComment[0].user_id
    }).select();
    commentInfo = {
      content: Buffer.from(hotComment[0].content, 'base64').toString(),
      add_time: hotComment.add_time,
      nickname: commentUser[0].nickname,
      avatar: commentUser[0].avatar,
      pic_list: await mysql('nideshop_comment_picture').where({
        comment_id: hotComment[0].id
      }).select()
    };
  }

  const comment = {
    count: commentCount[0].number,
    data: commentInfo
  };

  ctx.body = {
    "info": info[0] || [],
    "gallery": gallery,
    "attribute": attribute,
    "issue": issue,
    "comment": comment,
    "brand": brand[0] || []
  }
}


async function goodsList(ctx) {
  const categoryId = ctx.query.categoryId;
  //获得商品列表
  const goodsList = await mysql("nideshop_goods").where({
    "category_id": categoryId
  }).select();
  //获得当前分类
  const currentNav = await mysql("nideshop_category").where({
    "id": categoryId
  }).select();
  ctx.body = {
    data: goodsList,
    currentNav: currentNav[0]
  }
}

module.exports = {
  detailAction,
  goodsList
}