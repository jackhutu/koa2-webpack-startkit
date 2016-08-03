import Router from 'koa-router'
const router = new Router()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 about'
  }

  await ctx.render('about')
})

module.exports = router