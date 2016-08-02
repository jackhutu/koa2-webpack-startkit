import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import koaStatic from 'koa-static'
import json from 'koa-json'
import logger from 'koa-logger'
import index from './routes/index'

const app = new Koa()
const router = new Router()

//middlewares
app.use(bodyParser())
app.use(json()) 
app.use(logger())

// static
app.use(koaStatic(path.join(__dirname, '../client')))

// views
app.use(views(path.join(__dirname, '../views'), {
  extension: 'jade'
}))

// response
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

// router.get('/', async (ctx, next) => {
//   ctx.body = {
//     message: 'Hey, welcome to the Koa v2 starter!'
//   };
//   ctx.status = 200
//   await next()
// });

//router
router.use('/', index.routes(), index.allowedMethods())
app.use(router.routes())

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx)    
})

app.listen(3000, () => console.log('server started 3000'))

export default app