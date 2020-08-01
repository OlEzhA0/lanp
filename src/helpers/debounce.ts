export const debounce = (fn: Function, delay: number) => {
  let timer: number;

  return (...args: any) => {
    const setDelay = args[0] ? delay : 0
    clearTimeout(timer);
    timer = setTimeout(fn, setDelay, args);
  };
};
