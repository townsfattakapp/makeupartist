-- Tiger Cloud (PostgreSQL) Initial Schema for Aurelia Luxe Luxury Makeup Artistry

-- 1. Create Enums if they do not exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('OWNER', 'EDITOR');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE look_status AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE enquiry_status AS ENUM ('NEW', 'CONTACTED', 'QUOTED', 'CONFIRMED', 'COMPLETED', 'CLOSED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Users Table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role user_role DEFAULT 'EDITOR',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    studio_name VARCHAR(255) NOT NULL DEFAULT 'Aurelia Luxe',
    tagline VARCHAR(255) DEFAULT 'Editorial & Haute Bridal Artistry',
    artist_name VARCHAR(255) DEFAULT 'Aurelia Vance',
    bio TEXT,
    contact_email VARCHAR(255) DEFAULT 'concierge@aurelialuxe.com',
    phone VARCHAR(50) DEFAULT '+44 (0) 20 7946 0912',
    whatsapp VARCHAR(50) DEFAULT '+447946091200',
    instagram_handle VARCHAR(100) DEFAULT '@aurelialuxemakeup',
    service_areas TEXT[] DEFAULT ARRAY['London Mayfair', 'Chelsea', 'The Cotswolds', 'Paris', 'Lake Como'],
    response_time_hours INT DEFAULT 24,
    seo_title VARCHAR(255),
    seo_description TEXT,
    hero_video_url TEXT,
    hero_image_url TEXT,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Portfolio Categories
CREATE TABLE IF NOT EXISTS portfolio_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    display_order INT DEFAULT 0
);

-- 5. Services Table
CREATE TABLE IF NOT EXISTS services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category VARCHAR(100) NOT NULL,
    short_description TEXT NOT NULL,
    full_description TEXT NOT NULL,
    price_indicative VARCHAR(100) NOT NULL,
    price_type VARCHAR(50) DEFAULT 'STARTING_AT',
    duration_minutes INT DEFAULT 90,
    inclusions TEXT[] DEFAULT ARRAY[]::TEXT[],
    preparation_guide TEXT,
    travel_policy TEXT,
    image_url TEXT NOT NULL,
    is_featured BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Portfolio Looks
CREATE TABLE IF NOT EXISTS portfolio_looks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    category_id UUID REFERENCES portfolio_categories(id) ON DELETE SET NULL,
    excerpt TEXT,
    description TEXT,
    client_type VARCHAR(100) DEFAULT 'Bridal',
    finish_type VARCHAR(100) DEFAULT 'Glass Skin',
    skin_tone_description TEXT,
    primary_image_url TEXT NOT NULL,
    gallery_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    before_image_url TEXT,
    after_image_url TEXT,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    is_featured BOOLEAN DEFAULT false,
    status look_status DEFAULT 'PUBLISHED',
    display_order INT DEFAULT 0,
    products_used TEXT[] DEFAULT ARRAY[]::TEXT[],
    key_techniques TEXT[] DEFAULT ARRAY[]::TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Enquiries
CREATE TABLE IF NOT EXISTS enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reference_number VARCHAR(32) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    event_date DATE NOT NULL,
    ready_by_time VARCHAR(50),
    location VARCHAR(255) NOT NULL,
    guests_count INT DEFAULT 1,
    service_id UUID REFERENCES services(id) ON DELETE SET NULL,
    aesthetic_notes TEXT,
    budget_range VARCHAR(100),
    reference_image_url TEXT,
    status enquiry_status DEFAULT 'NEW',
    internal_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Enquiry Status History
CREATE TABLE IF NOT EXISTS enquiry_status_history (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    enquiry_id UUID NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
    previous_status enquiry_status NOT NULL,
    new_status enquiry_status NOT NULL,
    note TEXT,
    changed_by VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 9. Instagram Posts
CREATE TABLE IF NOT EXISTS instagram_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    media_url TEXT NOT NULL,
    media_type VARCHAR(50) DEFAULT 'IMAGE',
    caption TEXT,
    permalink TEXT,
    likes_count INT,
    is_featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    consent_obtained BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 10. Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name VARCHAR(255) NOT NULL,
    event_type VARCHAR(100) NOT NULL,
    quote TEXT NOT NULL,
    location VARCHAR(100),
    rating INT DEFAULT 5,
    is_featured BOOLEAN DEFAULT true,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 11. FAQs
CREATE TABLE IF NOT EXISTS faqs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    question VARCHAR(500) NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 12. Media Assets
CREATE TABLE IF NOT EXISTS media_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    filename VARCHAR(255) NOT NULL,
    file_url TEXT NOT NULL,
    file_size INT DEFAULT 0,
    mime_type VARCHAR(100),
    alt_text TEXT,
    focal_point_x FLOAT DEFAULT 0.5,
    focal_point_y FLOAT DEFAULT 0.5,
    usage_count INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 13. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_looks_status ON portfolio_looks(status);
CREATE INDEX IF NOT EXISTS idx_looks_category ON portfolio_looks(category_id);
CREATE INDEX IF NOT EXISTS idx_looks_featured ON portfolio_looks(is_featured);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_enquiries_date ON enquiries(event_date);
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
