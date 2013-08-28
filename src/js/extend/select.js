(function($){
	var all_custom_selects=0;
	function Select()
	{
		var me=new UIReplacer('select', '.ruisel');
		me._init=function()
		{
			$('body').live('click', function(){
				$('.ruisel-select_options').hide().parent().removeClass('custom_select_expanded');
			});
			$('.ruisel-clickable').live('click', function(){
				
				var list=$(this).siblings('.ruisel-select_options');
				
				if(list.css('display')=='none')
				{
					$('.ruisel-select_options').hide().parent().removeClass('custom_select_expanded');
					list.show().parent().addClass('custom_select_expanded');
					var div=$(this).parent();
					var val=div.attr('value');
					div.find('[_value="'+val+'"]').mouseover();
				}
				else
				{
					list.hide().parent().removeClass('custom_select_expanded');
				}
				
				
				return false;
			}).live('keydown',function(e){
				//console.log(e.keyCode);
				var sel=$(this).parent();
			
				if(e.keyCode==9)
				{
					return true;
				}
				else if(e.keyCode==38||e.keyCode==40)
				{
					sel.addClass('custom_select_expanded');
					sel.find('.ruisel-select_options').show();
					var cur=sel.find('.ruisel-opt_over');
					
					var ot=cur[0].offsetTop;
					var target=cur.prev();
					if(e.keyCode==40)
					{
						target=sel.find('.ruisel-opt_over').next();
					}
					
					if(target.size()!=0)
					{
						target.mouseover();
						ot=target[0].offsetTop;
					}
					
					var scroll=sel.find('.ruisel-scroll');
					if(scroll.css('overflow')!='visible')
					{
						scroll.scrollTop(ot);
					}
					
					
					
				}
				else if(e.keyCode==13)
				{
					sel.find('.ruisel-opt_over').mousedown();
				}
				else if(e.keyCode==27)
				{
					sel.removeClass('ruisel-select_options');
					sel.find('.custom_select_options').hide();
				}
				//console.log(e.keyCode);
				return false;
		
			});
			//alert(67567);
			$('.ruisel-scroll span').live('mouseenter', function(){
				
				$(this).addClass('ruisel-opt_over').siblings().removeClass('ruisel-opt_over');
				
			}).live('click', function(){
				//console.log(this);
				var val=$(this).attr('_value');
				var cusel=$(this).closest('.rui-select');
				var id=cusel.attr('id');
				
				var real=$('select.rui-select-done[custom_select='+id+']');

				cusel.find('.ruisel-select_options').hide();
				
				real.val(val).change();
				
				return false;
			});
			
			$('.rui-select-done').live('change', function(){
				
				var id=$(this).attr('custom_select');
				
				var div=$('#'+id);
				var val=$(this).val();
				var face=div.attr('value', val).find('[_value="'+val+'"]').mouseover().html();
				div.find('.ruisel-face').html(face);
			}).live('rui-select-refresh', function(){
				me.refresh(this);
			});
			
			
			
			
		};
		
		me.refresh=function(obj)
		{
			var options='';
			var startval=$(obj).val();
			var startface='';
			var id=$(obj).attr('custom_select');
				
			
			$(obj).children().each( function(){
					
				var class_name='';
				if($(this).attr('class'))
					class_name=$(this).attr('class');
				var selected='';
				var text=$(this).text();
				if($(this).attr('selected'))
				{
					startval=$(this).val();
					startface=text;
					selected='selected="selected"';
					class_name+=' ruisel-opt_over';
				}
				var value=$(this).val();
				if(value==undefined)
				{
					value=$(this).text();
				}
				
				options+='<span class="'+class_name+'" _value="'+value+'" '+selected+' >'+text+'</span>';
			});
			
		
			var div=$('#'+id);
			div.find('.ruisel-scroll').html(options);
			div.find('.ruisel-face').html(startface);
			div.attr('value', startval);
			
		/**
			 * @TODO write normal width fix
			 * 
			 **/
		/*
			var maxwopt=0;
			$('#'+id+' .custom_select_options').css('max-width', 'none').show();
			$('#'+id+' a').each(function(){
				var w=$(this).width();
				if(w>maxwopt)
				{
					maxwopt=w;
				}
			})
			$('#'+id+' .custom_select_options').css('max-width', '').hide();
			$('#'+id+' a').width(maxwopt);
			 */
		   
		
		};
		
		me._replace=function(selector)
		{
			
			$(selector).each(function(){
				if($(this).hasClass(me.prefix+'-done'))
					return;
				
				//alert($(this).children().size())
				var startval=$(this).val();
				var startface='';
				
				var id='custom_select'+all_custom_selects;
				var html='<span id="'+id+'" class="'+me.prefix+'" value="'+startval+'"><b class="ruisf-rt"></b><b class="ruisf-lt"></b><b class="ruisf-rb"></b><b class="ruisf-lb"></b><a class="ruisel-clickable" href="#"></a><span class="ruisel-button"></span><span class="ruisel-face">'+startface+'</span><span class="ruisel-select_options" style="display: none;"><span class="ruisel-scroll"></span></span></span>';
				$(this).after(html).attr('custom_select',id).addClass(me.prefix+'-done');
				
				me.refresh(this);
				
				all_custom_selects++;
			});
			
			
		};
		return me;
	}
	$r.extend(Select());
})(jQuery);