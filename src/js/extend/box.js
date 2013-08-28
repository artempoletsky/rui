(function($){
	var normalize_inputs_increment=1;
	function normalizeInputs()
	{
		$('label input').each(function(){
			var id=this.id;
			if(!id)
			{
				id='anonymous_input'+normalize_inputs_increment;
				$(this).attr('id', id);
				normalize_inputs_increment++;
			}
			var label=$(this).closest('label');
			if(!label.attr('for'))
			{
				label.attr('for', id);
			}
		})
	}
	
	// Checkbox replacer class
	function Checkbox(name, default_selector)
	{
		if(!name)
			name='checkbox';
		if(!default_selector)
			default_selector='.ruibox';
		var me=new UIReplacer(name, default_selector);
		
		
		me._init=function(){
			
			$('.'+me.prefix+'-done').live(me.prefix+'refresh change', function(){
				me.refresh(this);	
			});
			$('.'+me.prefix+'-done').live('mouseup', function(){
				if(!$(this).attr('disabled'))
					$(this).parent().removeClass(me.prefix+'-active');
			}).live('mousedown', function(){
				if(!$(this).attr('disabled'))
					$(this).parent().addClass(me.prefix+'-active');
			}).live('mouseleave', function(){
				if(!$(this).attr('disabled'))
					$(this).parent().removeClass(me.prefix+'-hover');
			}).live('mouseenter', function(){
				if(!$(this).attr('disabled'))
					$(this).parent().addClass(me.prefix+'-hover');
			}).live('focus', function(){
				$(this).parent().addClass(me.prefix+'-focus');
			}).live('blur', function(){
				$(this).parent().removeClass(me.prefix+'-focus');
			});
			
			return this;
		};
		
		
		
		me._replace=function(selector){
			
			normalizeInputs();
			$(selector).each(function(){
				if($(this).hasClass(me.prefix+'-done'))
					return;
				var image='<span class="'+me.prefix+'-wrap"></span>';
				$(this).addClass(me.prefix+'-done').wrap(image);
				me.refresh(this);
			})
		};
		me.refresh=function(obj)
		{
			var id=$(obj).attr('id');
			if(!$(obj).prop('checked'))
			{
				$(obj).parent('.'+me.prefix+'-wrap').removeClass(me.prefix+'-checked');				
				$('label[for='+id+']').removeClass(me.prefix+'-label_checked');
			}
			else
			{
				$(obj).parent('.'+me.prefix+'-wrap').addClass(me.prefix+'-checked');
				$('label[for='+id+']').addClass(me.prefix+'-label_checked');
			}
			if(!$(obj).prop('disabled'))
			{
				$(obj).parent('.'+me.prefix+'-wrap').removeClass(me.prefix+'-disabled');				
				$('label[for='+id+']').removeClass(me.prefix+'-label_disabled');
			}
			else
			{
				$(obj).parent('.'+me.prefix+'-wrap').addClass(me.prefix+'-disabled');
				$('label[for='+id+']').addClass(me.prefix+'-label_disabled');
			}
		};
		
		
		return me;
	}
	
	 
	function Radio()
	{
		var me=new Checkbox('radio', '.ruiradio');
			
		var refresh=me.refresh;
		
		me.refresh=function(obj)
		{
			$('input[name='+obj.name+']').each(	function (){
				refresh(this);
			});
		};
		return me;
	}
	
	$r.extend([Checkbox(), Radio()]);
	
})(jQuery);