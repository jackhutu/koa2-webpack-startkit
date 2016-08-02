import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import koaStatic from 'koa-static'

const app = new Koa()
const router = new Router()
app.use(bodyParser())

// static
app.use(koaStatic(path.join(__dirname, '../client')))

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'jade'
}))

// response
// app.use(async (ctx) => {
//   ctx.body = 'Hello World'
// })
app.use(async (ctx, next) => {
  try {
    await next()
  } catch(err) {
    if(err.status === 401) {
      ctx.body = { message: 'Unauthorized access.' }
      ctx.status = 401
    } else {
      ctx.body = { message: err.message }
      ctx.status = err.status || 500
    }
  }
})

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: 'Hey, welcome to the Koa v2 starter!'
  };
  ctx.status = 200
  await next()
});

app.use(router.routes())

app.listen(3000, () => console.log('server started 3000'))

export default app