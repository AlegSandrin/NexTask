export const dateFormatter = (date: Date, locale = 'pt-BR') => {
    if(!date || typeof date !== 'object' || !(date !instanceof Date)) return '';
    // Recebe uma data, converte para o fuso horário de São Paulo e retorna uma string formatada
    // DD/MM/YYYY, HH:mm
    return new Intl.DateTimeFormat(
        locale, 
        { 
            year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
            timeZone: 'America/Sao_Paulo'
        }
        ).format(date);
};