import { Schema, model } from 'mongoose';
import { type IMessage, type IChat } from '../../interfaces/interfaceChat';

const chatMessageSchema = new Schema<IMessage>({
  created_at: { type: String },
  message: { type: String, required: true },
  username: { type: String, required: true },
});

const chatSchema = new Schema<IChat>({
  created_at: { type: String },
  message: [chatMessageSchema],
  username: { type: String, required: true },
});

export const ModelChat = model<IChat>('chat', chatSchema);
