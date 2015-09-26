var program = require('commander');
var watch = require('watch');
var exec = require('child_process').exec;

program
    .version('0.0.1')
    .option('-w, --watch')
    .option('-p, --product')
    .option('-m, --migrate')
    .option('-j, --jade')
    .option('-i, --jshint')
    .parse(process.argv)

var watchDog = function(build, migrate){
    watch.watchTree('./', function(f, curr, prev){
        if(typeof f == 'object' && prev == null && curr == null){
            console.log('no chage')
        }
        else{
//            remove()
            build(program.product);

            if(program.migrate){
                setTimeout(migrate, 2000);
            }
        }
    })
}

var remove = function(){
    exec('rm -rf ../dist/')
}

var build = function(product){
    if(product){
        exec('fis3 release -cwd ../dist product', function(error, stdout, stderr){
            console.log('err: ', error)
            console.log('out: ', stdout)
            console.log('stderr:', stderr)
        })
    }
    exec('fis3 release -cwd ../dist', function(error, stdout, stderr){
        console.log(error, stdout, stderr);
    })
}

var migrate = function(){
    //exec()
    console.log(migrate)
}

var jade = function(){
    exec('jade ./jade -o ./template', function(error, stdout, stderr){
        console.log('/******** jade begin ********/')
        console.log('err: ', error)
        console.log('out: ', stdout)
        console.log('stderr:', stderr)
        console.log('/******** jade end ********/')
    })
}

var jshint = function(){}

if(program.watch){
    watchDog(build, migrate)
}
if(program.jade){
    jade()    
}
if(program.jshint){
    jshint()    
}
