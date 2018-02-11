const http = require('http');

const agent = new http.Agent({keepAlive: true})

let options = {
	hostname: "www.google.com",
	port: 80,
	method: 'GET',
	agent: agent
};

let page = 0;
module.exports = function(rawData, morePages){
	//@param rawData{String} text input obtained from stdInput
	//@param morePages{boolean} if true query for more pages;
	//resolves a readable stream;
	
	let queryParameter = rawData.trim().split(" ").join("+");
	morePages?(page+= 1):(page=0);
	
	let _options = {...options, path: `/search?q=${queryParameter}&start=${page}0`};
	
	return new Promise(function(resolve, reject){
		const req = http.request(_options);		
		req.end();
		
		req.on('response', (res)=>{
			res.setEncoding('utf8');
			resolve(res);	
		});
	})

}