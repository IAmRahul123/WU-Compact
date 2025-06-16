import gulp from 'gulp';
import mergeJson from 'gulp-merge-json';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import fs from 'fs';

const argv = yargs(hideBin(process.argv)).argv;
const env = argv.env || 'UAT';
const country = argv.country || 'IN';

const countryConfigPath =  `src/config/countries/${country}/common/${country}.json`;
let defaultLanguage = 'en';

if (fs.existsSync(countryConfigPath)) {
  const countryConfig = JSON.parse(fs.readFileSync(countryConfigPath, 'utf-8'));
  defaultLanguage = countryConfig.defaultLanguage || 'en';
}

const configFiles = [
  `src/config/env/${env}.json`,
  `src/config/countries/${country}/common/${country}.json`,
  `src/config/countries/${country}/common/featureConfig.json`,
  `src/config/countries/${country}/${defaultLanguage}_${country}/${defaultLanguage}.json`,
];

export const prepareConfig = () =>
  gulp
    .src(configFiles)
    .pipe(
      mergeJson({
        fileName: 'config.json',
        concatArrays: false,
      }),
    )
    .pipe(gulp.dest('src/config'));

gulp.task('prepare-config', prepareConfig);
