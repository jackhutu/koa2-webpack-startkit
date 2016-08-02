import Router from 'koa-router'
const router = new Router()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa2 title'
  }

  await ctx.render('index', {
    user: 'John'
  })
})
module.exports = router