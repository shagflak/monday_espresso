//https://scotch.io/tutorials/build-a-restful-api-using-node-and-express-4#want-more-meansetting-up-a-mean-stack-single-page-applicationbuild-a-restful-api-using-node-and-express-4using-gruntjs-in-a-mean-stack-applicationauthenticate-a-node-api-with-tokens
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');
var bodyParser = require('body-parser');
var Heroes     = require('./app/models/heroes.js');

//configure app to use bodyParser();
//this will let us get data from a post

var app = express();
app.use( bodyParser.urlencoded({ extended: true }) );
app.use(bodyParser.json());

var port = process.env.PORT || 8000;

// ROUTES FOR OUR API
// =============================================================================

var router = express.Router();

//We can do validations to make sure that everything coming from a request is safe and sound
/**
 + We can throw errors here in case something is wrong. We can do some extra logging for analytics
 * or any statistics we’d like to keep. There are many possibilities here. Go wild.
 */
router.use(function(req, res, next){
    console.log('Can you smelll what Express is cooking?...');
    next();//make sure to go to the next routes and not stop here!
});

// for functions that will call things like find or findOne call the model instance directly like on this route
router.get('/heroes/all', function(req, res){
    Heroes.find(function(err, heroes){
        if(err){
            res.send(err);
        }
        res.json({status: 'OK', data: heroes});
    })
});

router.post('/heroes/save', function(req, res){
    console.log('A post petition to save a hero...ironic...');

    var Heroe = new Heroes();//use it if you want to create a new record
    Heroe.name = 'Tony Stark';
    Heroe.description = "Iron man philantrophy, playboy, millionaire";
    Heroe.modified    = new Date();
    Heroe.thumbnail.path = 'http://vignette1.wikia.nocookie.net/shipping/images/9/9c/Marvel_-_Iron_Man_-_Logo.png/revision/latest?cb=20131022145846';
    Heroe.thumbnail.extension = 'jpg';

    heroe.save(function(err){
        console.log(err);
        if(err){
            res.send(err);
        }
        res.json({status: 'OK', message: 'Heroe added to the db...'+heroe.name});
    });
});

router.get('/heroes/:hero_id', function(req, res){
    Heroes.findById(req.params.hero_id, function(err, hero){
        if(err){
            res.send({status: 'ERR', data: err});
        }

        res.json({ status: 'OK', data: hero });
    });
});

router.put('/heroes/:hero_id', function(req, res){
    if(!req.params.hero_id || !req.params.name){
        res.send({ status: 'ERR', data: { message: 'A hero id and name to change is required' } });
    }

    Heroes.findById(req.params.hero_id, function(err, hero){//hero is a model (object) and we can change his properties.
        if(err){
            res.send({status: 'ERR', data: err});
        }

        hero.name = req.body.name; //updated the hero info

        hero.save(function(err){
            if(err){
                res.send({status: 'ERR', data: err});
            }
            res.json({ status: 'OK', data: { message: 'Hero updated' } });
        });

    });
});

router.delete('/heroes/:hero_id', function(req, res){
    Heroes.remove({ _id: req.params.hero_id }, function(err, hero){
        if(err){
            res.send({status: 'ERR', data: err});
        }
        res.json({ message: 'Successfully deleted' });
    })
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log('Magic happens on port ' + port);


/**
 * research about:
 * bodyParser.urlencoded -> extended true
 * bodyParser.json
 */
