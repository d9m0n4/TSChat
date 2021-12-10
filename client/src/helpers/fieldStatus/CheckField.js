const checkField = (key, touched, errors) => {
  if (touched[key]) {
    if (errors[key]) {
      return 'error';
    } else {
      return 'success';
    }
  } else {
    return '';
  }
};

export default checkField;
