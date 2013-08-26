


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

	function ApptSchedule(appointmentName,appointmentDate,agentId,serviceId,notes,apptSourceChannel,apptSourceDt,apptSourceClientName)
	{
	this.appointmentName = ko.observable(appointmentName);
	this.appointmentDate = ko.observable(appointmentDate);	
	this.agentId = ko.observable(agentId);	
	this.serviceId = ko.observable(serviceId);	
	this.notes = ko.observable(notes);	
	this.apptSourceChannel = ko.observable(apptSourceChannel);	
	this.apptSourceDt = ko.observable(apptSourceDt);	
	this.apptSourceClientName = ko.observable(apptSourceClientName);
	}

function Agent(agentName,agentId){
	this.agentName = ko.observable(agentName);
	this.agentId = ko.observable(agentId);
}

$(function () {
    $.fn.serializeObject = function()
    {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function(i,fd) {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
               // o[this.name].push(this.value || '');
                } else {
                	  if(fd.name == "appointmentDate"){
                          var seldate= this.value;
                          var seldatetime = new Date(seldate).getTime();
                          o[this.name] = seldatetime;
                          return;
                          }
                o[this.name] = this.value || '';
                }
            
        });
        return o;
    }
});




var apptViewModel={
		apptagents: ko.observableArray([]),
		apptservices   :ko.observableArray([]),
		apptschedule   :ko.observableArray([]),
		selectTmpl		: ko.observable(''),	
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
			    url: "http://localhost:8080/ScreenTest/output/apptschedule.json",
			    //url: "http://localhost:8080/ScreenTest/output/apptagents.json/"+serviceid_id,
			    //data: "name=John&location=Boston",
			    success: function(data){
			      var obj= ko.utils.arrayMap(data,function(item){
			    	   return new ApptSchedule(item.appointmentName,item.appointmentDate,item.agentId,item.serviceId,item.notes,item.apptSourceChannel,item.apptSourceDt,item.apptSourceClientName); 
			       });
			      apptschedule= obj;
			      alert(ko.toJSON(apptschedule));
			    }
			});
			apptViewModel.setTmpl('apptdateTime');
			alert("initalized");
	  		var currentDate = $("#datepicker").datepicker({
			     dateFormat: "yy-mm-dd", 
			     onSelect: function( selectedDate ){
			    	 alert("Selected"+selectedDate);
			    	// $.data(seldate,'seldate',selectedDate);
					  //$.getJSON("<%=request.getContextPath()%>/rest/appointment/getAgentsAppointment/"+moddate.toString(),
			    	 var xhr = $.ajax({
						    type: "GET",
						    url: "http://localhost:8080/ScreenTest/output/apptschedule.json",
						    //url: "http://localhost:8080/ScreenTest/output/apptagents.json/"+serviceid_id,
						    //data: "name=John&location=Boston",
						    success: function(data){
						      var obj= ko.utils.arrayMap(data,function(item){
						    	   return new ApptSchedule(item.appointmentName,item.appointmentDate,item.agentId,item.serviceId,item.notes,item.apptSourceChannel,item.apptSourceDt,item.apptSourceClientName); 
						       });
						      apptschedule= obj;
						      alert(ko.toJSON(apptschedule));
						    }
						});
			    	 apptschedule= obj;
				      alert(ko.toJSON("New"+apptschedule));
			    	    }   	   
			       });
		},
		loadbookAppt:function(data,event){
			apptViewModel.setTmpl('apptbook');
		  		alert("initalized");
		
		},
		bookAppointment:function(data,event){
			$.ajax({
		          url: "http://localhost:8080/ScreenTest/output/apptschedule.json",
		          type: "POST",
		          contentType: "application/json",
		          accept: "application/json",
		          data:JSON.stringify($("#appointmentForm").serializeObject()),
		          success: function (data, textStatus, jqXHR) {
		          	alert("Appointment got Created Successfully");
		          	//alert(data);
		          	//var URL = data.URL + "?id="+data.AGENT_ID+"&JSESSIONID="+data.JSESSIONID;
		          	//alert(URL)
		          	//window.location = URL;
		          },
		          error: function (jqXHR, textStatus, errorThrown) {
		          	//$("#messagediv").append("hai");
		          	alert("error");
		          	//alert(jqXHR);
		          }
		      });

			alert("Form Submit");
			apptViewModel.setTmpl('apptservices');
		},
		setTmpl: function ( template )
		{
			this.selectTmpl( template );
			  $( "#datepicker" ).datepicker();
			},	
			
		};


