module.exports = function(monitoring){

    router.get('/monitoring/:minus/:type', function (req, res) {

        let formatted = monitoring.currentTimeStemp();
        let minusMinutes = monitoring.currentStampMinusTime(req.params.minus, req.params.type);
        console.log(formatted);
        console.log(minusMinutes);

    });

};