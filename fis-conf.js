fis
    .media('dev')
    .match('style/*.scss', {
        parser: fis.plugin('sass'),
        rExt: '.css',
        release: '/static/$0'
    })
fis
    .media('dev')
    .match('script/*.js', {
        release: '/static/$0'
    })


fis
    .media('product')
    .match('script/*.js', {
        useHash: true,
        optimizer: fis.plugin('uglify-js'),
        release: '/static/$0'
    })
fis
    .media('product')
    .match('style/*.scss', {
        useHash: true,
        parser: fis.plugin('sass'),
        optimizer: fis.plugin('clean-css'),
        rExt: '.css',
        release: '/static/$0'
    })
    .match('style/*.css', {
        optimizer: fis.plugin('clean-css'),
    })

fis
    .set('project.ignore', [
        'lib/**',
        'jade/**',
        'baseJade/**',
        'baseScript/**',
        'baseStyle/**',
        'node_modules/**',
        'package.json',
        'npm-script.js',
        'fis-conf.js',
    ])
fis
    .match('{mod/*.js,mod/**/*.js}', {
        isMod: true
    })
fis
    .hook('module', {
        mode: 'amd',
        forwardDeclaration: true
    })


// : media ug-mod
// 压缩 mod
fis
    .media('iproduct')
    .match('{mod/*.js,mod/**/*.js}', {
        optimizer: fis.plugin('uglify-js'),
    })
    .match('{mod/**/*.css}', {
        optimizer: fis.plugin('clean-css'),
    })

fis
    .media('babel')
    .match('*.es6', {
        parser: function(content, file, opts){
            var babel = require('babel-core');
            var result = babel.transform(content, opts);
            return result.code;
        },
        rExt: '.js'
    })
