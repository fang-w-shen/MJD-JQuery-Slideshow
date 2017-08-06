console.log("main.js");
$(document).ready(function(){
////////////////////////FLICKR/////////////////////////////
	$.getJSON({url:"http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?"},{
        tags: "grass",
        format: "json"
      }).then(show);
	function show(arr) {

			console.log("", arr);
				
			arr.items.forEach((item,index)=>{	
					
						$(".image1").eq(index).attr("src", item.media.m)
						$(".cap1").eq(index).html(item.title)
						$(".image1").eq(index).height("200px")
						
			})
		
				
	
		
			
	}

	
////////////////////////NASA/////////////////////////////
		
	$.ajax({
	  url:"https://epic.gsfc.nasa.gov/api/natural",
	  data: {
	    api_key:apikey
	  }
	}).done(slideShow)
	  .fail(function(xhr, status, error){
	    console.log(xhr, status, error);
	  })
	
	function slideShow(apod) {
		console.log("	", 	apod);
			
	  for (var i = 0; i < apod.length; i++) {
	    let thisImage = apod[i].date;
	    let newImage = thisImage.replace(/-/g,"/")
	    let spaceIndex = newImage.indexOf(" ");
	    let dates = newImage.slice(0, spaceIndex);
	    let time = newImage.slice(spaceIndex+1,newImage.length);
	    if (i===0) {
	      $(`<div class="carousel-item active">
	        <img class="d-block image2 img-fluid" id="image${i}" src="" alt="First slide">
	        <div class="carousel-caption nasa hidden d-md-block">
                <p class="caption ">${time}</p>
              </div>
	      </div>`).insertBefore(".earth"); 
	      $(".secondindicator").append(`<li data-target="#carouselExampleIndicators1" data-slide-to="0" class="active" data-keyboard="true"></li>`);
	    } else {
	      $(`<div class="carousel-item">
	        <img class="d-block image2 img-fluid" id="image${i}" src="" alt="First slide">
	        <div class="carousel-caption nasa hidden d-md-block">
                <p class="caption ">${time}</p>
              </div>
	      </div>`).insertBefore(".earth");
	      $(".secondindicator").append(`<li data-target="#carouselExampleIndicators1" data-slide-to="${i}"></li>`);
	    }
	    $(`#image${i}`).attr("src", `https://api.nasa.gov/EPIC/archive/natural/${dates}/png/${apod[i].image}.png?api_key=${apikey}`)
	  }
	}
	



$('#carouselExampleIndicators').on('slide.bs.carousel', function () {
		$(".carousel-inner").hide(1).fadeIn(3000).fadeOut(2000);
	})

	$('.car1').carousel({
	  interval: 5001
	})
	$('.car2').carousel({
	  interval: 200
	})

	$(".image1").on("mouseenter",()=>{
		
		$(".flicker").removeClass("hidden");
		$(".flicker").fadeIn(1000);
	})
	$(".carousel-control-next,.carousel-control-prev,li,.hover").on("mouseenter",()=>{
		$(".flicker").fadeOut("slow");
	})

	$(".car2,img").on("mouseenter",()=>{
		
		$(".nasa").removeClass("hidden")	
	})

	$(".carousel-control-next,.carousel-control-prev,h1,.secondindicator").on("mouseenter",()=>{
		
		$(".nasa").addClass("hidden")	
	})

	$("#button").click(()=>{
		$("#carouselExampleIndicators").removeClass("slide")
	})
	$("#button2").click(()=>{
		$("#carouselExampleIndicators").addClass("slide")
	})


})
	