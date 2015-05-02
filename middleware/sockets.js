var editing = [];

module.exports = function (io) {
	io.on('connection', function(socket) {
		console.log('+');
		editing.forEach(function (post) {
			socket.emit('start_editing', {id: post.post, user: post.user});
		});
		
		socket.on('disconnect', function() {
			console.log('-');
			editing = editing.filter(function (msg) {
				if (msg.edit_socket == socket) {
					socket.broadcast.emit('stop_editing', msg.post);
				}
				return msg.edit_socket !== socket;
			});
		});
		
		socket.on('tab', function(id) {
			socket.broadcast.emit('tab', id);
		});
		
		socket.on('delete_post', function(id) {
			socket.broadcast.emit('delete_post', id);
		});
		
		socket.on('switch_visibility', function(msg) {
			io.sockets.emit('switch_visibility', msg);
		});
		
		socket.on('start_editing', function(msg) {
			console.log('[W] ' + msg.user + ' is now editing ' + msg.id);
			editing.push({edit_socket: socket, post: msg.id, user: msg.user});
			socket.broadcast.emit('start_editing', msg);
		});
	});
};