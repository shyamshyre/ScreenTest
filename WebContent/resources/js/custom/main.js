var ConstantsViewModel = {
		
		hrCmb		: ko.observableArray(["1","2","3","4","5","6","7","8","9","10","11","12"]),
		minCmb		: ko.observableArray(["00","10","15","20","25","30","35","40","45","50","55"]),
		amPmCmb		: ko.observableArray(["AM","PM"]),
		yOrn		: ko.observableArray(["Y","N"]),
		skillsList	: ko.observableArray([]),
		chairsList	: ko.observableArray([])
};


var viewModel = {
		username	: ko.observable(""),
		comments	: ko.observableArray([]),
		selectTmpl	: ko.observable("calendar"),
		setTmpl		: function ( template ){
							
							this.selectTmpl( template );
					}
        
};

var servicesViewModel = {
	services 		: ko.observableArray([]),
	businessHours 	: ko.observableArray([]),
	currSet			: ko.observableArray([]),
	serviceTasksList: ko.observableArray([]),
	selectTmpl		: ko.observable("serviceAgent"), //default
	currIndex		: ko.observable(0),
	tabIndex		: ko.observable(0),
	updateBHrs		: function(){
						alert('Business hours updated..!');
					},
	setTmpl			: function ( template ){
						
						this.selectTmpl( template );
					},
	changeSet		: function ( index ){
						
						this.currIndex( index );
					},
	changeTabIndex	: function( tabIndex ){
						this.tabIndex( tabIndex );
					},
	deleteTaskRow	: function( item ){
						var service = this.serviceTasksList();
						var index = service.indexOf ( item );
						service.splice(index, 1 );
						
						this.serviceTasksList( service );
						
						alert('Row deleted..!');
					}					
};

var CreateAgentViewModel = ko.validatedObservable({
	
	serviceName	: ko.observable(""),
	agentName	: ko.observable(""),
	serviceEdu	: ko.observable("").extend({ 
			        required: true,
			        minLength: 3,
			        pattern: {
			             message: 'Please provide valid Education details',
			             params: '^[A-Za-z0-9].$'
			        }
			    }),
	skills		: ko.observable("").extend({ 
				        required: true,
				        minLength: 3,
				        pattern: {
				             message: 'Please provide valid skills',
				             params: '^[A-Za-z].$'
				        }
				    }),
	cost		: ko.observable(0).extend({ 
				        required: true,
				        maxLength: 3,
				        pattern: {
				             message: 'Only numeric is allowed',
				             params: '^[0-9].$'
				        }
				    }),
	publish		: ko.observable("").extend({ 
				        required: true
				    }),
	submitAgent	: function(){
					if(CreateAgentViewModel.isValid()){
						alert('Form validated..!');
					}else{
						alert('Validation fails');
					}
				  }
	
});

var CreateBoothViewModel = ko.validatedObservable({
	
	boothName	: ko.observable(""),
	description	: ko.observable(""),
	boothType	: ko.observable("").extend({ 
				        required: true
				    }),
	boothAgent	: ko.observable(0).extend({ 
				        required: true
				    }),
	publish		: ko.observable("").extend({ 
				        required: true
				    }),
	submitBooth	: function(){
					if(CreateBoothViewModel.isValid()){
						alert('Form validated..!');
					}else{
						alert('Validation fails');
					}
				  }
	
});


var skillsViewModel = {
		
		filter 		: ko.observable(""),
		viewMore	: false,
		skillsList 	: ko.observableArray([])
};


var recommdViewModel = {
		
		filter 				: ko.observable(""),
		viewMore			: ko.observable(false),
		recommendationsList : ko.observableArray([])
};

var galleryViewModel = {
		
		galleryList : ko.observableArray([]),
		albumList	: ko.observableArray([]),
		currIndex	: ko.observable(0),
		setIndex	: ko.observable(0),
	updateCurrIndex	: function ( index ){
						this.currIndex ( index );
					},
	updateSetIndex	: function( index ){
						this.setIndex( index );
						//alert ( 'Updated SetIndex : ' + this.setIndex());  
					},
	watObject		: ko.observable("Gallery"),
	currComments	: ko.observableArray([]),
	addComment		: function(){
						var cmt = document.getElementById('cmt').value;
						this.currComments.push( {commentedBy:viewModel.username,commentedByPic:'./resources/images/profPic.png',comment:cmt} );
						document.getElementById('cmt').value = "";
					}
};

function BusinessHoursModel(day, fromHr, fromMin, fromAMPM, toHr, toMin, toAMPM, status){
	
	this.day = ko.observable( day );
	
	this.fromHr = ko.observable( fromHr );
	this.fromMin = ko.observable( fromMin );
	this.fromAMPM = ko.observable( fromAMPM );
	
	this.toHr = ko.observable( toHr );
	this.toMin = ko.observable( toMin );
	this.toAMPM = ko.observable( toAMPM );
	
	this.status = ko.observable( status );
	
}

function GalleryModel(imgGrp){
	
	//this.setOfImgs = ko.observableArray([]);
	//alert(ko.toJSON(imgGrp.setOfImgs));
	var mappedData = ko.utils.arrayMap(imgGrp.setOfImgs, function(item) {
	    return new ImageModel(item.imgUrl,item.imgTitle,item.comments);
	});
	
	this.setOfImgs = ko.observableArray( mappedData );
	this.totalCount = ko.observable(this.setOfImgs().length );
	
}

function ImageModel(imgUrl, imgTitle, comments){
	
	this.imgUrl = ko.observable( imgUrl );
	this.imgTitle = ko.observable( imgTitle );
	//this.comments = ko.observableArray([]);
	
	var mappedData = ko.utils.arrayMap(comments, function(item) {
	    return new CommentModel(item.comment, item.commentedBy, item.commentedByPic);
	});
	this.comments = ko.observableArray( mappedData );
	
}

function CommentModel(comment, commentedBy, commentedByPic){
	
	this.comment = ko.observable( comment );
	this.commentedBy = ko.observable( commentedBy );
	this.commentedByPic = ko.observable( commentedByPic );
}

function ServicesSetModel( services ){
	
	var servicesSet = ko.utils.arrayMap( services.setOfServices , function(service){
			return new ServiceModel( service.serviceName, service.tasks);
	});
	this.setOfServices = ko.observableArray( servicesSet );
}

function ServiceModel(serviceName, tasksList){
	
	this.serviceName = ko.observable( serviceName );
	var tasks = ko.utils.arrayMap(tasksList, function( task ){
		return new TaskModel(task.taskNm, task.time);
	});
	this.taskList = ko.observableArray( tasks );
}

function TaskModel(taskName, time){
	
	this.taskName = ko.observable( taskName );
	this.time = ko.observable( time );
	this.duration = ko.observable(0);
	this.skillName = ko.observable("");
	this.boothName = ko.observable("");
	
}

function Skill(skillName, skillId){
	
	this.skillName = ko.observable( skillName );
	this.skillId = ko.observable( skillId );
}

function Chair(chairName, chairId ){
	
	this.chairName = ko.observable( chairName );
	this.chairId = ko.observable( chairId );
}

