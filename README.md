## ko2 webpack startkit
适合多入口, 多页面jade模板渲染

### 开发

```
$ git clone git@github.com:jackhutu/koa2-webpack-startkit.git
$ cd koa2-webpack-startkit
$ npm install
$ npm run dev
```

#### 文档结构
```
.
├── README.md           
├── bin                      // 项目启动文件
├── client                   // 客户端文件build输出目录
├── client-src               // 客户端源文件目录
│   ├── images                
│   ├── js                    
│   ├── styles                
├── server                   // 服务端文件build输出目录
├── server-src               // 服务端源文件目录
│   ├── controllers
│   ├── middlewares
│   ├── models
│   ├── routes
│   ├── services
│   app.js
├── views                    // 模板目录
│   ├── entry                // 模板需要注入的入口文件
├── .babelrc                 // babel配置文件
├── .eslintrc.json           // eslint配置文件
├── nodemon.json             // nodemon配置文件
├── webpack.config.js        // webpack配置文件
.
```

### License
MIT