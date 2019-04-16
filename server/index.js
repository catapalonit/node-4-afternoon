require("dotenv").config()
const express = require("express")
const session = require("express-session")
let { SERVER_PORT, SESSION_SECRET } = process.env
const checkForSession = require("./middlewares/checkForSession")
const app = express()
const swagController = require("./controllers/swagController")
const authController = require("./controllers/authController")

app.use(express.json())
app.use(
    session({
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: true
    })
)
app.use(checkForSession)

app.post("/api/login", authController.login)
app.post("/api/register", authController.register)
app.post("/api/signout", authController.signout)
app.get("/api/getUser", authController.getUser)

app.get("/api/swag", swagController.read)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
})