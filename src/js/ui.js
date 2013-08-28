var $r= {
	plugins:[]
};
$r.allDefault=function(){
	for(var i=0; i< this.plugins.length; i++)
	{
		this[this.plugins[i]].run();
	}
};

$r.extend=function(plugins){
	
	if(plugins.length)
		for(var i=0; i< plugins.length; i++)
			ext(plugins[i]);
	else
		ext(plugins);
	function ext(plugin)
	{
		$r.plugins.push(plugin.name);
		$r[plugin.name]=plugin;
	}
};


// Abstract replacer class
function UIReplacer(name, default_selector)
{
	this.name=name;
	this.prefix='rui-'+name;
	this.selector=default_selector;
		
	this.init=function(){
		if(UIReplacer.eventsDone[this.name])
			return;
			
		this._init();
		UIReplacer.eventsDone[this.name]=true;
	};
	this._init=function(){};
		
	this.elements=$(this.selector);
		
	this.run=function(selector){
		var me=this;
		$(function(){
			me.replace(selector);
		});
		me.init();
	};
		
	this.replace=function(selector){
		if(!selector)
			selector=this.selector;
		else
			this.selector=selector;
			
		this._replace(selector);
	};
	this._replace=function(selector){};
	this.refresh=function(){};
}
UIReplacer.eventsDone=[];