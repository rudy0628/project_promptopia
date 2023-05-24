import { Schema, model, models } from 'mongoose';

// create a database schema for the user
const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, 'Email already exists'],
		required: [true, 'Email is required'],
	},
	username: {
		type: String,
		required: [true, 'Username is required'],
		match: [
			/^(?=.{1,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
			'Username invalid, it should contain 1-20 alphanumeric letters and be unique!',
		],
	},
	image: {
		type: String,
	},
});

// check if the user already exists in the database, if not, create it, otherwise, use the existing one
const User = models.User || model('User', UserSchema);

export default User;
