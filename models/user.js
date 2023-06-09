import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
	email: {
		type: String,
		unique: [true, "Email already exists."],
		required: [true, "Email is required."],
		lowercase: true,
	},
	username: {
		type: String,
		required: [true, "Username is required."],
	},
	image: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: () => Date.now(),
		immutable: true,
	},
	updatedAt: {
		type: Date,
		default: () => Date.now(),
	},
	loginWith: [String],
	role: String,
});

const User = models.User || model("User", UserSchema);

export default User;
