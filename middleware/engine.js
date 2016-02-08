var fs = require('fs'),
    ejs = require('ejs'),
    html_blocks = {},
    html_blocks_names = fs.readdirSync('./templates/blocks');

for(var i = 0; i < html_blocks_names.length; i += 1) {
    var block_name = html_blocks_names[i];
    
    if (block_name.slice(-4) == 'html') {
        html_blocks[block_name.slice(0, -5)] =
            fs.readFileSync('./templates/blocks/' + block_name, 'utf8');
        
        html_blocks_names[i] = html_blocks_names[i].slice(0, -5); // change if block exists
    } else {
        html_blocks_names.splice(i, i);
        i -= 1;           // delete if not html from name list
    }
}

console.log('Found ' + html_blocks_names.length + ' blocks:');
console.log(html_blocks_names);


exports.render = function (filePath, options, callback) {
    /*html_blocks_names.forEach(function(block_name) {
        options[block_name] = html_blocks[block_name];
    });*/
    
    fs.readFile(filePath, 'utf8', function (err, content) {
        if(err) return callback(new Error(err));
        
        // Pre-render blocks
        var pattern = /###\w+###/g;
        
        content = content.toString();
        
        try {
            content.match(pattern).forEach( function (element, index, array) {
                content = content.replace(element, html_blocks[element.slice(3, -3)]);
            });
            
        } catch (e) {
            console.log(e);
        }
        // -----------------
        
        var rendered = ejs.render(content.toString(), options, {});
        
        return callback(null, rendered);
    });
};
