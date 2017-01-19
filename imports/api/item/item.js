import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';

export const Item = new Mongo.Collection('Item');

// Setup index for faster searching
if ( Meteor.isServer ) {
	Item._ensureIndex( { name: 1 } );
}

/* -----Not interested in security-------
// Deny all client-side updates since we will be using methods to manage this collection
Item.deny({
	insert() { return true; },
	update() { return true; },
	remove() { return true; },
});

Item.allow({
	insert() { return false; },
	update() { return false; },
	remove() { return false; },
});
*/

// Item schema so we can use autoform.
Item.schema = new SimpleSchema({
	name: {
		type: String
	},
	picture:{
		type:[String],
		optional:true,
		autoform: {
			type: 'ufs',
			collection: 'Files',
			store: 'imageStore',
			publication: 'files.all'
        }
	}
});

Item.attachSchema(Item.schema);

// Collection to hold the file data
export const Files = new Mongo.Collection('Files');

// Use HTTPS in URLs
UploadFS.config.https = false

// Set the temporary directory where uploading files will be saved
// before sent to the store.
UploadFS.config.tmpDir = 'C:\\Users\\krassweiler\\Desktop\\meteor-autoform-ufs-example\\temp';

export const ImageStore = new UploadFS.store.Local({
	collection: Files,
	name: 'imageStore',
	path: 'C:\\Users\\krassweiler\\Desktop\\meteor-autoform-ufs-example\\files',
	mode: '0744', // directory permissions
    writeMode: '0744', // file permissions
	permissions: new UploadFS.StorePermissions({
		insert: function (userId, doc) {
			return userId;
		},
		update: function (userId, doc) {
			return userId === doc.userId;
		},
		remove: function (userId, doc) {
			return userId === doc.userId;
		}
	})
});