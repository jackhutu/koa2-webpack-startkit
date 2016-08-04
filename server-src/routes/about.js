import Router from 'koa-router'
const router = new Router()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '我们是共产主义接班人'
  }

  await ctx.render('about')
})

module.exports = router