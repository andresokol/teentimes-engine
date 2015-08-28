$(document).ready(function () {
    var mc = $('#main_container'),
    class_resolver = ['', 'one', 'two', 'three'];
    $.ajax({
		url: '/ajax/main_page_content/',
		type: 'GET',
		dataType: 'json',
		success: function (content) {
            content.forEach( function(line, index) {
                var append_seq = '<div class="line">',
                    current_class = class_resolver[line.length];
            
                for(var i = 0; i < line.length; i += 1) 
                    append_seq += '<div class="' + current_class + '">' + line[i] + '</div>';
                
                append_seq += '</div>';
                mc.append(append_seq);
            });
        }
    });
});