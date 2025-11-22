import mongoose, { Document, Schema } from 'mongoose';

export interface IJobPost extends Document {
  title: string;
  company?: string;
  location?: string;
  url?: string;
  experience?: string;
  description?: string;
  tags: string[];
  posted?: string;
  link: string;
  source?: string;
  scrapedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobPostSchema = new Schema<IJobPost>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    location: {
      type: String,
      trim: true,
    },
    url: {
      type: String,
      trim: true,
    },
    experience: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    posted: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    source: {
      type: String,
      trim: true,
      default: null,
    },
    scrapedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const JobPost = mongoose.models.JobPost || mongoose.model<IJobPost>('JobPost', JobPostSchema);

export default JobPost;
