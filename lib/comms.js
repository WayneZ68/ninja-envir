var serialPort = require("/opt/ninja/drivers/serial/node_modules/serialport").SerialPort;
var events = require('events');

module.exports = Comms;
Comms.prototype = new events.EventEmitter;

function Comms(serialPortName) {
	var self = this;
	var serial = new serialPort(serialPortName, { baudrate : 57600} );
	var serialData = "";

	serial.on("open", function () {
		console.log("opened port: " + serialPortName);

		serial.on("data", function(data) {
			serialData += data;

			// Check if the last char was a carriage return
			//if (data.toString().charCodeAt(data.length-2) == 13 ) {
			if (serialData.indexOf("</msg>") > -1 ) {
				self.emit('data', serialData);
				serialData = "";
			}
		});
	});
};