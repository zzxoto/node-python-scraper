const {spawn, spawnSync} = require('child_process');

module.exports = function(htmlSource){

	return new Promise(function(resolve, reject){
		//htmlSource is a httpResponse readable stream with HighWaterMark Value of 16384 bytes that means after its buffer gets filled with 16384 bits, it will stop recieveing values
		//unless the buffer is emptied
		
			const py = spawn("python", ["scrape.py"]);
			
			htmlSource.pipe(py.stdin);
			
			py.stdout.on("data", function(data){
				data = data.toString()
				
				//101 is the error signal
				data.substring(0,3) === "101"?
					console.log(data.substring(3, data.length)):
					console.log(data);
			});		
			
			py.on("exit", function(){
				resolve();
			})
	
			py.on("error", function(){
				console.log("****Make sure python and the dependencies are installed properly***")
			})
	
	})
	
}


