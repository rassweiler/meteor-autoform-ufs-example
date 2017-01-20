import { Meteor } from 'meteor/meteor';

// if the database is empty on server start, create the admin account.
Meteor.startup(() => {
	if(Meteor.users.find().count() === 0){
		id = Accounts.createUser({
			username:'user',
			password: 'password'
		});
	}
});