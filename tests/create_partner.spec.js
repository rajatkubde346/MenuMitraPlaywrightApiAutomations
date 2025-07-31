// const { test, expect, describe } = require('@playwright/test');
// const { getAuthToken } = require('./authHelper.js');

// const BASE_URL = 'https://men4u.xyz/v2/admin';

// describe('Partner API', () => {
//   test('Create partner via API', async ({ request }) => {
//     // Generate unique values for test run
//     const unique = Date.now();
//     const partnerPayload = {
//       name: 'rahil',
//       mobile: `87${unique.toString().slice(-8)}`,
//       email: `rahil${unique}@gmail.com`,
//       dob: '05 Mar 1998',
//       aadhar_number: `${unique}${Math.floor(Math.random() * 1000)}`.slice(0,12),
//       address: 'Pune',
//       functionality_ids: [50, 33, 25, 24, 21],
//       app_source: 'admin_app',
//       user_id: 1,
//     };

//     // Attach request body to Playwright report
//     await test.info().attach('Create Partner Request', {
//       body: JSON.stringify(partnerPayload, null, 2),
//       contentType: 'application/json',
//     });

//     // Get auth token using helper
//     const token = await getAuthToken(request);

//     // Make the create_partner API call
//     const response = await request.post(`${BASE_URL}/create_partner`, {
//       data: partnerPayload,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     // Assert status code is 200 or 201, else log error
//     if (![200, 201].includes(response.status())) {
//       const errorBody = await response.text();
//       await test.info().attach('Create Partner Error', {
//         body: errorBody,
//         contentType: 'application/json',
//       });
//       throw new Error(`Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
//     }

//     // Attach response body to Playwright report
//     const responseBody = await response.json();

//     // Print response body to terminal
//     console.log('Create Partner Response:', JSON.stringify(responseBody, null, 2));

//     // Attach response body to Playwright report
//     await test.info().attach('Create Partner Response', {
//       body: JSON.stringify(responseBody, null, 2),
//       contentType: 'application/json',
//     });
//   });
// });
