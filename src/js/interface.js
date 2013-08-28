$('.actions .close_icon, .actions_close').live('click', function(){
	$(this).closest('.actions').hide('fast');
	return false;
})
$('.hub-hover').live('click', function(){
	$(this).closest('.h-userbar').toggleClass('nohover')
	return false;
})

$('.fl-item .close_icon').live('click', function(){
	$(this).closest('.fl-item').hide('fast');
	return false;
})
$('.share_window .close_icon').live('click', function(){
	$(this).closest('.share_window').hide('fast');
	return false;
})
$('.login_window .close_icon').live('click', function(){
	$(this).closest('.login_window').hide('fast');
	return false;
})

$('.nlhh_icon').live('click', function(){
	$(this).next('.actions2').toggle('fast');
	return false;
})
$('.show_share').live('click', function(){
	var o=$(this).closest('.actions').offset();
	var win=$('.share_window');
	var h=win.show().height();
	win.hide().css({
		'left': o.left,
		'top': o.top-h-10
	}).show('fast')
	return false;
})
$('.nl-actions').live('click', function(){
	var o=$(this).offset();
	
	$('.actions').css({
		'left': o.left-5,
		'top': o.top-5
	}).show('fast')
	return false;
})

$(function(){
	setTimeout(function(){
		
		var max_votes=300;
		
		$('.nlvb-num').each(function(){
		
			var num=parseInt($(this).find('.num').html(), 10);
			var canvas=$(this).find('.draw_circle');
			var ctx = canvas[0].getContext("2d");
			
			var temp=num;
			var numLetters=0;
			while(temp>0)
			{
				temp=Math.floor(temp/10);
				numLetters++;
			}
			var min=Math.pow(10, numLetters-1);
			var max=Math.pow(10, numLetters)-1;
			
			var all=max-min;
			
			var percent=(num-min)/all;
			console.log(percent);
			//return;
			//9px width letter
			//8px for indents
			var rad=((numLetters)*9+percent*9+10)/2;
			rad=Math.ceil(rad);
			/*
			if(rad>22)
			{
				rad=22;
			}*/
			
			canvas.attr('width', rad*2).attr('height', rad*2).css({
				'width': rad*2,
				'height': rad*2
			});
			$(this).css({
				'width': rad*2,
				'line-height': rad*2+'px',
				'height': rad*2
			});
			//alert(rad);
			//draw a circle
			ctx.fillStyle = "#389700";  
			ctx.beginPath();
			ctx.arc(rad, rad, rad, 0, Math.PI*2, true);
			ctx.closePath();
		
			ctx.fill();
		//arc(double x, double y, double radius, double startAngle, double endAngle, optional boolean anticlockwise); 
		})
	},200)
	
	
	$('.nl-title a').wrap('<span class="border-fix"></span>')
})