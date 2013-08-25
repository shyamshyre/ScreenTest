


function serviceList(serviceName,serviceDuration,serviceDefaultCost,serviceId,serviceTaskList)
{
	this.serviceName=ko.observable(serviceName);
	this.serviceDuration=ko.observable(serviceDuration);
	this.serviceDefaultCost=ko.observable(serviceDefaultCost);
	this.serviceId=ko.observable(serviceId);
	this.serviceTaskList=ko.utils.arrayMap(serviceTaskList,function(item){
		return new servicesTaskList(item.serviceTaskId,item.skillId,item.skillName,item.boothType,item.facilityId,item.facilityName,item.serviceName,item.serviceTaskDuration,item.serviceTaskOrder,item.serviceTaskName,item.deleteFlag);
	});
}
function servicesTaskList(serviceTaskId,skillId,skillName,boothType,facilityId,facilityName,serviceName,serviceTaskDuration,serviceTaskOrder,serviceTaskName,deleteFlag){
	this.serviceTaskId= ko.observable(serviceTaskId);
	this.skillId= ko.observable(skillId);
	this.skillName= ko.observable(skillName);
	this.boothType= ko.observable(skillName);
	this.facilityId= ko.observable(facilityId);
	this.facilityName= ko.observable(facilityName);
	this.serviceName= ko.observable(serviceName);
	this.serviceTaskDuration= ko.observable(serviceTaskDuration);
	this.serviceTaskOrder= ko.observable(serviceTaskOrder);
	this.serviceTaskName= ko.observable(serviceTaskName);
	this.deleteFlag= ko.observable(deleteFlag);

}


function Agent(agentName,agentId){
	this.agentName = ko.observable(agentName);
	this.agentId = ko.observable(agentId);
}

var apptViewModel={
		apptagents: ko.observableArray([]),
		apptservices   :ko.observableArray([]),		
		selectTmpl		: ko.observable(""),	
		loaddata:function(appt){
			var xhr = $.ajax({
				type: "GET",
				url: "http://localhost:8080/ScreenTest/output/apptservices.json",
				//data: "name=John&location=Boston",
				success: function(data){
					var obj= ko.utils.arrayMap(data,function(item){
						return new serviceList(item.serviceName,item.serviceDuration,item.serviceDefaultCost,item.serviceId,item.serviceTaskList); 
					});
					apptservices= obj;
				}
			});
		},
		loadAgents:function(data,event){
			$( "#datepicker" ).datepicker();
			var serviceid_id=ko.toJSON(data.serviceId);
			var xhr = $.ajax({
				type: "GET",
				url: "http://localhost:8080/ScreenTest/output/apptagents.json",
				//url: "http://localhost:8080/ScreenTest/output/apptagents.json/"+serviceid_id,
				//data: "name=John&location=Boston",
				success: function(data){
					var obj= ko.utils.arrayMap(data,function(item){
						return new Agent(item.agentName,item.agentId); 
					});
					apptagents= obj;
					// alert(ko.toJSON(apptagents));
				}
			});

			apptViewModel.setTmpl('apptserviceProvider');
		},
		loadSchedule:function(data,event){
			var agentId=ko.toJSON(data.agentId);
			//alert(agentId);
			var xhr = $.ajax({
				type: "GET",
				url: "http://localhost:8080/ScreenTest/output/apptagents.json",
				//url: "http://localhost:8080/ScreenTest/output/apptagents.json/"+serviceid_id,
				//data: "name=John&location=Boston",
				success: function(data){
					var obj= ko.utils.arrayMap(data,function(item){
						return new Agent(item.agentName,item.agentId); 
					});
					apptagents= obj;
					// alert(ko.toJSON(apptagents));
				}
			});

			apptViewModel.setTmpl('apptdateTime');
			$( "#datepicker" ).datepicker();
		},
		bookAppt:function(data,event){

			apptViewModel.setTmpl('apptbook');
			$( "#datepicker" ).datepicker();

		},
		setTmpl: function ( template )
		{
			this.selectTmpl( template );
			$( "#datepicker" ).datepicker();
		},	

};




//ko.applyBindings(apptViewModel);
//function ServicesSetModel( services ){

//var servicesSet = ko.utils.arrayMap( services.setOfServices , function(service){
//return new ServiceModel( service.serviceName, service.tasks);
//});
//this.setOfServices = ko.observableArray( servicesSet );
//}

//function ServiceModel(serviceName, tasksList){

//this.serviceName = ko.observable( serviceName );
//var tasks = ko.utils.arrayMap(tasksList, function( task ){
//return new TaskModel(task.taskNm, task.time);
//});
//this.taskList = ko.observableArray( tasks );