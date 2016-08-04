process.env.NODE_ENV = process.env.NODE_ENV || 'development'

import path from 'path'
import Koa from 'koa'
import Router from 'koa-router'
import bodyParser from 'koa-bodyparser'
import views from 'koa-views'
import koaStatic from 'koa-static'
import json from 'koa-json'
import logger from 'koa-logger'
import index from './routes/index'
import about from './routes/about'

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

//router
router.use('/', index.routes(), index.allowedMethods())
router.use('/about', about.routes(), about.allowedMethods())

app.use(router.routes())

app.on('error', function(err, ctx){
  console.log(err)
  logger.error('server error', err, ctx)    
})

export default app