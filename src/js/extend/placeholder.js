(function($){
	// Placeholder replacer class
	function Placeholder()
	{
		var me=new UIReplacer('placeholder', '[placeholder]');
		
		me._init=function(){
			
			$('.'+me.prefix+'-done').live('focus', function(){
				$(this).siblings('.'+me.prefix+'-text').hide();
			}).live('blur', function(){
				if($(this).val()=='')
					$(this).siblings('.'+me.prefix+'-text').show();
			});
			$('.'+me.prefix+'-text').live('click', function(){
				$(this).prev().focus();
			})
		};
		me._replace=function(selector){
			
			$(selector).each(function(){
				if($(this).hasClass(me.prefix+'-done'))
					return;
				
				var placeholder=$(this).attr('placeholder');
				$(this).addClass(me.prefix+'-done')
				.wrap('<span class="'+me.prefix+'-container"/>')
				.after('<span class="'+me.prefix+'-text">'+placeholder+'</span>')
				.attr('placeholder','');
					
				if($(this).val()!='')
				{
					$(this).siblings('.'+me.prefix+'-text').hide();
				}
			});
		};
		return me;
	}
	$r.extend(new Placeholder());
})(jQuery);