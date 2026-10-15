export type UserRole = 'OWNER' | 'EDITOR';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
}

export type LookStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export interface PortfolioCategory {
  id: string;
  name: string;
  slug: string;
  displayOrder: number;
}

export interface PortfolioLook {
  id: string;
  title: string;
  slug: string;
  categoryId: string;
  categoryName?: string;
  excerpt: string;
  description: string;
  clientType: 'Bridal' | 'Editorial' | 'Red Carpet' | 'Celebrity' | 'Private Client';
  finishType: 'Glass Skin' | 'Velvet Matte' | 'Soft Glam' | 'Dewy Radiant' | 'High-Fashion Editorial';
  skinToneDescription: string;
  primaryImageUrl: string;
  galleryUrls: string[];
  beforeImageUrl?: string;
  afterImageUrl?: string;
  serviceId?: string;
  serviceTitle?: string;
  isFeatured: boolean;
  status: LookStatus;
  displayOrder: number;
  productsUsed?: string[];
  keyTechniques?: string[];
  createdAt: string;
  updatedAt: string;
}

export type PriceType = 'FIXED' | 'STARTING_AT' | 'ENQUIRE';

export interface ServicePackage {
  id: string;
  title: string;
  slug: string;
  category: 'Bridal' | 'Occasion' | 'Editorial' | 'Masterclass';
  shortDescription: string;
  fullDescription: string;
  priceIndicative: string;
  priceType: PriceType;
  durationMinutes: number;
  inclusions: string[];
  preparationGuide: string;
  travelPolicy: string;
  imageUrl: string;
  isFeatured: boolean;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export type EnquiryStatus = 'NEW' | 'CONTACTED' | 'QUOTED' | 'CONFIRMED' | 'COMPLETED' | 'CLOSED';

export interface Enquiry {
  id: string;
  referenceNumber: string;
  fullName: string;
  email: string;
  phone: string;
  eventType: 'Haute Bridal' | 'Red Carpet / Black Tie' | 'Editorial / Campaign' | 'Destination Wedding' | 'Private Consultation';
  eventDate: string;
  readyByTime: string;
  location: string;
  guestsCount: number;
  serviceId?: string;
  serviceTitle?: string;
  aestheticNotes: string;
  budgetRange: string;
  referenceImageUrl?: string;
  status: EnquiryStatus;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
}

export interface EnquiryStatusHistory {
  id: string;
  enquiryId: string;
  previousStatus: EnquiryStatus;
  newStatus: EnquiryStatus;
  note: string;
  changedBy: string;
  createdAt: string;
}

export interface InstagramPost {
  id: string;
  mediaUrl: string;
  mediaType: 'IMAGE' | 'VIDEO';
  caption: string;
  permalink: string;
  likesCount?: number;
  isFeatured: boolean;
  displayOrder: number;
  consentObtained: boolean;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  eventType: string;
  quote: string;
  location: string;
  rating: number;
  isFeatured: boolean;
  displayOrder: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'Bridal' | 'Booking & Travel' | 'Products & Hygiene' | 'Trials & Consultation';
  displayOrder: number;
}

export interface SiteSettings {
  id: string;
  studioName: string;
  tagline: string;
  artistName: string;
  bio: string;
  contactEmail: string;
  phone: string;
  whatsapp: string;
  instagramHandle: string;
  serviceAreas: string[];
  responseTimeHours: number;
  seoTitle: string;
  seoDescription: string;
  heroVideoUrl?: string;
  heroImageUrl?: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  filename: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  altText: string;
  focalPointX: number;
  focalPointY: number;
  usageCount: number;
  createdAt: string;
}
