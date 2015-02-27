$(document).ready(function () {
		$('.tags').each(function () {
			var id = this.id;
			$.ajax({
				url: '/ajax/tags/' + id.substr(1, id.length - 1),
				type: 'GET',
				dataType: 'json',
				success: function (msg) {
					$(this).text(msg);
					console.log(msg);
				}.bind(this)
			});
		});
	});