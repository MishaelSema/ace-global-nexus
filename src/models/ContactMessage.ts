import mongoose, { Schema, model, models } from "mongoose";

export interface IContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  country?: string;
  topic?: string;
  service?: string;
  message: string;
  /** Careers applications only — CV uploaded alongside the submission. */
  cvUrl?: string;
  cvPublicId?: string;
  read: boolean;
}

const ContactMessageSchema = new Schema<IContactMessage>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: "" },
    company: { type: String, default: "" },
    country: { type: String, default: "" },
    topic: { type: String, default: "" },
    service: { type: String, default: "" },
    message: { type: String, required: true },
    cvUrl: { type: String, default: "" },
    cvPublicId: { type: String, default: "" },
    read: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default (models.ContactMessage as mongoose.Model<IContactMessage>) ||
  model<IContactMessage>("ContactMessage", ContactMessageSchema);