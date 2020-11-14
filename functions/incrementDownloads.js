require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})
const admin = require("firebase-admin")

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FB_TYPE,
      project_id: process.env.FB_PROJECT_ID,
      private_key_id: process.env.FB_PRIVATE_KEY_ID,
      private_key: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
      client_email: process.env.FB_CLIENT_EMAIL,
      client_id: process.env.FB_CLIENT_ID,
      auth_uri: process.env.FB_AUTH_URI,
      token_uri: process.env.FB_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FB_AUTH_PROVIDER,
      client_x509_cert_url: process.env.FB_CLIENT_URL,
    }),
    databaseURL: "https://wallpapers-6a027.firebaseio.com",
  })
}
const db = admin.firestore()

exports.handler = async function (event) {
  const { id } = JSON.parse(event.body)
  console.log(id)

  const db = admin.firestore()
  const increment = admin.firestore.FieldValue.increment(1)

  db.doc("wallpapers/" + id).update({ downloads: increment })

  return {
    statusCode: 200,
    body: "Hello world locally!",
  }
}
