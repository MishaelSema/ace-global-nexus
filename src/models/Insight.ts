import mongoose, { Schema, model, models } from "mongoose";

export interface IInsight {
  title: string;
  /** French title. Falls back to `title` when blank. */
  titleFr?: string;
  slug: string;
  excerpt: string;
  /** French excerpt. Falls back to `excerpt` when blank. */
  excerptFr?: string;
  content: string; // markdown
  /** French body (markdown). Falls back to `content` when blank. */
  contentFr?: string;
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
    titleFr: { type: String, default: "" },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
    excerpt: { type: String, default: "" },
    excerptFr: { type: String, default: "" },
    content: { type: String, default: "" },
    contentFr: { type: String, default: "" },
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