const socket = require('socket.io');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('../VTSFrontend'));

let server = app.listen(4000, () => { console.log('Now listening to port 4000!') });

let io = socket(server);
// To be obtained by database
let users = [];
let uniqueID = 0;

io.on('connection', (socket) => {
	console.log('made socket connection on socket: ' + socket.id);
	socket.on('location', (data) => {
		console.log(`Location updated to ${data.location.lat} and ${data.location.lng}`);
		io.emit('location', data);
	});

	// socket.on('location', (data) => {
	//     socket.broadcast.emit('typing', data);
	// });
});

// BOOK Request: /book (POST)
app.post('/book', (req, res) => {
	let user = req.body;
	console.log('Book Request');
	console.log(user);
	user.id = uniqueID++;
	users.push(user);
	// Create a session using cookie-parser/sessions
	res.send(user.id.toString());
});

// UNBOOK Request: /unbook/:id GET
app.get('/unbook/:id', (req, res) => {
	const userId = req.params.id;
	console.log('Unbook Request from ' + userId);
	// Find the userId in the array and delete that user
	const index = users.findIndex(element => element.id ==userId);
	users.splice(index, 1)
	res.end();
});

app.post('/gotin/:id', (req, res) => {
	const userId = req.params.id;
	console.log('Gotin Request from ' + userId);
	// Find the userId in the array and delete that user
	const index = users.findIndex(element => element.id ==userId);
	users.splice(index, 1)
	res.end();
});