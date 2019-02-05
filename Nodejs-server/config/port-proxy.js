var net = require('net');

module.exports = function (p1, p2) { //port1 to port2

    net.createServer(function (from) {
        var to = net.createConnection({
            host: 'localhost',
            port: p2
        });
        from.pipe(to);
        to.pipe(from);
    }).listen(p1);
};