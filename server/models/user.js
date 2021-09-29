const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
	{
		username: {
			type: String,
			trim: true,
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
		},
		bio: {
			type: String,
			trim: true,
		},
		image: {
			type: String,
		},
		token: {
			type: String,
		},
	}
)

userSchema.pre('save', async function (next) {
	if (!this.isModified('password')) {
		return next()
	}

	const hashPassword = await bcrypt.hash(this.password, Number(process.env.SALT_ROUNDS))
	this.password = hashPassword
	next()
})

const User = mongoose.model('User', userSchema)
module.exports = User