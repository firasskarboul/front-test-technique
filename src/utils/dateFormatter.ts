export default function formatDate(date: string) {
    const formattedDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long' };
    return formattedDate.toLocaleDateString('fr-FR', options);
}