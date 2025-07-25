// import { test, expect } from '@playwright/test';

// const BASE_URL = 'https://men4u.xyz/v2/common';
// const MOBILE = '7878787878';
// const OTP = '1234'; // Replace with actual OTP for a real test
// const APP_TYPE = 'partner';
// const FCM_TOKEN = '457896354789';
// const DEVICE_ID = '8888888888';
// const DEVICE_MODEL = 'Laptop 122';

// test('API login, verify OTP, and access protected endpoint', async ({ request }) => {
//   // Prepare request data
//   const requestData = {
//     mobile: MOBILE,
//     otp: OTP,
//     app_type: APP_TYPE,
//     fcm_token: FCM_TOKEN,
//     device_id: DEVICE_ID,
//     device_model: DEVICE_MODEL,
//   };

//   // Step 1: Login - Send OTP
//   const loginRes = await request.post(`${BASE_URL}/verify_otp`, {
//     data: requestData,
//   });

//   // Assert status code is 200
//   expect(loginRes.status(), `Expected status 200 but got ${loginRes.status()}: ${await loginRes.text()}`).toBe(200);

//   // Get response body as text
//   const responseBody = await loginRes.text();

//   // Log request and response in terminal
//   console.log('API Request:', JSON.stringify(requestData, null, 2));
//   console.log('API Response:', responseBody);

//   // Attach request to Allure report
//   await test.info().attach('API Request', {
//     body: JSON.stringify({
//       url: `${BASE_URL}/login`,
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: requestData
//     }, null, 2),
//     contentType: 'application/json'
//   });

//   // Attach response to Allure report
//   await test.info().attach('API Response', {
//     body: responseBody,
//     contentType: 'application/json'
//   });

//   // ... continue with further steps
// });
