class ConstantsData {
  token = localStorage.getItem('ppotoken');
  remoteServer = ''; //'http://178.62.112.203';
  
  defaultHeaders = {
    'Accept': 'application/vnd.elitex-v1+json',
    'Content-Type': 'application/json',
    'Authorization': `access_token=${this.token}`
  };
  
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

  deleteToken() {
    localStorage.removeItem('ppotoken');
    this.token = null;
    this.headers = this.defaultHeaders;
  }
};

let Constants = new ConstantsData();

export default Constants;