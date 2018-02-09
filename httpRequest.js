const http = require('http');

const agent = new http.Agent({keepAlive: true})

let options = {
	hostname: "www.google.com",
	port: 80,
	method: 'GET',
	agent: agent
};

module.exports = function(queryParameter){
	let _options = {...options, path: `/search?q=${queryParameter}`};
	
	return new Promise(function(resolve, reject){
		const req = http.request(_options);		
		let html = "";
		req.end();

		req.on('response', (res)=>{	

			//res is a readable stream
			res.on("data", (data)=>{
				html += data.toString().trim();
			});	
			
			res.on("end", (data)=>{
				resolve(html);
				res.destroy();
			});
			
		});
	})

}