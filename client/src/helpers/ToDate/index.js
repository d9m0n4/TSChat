import { format, formatDistanceToNow, isToday, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const toDate = (date) => {
  const parsedDate = parseISO(date);

  return isToday(parsedDate)
    ? formatDistanceToNow(parsedDate, { addSuffix: true, locale: ruLocale })
    : format(parsedDate, 'dd.MM.yyyy');
};

export default toDate;
