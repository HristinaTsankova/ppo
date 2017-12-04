class ConstantsData {
  token = localStorage.getItem('ppotoken');
  remoteServer = '';//'http://178.62.112.203';

  alertTimeout = 5000;
  alertPosition = "top-right";
  alerTypes = {
    'info': 'info',
    'success': 'success',
    'warning': 'warning',
    'danger': 'danger'
  };
  
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