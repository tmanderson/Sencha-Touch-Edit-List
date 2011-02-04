//In order to make this a real component to Sencha:
//Add this before we declare:
//Ext.ns("NAME OF LIST SUBSPACE HERE");
//Then just register it, with the new NS

EditList.views.EditList = Ext.extend(Ext.List, {
	
	disableSelection: true,
	editing: false,
	
	initComponent: function(opts) {
	
		this.addEvents({
			beforeshowedit: true,
			aftershowedit: true,
			beforehideedit: true,
			afterhideedit: true
		});
				
		EditList.views.EditList.superclass.initComponent.apply(this, arguments);
		
		this.store.on('load', this.swipeEdit(), this);
	},
	
	updateIndexes: function() {
		
		var that = this;
		
		//TODO: Make list more customizable on instantiation.
		//ie: controlling the property, the time, and the easing
		//Also, follow the default animation disabling that the other classes are assigned via js...
		var style = this.editing ? 'margin-left: 40px;' : '-webkit-transition: margin-left 100ms ease';
		
		Ext.each(this.getNodes(), function() {
			
			if(!Ext.get(this).down('.deletebtn')) {
				var div = document.createElement('div');
				div.setAttribute('class', 'deletebtn');
				this.firstChild.setAttribute('style', style);
				this.firstChild.insertBefore(div, this.firstChild.firstChild);
			}
			
			if(!Ext.get(this).down('.finaldeletebtn')) {
				var div = document.createElement('div');
				div.setAttribute('class', 'finaldeletebtn');
				this.firstChild.appendChild(div);
			}
			
			Ext.get(this).down('.deletebtn').removeAllListeners();
			Ext.get(this).down('.deletebtn').on('tap', that.editButtonHandler, that);
			Ext.get(this).down('.finaldeletebtn').removeAllListeners();
			Ext.get(this).down('.finaldeletebtn').on('tap', that.removeItem, that);
		});
		
		EditList.views.EditList.superclass.updateIndexes.apply(this, arguments);
		
		//Don't want to run swipe edit every time...it's more of a beginning call...
		that.swipeEdit();
	},
	
	swipeEdit: function() {
		
		var that = this;
		
		Ext.each(this.getNodes(), function() {

			Ext.get(this).removeAllListeners();
			Ext.get(this).on('swipe', that.itemSwipe, that);
		});
	},
	
	//
	//Make this an option
	//
	itemSwipe: function(e, el) {
		
		//Kinda sloppy, but if you slide over the hidden final delete button, you error out,
		//so if you slide over it, we make el reference what it should, which is it's parent...
		el = (el.getAttribute('class') === 'finaldeletebtn') ? el.parentNode : el;
		
		if(e.direction === 'left') {
			
			this.showFinalDelete(el, 1);
			
		} else if(e.direction === 'right') {
			
			this.showFinalDelete(el, 0);
		}
	},
	
	showFinalDelete: function(el, opacity) {
		
		Ext.get(el).down('.finaldeletebtn').setStyle({
			'opacity': opacity
		});
	},
	
	editButtonHandler: function(e, el) {
		
		//get the actual container, no the editbtn
		this.showFinalDelete(Ext.get(el).parent(), 1);
	},
	
	showEditButtons: function() {
		
		var that = this;
		
		this.editing = true;
		this.fireEvent('beforeshowedit');
		
		var lastNode = this.getNodes().length - 1;
		lastNode = that.getNode(lastNode);
		
		Ext.each(this.getNodes(), function() {
			
			Ext.get(this.firstChild).setStyle({
				'margin-left': '40px'
			});
			
			//Once we've gotten the last node, we're done!
			if(this === lastNode) {
				that.fireEvent('aftershowedit');
			}
		});
	},
	
	hideEditButtons: function() {
		
		var that = this;
		that.editing = false;
		that.updateIndexes();
		
		this.fireEvent('beforehideedit');
		
		var lastNode = this.getNodes().length - 1;
		lastNode = this.getNode(lastNode);
		
		Ext.each(this.getNodes(), function() {
			
			Ext.get(this.firstChild).set({
				//Kinda added this in a state of distraction...re-check later...
				style: 'margin-left: 0;-webkit-transition: margin-left 100ms ease;'
			});
			
			//Once we've gotten the last node, we're done!
			if(this === lastNode) {
				that.fireEvent('afterhideedit');
			}
		});
	},
	
	removeItem: function(evt, element, listEl) {
		
		//Again, shady, but it does the job...
		var element = element.parentNode.parentNode;
		
		//User defined, or list defined?
		//Maybe an option...?
		var theRecord = this.getRecord(element);
		this.store.remove(theRecord);
		//that.store.sync();
	}
	
});

Ext.reg('editlist', EditList.views.EditList);