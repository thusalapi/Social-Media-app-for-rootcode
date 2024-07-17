import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  content: string;
  author: string;
  post: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CommentSchema: Schema = new Schema({
  content: { type: String, required: true },
  author: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IComment>('Comment', CommentSchema);