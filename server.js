var req = require('./httpRequest');
var scraper = require('./pythonScraper');

let idle = true;
process.stdin.on('data', async function(data){
	try{
		if(idle){
			idle = false;
			
			data = data.toString();
			data = data.substring(0, data.length - 2);//remove \n
			
			let htmlSource = await req(data);//onAverage html is 200KB
			let scraped = await scraper.scrape(htmlSource);
			idle = true;
			console.log(html.length);
			console.log(scraped.length)
		}
		else
			console.log("Still Scraping")
	}
	catch(err){
		console.log(err);
	}
	
});