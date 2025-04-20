import mongoose from 'mongoose';
//import bcrypt from 'bcrypt';
const collection = 'Users';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: false },
    posizione: { type: Boolean, required: false, default: false }, 
    segnalazioni: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report", default: [] }], 
}, {
    timestamps: true,
});

export default mongoose.model(collection, UserSchema);