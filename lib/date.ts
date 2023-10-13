export const dateFormatter = (date: Date, locale = 'pt-BR') => {
    return new Intl.DateTimeFormat(locale).format(date);
};