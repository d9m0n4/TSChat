import { format, parseISO } from 'date-fns';

const formatDate = (date) => {
  const parsedDate = parseISO(date);

  return format(parsedDate, 'dd.MM.yyyy');
};

export default formatDate;
