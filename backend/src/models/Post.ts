import mongoose, { Document, Schema } from 'mongoose';

export interface IPost extends Document {
  title: string;
  content: string;
  author: string;
  titleColor: string;
  createdAt: Date;
}

const PostSchema: Schema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, required: true },
  titleColor: { type: String, default: 'blue' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IPost>('Post', PostSchema);