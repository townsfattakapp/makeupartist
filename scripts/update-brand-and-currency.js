const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

function loadEnv() {
  const envPath = path.join(__dirname, '..', '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf-8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const idx = trimmed.indexOf('=');
      if (idx > 0) {
        const key = trimmed.slice(0, idx).trim();
        let val = trimmed.slice(idx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
}

async function updateBrandAndCurrency() {
  loadEnv();
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.log('No DATABASE_URL found. Skipping remote database update.');
    return;
  }

  console.log('Connecting to Tiger Cloud database to update brand & currency...');
  const cleanConnectionString = connectionString.split('?')[0];
  const client = new Client({
    connectionString: cleanConnectionString,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    console.log('Connected to Tiger Cloud.');

    // Update site_settings
    await client.query(`
      UPDATE site_settings
      SET 
        studio_name = 'Kumkum Patel',
        artist_name = 'Kumkum Patel',
        tagline = 'Haute Bridal & Editorial Makeup Artistry',
        bio = 'Kumkum Patel is an internationally published luxury makeup artist specializing in hyper-refined glass skin, architectural soft-glam, and bespoke bridal beauty. With over a decade of dedicated artistry, Kumkum curates timeless, photography-flawless aesthetics honoring every skin tone with quiet elegance.',
        contact_email = 'concierge@kumkumpatel.com',
        phone = '+91 98765 43210',
        whatsapp = '+919876543210',
        instagram_handle = 'kumkumpatelmakeup',
        seo_title = 'Kumkum Patel | Luxury Haute Bridal & Editorial Makeup Artist',
        seo_description = 'Premier luxury bridal and editorial makeup artist specializing in glass-skin radiance, architectural soft-glam, and bespoke wedding beauty.'
    `);
    console.log('✓ Updated site_settings to Kumkum Patel.');

    // Update services to INR prices
    await client.query(`
      UPDATE services 
      SET price_indicative = '₹45,000'
      WHERE slug = 'haute-bridal-experience' OR title LIKE '%Bridal Signature%';

      UPDATE services 
      SET price_indicative = '₹12,000'
      WHERE slug = 'bridal-party-retinue' OR title LIKE '%Bridal Party%';

      UPDATE services 
      SET price_indicative = '₹22,000'
      WHERE slug = 'red-carpet-black-tie' OR title LIKE '%Red Carpet%';

      UPDATE services 
      SET price_indicative = '₹85,000'
      WHERE slug = 'editorial-commercial-production' OR title LIKE '%Editorial%';

      UPDATE services 
      SET price_indicative = '₹25,000'
      WHERE slug = 'private-masterclass-vanity-audit' OR title LIKE '%Masterclass%';
    `);
    console.log('✓ Updated service prices to Indian Rupee (₹).');

    // Update user emails if exist
    await client.query(`
      UPDATE users
      SET name = 'Kumkum Patel', email = 'kumkum@kumkumpatel.com'
      WHERE email = 'aurelia@aurelialuxe.com';
    `);
    console.log('✓ Updated owner user to Kumkum Patel.');

  } catch (err) {
    console.error('Error updating brand/currency in database:', err.message);
  } finally {
    await client.end();
  }
}

updateBrandAndCurrency();
