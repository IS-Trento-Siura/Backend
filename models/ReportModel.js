import mongoose from 'mongoose';
const collection = 'Reports';

const ReportSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    location: { lat: { type: Number, required: false }, lng: { type: Number, required: false} },
    photo: { type: String, required: false },
    tags: { type: String, required: false },
}, {
    timestamps: true,
});

export default mongoose.model(collection, ReportSchema);