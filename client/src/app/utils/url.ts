/* eslint-disable @typescript-eslint/no-explicit-any */
export const generateQueryParam = (params?: any) => {
  const queryParams = Object.entries(params || {})
    .reduce(
      (acc: string[], [key, val]) =>
        val === '' ? acc : [...acc, `${key}=${val}`],
      []
    )
    .join('&');
  return queryParams ? `?${queryParams}` : '';
};
