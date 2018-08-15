function guid() {
	function s4() {
	  return Math.floor((1 + Math.random()) * 0x10000)
	    .toString(16)
	    .substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

function Node() {
	
	const canvas=document.createElement("canvas");
	
	const classAtt=document.createAttribute("class");
	classAtt.value="class";

	const idAtt=document.createAttribute("id");
	idAtt.value=guid();

	canvas.setAttributeNode(classAtt);
	canvas.setAttributeNode(idAtt);

	canvas.style.position = "absolute";

	this.move=function(){
		canvas.style.left = event.clientX;
        canvas.style.top = event.clientY;
	}
	
	this.draw=function(){
    	var ctx = canvas.getContext('2d');
    	ctx.fillRect(0, 0, 100, 100);
    	ctx.clearRect(1, 1, 99, 99);
    	ctx.strokeRect(1, 1, 99, 99);
	  	return canvas;
	}
}