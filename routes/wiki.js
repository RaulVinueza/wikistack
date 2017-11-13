const express = require('express')
const router = express.Router()
module.exports = router
var models = require('../models');
var Page = models.Page; 
var User = models.User; 




router.get('/', function(req, res, next) {
  // res.send('got to GET /wiki/');
  res.redirect('/')
});

router.post('/', function(req, res, next) {
  // res.send('got to POST /wiki/');
  // res.json(req.body)
  

User.findOrCreate({
    where: {
      name: req.body.name,
      email: req.body.email
    }}).then(
      (values)=>{
        console.log(values[1])
        let user = values[0]
        let page = Page.build({
          title: req.body.title,
          content: req.body.content,
        })

        return page.save().then(
          (page)=>{
            return page.setAuthor(user)
        })
      }
    ).then(
      (page)=>{res.redirect(`/wiki/${page.urlTitle}`)}
    ).catch(next)

  
    
    // Promise.all([savedPage,foundUser])
    // .then(
    //   (arrayOfPromises)=>{
        
    //     let user = arrayOfPromises[1][0]
    //     let page = arrayOfPromises[0]
    //     res.json(page.__proto__)

    //     return page.setAuthor(user)
    //   }
    // ).then((page)=>{
    //   res.redirect(`/wiki/${page.urlTitle}`)
    // }).catch(next)

})



router.get('/add', function(req, res, next) {
  res.render('addpage')

});

router.get('/:urlTitle', function(req, res, next){
	// res.send(req.params.urlTitle)
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	}).then((page)=>{
    return Promise.all([page.getAuthor(), page])
  }) 
	.then(arr => {
    res.render('wikipage', {page: arr[1], author: arr[0]})
  })
	.catch(next)
})