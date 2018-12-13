const host = require('./../HOST.json');

module.exports = function (router) {

    let usersDir = __dirname + '/../data/users',
        fs = require('fs'),
        mongoose = require('mongoose'),
        config = require('./../config/database');

    let Dashboard = require('./../models/Dashboard');

    const OPENSTACK_HOST = host.openstack;


    mongoose.connect(config.database);
    mongoose.connection.on('open', function (ref) {
        console.log('Connected to Mongo server...');
    });

    router.post('/user/create/:userid', function (req, res) {
        let userDir = usersDir + '/' + req.params.userid;
        if (!fs.existsSync(userDir)) {
            fs.mkdirSync(userDir);
        }
    });


/// OPENSTACK DATA
    router.get('/user/dashboard/openstack/:userid/:show', function (req, res) {

        Dashboard.find({user: req.params.userid, show: req.params.show}, function (err, ebooks) {
            if (err)
                res.send(err);

            res.json(ebooks);
        });
    });

    router.post('/user/dashboard/openstack', function (req, resp) {
        console.log(req.body);
        Dashboard.create({
            user: req.body.user,
            metric: req.body.metric,
            delay: req.body.delay,
            delaytype: req.body.delaytype,
            step: req.body.step,
            steptype: req.body.steptype,
            server: req.body.server === "openstack" ? OPENSTACK_HOST : req.body.server,
            show: ["all", req.body.show],
            selectedServerId : req.body.selectedServerId,
            selectedServerName : req.body.selectedServerName
        }, function (err, result) {
            if (err) return console.log("NOT SAVED " + err);
            resp.send(result);
        })
    });

    // router.put('/user/dashboard/openstack/:userid', function (req, res) {
    //     let userDir = usersDir + '/' + req.params.userid;
    //     let openStackPath = userDir + '/openstack.json';
    //
    //     fs.readFile(openStackPath, 'utf8', function readFileCallback(err, data) {
    //         if (!err) {
    //             let metrics = JSON.parse(data);
    //             let isExist = false;
    //             for (let m = 0; m < metrics.length; m++) {
    //                 if (metrics[m].metric === req.body.metric) {
    //                     metrics[m] = req.body;
    //                     isExist = true;
    //                 }
    //             }
    //             if (!isExist) {
    //                 metrics.push(req.body);
    //             }
    //             let json = JSON.stringify(metrics);
    //             fs.writeFile(openStackPath, json, 'utf8', function (err) {
    //                 if (err) {
    //                     return console.log(err);
    //                 }
    //             });
    //         }
    //     });
    //     res.send(null);
    // });

    router.delete('/user/dashboard/openstack/:id', function (req, res) {
        Dashboard.findByIdAndRemove(req.params.id, function (err, dashlet) {
            res.send(dashlet);
            if (err) throw err;
        })
    });

    router.delete('/user/dashboard/openstack/:userid/:metric', function (req, res) {
        let userDir = usersDir + '/' + req.params.userid;
        let openStackPath = userDir + '/openstack.json';

        fs.readFile(openStackPath, 'utf8', function readFileCallback(err, data) {
            if (!err) {
                let metrics = JSON.parse(data);
                for (let m = 0; m < metrics.length; m++) {
                    if (metrics[m].metric === req.params.metric) {
                        metrics.splice(m);
                    }
                }
                let json = JSON.stringify(metrics);
                fs.writeFile(openStackPath, json, 'utf8', function (err) {
                    if (err) {
                        return console.log(err);
                    }
                });
            }
        });
        res.send(null);
    });


};
