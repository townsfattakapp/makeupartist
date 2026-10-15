const { Pool } = require('pg');

async function main() {
  const pool = new Pool({
    connectionString: 'postgres://tsdbadmin:g2dwtjbi0uftrw56@get7gdlgjy.cag5uzdd2j.tsdb.cloud.timescale.com:33118/tsdb',
    ssl: { rejectUnauthorized: false }
  });

  const res = await pool.query(
    "UPDATE site_settings SET hero_video_url = $1, hero_image_url = $2",
    ['/assets/DulhanTrendz_pindown.io_1792068541.mp4', '/assets/8cefb0245c79153f745fc34d21844435.jpg']
  );
  console.log('Updated rows:', res.rowCount);
  await pool.end();
}

main().catch(console.error);
