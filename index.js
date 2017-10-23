$(document).ready(function(){
	
	var facebookToken;

	// Ajax call for Profile
	$("#loginBtn").click(function(){
		facebookToken = $("#input-login ").val();
		if(facebookToken.length < 10){
			alert("Oops! Not a valid token");
		}
		else{

			alert("Logged successfully! use Navigations for more!");
	

$.ajax("https://graph.facebook.com/me?fields=about,hometown,id,name,first_name,last_name,birthday,languages,gender,education,work,relationship_status,quotes,family,website,email,picture.width(150).height(150)&access_token="+facebookToken,{

				success:function(response){

					$(".rounded").attr("src",""+response.picture.data.url+"");

					$(".pic-caption").text(""+response.name+"");
					$("#input-hometown").attr("value",""+response.hometown.name+"");

					// For basic-Info 

					$("#input-firstname").attr("value",""+response.first_name+""); 
					$("#input-lastname").attr("value",""+response.last_name+"");
					$("#input-birthday").attr("value",""+response.birthday+"");
					$("#input-gender").attr("value",""+response.gender+"");
					var languageCheck = response.languages ;
					var getLanguage= $.map(languageCheck,function(index){
					return index.name;
					  	  });
					if (response.languages){
					  $("#input-language").val(""+getLanguage+"");
					  	}
					  	else {
					  		$("#input-language").val("Field not entered").css("color","red");
					  	}
					  // For Work & Education 

					  var workData = response.work ;       
					var workSections ="" ;
					 var getWork = $.map(workData,function(index){    
					 
					 		for(var names in index) {                        // For getting Work details    
					 
					 if (names =="position") {
					
						workSections += (index.position.name+" - "+index.employer.name+ " | ");
					}
					}
					$("#input-work").attr("value",""+workSections+""); 
					
					});  

					 var eduData = response.education ;
					 var getCollege;
					 $.each(eduData,function(i,value){
					 	 if(value.type == "College"){
                            getCollege = value.school.name;							//  For getting School details    
                            $("#input-university").attr("value"," "+getCollege+"");
                        } 
                        else if (value.type == "High School"){
                        	 getCollege = value.school.name;
                        	 $("#input-school").attr("value"," "+getCollege+"");
                        	}
					 	}
					 );
					
					  // For Family & Relationship 

					  var familyCheck = response.family.data;
					  var getFamilyName = $.map(familyCheck,function(index){
					  		return index.name;
					  });
					 $("#input-relation").attr("value",""+getFamilyName+""); 

					 if(response.relationship_status) {
					 	$("#input-relationship").attr("value",""+response.relationship_status+"");
					 }
					 else{

					 $("#input-relationship").attr("value","Field not entered").css("color","red");
					}

					 // For about section 
					 if (response.about) {
					  $("#input-about").val(""+response.about+"");
					  	}
					  	else {
					  		$("#input-about").val("Field not entered").css("color","red");
					  	}
					 
					 if (response.quotes) {
					 $("#input-quotes").val(""+response.quotes+"");
					}

					 else {
					  		$("#input-quotes").val("Field not entered").css("color","red");
					  	}

					 // For Contact section

					 $("#input-email").val(""+response.email+"");
					 if (response.website) {
					 	$("#input-website").val(""+response.website+"");
					  	}
					  	else {
					  		$("#input-website").val("Field not entered").css("color","red");
					  	}
					 
					},

                    error: function(jqXHR) {
        			alert(jqXHR.responseJSON.error.message);

            } // End of success function
        }
			); //End of Ajax-call

	


// Ajax call for FEED

$.ajax("https://graph.facebook.com/me?fields=posts{created_time,type,full_picture,story,message,source},name,picture.width(150).height(150)&access_token="+facebookToken,{
		success:function(response){
			var postsData = response.posts.data;
			var postsDataValues = $.map(postsData,function(value,index){
				if (index <= 4) {
				return value;
			}
			});

			// For feed-profile pic

			$(".squared").attr("src",""+response.picture.data.url+"");
					
			// FIRST FEED POST

			var firstFeed = $.map(postsDataValues,function(value,index){
					if(index==0){
						return value ;
					}
			});


			if (firstFeed[0].type == "status" && firstFeed[0].message){

				$(".feed-story1").text(""+response.name+""+" updated her status : "+""+firstFeed[0].message+"");
				
				}

			else if(firstFeed[0].type == "status"){
				$(".feed-story1").text(""+firstFeed[0].story+"");
			}

			else if (firstFeed[0].type == "photo"){

				$(".feed-story1").text(""+firstFeed[0].story+"");
				$(".main-feed1").append("<img src="+""+firstFeed[0].full_picture+""+" "+"class="+"feed-image1 img-responsive"+">");
			$(".feed-image1").css({"width":"200px","height":"200px","margin":"0px auto"});
			}

			else if (firstFeed[0].type == "video"){

				
				$(".main-feed1").html("<video controls> <source  src="+""+firstFeed[0].source+""+"type= "+"video/mp4"+"></video>");

				$(".feed-story1").text(""+firstFeed[0].story+"");
			}

			var date1 = new Date(firstFeed[0].created_time);
			
			$(".time-stamp1").text("Created at : "+date1.toDateString()+"");
				$(".feed-type1").text("Type : "+firstFeed[0].type+"");

			
	//		Second feed post 

			var secondFeed = $.map(postsDataValues,function(value,index){
					if(index==1){
						
						return value ;

					}
			});



					if (secondFeed[0].type == "status" && secondFeed[0].message){

				$(".feed-story2").text(""+response.name+""+" updated her status : "+""+secondFeed[0].message+"");
				
				}

			else if(secondFeed[0].type == "status"){
				$(".feed-story2").text(""+secondFeed[0].story+"");
				
			}
			else if (secondFeed[0].type == "photo"){

				$(".feed-story2").text(""+secondFeed[0].story+"");
				$(".main-feed2").append("<img src="+""+secondFeed[0].full_picture+""+" "+"class="+"feed-image2 img-responsive"+">");
			$(".feed-image2").css({"width":"200px","height":"200px","margin":"0px auto"});
			}

			else if (secondFeed[0].type == "video"){
				console.log(secondFeed);
				$(".feed-story2").text(""+secondFeed[0].story+"");
				// $(".main-feed2").html("<p> Video Url :"+""+secondFeed[0].source+""+"</p>");
					
			}

			var date2 = new Date(secondFeed[0].created_time);
			$(".time-stamp2").text("Created at : "+date2.toDateString()+"");
				$(".feed-type2").text("Type : "+secondFeed[0].type+"");
				console.log(secondFeed[0].type);

			
			
   // THIRD FEED POST

			var thirdFeed = $.map(postsDataValues,function(value,index){
					if(index==2){
						return value ;
					}
			});

				if (thirdFeed[0].type == "status" && thirdFeed[0].message){

				$(".feed-story3").text(""+response.name+""+" updated her status : "+""+firstFeed[0].message+"");
				
				}

			else if(thirdFeed[0].type == "status"){
				$(".feed-story3").text(""+thirdFeed[0].story+"");
				
			}

			else if (thirdFeed[0].type == "photo"){

				$(".feed-story3").text(""+thirdFeed[0].story+"");
				$(".main-feed3").append("<img src="+""+thirdFeed[0].full_picture+""+" "+"class="+"feed-image3 img-responsive"+">");
			$(".feed-image3").css({"width":"200px","height":"200px","margin":"0px auto"});
			}

			else if (thirdFeed[0].type == "video"){

				$(".feed-story3").text(""+thirdFeed[0].story+"");
				// $(".main-feed3").append().html("<video controls> <source  src="+""+thirdFeed[0].source+"" +"type= "+"video/mp4"+"></video>");
			
			}

			var date3 = new Date(thirdFeed[0].created_time);

			$(".time-stamp3").text("Created at : "+date3.toDateString()+"");
				$(".feed-type3").text("Type : "+thirdFeed[0].type+"");


		
	// FOURTH FEED POST
			
			var fourthFeed = $.map(postsDataValues,function(value,index){
					if(index==3){
						return value ;
					}
			});

				if (fourthFeed[0].type == "status" && fourthFeed[0].message){

				$(".feed-story4").text(""+response.name+""+" updated her status : "+""+fourthFeed[0].message+"");
				
				}

				else if(fourthFeed[0].type == "status"){

					$(".feed-story4").text(""+fourthFeed[0].story+"");
				
				}

			else if (fourthFeed[0].type == "photo"){

					$(".feed-story4").text(""+fourthFeed[0].story+"");
				$(".main-feed4").append("<img src="+""+fourthFeed[0].picture+""+" "+"class="+"feed-image4 img-responsive"+">");
				$(".feed-image4").css({"width":"200px","height":"200px","margin":"0px auto"});
			}

			else if (fourthFeed[0].type == "video"){

				
				// $(".main-feed4").append().html("<video controls> <source  src="+""+fourthFeed[0].source+"" +"type= "+"video/mp4"+"></video>");
				$(".feed-story4").text(""+fourthFeed[0].story+"");
			}


			var date4 = new Date(fourthFeed[0].created_time);

			$(".time-stamp4").text("Created at : "+date4.toDateString()+"");
				$(".feed-type4").text("Type : "+fourthFeed[0].type+"");

	// FIFTH FEED POST		

			var fifthFeed = $.map(postsDataValues,function(value,index){
					if(index==4){
						return value ;
					}
			});

				if (fifthFeed[0].type == "status" && fifthFeed[0].message){

				$(".feed-story5").text(""+response.name+""+" updated her status : "+""+fifthFeed[0].message+"");
				
				}

			else if(fifthFeed[0].type == "status"){

				$(".feed-story5").text(""+fifthFeed[0].story+"");
				
			}

			else if (fifthFeed[0].type == "photo"){
				$(".feed-story5").text(""+fifthFeed[0].story+"");
				$(".main-feed5").append("<img src="+""+fifthFeed[0].picture+""+" "+"class="+"feed-image5 img-responsive"+">");
				$(".feed-image5").css({"width":"200px","height":"200px","margin":"0px auto"});
			}

			else if (fifthFeed[0].type == "video"){

				
				// $(".main-feed5").append().html("<video controls> <source  src="+""+fifthFeed[0].source+"" +"type= "+"video/mp4"+"></video>");
				$(".feed-story5").text(""+fifthFeed[0].story+"");
			}


			var date5 = new Date (fifthFeed[0].created_time);

			$(".time-stamp5").text("Created at : "+date5.toDateString()+"");
				$(".feed-type5").text("Type : "+fifthFeed[0].type+"");
			

		}	//	End of success function
	
	});  	//End of ajax call

			 } // else ends
});		  

			$(".profile-image").hide();
			$(".about-me-page").hide();
			$(".navigation-tabs").hide();
			$(".work-ed-page").hide();
			$(".family-page").hide();
			$(".details-page").hide();
			$(".contact-page").hide();
			 $(".all-feed").hide();
			 $(".feed-profile-pic").hide();

			

		});         // Document .ready ends 


  // onclick functions starts 

