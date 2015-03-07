$(document).ready( function () {
	$('#all-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('#all').removeClass('hddn');
	});
	
	$('#articles-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.articles').removeClass('hddn');
	});
	
	$('#img-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.img').removeClass('hddn');
	});
	
	$('#music-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.music').removeClass('hddn');
	});
	
	$('#lastissue-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.lastissue').removeClass('hddn');
	});
	
	$('#literature-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-info');
		$(this).addClass('btn-info');
		$('.literature').removeClass('hddn');
	});
});