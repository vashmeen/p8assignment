let timer: ReturnType<typeof setTimeout>;
type Scheduled<Args extends unknown[]> = {
  (...args: Args): void;
};
export type ScheduleCallback = <Args extends unknown[]>(
  callback: (...args: Args) => void,
  timeout?: number
) => Scheduled<Args>;

export const debounce: ScheduleCallback = (func, timeout = 300) => {
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
};
