process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'];
const spawn = require('child_process').spawn;
exports.fake_handler = function(event, context, callback){
    var proc = spawn('/opt/bin/node',['build/bootstrap/index.js']);
    var output = "";
    proc.stdin.write(JSON.stringify(event));

    proc.stdin.end();

    proc.stdout.on('data', function(data) {
          output+=data;
    });

    proc.stderr.on('data', function(data) {
            console.log("STDERR: "+data);
    });

    proc.on('close', function(code) {
        context.succeed(output);
    });

}

