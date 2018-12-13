let mongoose     = require('mongoose');
let Schema       = mongoose.Schema;

let Dashboard   = new Schema({
    "user" : String,
    "server": String,
    "metric": String,
    "delay": String,
    "delaytype": String,
    "step": String,
    "steptype": String,
    "show": [String],
    "selectedServerId" : String,
    "selectedServerName" : String

});
module.exports = mongoose.model('Dashboard', Dashboard);