$(".home-page").on("click",function(){

				$(".feed-profile-pic").hide();
	 			$(".all-feed").hide();
				$(".start-page").show();
				$(".profile-image").hide();
    			$(".navigation-tabs").hide();
				$(".about-me-page").hide();
				$(".work-ed-page").hide();
				$(".family-page").hide();
				$(".details-page").hide();
				$(".contact-page").hide();
});
 
 // Profile tab 

$(".profile").on("click",function(){

	$(".all-feed").hide();
	$(".feed-profile-pic").hide();
	$(".start-page").hide();
	$(".profile-image").show();
	/*$(".about-me-page").show();*/
    $(".navigation-tabs").show();
	
});
		// Basic-Info tab  

			$(".intro").on("click",function(){

				$(".all-feed").hide();
				$(".feed-profile-pic").hide();
				$(".about-me-page").show();
				$(".work-ed-page").hide();
				$(".family-page").hide();
				$(".details-page").hide();
				$(".contact-page").hide();

});
		// Work & Education tab 

		$(".work-ed").on("click",function(){

			$(".all-feed").hide();
			$(".feed-profile-pic").hide();
			$(".work-ed-page").show();
			$(".about-me-page,.details-page,.contact-page,.family-page").hide();
		});

		// Family tab 

		$(".family").on("click",function(){

			$(".all-feed").hide();
			$(".feed-profile-pic").hide();
			$(".work-ed-page").hide();
			$(".about-me-page,.details-page,.contact-page").hide();
			$(".family-page").show();
		});
		
		// Details tab 

		$(".details").on("click",function(){

			$(".all-feed").hide();
			$(".feed-profile-pic").hide();
			$(".work-ed-page").hide();
			$(".about-me-page,.family-page,.contact-page").hide();
			$(".details-page").show();
		});


		// Contact tab 

		$(".contact").on("click",function(){

			$(".all-feed").hide();
			$(".feed-profile-pic").hide();
			$(".work-ed-page").hide();
			$(".about-me-page,.family-page,.details-page").hide();
			$(".contact-page").show();
		});    


		 $(".feed").on("click",function(){

		 	$(".all-feed").show();
		 	$(".feed-profile-pic").show();
		 	$(".start-page").hide();
		 	$(".profile-image").hide();
			$(".about-me-page").hide();
			$(".navigation-tabs").hide();
			$(".work-ed-page").hide();
			$(".family-page").hide();
			$(".details-page").hide();
			$(".contact-page").hide();

			

		 });