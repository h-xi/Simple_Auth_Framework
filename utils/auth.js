const { google } = require("googleapis");
const { decodeJWT } = require("../utils/jwt");

let GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
let GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
let GOOGLE_CALLBACK_URL = process.env.GOOGLE_CALLBACK_URL;

const oauth2Client = new google.oauth2Client(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
);

module.exports.getGoogleAuthURL = () => {
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.profile",
    "https://www.googleapis.com/auth/userinfo.email",
  ];
  return oauth2Client.getGoogleAuthURL({
    access_type: "offline",
    prompt: "consent",
    scope: scopes,
  });
};
