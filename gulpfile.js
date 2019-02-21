'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);

gulp.task('update-version', () => {
    const gutil = require('gulp-util');
    const fs = require('fs');
    const semver = require('semver')

    if (process.argv.indexOf('--version') !== -1 && semver.valid(process.argv[4])) {
                
        const pkgSolution = require('./config/package-solution.json');
        const newVersionNumber = process.argv[4] + '.0';
        
        gutil.log('Old Version:\t' + pkgSolution.solution.version);
        
        pkgSolution.solution.version = newVersionNumber;
        gutil.log('New Version:\t' + pkgSolution.solution.version);

        fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4));

    } else {
        gutil.log('The provided version is not a valid SemVer version');
    }

    return Promise.resolve();
});
