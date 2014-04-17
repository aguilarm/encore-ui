module.exports = {
    options: {
        livereload: 1337
    },
    scripts: {
        files: ['src/**/*.js', '!src/*/*.spec.js'],
        tasks: ['jshint:scripts', 'jscs', 'karma:watch:run', 'after-test']
    },
    specs: {
        files: ['src/**/*.spec.js'],
        tasks: ['jshint:specs', 'karma:watch:run', 'copy:coverage'],
        options: {
            livereload: false
        }
    },
    componentHtml: {
        files: ['src/**/templates/*.html'],
        tasks: ['after-test', 'karma:watch:run']
    },
    css: {
        files: ['src/**/*.less'],
        tasks: ['less']
    },
    html: {
        files: ['demo/*', 'src/**/docs/*.html', 'src/**/*.md'],
        tasks: ['html2js', 'build', 'copy']
    }
};