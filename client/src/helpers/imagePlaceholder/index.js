const lqip = require('lqip');

export const imagePh = (file) => {
  return lqip.base64(file).then((f) => console.log(f));
};
