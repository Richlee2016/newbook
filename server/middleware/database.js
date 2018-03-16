// import mongoose from "mongoose";
// import config from "../config";
// import fs from "fs";
// import {
//   resolve
// } from "path";
// import glob from 'glob'
const mongoose = require('mongoose')
const config = require('../config')
const fs = require('fs')
const {resolve} = require('path')
const glob = require('glob')
// console.log(config);
// 读取schema 文件
const models = resolve(__dirname, "../database/schema/");

glob.sync(resolve(models, "./**/*.js")).forEach(o => {
  // console.log(o);
  console.log(o);
  require(o);
});

mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect(config.db, {
  useMongoClient: true,
});
mongoose.connection.on("disconnected", () => {
  mongoose.connect(config.db);
});

mongoose.connection.on("error", err => {
  console.error(err);
});

mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB", config.db);
});
