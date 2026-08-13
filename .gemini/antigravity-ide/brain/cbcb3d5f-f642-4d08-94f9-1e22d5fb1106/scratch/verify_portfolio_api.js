const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    const options = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };
    
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        try {
          const json = data ? JSON.parse(data) : {};
          resolve({ status: res.statusCode, data: json });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('Starting Portfolio API Verification Tests...');
  
  try {
    // 1. GET /api/portfolio - Retrieve existing records
    console.log('\n--- Test 1: GET /api/portfolio ---');
    const getRes = await request('GET', '/api/portfolio');
    console.log(`Status: ${getRes.status}`);
    if (getRes.status !== 200) {
      console.error('Failed to get portfolio items:', getRes.data || getRes.raw);
      process.exit(1);
    }
    console.log(`Retrieved ${getRes.data.length} portfolio items.`);
    
    // 2. POST /api/portfolio - Add a new item
    console.log('\n--- Test 2: POST /api/portfolio ---');
    const newItem = {
      image_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      title: 'Engagement Photoshoot',
      category: 'Engagement',
      description: 'Sony FE 50mm f/1.2 GM with Golden Hour Natural Light',
      event_type: 'Candid',
      location: 'Chennai'
    };
    const postRes = await request('POST', '/api/portfolio', newItem);
    console.log(`Status: ${postRes.status}`);
    console.log('Created item:', postRes.data);
    if (postRes.status !== 201 || !postRes.data.success) {
      console.error('Failed to create portfolio item');
      process.exit(1);
    }
    const createdId = postRes.data.item.id;
    
    // 3. GET /api/portfolio - Verify item is returned in the list
    console.log('\n--- Test 3: GET /api/portfolio (Verify creation) ---');
    const getRes2 = await request('GET', '/api/portfolio');
    console.log(`Status: ${getRes2.status}`);
    const found = getRes2.data.find(item => item.id === createdId);
    console.log(`Uploaded item found in list? ${found ? 'YES' : 'NO'}`);
    if (found) {
      console.log('Verified item details:', found);
    } else {
      console.error('Created item was not returned in GET request!');
      process.exit(1);
    }
    
    console.log('\nAll Portfolio API Verification Tests Passed Successfully!');
  } catch (error) {
    console.error('Error running verification tests:', error);
    process.exit(1);
  }
}

runTests();
