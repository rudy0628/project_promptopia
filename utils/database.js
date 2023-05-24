import mongoose from 'mongoose';

let isConnected = false; // track the connection

// build a connect to database function
export const connectToDB = async () => {
	// the necessary code to avoid error.
	mongoose.set('strictQuery', true);

	// check if isConnected is true, if is true, return nothing
	if (isConnected) {
		console.log('MongoDB is already connected');
		return;
	}

	try {
		// connect mongodb via mongoose
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: 'share_prompt',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		// set isConnected to true
		isConnected = true;

		console.log('MongoDB connected');
	} catch (error) {
		console.log(error);
	}
};
