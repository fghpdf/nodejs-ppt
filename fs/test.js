var fs = require('fs');

var CreateNewPPT = function(title, name, url){
    fs.open("test.md","w",0666,function(err, fd){
        if (err) throw err;
        fs.write(fd, "title: " + title + "\n" +
            "author:\n" +
            "  name: " + name + "\n" +
            "  url: " + url + "\n" +
            "output: output.html\n", 0, 'utf8', function(err){
            if(err) throw err;
            fs.closeSync(fd);
        });
    });

}

CreateNewPPT("测试", "qxx", "123.com");

var AddNewPage = function () {
    fs.open("test.md", "a", 0666, function(err, fd){
        if (err) throw err;
        fs.write(fd, "\n--\n" +
            "\n" +
            "#test\n" +
            "##wawawaaw\n" +
            "\n" +
            "--\n", 0, 'utf8', function(err){
            if (err) throw err;
            fs.closeSync(fd);
        });
    });
    
}

AddNewPage();

