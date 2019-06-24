export function customAjax(
  url: string,
  config: {
    method: string;
    responseType: XMLHttpRequestResponseType;
    data?: any;
    requestHeaders?: { [key: string]: string };
  }
) {
  return new Promise(function(resolve, reject) {
    const data = config.data || {};
    const requestHeaders = config.requestHeaders || {};
    let request = new XMLHttpRequest();
    request.responseType = config.responseType;
    request.open(config.method, url, true);
    Object.keys(requestHeaders).forEach(key =>
      request.setRequestHeader(key, requestHeaders[key])
    );
    request.onreadystatechange = function() {
      if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.status.toString()));
        }
      }
    };
    request.onerror = function() {
      reject(Error("Network Error"));
    };
    request.send();
  });
}
