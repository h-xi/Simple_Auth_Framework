const express = require("express");

const testRoute = require("./testRouter.js");

module.exports = (app) => {
  app.use("/", testRoute); //Main Route
};
