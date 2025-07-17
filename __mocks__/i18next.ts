export const t = (key: string) => key;

export const useTranslation = () => ({
  t,
  i18n: {
    language: 'en',
    changeLanguage: () => new Promise(() => {}),
  },
});
