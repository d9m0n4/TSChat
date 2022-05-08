const colorFromStr = (str, o) => {
  if (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << o) - hash);
    }
    const color = (hash & 0x00ffffff).toString(16).toUpperCase();

    const currentColor = '00000'.substring(0, 5 - color.length) + color;
    return currentColor;
  }
};

export default colorFromStr;
