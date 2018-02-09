const {spawn} = require('child_process');

module.exports.scrape = function(html){
	const py = spawn("python", ["scrape.py"]);
	
	return new Promise(function(resolve, reject){
		py.stdout.on("data", function(data){
			resolve(data.toString());
		});		
		py.stdin.write(html, "utf8", function(){
			py.stdin.end();
		});
	})
	
}


