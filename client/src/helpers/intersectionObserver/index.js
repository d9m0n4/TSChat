export const observeMessge = () => {
  let options = {
    root: null,
    rootMargin: '5px',
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      console.log(entry.target);
    });
  }, options);

  return { observer };
};
