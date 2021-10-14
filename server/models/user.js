const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
	username: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	email: {
		type: String,
		trim: true,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	bio: {
		type: String,
		default: "",
		trim: true,
	},
	image: {
		type: String,
		default: ""
	},
	token: {
		type: String,
		default: "",
	},
	favoritedArticles: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Article',
		}],
		default: []
	},
	following: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],
		default: []
	},
	followedBy: {
		type: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		}],
		default: []
	}
});

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next();
	}

	const hashPassword = await bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS));
	this.password = hashPassword;
	next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;