const errorHandlers = (error, message = "Internal Server Error") => {
	const errorMessage = (error).message;
	return { errorMessage: errorMessage ? errorMessage : message };
};

module.exports = errorHandlers;
