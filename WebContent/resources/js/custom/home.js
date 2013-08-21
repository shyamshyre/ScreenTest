
ConstantsViewModel.skillsList = ko.utils.arrayMap(skillsList, function(item) {
	return new Skill(item.skillName, item.skillId);
});

ConstantsViewModel.chairsList = ko.utils.arrayMap(chairsList, function(item) {
	return new Chair(item.chairName, item.chairId);
});


var skills = ko.utils.arrayMap(sData, function(item) {
	return item;
});

skillsViewModel.skillsList = ko.observableArray( skills );

skillsViewModel.viewMore = ko.computed(function(){
		return sData.length > 9?true:false;
}, skillsViewModel);


recommdViewModel.recommendationsList = ko.computed(function(){
	var filter = this.filter().toLowerCase();
	if (!filter) {
		if(this.recommendationsList().length <= 0 ) {
			var imgUrl;
			for ( var i = 0; i < recommendList.length; i++) {
				if(this.recommendationsList().length < 5){
					imgUrl = (recommendList[i].event.indexOf('Birthday') > 0)?'./resources/images/CakeIcon.png':'./resources/images/RequestIcon.png';
					this.recommendationsList.push({
						event : recommendList[i].event,
						imgUrl : imgUrl
					});
				}
			}
		}
		return this.recommendationsList();
	} else {
		return ko.utils.arrayFilter(this.recommendationsList(), function(item) {
			return ko.utils.stringStartsWith(
					item.event.toLowerCase(), filter);
		});
	}
	
}, recommdViewModel);


recommdViewModel.viewMore = ko.computed(function(){
	return recommendList.length > 5?true:false;
}, recommdViewModel);


var galleryMappedData = ko.utils.arrayMap(gallerySet, function(item) {
    return new GalleryModel(item);
});

galleryViewModel.galleryList = ko.observableArray( galleryMappedData );


var albumMappedData = ko.utils.arrayMap(gallerySet, function(item) {
	return new GalleryModel(item);
});

galleryViewModel.albumList = ko.observableArray( albumMappedData );


//alert(ko.toJSON(galleryViewModel.galleryList().length));
//alert(ko.toJSON(galleryViewModel.galleryList()[0].setOfImgs.length));
var busHrs =  ko.utils.arrayMap(businessHr, function(hrs) {
	return new BusinessHoursModel(hrs.day, hrs.fromHr, hrs.fromMin, hrs.fromAMPM, hrs.toHr, hrs.toMin, hrs.toAMPM, hrs.status);
});

servicesViewModel.businessHours = ko.observableArray( busHrs );

var servicesList =  ko.utils.arrayMap(services, function( servicesSet ) {
	return new ServicesSetModel( servicesSet );
});

servicesViewModel.services = ko.observableArray( servicesList );

servicesViewModel.currSet = ko.computed(function(){
		return servicesViewModel.services()[servicesViewModel.currIndex()];
});

var set = ko.observable( ko.toJS(servicesViewModel.currSet().setOfServices()[servicesViewModel.tabIndex()].taskList()) );
//servicesViewModel.serviceTasksList ( ko.toJS(servicesViewModel.currSet().setOfServices()[servicesViewModel.tabIndex()].taskList()) );
servicesViewModel.serviceTasksList = ko.observable ( set );		

servicesViewModel.serviceTasksList = ko.computed(function() {
    var categories = ko.utils.arrayMap(servicesViewModel.serviceTasksList(), function(item) {
        return item();
    });
    return categories.sort();
}, servicesViewModel);

		viewModel.username="kittu";
		
		ko.applyBindings(galleryViewModel);
		//ko.applyBindings(skillsViewModel);
		//ko.applyBindings(recommdViewModel);
		//ko.applyBindings(servicesViewModel);
		//ko.applyBindings(viewModel);

$(function() {

     
	  $("#album").slidesjs({
			effect: {  fade: {	speed: 8000, crossfade: true } },		
			play: {  active: true,effect: "fade",interval: 5000,auto: true,swap: true,pauseOnHover: true,restartDelay: 2500 },
			callback: {
		          loaded: function(number) {
		            // Use your browser console to view log
		            console.log('SlidesJS: Album Loaded with slide #' + number);

		            // Show start slide in log
		            //$('#slidesjs-log .slidesjs-slide-number').text(number);
		          }, 
		          start: function(number) {
		            // Use your browser console to view log
		            console.log('SlidesJS: Album Start Animation on slide #' + number);
		            galleryViewModel.updateCurrIndex ( number-1 );
		            galleryViewModel.updateSetIndex ( number-1 );
		          },
		          complete: function(number) {
		            // Use your browser console to view log
		            console.log('SlidesJS: Album Animation Complete. Current slide is #' + number);

		            // Change slide number on animation complete
		            //$('#slidesjs-log .slidesjs-slide-number').text(number);
		          }
		        }
	  });
	
	  $("#setGallery").slidesjs({
			effect: {  fade: {	speed: 8000, crossfade: true} },		
			play: {  active: true,effect: "fade",interval: 5000,auto: true,swap: true,pauseOnHover: true,restartDelay: 2500 },
			callback: {
		          loaded: function(number) {
		            // Use your browser console to view log
		            console.log('SlidesJS: Gallery Loaded with slide #' + number);

		            // Show start slide in log
		            //$('#slidesjs-log .slidesjs-slide-number').text(number);
		          },
		          start: function(number) {
		            // Use your browser console to view log
		            console.log('SlidesJS: Gallery Start Animation on slide #' + number);
		            galleryViewModel.updateCurrIndex( number-1 );
		            galleryViewModel.updateSetIndex ( number-1 );
		          },
		          complete: function(number) {
		            // Use your browser console to view log
		            console.log('SlidesJS: Gallery Animation Complete. Current slide is #' + number);

		            // Change slide number on animation complete
		            //$('#slidesjs-log .slidesjs-slide-number').text(number);
		          }
		        }
	      });
	  
	//Initially hiding album
	$("#album").hide();
	//$("#gallery").hide();
	  
	$("#showAlbum").click( function(){
		galleryViewModel.watObject ("Album");
		$("#album").show();
		
		$("#setGallery").hide();
	});

	$("#showGallery").click( function(){
		galleryViewModel.watObject ("Gallery");
		$("#setGallery").show();
		
		$("#album").hide();
		
	});

	
});//End of ready function
	  
