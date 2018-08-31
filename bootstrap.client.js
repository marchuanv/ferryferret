
async function getAllEndpointDependencies(config, endpoint, _gitName, endpoints){
	if (!endpoints){
		endpoints = [];
	}
	const depEndpoint = config.find((e)=> e.gitname==_gitName);
	if (depEndpoint){
		const foundEndpoint=endpoints.find((e)=>e.gitname == depEndpoint.gitname);
		if (!foundEndpoint){
			endpoints.push(depEndpoint);
			for(const depGitName of depEndpoint.dependencies){
				await getAllEndpointDependencies(config, null, depGitName, endpoints);
			}
		}
	}else{
		for(const depGitName of endpoint.dependencies){
			await getAllEndpointDependencies(config, null, depGitName, endpoints);
		}
	}
	return endpoints;
}

async function request(endpoint){
	return new Promise(async(resolve)=>{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = async () => {
		    if (xhttp.readyState == 4 && xhttp.status == 200) {
			resolve(xhttp.responseText);
		    }
		};
		xhttp.open("GET", endpoint, true);
		xhttp.send();
	});
};

request("/package.json").then(async(pkgJson)=>{
	const pkg = JSON.parse(pkgJson);
	await request("/config.json").then(async(configJson)=>{
		const config = JSON.parse(configJson);
		const endpoint = config.find((e)=> e.gitname==pkg.name);
		const promises=[];
		await getAllEndpointDependencies(config, endpoint).then((endpoints)=>{
			for(const endpoint of endpoints){
				const promise=new Promise((resolve)=>{
					const script = document.createElement('script');
					script.src = endpoint.url;
					script.onload=resolve;
					document.head.appendChild(script);
				});
				promises.push(promise);
			};
		});
		return Promise.all(promises);
	}).then(()=>{
		console.log("all scripts loaded");
	});
});
