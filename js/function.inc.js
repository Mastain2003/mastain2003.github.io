console.log("functions");
getDrivesMainImages =async ()=>{
	if(!dataFromServer.drivesData){
		console.log("retriving drives data...");
		await retriveAndProcessDrivesData();
	}
	return dataFromServer.drivesData&&dataFromServer.drivesData.drivesMainImages.length?dataFromServer.drivesData.drivesMainImages:null
}
getDrives =async ()=>{
	if(!dataFromServer.drivesData){
		console.log("retriving drives arr data...");
		await retriveAndProcessDrivesData().then((response)=>{
			return dataFromServer.drivesData&&dataFromServer.drivesData.driveArr.length?dataFromServer.drivesData.driveArrs:null
		});
	}
	return dataFromServer.drivesData&&dataFromServer.drivesData.driveArr.length?dataFromServer.drivesData.driveArr:null
}
getNoOfPeopleServed =async ()=>{
	if(!dataFromServer.drivesData){
		console.log("retriving drives data...");
		await retriveAndProcessDrivesData();
	}
	return dataFromServer.drivesData?dataFromServer.drivesData.noOfPeopleServed:0;
}
getTotalMonetryValue =async ()=>{
	if(!dataFromServer.drivesData){
		console.log("retriving drives data...");
		await retriveAndProcessDrivesData();
	}
	return dataFromServer.drivesData?dataFromServer.drivesData.totalMonetryValue:0;
}
getNoOfDrives =async ()=>{
	if(!dataFromServer.drivesData){
		console.log("retriving drives data...");
		await retriveAndProcessDrivesData();
	}
	return dataFromServer.drivesData?dataFromServer.drivesData.totalDrives:0;
}
retriveAndProcessDrivesData=async ()=>{
	let data = await retriveData("/smile/driveDatabase.json");
	if(data.drives&&data.drives.length){
		data = data.drives;
		let drivesMainImages=[];
		let noOfPeopleServed=0;
		let totalMonetryValue=0;
		let driveArr = [];
		for (let i = 0; i <data.length; ++i) {
			let drive = data[i];
			if(!drive.supportedBy||drive.supportedBy=="") drive.supportedBy = null;
			if(!drive.occation||drive.occation=="") drive.occation = null;
			if(!drive.approxMoney||drive.approxMoney==""){
				drive.approxMoney = 0;
			}else{
				totalMonetryValue+=parseFloat(drive.approxMoney);
			}
			if(!drive.imgToShow||drive.imgToShow==""){
				drive.imgToShow = null;  //custom image	
			}else{
				drivesMainImages.push({
					"driveId":"id",
					"img":drive.imgToShow,
					"locationInArr":i
				})
			}
			noOfPeopleServed+=drive.smileount;
			driveArr.push({
				"locationInArr":i,
				"driveData":drive
			})
		}
		dataFromServer.drivesData={
			"drivesMainImages":drivesMainImages,
			"noOfPeopleServed":noOfPeopleServed,
			"totalMonetryValue":totalMonetryValue,
			"driveArr":driveArr,
			"totalDrives":driveArr.length
		}
	}
	else{
		console.log("No drive activity found");
	}
}
retriveData = async (url,options={})=>{
	console.log("cheking retriving url..");
	let data=null;
	await $.ajax({
		url:url,
		success:(result,status,xhr)=>{
			data=result;
		},
		error:(e)=>{
			console.log(e);
		},
		complete:()=>{
			//console.log(data);
		}
	})
	return data;
}