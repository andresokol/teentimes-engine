$(document).ready( function () {
	$('#all-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$('#all').removeClass('hddn');
	});
	
	$('#articles-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$('.articles').removeClass('hddn');
	});
	
	$('#img-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$('.img').removeClass('hddn');
	});
	
	$('#music-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$('.music').removeClass('hddn');
	});
	
	$('#lastissue-btn').click(function () {
		$('.container').children().addClass('hddn');
		$('button').removeClass('btn-primary');
		$(this).addClass('btn-primary');
		$('.lastissue').removeClass('hddn');
	});
});