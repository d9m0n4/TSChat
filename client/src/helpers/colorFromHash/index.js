const colorFromStr = (str, o) => {
  if (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << o) - hash);
    }
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();

    return '00000'.substring(0, 6 - color.length) + color;
  }
};

export default colorFromStr;
