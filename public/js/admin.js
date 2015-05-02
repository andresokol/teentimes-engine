$(document).ready( function () {
	
	// SOCKET THINGY
	
	var socket = io();
	
	socket.on('start_editing', function(msg) {
		$('#' + msg.id).children('.cover').html('<b>' + msg.user + '</b> редактирует...');
		console.log('<b>' + msg.user + '</b> редактирует...');
		$('#' + msg.id).addClass('edited');
	});
	
	socket.on('stop_editing', function(msg) {
		$('#' + msg).removeClass('edited');
	});
	
	socket.on('switch_visibility', function(msg) {
		var parent;
		if (msg.visible) {
			$('.cnt').eq(0).append($('#' + msg.id));
			$('.cnt').eq(1).children('#' + msg.id).remove();
		} else {
			$('.cnt').eq(1).append($('#' + msg.id));
			$('.cnt').eq(0).children('#' + msg.id).remove();
		}
		
		if (msg.visible) parent = document.getElementsByClassName('cnt')[0];
		else             parent = document.getElementsByClassName('cnt')[1];
		
		[].map.call( parent.children, Object ).sort( function ( a, b ) {
			return -a.id.match( /\d+/ ) - -b.id.match( /\d+/ );
		}).forEach( function ( elem ) {
			parent.appendChild( elem );
		});
	});
	
	socket.on('delete_post', function(id) {
		$('#' + id).remove();
	});
	
	/* CLICKS' HANDLERS */
	
	$(".title_cnt").click(function() {
		$(this).parent().children('.dropdown_cnt').toggleClass("dropdown_cnt_hidden");
		//socket.emit('tab', $(this).parent().attr('id'));
		//console.log($(this).attr('id'));
	});
	
	$('.switch').click(function() {
		var id = $(this).parent().parent().parent().attr('id');
		$.ajax({
			url: '/admin/switch/' + id.substr(1),
			type: 'GET',
			dataType: 'json',
			success: function(msg) {
				socket.emit('switch_visibility', {id: id, visible: msg});
			}
		});
	});
	
	/* SOME INDIAN CODE - REWRITE ADVISED */
	
	$('#all-btn').click(function () {
		$('.post_cnt').removeClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
	});
	
	$('#articles-btn').click(function () {
		$('.post_cnt').addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.article').removeClass('hddn');
	});
	
	$('#img-btn').click(function () {
		$('.post_cnt').addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.img').removeClass('hddn');
	});
	
	$('#music-btn').click(function () {
		$('.post_cnt').addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.music').removeClass('hddn');
	});
	
	$('#lastissue-btn').click(function () {
		$('.post_cnt').addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.lastissue').removeClass('hddn');
	});
	
	$('#literature-btn').click(function () {
		$('.post_cnt').addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.literature').removeClass('hddn');
	});
});