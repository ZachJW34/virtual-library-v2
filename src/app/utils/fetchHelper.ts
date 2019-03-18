export const addQueryParams = (params: { [key: string]: any }) => {
  const esc = encodeURIComponent;
  return (
    "?" +
    Object.keys(params)
      .map(key => `${esc(key)}=${esc(params[key])}`)
      .join("&")
  );
};
