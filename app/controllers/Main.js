Ext.regController('Main', {
	
	construct: function() {
		
		Ext.regModel('theModel', {
			fields: ['title']
		});
		
		var theStore = new Ext.data.JsonStore({
			model: 'theModel',
			
			data: [
				{title: 'Item 1'},
				{title: 'Item 2'},
				{title: 'Item 3'},
				{title: 'Item 4'},
				{title: 'Item 5'},
				{title: 'Item 6'}
			]
		});
		
		this.editlistpanel = {
			xtype: 'panel',
			layout: 'fit',
			items: [
				{
					xtype: 'editlist',
					id: 'editlist',
					store: theStore,
					itemTpl: '{title}'
				}
			]
		}
		
		this.render(this.editlistpanel);
		
		this.editing = false;
		
		Ext.getCmp('tb-edit').on('tap', this.showEdits, this);
	},
	
	showEdits: function() {
		
		if(!this.editing) {
			Ext.getCmp('editlist').showEditButtons();
			Ext.getCmp('tb-edit').setText('Done');
		} else {
			Ext.getCmp('editlist').hideEditButtons();
			Ext.getCmp('tb-edit').setText('Edit Items');
		}
		
		this.editing = !this.editing;
	}
});