const formatDate = (date) => (
 `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
);

function getCallerIP(request) {
  var ip = request.headers['x-forwarded-for'] ||
      request.connection.remoteAddress ||
      request.socket.remoteAddress ||
      request.connection.socket.remoteAddress;
  ip = ip.split(',')[0];
  ip = ip.split(':').slice(-1);
  return ip;
}

function generate() {
  const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let str = '';
  for(var i = 0; i < 16; i++) {
    str += _sym[parseInt(Math.random() * (_sym.length))];
  }
  return str;
}

function searchEngine(obj, srcElement) {
  let element = srcElement.toLowerCase();
  let result = false;
  checkType(obj);

  function chechObj(obj) {
    if(!result) {
      for (let key in obj) {
        if(result) break;
        checkType(obj[key])
      }
    }
  }
  function chechArr(arr) {
    if(!result) {
      arr.some(e => checkType(e))
    }
  }
  function checkType(obj) {
    if(!result) {
      if (typeof obj === "object") {
        if (Array.isArray(obj)) {
          chechArr(obj)
        } else if (obj !== null) {
          chechObj(obj)
        }
      } else if (typeof obj === "string" &&
          obj.toLowerCase().includes(element)) {
        result = true;
        return result;
      } else return false;
    }
  }
  return result;
}



module.exports = {
  formatDate,
  getCallerIP,
  generate,
  searchEngine
};
