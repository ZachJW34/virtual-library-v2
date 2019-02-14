export const fetchGet = (
  url: string,
  params?: { [key: string]: any }
): Promise<any> => {
  const queryParams = params ? addQueryParams(params) : '';
  return fetch(url + queryParams )
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
};

// export const fetchPost = async (url: string, body: {}) => {
//   try {
//     console.log(JSON.stringify(body));
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(body)
//       });
//       const json = await response.json();
//       console.log(json);
//     } catch(e) {
//       console.log(e)
//     }
// }

const addQueryParams = (params: { [key: string]: any }) => {
  const esc = encodeURIComponent;
  return (
    "?" +
    Object.keys(params)
      .map(key => `${esc(key)}=${esc(params[key])}`)
      .join("&")
  );
};
