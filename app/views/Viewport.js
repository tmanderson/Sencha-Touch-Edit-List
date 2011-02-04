EditList.views.Viewport = Ext.extend(Ext.Panel, {
	id: 'viewport',
	fullscreen: true,
	layout: 'card',
	
	initComponent: function() {
		
		this.tb = {
			xtype: 'toolbar',
			items: [
				{
					xtype: 'spacer',
					align: 'stretch'
				},
				{	
					id: 'tb-edit',
					text: 'Edit Items'
				}
			]
		}
		
		this.dockedItems = [this.tb];
		
		EditList.views.Viewport.superclass.initComponent.apply(this, arguments);
	}
});

Ext.reg('viewport', EditList.views.Viewport);