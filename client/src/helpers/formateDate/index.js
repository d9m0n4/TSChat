import { format, formatDistanceToNow, isToday, parseISO } from 'date-fns';
import ruLocale from 'date-fns/locale/ru';

const formatDate = (date) => {
  const parsedDate = parseISO(date);

  return format(parsedDate, 'dd.MM.yyyy');
};

export default formatDate;
