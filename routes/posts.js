const router = require("express").Router()
const authVerification = require("../middlewares/authVerification")

router.get("/", authVerification, (req, res) => {
  res.json([
    { user: req.user }, //can use req.user with the middleware authVerification
    { post1: "balblalb" },
    { post2: "jojojojo" },
    { post3: "jejejeje" }
  ])
})

module.exports = router
