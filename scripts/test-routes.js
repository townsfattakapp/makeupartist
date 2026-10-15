const http = require('http');

const routes = [
  '/',
  '/portfolio',
  '/portfolio/mayfair-glass-skin-bride',
  '/services',
  '/services/haute-bridal-experience',
  '/about',
  '/enquire',
  '/contact',
  '/privacy',
  '/terms',
  '/admin/login',
  '/api/looks',
  '/api/services',
  '/api/instagram',
  '/api/settings',
];

async function checkRoute(route) {
  return new Promise((resolve) => {
    http.get(`http://localhost:3000${route}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        resolve({
          route,
          status: res.statusCode,
          passed: res.statusCode >= 200 && res.statusCode < 400,
          length: data.length,
        });
      });
    }).on('error', (err) => {
      resolve({ route, status: 500, passed: false, error: err.message });
    });
  });
}

async function testApiEnquiry() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      fullName: 'Lady Genevieve Test',
      email: 'genevieve.test@mayfair.co.uk',
      phone: '+44 7700 900142',
      eventType: 'Haute Bridal',
      eventDate: '2026-09-20',
      readyByTime: '12:00 PM',
      location: 'The Ritz, London',
      guestsCount: 4,
      aestheticNotes: 'Testing automated enquiry submission flow',
      budgetRange: '£1,500 - £3,000',
    });

    const req = http.request(
      'http://localhost:3000/api/enquiries',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            body: JSON.parse(body),
          });
        });
      }
    );

    req.on('error', (err) => resolve({ status: 500, error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function testLogin() {
  return new Promise((resolve) => {
    const postData = JSON.stringify({
      email: 'aurelia@aurelialuxe.com',
      password: 'LuxeOwner2026!',
    });

    const req = http.request(
      'http://localhost:3000/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (c) => (body += c));
        res.on('end', () => {
          resolve({
            status: res.statusCode,
            cookie: res.headers['set-cookie'],
            body: JSON.parse(body),
          });
        });
      }
    );

    req.on('error', (err) => resolve({ status: 500, error: err.message }));
    req.write(postData);
    req.end();
  });
}

async function runTests() {
  console.log('--- TESTING ALL APPLICATION ROUTES ---');
  for (const r of routes) {
    const res = await checkRoute(r);
    console.log(`${res.passed ? '✓ [PASS]' : '✗ [FAIL]'} ${r.padEnd(36)} HTTP ${res.status} (${res.length} bytes)`);
  }

  console.log('\n--- TESTING ENQUIRY SUBMISSION API ---');
  const enqRes = await testApiEnquiry();
  console.log(`Enquiry POST response: HTTP ${enqRes.status}`);
  if (enqRes.body && enqRes.body.enquiry) {
    console.log(`✓ Enquiry created successfully! Ref: ${enqRes.body.enquiry.referenceNumber}`);
  } else {
    console.log('✗ Failed to create enquiry:', enqRes.body);
  }

  console.log('\n--- TESTING OWNER AUTHENTICATION API ---');
  const loginRes = await testLogin();
  console.log(`Login POST response: HTTP ${loginRes.status}`);
  if (loginRes.body && loginRes.body.success) {
    console.log(`✓ Authenticated as ${loginRes.body.user.name} (${loginRes.body.user.role})`);
    console.log(`✓ Session Cookie set: ${loginRes.cookie ? 'YES' : 'NO'}`);
  } else {
    console.log('✗ Authentication failed:', loginRes.body);
  }
}

runTests();
