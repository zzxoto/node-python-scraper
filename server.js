let req = require('./httpRequest');
let scraper = require('./pythonScraper');

let currState = "newQuery";
let currQueryString = "";

process.stdin.on('data', async function(data){
	data = data.toString().trim()
	if (data === "q*"){
		console.log("quitting..");
		process.exit();
	}
	else if(currState === "moreQuery"){
		currState = null;
		currState = await moreQuery(data);
	}
	else if (currState === "newQuery"){
		currState = null;
		currState = await newQuery(data);
	}
	else
		console.log("Still Processing. Just a moment...");
});

var newQuery = (input, morePages)=>{
	return new Promise(async function(resolve, reject){		
		currQueryString = input;
		
		let htmlSource = await req(input, morePages);
		await scraper(htmlSource);
		
		prompt(input);
		resolve("moreQuery");
	})
}

var moreQuery = (input) =>{
	if (input === "m")
		return newQuery(currQueryString, true);
	else
		return newQuery(input);
}

var prompt = (x)=>{
		console.log();
		if (x)
			console.log(`Hit 'm' for more results for '${x}'`);
		
		console.log("Enter 'q*' anytime you want to Quit");
		process.stdout.write("Start typing to Search: ");
}
prompt();

