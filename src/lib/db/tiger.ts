import { Pool } from 'pg';

let pool: Pool | null = null;

export function getTigerPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  if (!pool) {
    const cleanConnectionString = connectionString.split('?')[0];
    pool = new Pool({
      connectionString: cleanConnectionString,
      ssl: {
        rejectUnauthorized: false, // Required for Tiger Cloud / Timescale cloud SSL
      },
      max: 10, // Recommended pool size for serverless connection pooling
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.error('Unexpected Tiger Cloud PG Pool error:', err);
    });
  }

  return pool;
}

export async function isTigerDbConnected(): Promise<boolean> {
  const p = getTigerPool();
  if (!p) return false;
  try {
    const client = await p.connect();
    const res = await client.query('SELECT 1');
    client.release();
    return res.rowCount === 1;
  } catch (err) {
    console.warn('Tiger Cloud connection check failed, using persistent storage fallback:', err);
    return false;
  }
}
