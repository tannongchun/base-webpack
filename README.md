## 本系统涉及内容如下
-  Webpack4.0+
-  babel 解析为 Es2015  

 // {
 //   test: /\.(js|vue)$/,
 //   loader: 'eslint-loader',
 //   enforce: 'pre',
 //   include: [resolve('src'), resolve('test')],
 //   options: {
 //     formatter: require('eslint-friendly-formatter')
 //   }
 // },
 
 #webpack(基于4.0+)
 
 ## babel   因为浏览器兼容性各异，需要转成 ES5 
 - 依赖包如下 
    ```$xslt
     
          "babel": "^6.23.0",
          "babel-cli": "^6.26.0",
          "babel-core": "^6.26.3",
          "babel-loader": "^7.1.5",
          "babel-plugin-syntax-jsx": "^6.18.0",
          "babel-plugin-transform-runtime": "^6.23.0",
          "babel-runtime": "^6.26.0",
          "babel-preset-es2015": "^6.24.1",
          "babel-preset-stage-0": "^6.24.1",

   ```
 
 ## eslint 团队和合作统一代码格式 
 -  建议在工程项目中引入 .eslintignore ，webstrom 启用Eslint(settings -> eslint(搜索)->enable)
 - 依赖包如下
   ```
        "babel-eslint": "^8.2.6",
       "eslint-config-standard": "^11.0.0",
       "eslint-friendly-formatter": "^4.0.1",
       "eslint-loader": "^2.1.0",
       "eslint-plugin-html": "^4.0.5",
       "eslint-plugin-import": "^2.14.0",
       "eslint-plugin-node": "^7.0.1",
       "eslint-plugin-promise": "^4.0.0",
       "eslint-plugin-standard": "^3.1.0",
   
   ```
