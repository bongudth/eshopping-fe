type Dictionary<T> = { [key: string]: T };

export const formatFilterParams = (params: Dictionary<any>) => {
  const filterParams = Object.entries(params).map(([key, value]) => {
    return `${key}|$eq|${value}`;
  });

  return filterParams;
};

export const formatSortParams = (params: Dictionary<'asc' | 'desc'>) => {
  const sortParams = Object.entries(params).map(([key, value]) => {
    return value === 'asc' ? key : `-${key}`;
  });
  return sortParams;
};

export const separateParams = (
  params: Dictionary<string | (string | null)[]>
) => {
  const filterParams = Object.entries(params)
    .filter(
      ([key, value]) =>
        key !== 'search' &&
        key !== 'page' &&
        key !== 'limit' &&
        value !== 'asc' &&
        value !== 'desc' &&
        value !== null
    )
    .reduce((acc: Dictionary<string | (string | null)[]>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {});
  const sortParams = Object.entries(params)
    .filter(([_, value]) => value === 'asc' || value === 'desc')
    .reduce((acc: Dictionary<string | (string | null)[]>, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {}) as Dictionary<'asc' | 'desc'>;
  return { filterParams, sortParams };
};

export default { formatFilterParams, formatSortParams, separateParams };
