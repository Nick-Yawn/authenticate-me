import Cookies from 'js-cookie';

export async function csrfFetch( url, options = {} ){
  options.method = options.method || 'GET';
  options.headers = options.headers || {};

  if( options.method.toUpperCase() !== 'GET' ){
    options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    const XSRFToken = Cookies.get('XSRF-TOKEN');
    console.log(XSRFToken);
    options.headers['XSRF-Token'] = XSRFToken;
  }

  const res = await window.fetch(url, options);

  if( res.status >= 400 ) throw res
  else return res;
}

export function restoreCSRF() {
  return csrfFetch('/api/csrf/restore');
}
