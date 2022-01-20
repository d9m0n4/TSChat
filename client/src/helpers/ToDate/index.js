import { format, formatDistanceToNow, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const toDate = (date) => {
  const parsedDate = parseISO(date);
  return parsedDate > Date.now()
    ? formatDistanceToNow(parsedDate, { addSuffix: true, locale: ruLocale })
    : format(parsedDate, 'dd.MM.yyyy');
};

export default toDate;
