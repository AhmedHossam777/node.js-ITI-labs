import mongoose, { Schema } from 'mongoose';
import { IUserDocument, Role } from '../types/user.types';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUserDocument>(
	{
		name: {
			type: String,
			required: [true, 'Name is required'],
			trim: true,
		},
		email: {
			type: String,
			required: [true, 'Email is required'],
			unique: true,
			lowercase: true,
			trim: true,
		},
		password: {
			type: String,
			required: [true, 'Password is required'],
		},
		role: {
			type: String,
			required: true,
			enum: Object.values(Role),
			default: Role.USER,
		},
		age: {
			type: Number,
			required: [true, 'Age is required'],
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

export const User = mongoose.model<IUserDocument>('User', userSchema);
