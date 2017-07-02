//recebe o valor pasasdo quando chamado o arquivo
var argv = require("yargs")
	//cria um comando para o yargs, 
	.command("hello", "Greets the user", function(yargs){
		yargs.options({
			name: {
				demand: true,
				alias: "n",
				description: "Your first name goes here",
				type: "string"
			},
			lastname:{
				demand: true,
				alias: "l",
				description: "Your last name goes here",
				type: "string"
			}
		})
	})
	.help("help")
	.argv;

//para testar o comando: node example-args.js hello -n "vini" -l "lopes"
//para testar com obj: node example-args.js --name vinicius
console.log(argv);

var command = argv._[0];

if(command === "hello" && argv.name !== undefined){
	console.log("Hello World " + argv.name);
}
else{
	console.log("No Hello");
}

//todo:parei no 10:00