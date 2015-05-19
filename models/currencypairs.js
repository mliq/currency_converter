var mongoose = require('mongoose');

var currencyPairsSchema = new mongoose.Schema({
    from: String,
    to: String,
    rate: Number,
    created_at: Date,
    updated_at: Date
});

currencyPairsSchema.pre('save', function(next){
    now = new Date();
    this.updated_at = now;
    if ( !this.created_at ) {
        this.created_at = now;
    }
    next();
});

console.log('currencyPairs model loaded')
module.exports = mongoose.model('currencyPairs', currencyPairsSchema);