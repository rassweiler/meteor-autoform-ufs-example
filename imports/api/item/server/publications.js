/* eslint-disable prefer-arrow-callback */

import { Meteor } from 'meteor/meteor';
import { Item, Files } from '../item.js';

//Just return everything, not worried about security
Meteor.publish('item.all', function() {
	return Item.find();
});

//Just return everything, not worried about security
Meteor.publish('files.all', function() {
	return Files.find();
});