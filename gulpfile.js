'use strict';

const gulp = require('gulp');
const build = require('@microsoft/sp-build-web');
build.addSuppression(`Warning - [sass] The local CSS class 'ms-Grid' is not camelCase and will not be type-safe.`);

build.initialize(gulp);

gulp.task('update-version', () => {
    const gutil = require('gulp-util');
    const fs = require('fs');
    const semver = require('semver');

    const versionArgIdx = process.argv.indexOf('--version');
    const newVersionNumber = process.argv[versionArgIdx+1];

    if (versionArgIdx !== -1 && semver.valid(newVersionNumber)) {
                
        const pkgSolution = require('./config/package-solution.json');
        gutil.log('Old Version:\t' + pkgSolution.solution.version);
        
        pkgSolution.solution.version = newVersionNumber + '.0';
        gutil.log('New Version:\t' + pkgSolution.solution.version);

        fs.writeFile('./config/package-solution.json', JSON.stringify(pkgSolution, null, 4), (error) => {});

    } else {
        gutil.log('The provided version is not a valid SemVer version');
    }
});

gulp.task('update-properties', () => {

    const fs = require('fs');

    const envArgIdx = process.argv.indexOf('--branch');
    const sourceBranchName = process.argv[envArgIdx+1];
    let env = 'staging';

    if (versionArgIdx !== -1) {

        if (sourceBranchName.match(/^([hotfix\/.+]|[release\/.+])$/)) {
            env = 'preproduction';        
        }
    
        if (sourceBranchName.match(/^master$/)) {
            env = 'production';
        }

        const manifestPath = './src/webparts/helloWorld/HelloWorldWebPart.manifest.json';
        const envConfig = './src/webparts/helloWorld/config/' + env + '.json';
                           
        const wpManifest = require(manifestPath);

        wpManifest.preconfiguredEntries = envConfig.preconfiguredEntries
        fs.writeFile(manifestPath, JSON.stringify(wpManifest, null, 4));        
    }
    
    return Promise.resolve();
});


