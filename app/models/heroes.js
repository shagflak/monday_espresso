var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var db = null;
// Connection URL
var url = 'mongodb://localhost:27017/heroes';
// Use connect method to connect to the Server
mongoose.connect(url, function(err, mdb) {
    console.log("Connected correctly to server");
    db = mdb;
});

var heroesSchema = new Schema({
    comics: { available: Number, collectionURI: String, items: Array, returned: Number },
    description: String,
    events: { available: Number, collectionURI: String, items: Array, returned: Number },
    id: Number,
    modified: String,
    name: String,
    resourceURI: String,
    series: { available: Number, collectionURI: String, items: Array, returned: Number },
    stories: { available: Number, collectionURI: String, items: Array, returned: Number },
    thumbnail: { extension: String, path: String },
    urls: Array,
    wiki: {
        bio: String,
        bio_text: String,
        categories: Array,
        debut: String,
        main_image: String,
        significant_issues: String,
        universe: String,
        aliases: String,
        citizenship: String,
        education: String,
        eyes: String,
        groups: String,
        hair: String,
        height: String,
        identity: String,
        occupation: String,
        origin: String,
        place_of_birth: String,
        powers: String,
        real_name: String,
        relatives: String,
        weight: Number,
        abilities: String,
        paraphernalia: String,
        weapons: String,
        blurb: String,
        base_of_operations: String,
        current_members: String,
        former_members: String,
        other_members: String,
        title_graphic: String
    }
});

module.exports = mongoose.model('Heroes', heroesSchema);
