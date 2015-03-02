$(document).ready(function () {
	$('.tags').each(function () {
		var id = this.id;
		$.ajax({
			url: '/ajax/tags/' + id.substr(1, id.length - 1),
			type: 'GET',
			dataType: 'json',
			success: function (msg) {
				var input='';
				for (var i=0; i<msg.length; i++)
				{
					input+='<a href="/tag/' + msg[i] + '">#' + msg[i] + ' </a>';
					console.log(input);
				}
				$(this).html(input);
			}.bind(this)
		});
	});
	
	$('.author').each(function() {
		var author_username = this.id.substr(1, id.length - 1);
		$.ajax({
			url: '/ajax/author/' + author_username,
			type: 'GET',
			dataType: 'json',
			success: function (author) {
				/*  Что можно получить:
					author.username - юзернейм автора
					author.name     - имя, выбранное на странице в админке
					author.about    - описание автора, написанное там же
					author.imgurl   - url юзерпика */
				var input = '<img src="' + author.imgurl + '" width="50px" style="border-radius:50%;">';
																				//кругленький,чо
				input += '<h1>' + author.name + '</h1>';
				input += '<p>' + author.about + '</p>';
				$(this).html(input);
			}.bind(this)
		});
	});
});