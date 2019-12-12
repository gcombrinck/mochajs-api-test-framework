import gulp from 'gulp';
import mocha from 'gulp-mocha';

gulp.task('api-testing', () => gulp.src([
    "./tests/reqres_api_test.js",

])
    .pipe(mocha({
        reporter: 'mochawesome',
        timeout: 1200000,
        exit: true,
        require: '@babel/register',
        reportTitle: 'Regression Test Report',
        reporterOptions: {
            reportDir: './tests/reports/',
            reportPageTitle: 'Regression Test Report',
            reportTitle: `https://reqres.in/ Sample Tests`,
            reportFilename: `api-regression-report`,
            overwrite: true,
            quiet: true,
        },
    })));
