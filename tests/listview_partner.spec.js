// const { test, describe, expect } = require('@playwright/test');
// const { getAuthToken } = require('./authHelper.js');

// const BASE_URL = 'https://men4u.xyz/v2/admin';

// describe('Owner API', () => {
//   test('List view partner via API', async ({ request }) => {
//     // Generate unique values for test run
//     const unique = Date.now();
    
//     // Get auth token using helper
//     const token = await getAuthToken(request);

//     // Make the listview_partner API call
//     const response = await request.get(`${BASE_URL}/listview_partner/512`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     // Log status code and response body for debugging
//     const status = response.status();
//     const responseBody = await response.json();
//     console.log('Status:', status);
//     console.log('Response:', JSON.stringify(responseBody, null, 2));

//     // Assert status code is 200 or 201, else log the response for debugging
//     if (status === 404) {
//       throw new Error(`Endpoint not found (404). Check if the URL is correct and the server is running. Response: ${JSON.stringify(responseBody)}`);
//     }
//     expect([200, 201]).toContain(status);

//     // Attach response body to Playwright report
//     await test.info().attach('List View Partner Response', {
//       body: JSON.stringify(responseBody, null, 2),
//       contentType: 'application/json',
//     });
//   });
// });
