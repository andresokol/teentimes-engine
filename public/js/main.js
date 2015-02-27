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
	});