var req = require('./httpRequest');
var scraper = require('./pythonScraper');

let idle = true;
process.stdin.on('data', async function(data){
	try{
		if(idle){
			idle = false;
			
			data = data.toString();
			
			let htmlSource = await req(data);//onAverage html is 200KB
			let scraped = await scraper.scrape(htmlSource);
			idle = true;
		}
		else
			console.log("Still Scraping")
	}
	catch(err){
		console.log(err);
	}
	
});