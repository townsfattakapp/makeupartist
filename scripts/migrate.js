const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Load environment variables from .env.local if not already in process.env
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

async function runMigration() {
  loadEnv();
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    console.log('⚠️  DATABASE_URL environment variable is not defined.');
    console.log('To run migrations against Tiger Cloud, supply a valid connection URI in .env.local:');
    console.log('Example: DATABASE_URL="postgres://tsdbadmin:password@ts-xxxx.cloud.tigerdata.com:33118/tsdb?sslmode=require"');
    return;
  }

  console.log('📡 Connecting to Tiger Cloud PostgreSQL database...');
  const cleanConnectionString = connectionString.split('?')[0];
  const client = new Client({
    connectionString: cleanConnectionString,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    console.log('✓ Successfully connected to Tiger Cloud database.');

    const sqlFilePath = path.join(__dirname, '..', 'migrations', '001_init.sql');
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');

    console.log('🚀 Executing schema migration (tables, types, constraints, indexes)...');
    await client.query(sql);
    console.log('✓ Tiger Cloud schema migrations applied successfully!');

    // Check if initial users exist, if not seed default demo users and site settings
    const userCheck = await client.query('SELECT COUNT(*) FROM users');
    if (parseInt(userCheck.rows[0].count) === 0) {
      console.log('🌱 Seeding initial studio users and site settings...');
      const secret = process.env.AUTH_SECRET || 'aurelia_luxe_secure_jwt_secret_key_2026';
      const ownerHash = crypto.createHmac('sha256', secret).update('LuxeOwner2026!').digest('hex');
      const editorHash = crypto.createHmac('sha256', secret).update('LuxeStudio2026!').digest('hex');

      await client.query(
        `INSERT INTO users (email, password_hash, name, role) VALUES 
         ('aurelia@aurelialuxe.com', $1, 'Aurelia Vance', 'OWNER'),
         ('assistant@aurelialuxe.com', $2, 'Clara Delacroix', 'EDITOR')`,
        [ownerHash, editorHash]
      );
      console.log('✓ Seeded Owner and Editor users.');

      await client.query(
        `INSERT INTO site_settings (studio_name, tagline, artist_name, bio, contact_email, phone, whatsapp, instagram_handle, service_areas, response_time_hours, seo_title, seo_description)
         VALUES (
           'Aurelia Luxe',
           'Editorial & Haute Bridal Artistry',
           'Aurelia Vance',
           'Aurelia Vance is an internationally published luxury makeup artist specializing in hyper-refined glass skin, architectural soft-glam, and bespoke bridal beauty.',
           'concierge@aurelialuxe.com',
           '+44 (0) 20 7946 0912',
           '+447946091200',
           'aurelialuxemakeup',
           ARRAY['London Mayfair', 'Chelsea', 'The Cotswolds', 'Paris', 'Lake Como'],
           24,
           'Aurelia Luxe | Luxury Haute Bridal & Editorial Makeup Artist London',
           'Premier luxury bridal and editorial makeup artist in London and global destinations. Unrivaled glass-skin finishes, tailored bridal luxury, and red-carpet aesthetics.'
         )`
      );
      console.log('✓ Seeded Studio Site Settings.');
    } else {
      console.log('ℹ️  Existing records found in Tiger Cloud database. Seed preserved.');
    }

    console.log('\n✨ Database is fully prepared for production!');
  } catch (err) {
    console.error('❌ Migration failed:', err.message);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
}

runMigration();
