function showLargeImage(largeUrl, smallUrl){
	$('#largeImages img').replaceWith('<img src='+largeUrl+'>');
	$('#smallImages img').css("border","none");
	$('img[src=\''+smallUrl+'\']').css("border","1px solid red");

}

$(document).ready(function(){

	$(".main").hide();
	$("#anchor").click(function(){
		$(".main").show();
		$("#anchor").hide();

		$.ajax({
			type:'GET',
			url:'/images.json',
			success:function(data){
				console.log("hello");
				$('#largeImages').append('<img src='+data[0].largeUrl+'>');
				$.each(data,function(i, eachdata){
					$('#smallImages').append('<img src='+eachdata.thumbnailUrl+' onclick="showLargeImage(\''+eachdata.largeUrl+'\',\''+eachdata.thumbnailUrl+'\')">');
				});

				var start = 0;
				var incrementBy = 28;
				var end = start + incrementBy;
				var length = $('#smallImages img').length;
				var list = $('#smallImages img');
				list.hide().filter(':lt('+(end)+')').show();

				console.log(start);
				console.log("length is"+length);

				$('.prev, .next').click(function(e){
					e.preventDefault();
					console.log("start was"+start);
					if( $(this).hasClass('prev') ){
						start -= incrementBy;
					} else {
						start += incrementBy;
					}

					if( start < 0 || start >= length ) 
						start = 0;
					end = start + incrementBy;        
					console.log("start is"+start);
					console.log("end is"+end);

					if( start == 0 ) list.hide().filter(':lt('+(end)+')').show("fast");
					else list.hide().filter(':lt('+(end)+'):gt('+(start-1)+')').show("fast");
				});

				$('#rarrow').click(function(){

				});

				$('#larrow').click(function(){

				});

			}
		});

	});


});