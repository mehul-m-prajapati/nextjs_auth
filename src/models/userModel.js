import mongoose from 'mongoose'


const userSchema = mongoose.Schema({

    username: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    isVerfied: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },

    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,

    verifyToken: String,
    verifyTokenExpiry: Date,
});


const UserModel = mongoose.models.users || mongoose.model('users', userSchema);

export default UserModel;
