## azure-dev-ops

This is where you include your WebPart documentation.

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO

Release PreProd

testfsd

Badges

[![Build status](https://dev.azure.com/aequos/ModernSearch/_apis/build/status/ModernSearch-CI)](https://dev.azure.com/aequos/ModernSearch/_build/latest?definitionId=3)