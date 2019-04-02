export const setAccessToken = (access_token: string, expires_at: number) => {
  localStorage.setItem('access_token', access_token);
  localStorage.setItem('expires_at', expires_at.toString());
};

export const getAccessToken = () => localStorage.getItem('access_token');

export const isAccessTokenValid = () => {
  const expires_at = localStorage.getItem('expires_at');
  const access_token = localStorage.getItem('access_token');
  if (!expires_at || !access_token) return false;
  return Date.now() <= parseInt(expires_at);
};

export const getAuthHeader = () => ({
  Authorization: `Bearer ${getAccessToken()}`
});