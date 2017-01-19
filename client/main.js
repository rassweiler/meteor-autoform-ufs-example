import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Item, Files } from '../imports/api/item/item.js';

import './main.html';

Template.InsertItem.onCreated(function() {
	this.autorun(() => {
		this.subscribe('item.all');
		this.subscribe('files.all');
	});
});

Template.InsertItem.helpers({
	Item(){
		return Item;
	},
	Files(){
		return Files;
	}
});

Template.InsertItem.events({

});

Template.Items.onCreated(function() {
	this.autorun(() => {
		this.subscribe('item.all');
		this.subscribe('files.all');
	});
});

Template.Items.helpers({
	Items(){
		return Item.find();
	}
});

Template.Items.events({

});