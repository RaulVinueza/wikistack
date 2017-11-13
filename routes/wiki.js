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
  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });


    page.save()
    .then(entry => res.redirect(`/wiki/${entry.urlTitle}`))
    .catch(next)
});



router.get('/add', function(req, res, next) {
  res.render('addpage')

});

router.get('/:urlTitle', function(req, res, next){
	// res.send(req.params.urlTitle)
	Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(page => res.render('wikipage', {page: page}))
	.catch(next)
})