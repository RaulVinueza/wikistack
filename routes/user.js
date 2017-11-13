const express = require('express')
const router = express.Router()
module.exports = router
var models = require('../models');
const User = models.User
const Page = models.Page

router.get('/',(req, res, next)=>{
    User.findAll().then(
        arr=>res.render('users',{users: arr})
    ).catch(next)

})

router.get('/:id',(req, res, next)=>{
    const pageList = Page.findAll({
        where: {authorId: req.params.id}
    })

    const author =  User.findOne({
        where: {id: req.params.id}
    })

    Promise.all([pageList, author])
    .then(
        (arr)=>{
            res.render('singleUser',{pages: arr[0], user: arr[1]})
        }
    ).catch(next)
})