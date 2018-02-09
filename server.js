var req = require('./httpRequest');
var scraper = require('./pythonScraper');

/**
const http = require('http');
const {spawn} = require('child_process');

const agent = new http.Agent({keepAlive: true})

const options = {
	hostname: "www.google.com",
	port: 80,
	method: 'GET',
	agent: agent
};

//spawn python 
const pythonScraper = spawn('cmd.exe', 
['/c', 'scrape.py'],
{stdio: 'pipe'}
);
setInterval( ()=>{
	pythonScraper.stdin.write("Hello World", function(){
		
	});
}, 100)

pythonScraper.on('exit', function(){
	console.log("exitted");
})

pythonScraper.stdout.on('data', function(data){
	console.log(data.toString());
})



function getRequest(data){
	//queries google for data
	//console.log(data);
	//return "foo";
	let _options = {...options}
	
	return new Promise(function(resolve, reject){
		const req = http.request(options);		
		req.end();
		
		req.on('response', (res)=>{
			
			//res is a readable stream
			res.on("data", (data)=>{
				console.log(data.toString().length);
			});
				
		});

	})
}

function processInPython(html){
		console.log(html);
}

**/
/**
const req = http.request(options, function(res){
	console.log("hello");
});


req.on('response', function(response){
	
	response.on("data", function(data){
		console.log(data.toString());
	})
	
	response.on("end", function(){
		console.log("ended");
	})
})

req.on("error", function(){
	console.log("error");
})



req.end();
**/
/**
process.stdin.on('data', function(data){
	data = data.toString();
	data = data.substring(0, data.length - 2);//remove \n
})
**/
/**
const {spawn} = require('child_process');


const pythonScraper = spawn('cmd.exe', ['/c', 'scrape.py', 'Hello'])

pythonScraper.on('exit', function(){
	console.log("exitted");
})

pythonScraper.stdout.on('data', function(data){
	console.log(data.toString());
})

process.stdout.write("Search: ");
//this is how user inputs queries
**/

/**
process.stdin.on('data', async function(data){
	try{
		data = data.toString();
		data = data.substring(0, data.length - 2);//remove \n
		
		let html = await getRequest(data);
		console.log("resolved");
		let scrapedDatas = await processInPython(html);
			
		console.log('Your results: ');
		console.log(data);
		process.stdout.write("Search: ");	
	
	}
	catch (err){
		console.log("ERROR!!");
	}
	
})

**/


let idle = true;
process.stdin.on('data', async function(data){
	try{
		if(idle){
			idle = false;
			
			data = data.toString();
			data = data.substring(0, data.length - 2);//remove \n
			
			let html = await req(data);//onAverage html is 200KB
			let scraped = await scraper.scrape(html);
			
			idle = true;
			console.log("scraped");
		}
		else
			console.log("Still Scraping")
	}
	catch(err){
		console.log("ERROR!!");
	}
	
})
