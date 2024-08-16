const { src, dest, series } = require('gulp');
const del = require('del');
const log = require('fancy-log');
var exec = require('child_process').exec;

const paths = {
    server_file_name: 'server.bundle.js',
    react_src: '../client/build/**/*',
    react_dist: './build'
};

function clean()  {
    log('removing the old files in the directory')
    return del('./build/**', {force:true});
}

function buildReactCodeTask(cb) {
    log('building React code into the directory')
    return exec('cd ../client && npm run build', function (err, stdout, stderr) {
        log(stdout);
        log(stderr);
        cb(err);
    })
}

function copyReactCodeTask() {
    log('copying React code into the directory')
    return src(`${paths.react_src}`)
        .pipe(dest(`${paths.react_dist}`));
}

exports.default = series(
    clean,
    buildReactCodeTask,
    copyReactCodeTask
);