var fs = require('fs'),
    path = require('path'),
    /*config = JSON.parse('./config.json'),
    wallpapers_list = config.wallpapers_list;*/
    wallpaper_list = fs.readdirSync('./public/img/wallpapers');

exports.wallpaper = function(req, res) {
    var chosen_wallpaper = wallpaper_list[Math.floor(Math.random()*wallpaper_list.length)],
        filePath = path.join(__dirname, '../public/img/wallpapers/' + chosen_wallpaper);
    
    res.sendFile(filePath);
};