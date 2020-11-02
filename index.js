const express = require("express")
const app = express()
const moongose = require("mongoose")
const { post } = require("./routes/auth")
require("dotenv").config()

//import routers
const authRoutes = require("./routes/auth")
const postRoutes = require("./routes/posts")

//connect db
moongose
  .connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("DB Connection: OK"))
  .catch(err => console.log("DB Error:", err.code))

//middlewares
app.use(express.json())

app.use("/api/user", authRoutes)
app.use("/api/posts", postRoutes)

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})
