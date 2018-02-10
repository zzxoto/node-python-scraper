const http = require('http');

const agent = new http.Agent({keepAlive: true})

let options = {
	hostname: "www.google.com",
	port: 80,
	method: 'GET',
	agent: agent
};

module.exports = function(rawData){
	//@param rawData => text input obtained from stdInput
	//resolves a readable stream;
	let queryParameter = rawData.trim().split(" ").join("+")

	let _options = {...options, path: `/search?q=${queryParameter}`};
	
	return new Promise(function(resolve, reject){
		const req = http.request(_options);		
		let html = "";
		req.end();

		req.on('response', (res)=>{
			res.setEncoding('utf8');
			resolve(res);	
		});
	})

}