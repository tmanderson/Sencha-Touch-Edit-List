Ext.regApplication({

	name: 'EditList',
	defaultTarget: 'viewport',
		
	launch: function() {
		
		this.viewport = new EditList.views.Viewport({
			application: this
		});
		
		Ext.dispatch({
			controller: 'Main',
			action: 'construct'
		});
	}
});