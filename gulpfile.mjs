import gulp from 'gulp';
import mergeJson from 'gulp-merge-json';
import yargs from 'yargs';
import {hideBin} from 'yargs/helpers';
import fs from 'fs';
import path from 'path';

const argv = yargs(hideBin(process.argv)).argv;
const env = argv.env || 'UAT';
const country = argv.country || 'IN';

const countryConfigPath = `src/config/countries/${country}/common/${country}.json`;
let defaultLanguage = 'en';

if (fs.existsSync(countryConfigPath)) {
  const countryConfig = JSON.parse(fs.readFileSync(countryConfigPath, 'utf-8'));
  defaultLanguage = countryConfig.defaultLanguage || 'en';
}

const buildTranslationMap = () => {
  const langDir = `src/config/countries/${country}`;
  const folders = fs
    .readdirSync(langDir, {withFileTypes: true})
    .filter(
      dirent => dirent.isDirectory() && /^[a-z]{2}_[A-Z]{2}$/.test(dirent.name),
    );

  const translations = {};

  folders.forEach(folder => {
    const langCode = folder.name.split('_')[0];
    const filePath = path.join(langDir, folder.name, `${langCode}.json`);

    if (fs.existsSync(filePath)) {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      translations[langCode] = data;
    }
  });

  return translations;
};

const configFiles = [
  `src/config/env/${env}.json`,
  `src/config/countries/${country}/common/${country}.json`,
  `src/config/countries/${country}/common/featureConfig.json`,
  // `src/config/countries/${country}/${defaultLanguage}_${country}/${defaultLanguage}.json`,
];

export const prepareConfig = () => {
  const translations = buildTranslationMap();

  return gulp
    .src(configFiles)
    .pipe(
      mergeJson({
        fileName: 'config.json',
        concatArrays: false,
        edit: mergedJson => {
          return {
            ...mergedJson,
            translations,
          };
        },
      }),
    )
    .pipe(gulp.dest('src/config'));
};

gulp.task('prepare-config', prepareConfig);
