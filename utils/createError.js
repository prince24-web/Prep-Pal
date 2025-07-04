class CreateError extends Error {
    super(msg, statusCode) {
        this.message = msg || "Internal Server Error";
        this.statusCode = statusCode || 500;
    }
}

export default CreateError;
