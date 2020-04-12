const Koa = require('./index.js');
const app = new Koa();

// logger

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.res['X-Response-Time'];
  console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
});

// x-response-time

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.res['X-Response-Time'] =  `${ms}ms`;
});

// response

app.use(async ctx => {
  ctx.res.end('Hello World');
});

app.listen(3000);