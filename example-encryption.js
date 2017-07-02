//biblioteca para criptografia
var crypto = require('crypto-js');

var secretMessage = {
	name: 'vinicius',
	password: 'segredo'
};
//uma uma senha para criptografia
var secretKey = '123abc';

// Criptografa
var encryptedMessage = crypto.AES.encrypt(JSON.stringify(secretMessage), secretKey);
console.log('Criptografado: ' + encryptedMessage);

// Descriptografa
var bytes = crypto.AES.decrypt(encryptedMessage, secretKey);
var decrypted = JSON.parse(bytes.toString(crypto.enc.Utf8));

console.log(decrypted);
console.log(decrypted.password);