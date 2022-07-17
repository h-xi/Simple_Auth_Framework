const express = require("express");
const { getGoogleAuthURL } = require("../utils/authenticate.js");
const urlparse = require("urlparse");
const queryParse = require("query-string");
const { oauth2Client } = require("../utils/authenticate.js");
const { google } = require("googleapis");
const { getJWT } = require("../utils/jwt.js");

const router = express.Router();

// Send to server link to authorize google account
router.get("/", (req, res) => {
  res.json({
    googleURL: getGoogleAuthURL(),
  });
});

// Callback router after user successfully authorizes account
// Using Google profile info, generate JWT Token and return token to server
router.get("/callback", async (req, res) => {
  const queryURL = new urlparse(req.url);
  const code = queryParse.parse(queryURL.query).code;
  const { tokens } = await oauth2Client.getToken(code);
  access = tokens.access_token;
  oauth2Client.setCredentials({ access_token: access });
  let oauth2 = google.oauth2({
    auth: oauth2Client,
    version: "v2",
  });
  const infoData = await oauth2.userinfo.get();
  const token = getJWT(infoData.data);
  res.json({
    token: token,
  });
});

module.exports = router;
