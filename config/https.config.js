const path = require('path');
const mkdirp = require('mkdirp');
// const { keygen } = require('tls-keygen');
const fs = require('fs');

async function options() {
  const dir = path.join(__dirname, '/httpsCerts');
  mkdirp.sync(dir);

  // let { key, cert } = await keygen({
  //   key: path.join(dir, 'key.pem'),
  //   cert: path.join(dir, 'cert.pem')
  // });

  let key = path.join(dir, '/key.pem');
  let cert = path.join(dir, '/cert.pem');

  key = fs.readFileSync(key, 'utf8');
  cert = fs.readFileSync(cert, 'utf8');

  return {
    key,
    cert
  };
}

module.exports = options;
