export type PageRange = Readonly<{ min: number; max: number }>;

const create = (page: number): PageRange => {
  return {
    min: page,
    max: page,
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
    min: Math.min(page, range.min),
    max: Math.max(page, range.max),
  };
};

const contains = (range: PageRange, page: number) => {
  return range.min <= page && page <= range.max;
};

export const PageRange = {
  create,
  isUpper,
  isLower,
  load,
  contains,
};
