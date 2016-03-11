var fs = require('fs');

var process = require('child_process');

exports.CreateNewPPT = function(title, name, url, callback){
    var content = "title: " + title + "\n" +
        "author:\n" +
        "  name: " + name + "\n" +
        "  url: " + url + "\n" +
        "output: output.html\n";
    console.log(content);
    fs.open(".\\fs\\test.md","w", 0666,function(err, fd){
        if (err) {
            callback(err, null, null);
        }else{
            fs.write(fd, content, 0, 'utf8', function(werr){
                if(werr) {
                    callback(werr, null, null);
                } else {
                    fs.closeSync(fd);
                }
            });
        }
    });
};

exports.AddNewPage = function (text, callback) {
    var content = "\n--\n" +
        "\n" + text +
        "\n";
    fs.open(".\\fs\\test.md", "a", 0666, function(err, fd){
        if (err) {
            callback(err, null, null);
        } else {
            fs.write(fd, content, 0, 'utf8', function(err){
                if (err) {
                    callback(err, null, null);
                } else {
                    fs.closeSync(fd);
                }
            });
        }
    });
};

exports.OutputPPT = function(callback){
    process.exec('cleaver .\\fs\\test.md', function(err, stdout, stderr){
        console.log(stdout);
        console.log(stderr);
        if (err){
            callback(err, null, null);
        }
        process.exec('mv .\\output.html .\\views\\ppt', function(err, stdout, stderr){
            if (err){
                callback(err, null, null);
            }
        })

    })
};








