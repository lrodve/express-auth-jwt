const router = require("express").Router()
const User = require("../models/User")
const {
  signUpValidation,
  loginInValidation
} = require("../utils/authValidation")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

router.post("/register", async (req, res) => {
  //VALIDATION DATA FROM CLIENT
  const { error } = signUpValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //CHECK MAIL IS NOT USED IN DB
  const isMailUsed = await User.findOne({ email: req.body.mail })
  if (isMailUsed) return res.status(400).send("Email already exists")

  //HASHING PASSWORD
  const salt = await bcrypt.genSalt(10)
  const hashPwd = await bcrypt.hash(req.body.password, salt)

  //CREATING A INSTANCE OF MODEL
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPwd
  })

  //TRYING TO REGISTER NEW USER
  try {
    const newUser = await user.save()
    res.send({ user: user._id })
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post("/login", async (req, res) => {
  //VALIDATION DATA FROM CLIENT
  const { error } = loginInValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //CHECK IF MAIL EXIST IN DB
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send("Email is not register for any user")

  //CHECK IF PASSWORD IS CORRECT
  const isValidPass = await bcrypt.compare(req.body.password, user.password)
  if (!isValidPass) return res.status(400).send("Password incorrect")

  //CREATE AND ASSIGN A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.JWT_TOKEN)
  res.header("auth-token", token).send(token)
})

module.exports = router
