import mongoose, { Schema } from 'mongoose';
const CommentSchema = new Schema({
    content: { type: String, required: true },
    author: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
    createdAt: { type: Date, default: Date.now },
});
export default mongoose.model('Comment', CommentSchema);
//# sourceMappingURL=Comment.js.map