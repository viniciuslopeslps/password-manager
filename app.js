
//biblioteca para armazenamento local no servidor
var storage = require("node-persist");
//usado para criptografia
var crypto = require("crypto-js");
// biblioteca para pegar argumentos do console

var argv = require("yargs")
	.command("create", "Create an acoount", function(yargs){
		yargs.options({
			name: {
				demand: true,
				alias: "n",
				description: "the name of app goes here",
				type: "string"
			},
			username: {
				demand: true,
				alias: "u",
				description: "the username goes here",
				type: "string"
			},
			password: {
				demand: true,
				alias: "p",
				description: "the password goes here",
				type: "string"
			},
            masterPassword: {
                demand: true,
                alias: "m",
                description: "the master password goes here",
                type: "string"
            }
		});
	})
	.command("get", "get the password", function(yargs){
		yargs.options({
			username: {
				demand: true,
				alias: "u",
				description: "the username goes here",
				type: "string"
			},
            masterPassword: {
                demand: true,
                alias: "m",
                description: "the master password goes here",
                type: "string"
            }
		})
	})
	.help("help")
	.argv;

//inicia a biblioteca do persist
storage.initSync();
 
function saveAccounts(accounts, masterPassword){
    //criptografa
    var encrypted = crypto.AES.encrypt(JSON.stringify(accounts), masterPassword);
    //grava conta
    storage.setItemSync("accounts", encrypted.toString());
    console.log("Conta salva com sucesso!");
    
    return accounts;
}

function getAccounts(masterPassword){
    //busca o nome pela chave
    var encryptedAccounts = storage.getItemSync("accounts");
    if(encryptedAccounts === undefined){
        return [];
    }
    //descriptgrafa
    var bytes = crypto.AES.decrypt(encryptedAccounts, masterPassword);
    var accounts = JSON.parse(bytes.toString(crypto.enc.Utf8));
    return accounts;
}

function createAccount(account, masterPassword){
	//busca o nome pela chave
	var accounts = getAccounts(masterPassword);
	accounts.push(account);
	//grava dados com chave valor, o valor pode ser qualquer coisa
//	storage.setItemSync("accounts", accounts);
    saveAccounts(accounts, masterPassword);
	return account;
}

function getAccount(username, masterPassword){
	//busca o nome pela chave
	var accounts = getAccounts(masterPassword);
	var accountsUsername =[];
	if(accounts !== undefined){
	for (var i=0; i < accounts.length; i++) {
		if(accounts[i].username === username){
			accountsUsername.push(accounts[i]);
		}
	}
	return accountsUsername;
	}
}

var command = argv._[0];

if(command === "create" && argv.name !== undefined && argv.username !== undefined && argv.password !== undefined && argv.masterPassword !== undefined){
	try{
		createAccount({"name":argv.name, "username": argv.username,"password":argv.password}, argv.masterPassword);
		console.log("Conta criada!");
	}
	catch(e){
		console.log("Unable to create tha account");
	}
}
else if(command === "get" && argv.username !== undefined && argv.masterPassword !== undefined){
	try{
		var account = getAccount(argv.username, argv.masterPassword);
		if(account.length===0){
			console.log("Account not found!");
		}else{
			console.log(account);
		}
	}catch(e){
		console.log("Unable to get the account");
	}
}


