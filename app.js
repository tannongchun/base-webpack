const Koa = require('koa');
const port = process.env.PORT || 3000;
const app = new Koa();
const path = require('path');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');
const proxy = require('koa-proxy');
const isValidFormat=true;
// Koa 两大插件
app.use(bodyParser());
app.use(serve(__dirname + './static'));



// 配置webpack 插件
if(process.env.NODE_ENV !== 'production'){
    const webpack = require('./node_modules/webpack');
    const webpackMiddleware = require('koa-webpack-dev-middleware');
    const argv = require('minimist')(process.argv.slice(2));
    const webpackConfig = require('./build/webpack.config.dev.js');
    const compiler = webpack(webpackConfig);
    const webpackHotMiddleware = require('koa-webpack-hot-middleware');
    const Router = require('koa-router');
    const router = new Router();
    const middleware = webpackMiddleware(compiler, {
        publicPath: webpackConfig.output.publicPath,
        contentBase: 'src',
        hot: true,
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);

    app.use(webpackHotMiddleware(compiler,{
        log: console.log,
        path: "/__webpack_hmr",
        heartbeat: 10 * 1000
    }));

    router.get('/', async (ctx, next) => {
        ctx.type = 'html';
        ctx.body = middleware.fileSystem.readFileSync(path.join(__dirname, 'static/index.html'));
    });

    app.use(router.routes())
        .use(router.allowedMethods())

} // end if

app.use(async (ctx, next) => {
    const start = new Date();
        await next();
        const ms = new Date() - start;
        console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// app.use(proxy({
//     host:HOST,
//     match: /^\/api\//,
//     jar: true
// }));

app.listen(port, () => {
    console.log('server start at localhost:%s', port)
});
