// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str) {
  // return localStorage.getItem('cs-authority') || ['admin', 'user'];
  const authorityString = typeof str === 'undefined' ? localStorage.getItem('cs-authority') : str;
  // authorityString could be admin, "admin", ["admin"]
  let authority;
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    authority = authorityString;
  }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  return authority;
}

export function setAuthority(authority) {
  // const proAuthority = typeof authority === 'string' ? [authority] : authority;
  if (!authority) {
    return localStorage.removeItem('cs-authority');
  }
  return localStorage.setItem('cs-authority', JSON.stringify(authority));
}
