const mongoose = require('mongoose')
const DB_URL = process.env.DB_URL

const connection = async () => {
	try {
		await mongoose.connect(DB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			autoIndex: true
		}, error => {
			if (error) throw new Error("Failed to connect to database.")
			console.log("Connected.");
		})
	} catch (error) {
		console.log(error);
	}
}

module.exports = connection;