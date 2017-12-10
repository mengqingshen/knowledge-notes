import Koa from 'koa'
import log from 'npmlog'
import CSRF from 'koa-csrf'
import logger from 'koa-logger'
import session from 'koa-session'
import bodyParser from 'koa-bodyparser'
import koaStatic from 'koa-static-server'

const app = new Koa()

app.use(new CSRF({}))
app.use(logger())
app.use(session(app))
app.use(bodyParser())
app.use(koaStatic({
  rootDir: './public',
  index: 'index.html'
}))

app.listen(process.env.PORT, (error) => {
  if (error) {
    log.error(error)
  } else {
    log.info(`==> Listening on port ${process.env.PORT}.`)
  }
})
