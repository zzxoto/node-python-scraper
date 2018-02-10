const {spawn} = require('child_process');

module.exports.scrape = function(htmlSource){
	//htmlSource is a http response readableStream
	
	const py = spawn("python", ["scrape.py"]);
	
	
	
	return new Promise(function(resolve, reject){
		//htmlSource is a httpResponse readable stream with HighWaterMark Value of 16384 bytes that means after its buffer gets filled with 16384 bits, it will stop recieveing values
		//unless the buffer is emptied

		htmlSource.pipe(py.stdin);

		htmlSource.on("end", function(){
			console.log("ended")
		});
		
		py.stdout.on("data", function(data){
			data = data.toString()
			console.log(data)
			if (data.substring(0,3) === "101"){
				//error in python
				console.log(data.substring(3, data.length))
			}
			else{
				
			}
		});		
		
		py.on("exit", function(code, signal){
		
		})
		
		py.on("error", function(){
			//console.log("error");
		})
	
	})
	
}


