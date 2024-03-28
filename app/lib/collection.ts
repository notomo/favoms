export const uniqueListByKey = <T>(list: T[], key: keyof T): T[] => {
  return Array.from(
    new Map(
      list.map((e) => {
        return [e[key], e];
      }),
    ).values(),
  );
};

type RecordKey<T> = {
  [K in keyof T]: T[K] extends string | number | symbol ? K : never;
}[keyof T];

export const listToRecord = <
  T extends { [P in RecordKey<T>]: string | number | symbol },
  K extends RecordKey<T>,
>(
  list: T[],
  key: K,
): Record<T[K], T> => {
  return list.reduce(
    (acc, x) => ((acc[x[key]] = x), acc),
    {} as Record<T[K], T>,
  );
};
