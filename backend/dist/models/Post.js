import mongoose, { Schema } from 'mongoose';
const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    titleColor: { type: String, default: 'blue' },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Post', PostSchema);
//# sourceMappingURL=Post.js.map