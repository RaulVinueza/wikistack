const express = require('express')
const router = express.Router()
const wiki = require('./wiki')
const user = require('./user')
module.exports = router

router.use("/wiki", wiki)
router.use("/users", user)