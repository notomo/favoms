export type PageRange = Readonly<{ min: number; max: number }>;

const create = (): PageRange => {
  return {
    min: 0,
    max: 0,
  };
};

const isUpper = (range: PageRange, page: number) => {
  return range.max < page;
};

const isLower = (range: PageRange, page: number) => {
  return page < range.min;
};

const load = (range: PageRange, page: number): PageRange => {
  return {
    min: range.min === 0 ? page : Math.min(page, range.min),
    max: Math.max(page, range.max),
  };
};

const contains = (range: PageRange, page: number) => {
  if (range.min === 0 && range.max === 0) {
    return false;
  }
  return range.min <= page && page <= range.max;
};

export const PageRange = {
  create,
  isUpper,
  isLower,
  load,
  contains,
};
