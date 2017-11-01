class ConstantsData {
  token = localStorage.getItem('ppotoken');
  remoteServer = 'http://178.62.112.203';
  headers = {
    'Accept': 'application/vnd.elitex-v1+json',
    'Content-Type': 'application/json',
    'Authorization': `access_token=${this.token}`
  };

  setToken(token) {
    localStorage.setItem('ppotoken', token);
    this.token = token;
    this.headers['Authorization'] = `access_token=${this.token}`;
  }
};

let Constants = new ConstantsData();

export default Constants;