const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');

// Setup
const app = express();
const port = process.env['REACT_APP_PORT'];
const config = require('./webpack.config.js');
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  serverSideRender: false,
  watchOptions: {
    // Due to iOS devices memory constraints
    // disabling file watching is recommended 
    ignored: /.*/
  }
});
app.use(middleware);
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: __dirname });
});

// Launch app
app.listen(port, () => {
  console.log(
    'Launching app... http://localhost:' + port + '\n'
  );
});

// Register app and middleware. Required for better
// performance when running from play.js
try { pjs.register(app, middleware); } catch (error) { }


console.log('Trying to connect my cloud mongoDB');
// two ways for connectiong mongodb
// Option1: by using MongoClient
//const MongoClient = require('mongodb').MongoClient;
////const uri = "mongodb+srv://mongoUser:mongoUser@yszxp.jzcvm.mongodb.net/Yszxp?retryWrites=true&w=majority";
//const uri = "mongodb://mongoUser:mongoUserPwd@yszxp-shard-00-00.jzcvm.mongodb.net:27017,yszxp-shard-00-01.jzcvm.mongodb.net:27017,yszxp-shard-00-02.jzcvm.mongodb.net:27017/Yszxp?ssl=true&replicaSet=atlas-vjzz4u-shard-0&authSource=admin&retryWrites=true&w=majority";
////const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
////client.connect(err => {
////  console.log('err', err)
////  const collection = client.db("test").collection("devices");
////  // perform actions on the collection object
////  client.close();
////});
//
//MongoClient.connect(uri, function(err, client) {
//  console.log('err', err);
//  console.log('client', client);
//  const collection = client.db("test").collection("devices");
//  // perform actions on the collection object
//  client.close();
//});

// Option2: by using mongoose
/* 1. 连接数据库 */
// 1.1. 引入 mongoose
const mongoose = require('mongoose')
// 1.2. 连接指定数据库(URL 只有数据库是变化的) 
mongoose.connect('mongodb://mongoUser:mongoUserPwd@yszxp-shard-00-00.jzcvm.mongodb.net:27017,yszxp-shard-00-01.jzcvm.mongodb.net:27017,yszxp-shard-00-02.jzcvm.mongodb.net:27017/Yszxp?ssl=true&replicaSet=atlas-vjzz4u-shard-0&authSource=admin&retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
// 1.3. 获取连接对象
const conn = mongoose.connection
// 1.4. 绑定连接完成的监听(用来提示连接成功)
conn.once('open', () => {
	console.log('数据库连接成功!')
})

console.log('Done')