import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const collection = 'Orgs'; 

const OrgSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: Number, required: true, unique: true },
    indirizzo: { type: String, required: true }, 
    segnalazioni: [{ type: mongoose.Schema.Types.ObjectId, ref: "Report", default: [] }], 
}, {
    timestamps: true,
});

export default mongoose.model(collection, OrgSchema);