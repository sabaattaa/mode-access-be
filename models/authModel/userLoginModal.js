
const userLoginModel = new mongoose.Schema({
    
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        trim: true
    }, 
});

export default mongoose.model("UserLogin", userLoginModel)