import mongoose, { Schema, model, models } from "mongoose";

export interface IInsight {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // markdown
  category: string;
  tags: string[];
  coverUrl?: string;
  coverPublicId?: string;
  author: string;
  published: boolean;
  featured?: boolean;
  publishedAt?: Date;
}

const InsightSchema = new Schema<IInsight>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, default: "" },
    content: { type: String, default: "" },
    category: { type: String, default: "Market Intelligence" },
    tags: { type: [String], default: [] },
    coverUrl: { type: String, default: "" },
    coverPublicId: { type: String, default: "" },
    author: { type: String, default: "Christopher A. Ekom" },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

export default (models.Insight as mongoose.Model<IInsight>) || model<IInsight>("Insight", InsightSchema);