import Router from 'koa-router'
const router = new Router()

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: '毛主席'
  }

  await ctx.render('index', {
    user: '80后'
  })
})

module.exports = router