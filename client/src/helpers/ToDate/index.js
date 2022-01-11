import { formatDistanceToNow, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const toDate = (date) => {
  const parsedDate = parseISO(date);
  return formatDistanceToNow(parsedDate, { addSuffix: true, locale: ruLocale });
};

export default toDate;
