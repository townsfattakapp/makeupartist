import { 
  PortfolioCategory, 
  PortfolioLook, 
  ServicePackage, 
  Enquiry, 
  EnquiryStatus, 
  InstagramPost, 
  Testimonial, 
  FAQ, 
  SiteSettings, 
  MediaAsset 
} from '@/types';
import { 
  INITIAL_SETTINGS, 
  INITIAL_CATEGORIES, 
  INITIAL_SERVICES, 
  INITIAL_LOOKS, 
  INITIAL_INSTAGRAM_POSTS, 
  INITIAL_TESTIMONIALS, 
  INITIAL_FAQS, 
  INITIAL_ENQUIRIES 
} from './seed-data';
import { getTigerPool } from './tiger';

// In-Memory Persistent Store fallback for zero-setup local execution
class InMemoryStore {
  settings: SiteSettings = { ...INITIAL_SETTINGS };
  categories: PortfolioCategory[] = [...INITIAL_CATEGORIES];
  services: ServicePackage[] = [...INITIAL_SERVICES];
  looks: PortfolioLook[] = [...INITIAL_LOOKS];
  instagramPosts: InstagramPost[] = [...INITIAL_INSTAGRAM_POSTS];
  testimonials: Testimonial[] = [...INITIAL_TESTIMONIALS];
  faqs: FAQ[] = [...INITIAL_FAQS];
  enquiries: Enquiry[] = [...INITIAL_ENQUIRIES];
  mediaAssets: MediaAsset[] = [
    {
      id: 'med-001',
      filename: 'mayfair_bridal_glow.jpg',
      fileUrl: '/assets/8cefb0245c79153f745fc34d21844435.jpg',
      fileSize: 332607,
      mimeType: 'image/jpeg',
      altText: 'Mayfair glass-skin bride with delicate gold jewelry',
      focalPointX: 0.5,
      focalPointY: 0.4,
      usageCount: 4,
      createdAt: '2026-01-10T00:00:00Z',
    },
    {
      id: 'med-002',
      filename: 'heritage_velvet_crimson.jpg',
      fileUrl: '/assets/c54785dd41d0124d0ec1884c9c23b663.jpg',
      fileSize: 94705,
      mimeType: 'image/jpeg',
      altText: 'Heritage bride with bold crimson lips and uncut polki jewels',
      focalPointX: 0.5,
      focalPointY: 0.5,
      usageCount: 2,
      createdAt: '2026-01-15T00:00:00Z',
    },
    {
      id: 'med-003',
      filename: 'lake_como_radiance.jpg',
      fileUrl: '/assets/587b54ee128220d06943bf8b1e10e629.jpg',
      fileSize: 89876,
      mimeType: 'image/jpeg',
      altText: 'Golden hour bridal portrait with sheer peach blush',
      focalPointX: 0.5,
      focalPointY: 0.45,
      usageCount: 3,
      createdAt: '2026-01-22T00:00:00Z',
    },
    {
      id: 'med-004',
      filename: 'editorial_sculpt.jpg',
      fileUrl: '/assets/08f19beeeda20fba94e79a06694b1d74.jpg',
      fileSize: 56454,
      mimeType: 'image/jpeg',
      altText: 'High fashion editorial cheekbone sculpture and clean liner',
      focalPointX: 0.5,
      focalPointY: 0.5,
      usageCount: 2,
      createdAt: '2026-02-01T00:00:00Z',
    },
    {
      id: 'med-005',
      filename: 'cannes_red_carpet.jpg',
      fileUrl: '/assets/1f6bb0f30d7cb01cde4252abf97f888f.jpg',
      fileSize: 79431,
      mimeType: 'image/jpeg',
      altText: 'Red carpet smoky feline wing liner on deep caramel skin',
      focalPointX: 0.5,
      focalPointY: 0.4,
      usageCount: 2,
      createdAt: '2026-02-12T00:00:00Z',
    },
    {
      id: 'med-006',
      filename: 'skin_prep_before.jpg',
      fileUrl: '/assets/ff293627f3f413d12a8f47c2a4f6a519.jpg',
      fileSize: 52939,
      mimeType: 'image/jpeg',
      altText: 'Consented before photo of bride prior to microcurrent skin preparation',
      focalPointX: 0.5,
      focalPointY: 0.5,
      usageCount: 2,
      createdAt: '2026-01-10T00:00:00Z',
    }
  ];
}

