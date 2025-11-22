import mongoose, { Document, Schema } from 'mongoose';

interface IKey {
  field: string;
  path: string;
  map?: string;
}

interface IUrlConfig {
  directUrlFields: string[];
  slugBase: string;
  slugPattern: string;
  slugifyFn: string | ((text: string) => string);
}

export interface IScraperConfig extends Document {
  url: string;
  isApi: boolean;
  wrapperSelector?: string;
  source: string;
  isRegular: boolean;
  isActive: boolean;
  selectors: {
    title?: string;
    company?: string;
    location?: string;
    experience?: string;
    description?: string;
    tags?: string[] | string;
    posted?: string;
    link?: string;
  };
  keys: IKey[];
  urlConfig: IUrlConfig;
  createdAt: Date;
  updatedAt: Date;
}

const KeySchema = new Schema<IKey>({
  field: {
    type: String,
    required: true,
    trim: true
  },
  path: {
    type: String,
    required: true,
    trim: true
  },
  map: {
    type: String,
    trim: true
  }
});

const UrlConfigSchema = new Schema<IUrlConfig>({
  directUrlFields: [{
    type: String,
    trim: true
  }],
  slugBase: {
    type: String,
    trim: true,
    default: ""
  },
  slugPattern: {
    type: String,
    trim: true,
    default: ""
  },
  slugifyFn: {
    type: String,
    trim: true,
    default: ""
  }
});

const ScraperConfigSchema = new Schema<IScraperConfig>(
  {
    url: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    isApi: {
      type: Boolean,
      required: true,
      default: false,
    },
    wrapperSelector: {
      type: String,
      trim: true,
    },
    source: {
      type: String,
      trim: true,
      required: true,
    },
    isRegular: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // For non-API configurations
    selectors: {
      title: { type: String, trim: true, default: "" },
      company: { type: String, trim: true, default: "" },
      location: { type: String, trim: true, default: "" },
      experience: { type: String, trim: true, default: "" },
      description: { type: String, trim: true, default: "" },
      tags: { type: Schema.Types.Mixed, default: [] },
      posted: { type: String, trim: true, default: "" },
      link: { type: String, trim: true, default: "" },
    },
    // For API configurations
    keys: [KeySchema],
    urlConfig: UrlConfigSchema
  },
  { timestamps: true }
);

const ScraperConfig = mongoose.models.ScraperConfig || mongoose.model<IScraperConfig>('ScraperConfig', ScraperConfigSchema);

export default ScraperConfig;
