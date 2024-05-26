export function formatDate(date: string) {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return formattedDate.toLocaleDateString('fr-FR', options);
}

export function formatDateDay(date: string) {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    return formattedDate.toLocaleDateString('fr-FR', options);
}