const globalStore = new InMemoryStore();

export const repository = {
  // --- Site Settings ---
  async getSettings(): Promise<SiteSettings> {
    const pool = getTigerPool();
    if (pool) {
      try {
        const res = await pool.query('SELECT * FROM site_settings LIMIT 1');
        if (res.rows.length > 0) {
          const row = res.rows[0];
          return {
            id: row.id,
            studioName: row.studio_name,
            tagline: row.tagline,
            artistName: row.artist_name,
            bio: row.bio,
            contactEmail: row.contact_email,
            phone: row.phone,
            whatsapp: row.whatsapp,
            instagramHandle: row.instagram_handle,
            serviceAreas: row.service_areas || [],
            responseTimeHours: row.response_time_hours,
            seoTitle: row.seo_title,
            seoDescription: row.seo_description,
            heroVideoUrl: row.hero_video_url,
            heroImageUrl: row.hero_image_url,
            updatedAt: row.updated_at,
          };
        }
      } catch (err) {
        console.warn('Tiger Cloud query error, falling back to local store:', err);
      }
    }
    return globalStore.settings;
  },

  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const pool = getTigerPool();
    if (pool) {
      try {
        const keys = Object.keys(data);
        if (keys.length > 0) {
          await pool.query(
            `UPDATE site_settings SET 
              studio_name = COALESCE($1, studio_name),
              tagline = COALESCE($2, tagline),
              artist_name = COALESCE($3, artist_name),
              bio = COALESCE($4, bio),
              contact_email = COALESCE($5, contact_email),
              phone = COALESCE($6, phone),
              whatsapp = COALESCE($7, whatsapp),
              instagram_handle = COALESCE($8, instagram_handle),
              response_time_hours = COALESCE($9, response_time_hours),
              seo_title = COALESCE($10, seo_title),
              seo_description = COALESCE($11, seo_description),
              updated_at = NOW()
            WHERE id = (SELECT id FROM site_settings LIMIT 1)`,
            [
              data.studioName,
              data.tagline,
              data.artistName,
              data.bio,
              data.contactEmail,
              data.phone,
              data.whatsapp,
              data.instagramHandle,
              data.responseTimeHours,
              data.seoTitle,
              data.seoDescription,
            ]
          );
        }
      } catch (err) {
        console.warn('Tiger Cloud update error:', err);
      }
    }
    globalStore.settings = { ...globalStore.settings, ...data, updatedAt: new Date().toISOString() };
    return globalStore.settings;
  },

  // --- Categories ---
  async getCategories(): Promise<PortfolioCategory[]> {
    return globalStore.categories.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  // --- Portfolio Looks ---
  async getLooks(categorySlug?: string, status?: string): Promise<PortfolioLook[]> {
    let looks = [...globalStore.looks];
    if (status && status !== 'ALL') {
      looks = looks.filter(l => l.status === status);
    } else if (!status) {
      looks = looks.filter(l => l.status === 'PUBLISHED');
    }

    if (categorySlug && categorySlug !== 'all') {
      const cat = globalStore.categories.find(c => c.slug === categorySlug);
      if (cat) {
        looks = looks.filter(l => l.categoryId === cat.id);
      }
    }
    return looks.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async getLookBySlug(slug: string): Promise<PortfolioLook | null> {
    const look = globalStore.looks.find(l => l.slug === slug);
    return look || null;
  },

  async getLookById(id: string): Promise<PortfolioLook | null> {
    const look = globalStore.looks.find(l => l.id === id);
    return look || null;
  },

  async saveLook(lookData: Partial<PortfolioLook> & { title: string }): Promise<PortfolioLook> {
    if (lookData.id) {
      const idx = globalStore.looks.findIndex(l => l.id === lookData.id);
      if (idx >= 0) {
        globalStore.looks[idx] = {
          ...globalStore.looks[idx],
          ...lookData,
          updatedAt: new Date().toISOString(),
        } as PortfolioLook;
        return globalStore.looks[idx];
      }
    }

    const newSlug = lookData.slug || lookData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newLook: PortfolioLook = {
      id: lookData.id || `look-${Date.now()}`,
      title: lookData.title,
      slug: newSlug,
      categoryId: lookData.categoryId || 'cat-bridal',
      categoryName: globalStore.categories.find(c => c.id === lookData.categoryId)?.name || 'Haute Bridal',
      excerpt: lookData.excerpt || '',
      description: lookData.description || '',
      clientType: lookData.clientType || 'Bridal',
      finishType: lookData.finishType || 'Glass Skin',
      skinToneDescription: lookData.skinToneDescription || 'Tailored Undertones',
      primaryImageUrl: lookData.primaryImageUrl || '/assets/8cefb0245c79153f745fc34d21844435.jpg',
      galleryUrls: lookData.galleryUrls || [lookData.primaryImageUrl || '/assets/8cefb0245c79153f745fc34d21844435.jpg'],
      beforeImageUrl: lookData.beforeImageUrl,
      afterImageUrl: lookData.afterImageUrl,
      serviceId: lookData.serviceId,
      serviceTitle: globalStore.services.find(s => s.id === lookData.serviceId)?.title,
      isFeatured: !!lookData.isFeatured,
      status: lookData.status || 'PUBLISHED',
      displayOrder: lookData.displayOrder ?? globalStore.looks.length + 1,
      productsUsed: lookData.productsUsed || [],
      keyTechniques: lookData.keyTechniques || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalStore.looks.push(newLook);
    return newLook;
  },

  async deleteLook(id: string): Promise<boolean> {
    const idx = globalStore.looks.findIndex(l => l.id === id);
    if (idx >= 0) {
      globalStore.looks.splice(idx, 1);
      return true;
    }
    return false;
  },

  // --- Services ---
  async getServices(): Promise<ServicePackage[]> {
    return globalStore.services.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async getServiceBySlug(slug: string): Promise<ServicePackage | null> {
    const s = globalStore.services.find(s => s.slug === slug);
    return s || null;
  },

  async saveService(serviceData: Partial<ServicePackage> & { title: string }): Promise<ServicePackage> {
    if (serviceData.id) {
      const idx = globalStore.services.findIndex(s => s.id === serviceData.id);
      if (idx >= 0) {
        globalStore.services[idx] = {
          ...globalStore.services[idx],
          ...serviceData,
          updatedAt: new Date().toISOString(),
        } as ServicePackage;
        return globalStore.services[idx];
      }
    }

    const newSlug = serviceData.slug || serviceData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const newService: ServicePackage = {
      id: serviceData.id || `srv-${Date.now()}`,
      title: serviceData.title,
      slug: newSlug,
      category: serviceData.category || 'Bridal',
      shortDescription: serviceData.shortDescription || '',
      fullDescription: serviceData.fullDescription || '',
      priceIndicative: serviceData.priceIndicative || 'Enquire',
      priceType: serviceData.priceType || 'STARTING_AT',
      durationMinutes: serviceData.durationMinutes || 90,
      inclusions: serviceData.inclusions || [],
      preparationGuide: serviceData.preparationGuide || '',
      travelPolicy: serviceData.travelPolicy || '',
      imageUrl: serviceData.imageUrl || '/assets/8cefb0245c79153f745fc34d21844435.jpg',
      isFeatured: !!serviceData.isFeatured,
      displayOrder: serviceData.displayOrder ?? globalStore.services.length + 1,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    globalStore.services.push(newService);
    return newService;
  },

  // --- Instagram Posts ---
  async getInstagramPosts(): Promise<InstagramPost[]> {
    return globalStore.instagramPosts.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async saveInstagramPost(postData: Partial<InstagramPost> & { mediaUrl: string; caption: string }): Promise<InstagramPost> {
    if (postData.id) {
      const idx = globalStore.instagramPosts.findIndex(p => p.id === postData.id);
      if (idx >= 0) {
        globalStore.instagramPosts[idx] = {
          ...globalStore.instagramPosts[idx],
          ...postData,
        } as InstagramPost;
        return globalStore.instagramPosts[idx];
      }
    }
    const newPost: InstagramPost = {
      id: postData.id || `ig-${Date.now()}`,
      mediaUrl: postData.mediaUrl,
      mediaType: postData.mediaType || 'VIDEO',
      caption: postData.caption,
      permalink: postData.permalink || 'https://instagram.com/kumkumpatelmakeup',
      likesCount: postData.likesCount || 1000,
      isFeatured: postData.isFeatured ?? true,
      displayOrder: postData.displayOrder ?? globalStore.instagramPosts.length + 1,
      consentObtained: true,
      createdAt: new Date().toISOString(),
    };
    globalStore.instagramPosts.push(newPost);
    return newPost;
  },

  async deleteInstagramPost(id: string): Promise<boolean> {
    const idx = globalStore.instagramPosts.findIndex(p => p.id === id);
    if (idx >= 0) {
      globalStore.instagramPosts.splice(idx, 1);
      return true;
    }
    return false;
  },

  // --- Testimonials & FAQs ---
  async getTestimonials(): Promise<Testimonial[]> {
    return globalStore.testimonials.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  async getFaqs(): Promise<FAQ[]> {
    return globalStore.faqs.sort((a, b) => a.displayOrder - b.displayOrder);
  },

  // --- Enquiries ---
  async getEnquiries(statusFilter?: string, query?: string): Promise<Enquiry[]> {
    let list = [...globalStore.enquiries];
    if (statusFilter && statusFilter !== 'ALL') {
      list = list.filter(e => e.status === statusFilter);
    }
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(e => 
        e.fullName.toLowerCase().includes(q) || 
        e.email.toLowerCase().includes(q) || 
        e.referenceNumber.toLowerCase().includes(q) ||
        e.location.toLowerCase().includes(q)
      );
    }
    return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async getEnquiryById(id: string): Promise<Enquiry | null> {
    return globalStore.enquiries.find(e => e.id === id) || null;
  },

  async createEnquiry(data: {
    fullName: string;
    email: string;
    phone: string;
    eventType: Enquiry['eventType'];
    eventDate: string;
    readyByTime: string;
    location: string;
    guestsCount: number;
    serviceId?: string;
    aestheticNotes: string;
    budgetRange: string;
    referenceImageUrl?: string;
  }): Promise<Enquiry> {
    const referenceNumber = `AL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const matchedService = globalStore.services.find(s => s.id === data.serviceId);

    const newEnquiry: Enquiry = {
      id: `enq-${Date.now()}`,
      referenceNumber,
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      eventType: data.eventType,
      eventDate: data.eventDate,
      readyByTime: data.readyByTime,
      location: data.location,
      guestsCount: data.guestsCount,
      serviceId: data.serviceId,
      serviceTitle: matchedService?.title,
      aestheticNotes: data.aestheticNotes,
      budgetRange: data.budgetRange,
      referenceImageUrl: data.referenceImageUrl,
      status: 'NEW',
      internalNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    globalStore.enquiries.unshift(newEnquiry);
    return newEnquiry;
  },

  async updateEnquiryStatus(id: string, status: EnquiryStatus, internalNotes?: string): Promise<Enquiry | null> {
    const enq = globalStore.enquiries.find(e => e.id === id);
    if (!enq) return null;

    enq.status = status;
    if (internalNotes !== undefined) {
      enq.internalNotes = internalNotes;
    }
    enq.updatedAt = new Date().toISOString();
    return enq;
  },

  // --- Media Assets ---
  async getMediaAssets(): Promise<MediaAsset[]> {
    return globalStore.mediaAssets.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },

  async saveMediaAsset(asset: Omit<MediaAsset, 'id' | 'createdAt' | 'usageCount'>): Promise<MediaAsset> {
    const newAsset: MediaAsset = {
      ...asset,
      id: `med-${Date.now()}`,
      usageCount: 0,
      createdAt: new Date().toISOString(),
    };
    globalStore.mediaAssets.unshift(newAsset);
    return newAsset;
  }
};
