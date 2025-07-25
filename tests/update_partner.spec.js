// const { test, expect, describe } = require('@playwright/test');
// const { getAuthToken } = require('./authHelper.js');

// const BASE_URL = 'https://men4u.xyz/v2/admin';

// describe('Partner API', () => {
//   test('Update partner via API', async ({ request }) => {
//     // Generate unique values for test run
//     const unique = Date.now();
//     const partnerPayload = {
//       name: 'rahil kadam',
//       mobile: `87${unique.toString().slice(-8)}`,
//       email: `rahil${unique}@gmail.com`,
//       dob: '05 Mar 1999',
//       aadhar_number: `${unique}${Math.floor(Math.random() * 1000)}`.slice(0,12),
//       address: 'Pune',
//       functionality_ids: [50, 33, 25, 24, 21],
//       app_source: 'admin_app',
//       user_id: 1,
//     };

//     // Attach request body to Playwright report
//     await test.info().attach('Update Partner Request', {
//       body: JSON.stringify(partnerPayload, null, 2),
//       contentType: 'application/json',
//     });

//     // Get auth token using helper
//     const token = await getAuthToken(request);

//     // Make the create_partner API call
//     const userId = partnerPayload.user_id; // or the actual user/partner ID you want to update
//     const response = await request.post(`${BASE_URL}/update_partner`, {
//       data: partnerPayload,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     // Assert status code is 200 or 201, else log error
//     if (![200, 201].includes(response.status())) {
//       const errorBody = await response.text();
//       await test.info().attach('Update Partner Error', {
//         body: errorBody,
//         contentType: 'application/json',
//       });
//       throw new Error(`Update Partner failed: Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
//     }

//     // Attach response body to Playwright report
//     const responseBody = await response.json();

//     // Print response body to terminal
//     console.log('Update Partner Response:', JSON.stringify(responseBody, null, 2));

//     // Attach response body to Playwright report
//     await test.info().attach('Update Partner Response', {
//       body: JSON.stringify(responseBody, null, 2),
//       contentType: 'application/json',
//     });
//   });

//   test('Patch partner via API', async ({ request }) => {
//     // Generate unique values for test run
//     const unique = Date.now();
//     const patchPayload = {
//       user_id: 1, // or the actual user/partner ID you want to update
//       address: 'Mumbai', // Example: only updating the address
//     };

//     // Attach request body to Playwright report
//     await test.info().attach('Patch Partner Request', {
//       body: JSON.stringify(patchPayload, null, 2),
//       contentType: 'application/json',
//     });

//     // Get auth token using helper
//     const token = await getAuthToken(request);

//     // Make the PATCH API call
//     const response = await request.patch(`${BASE_URL}/update_partner`, {
//       data: patchPayload,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     // Assert status code is 200 or 201, else log error
//     if (![200, 201].includes(response.status())) {
//       const errorBody = await response.text();
//       await test.info().attach('Patch Partner Error', {
//         body: errorBody,
//         contentType: 'application/json',
//       });
//       throw new Error(`Patch Partner failed: Expected status 200 or 201, got ${response.status()} with body: ${errorBody}`);
//     }

//     // Attach response body to Playwright report
//     const responseBody = await response.json();

//     // Print response body to terminal
//     console.log('Patch Partner Response:', JSON.stringify(responseBody, null, 2));

//     // Attach response body to Playwright report
//     await test.info().attach('Patch Partner Response', {
//       body: JSON.stringify(responseBody, null, 2),
//       contentType: 'application/json',
//     });
//   });
// });
