function NodeFactory(){
	this.nodes=[];
	this.create=function(){
		const newNode=new Node();
		this.nodes.push(newNode);
		return newNode;
	}
}