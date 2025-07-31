const { test, describe, expect } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common';

const menuPayloads = [
  {
    title: 'Provided Payload',
    payload: {
      outlet_id: "598",
      user_id: "1036",
      menu_cat_id: "1135",
      name: "89898",
      food_type: "veg",
      description: "",
      spicy_index: "",
      portion_data: [
        {
          portion_name: "Regular",
          price: 140,
          unit_value: "",
          unit_type: "",
          flag: 1
        }
      ],
      ingredients: "",
      offer: "0",
      rating: "0.0",
      app_source: "pos_app",
      images: [],
      is_special: false
    }
  }
];

describe('Admin Menu API', () => {
  for (const { title, payload } of menuPayloads) {
    test(`Create menu with ${title} via API`, async ({ request }) => {
      // Attach request body to Playwright report
      await test.info().attach(`Create Menu Request (${title})`, {
        body: JSON.stringify(payload, null, 2),
        contentType: 'application/json',
      });

      // Get auth token using a static admin mobile (must exist in DB)
      const adminToken = await getAuthToken(request, { mobile: '8787987898' });

      // Record start time
      const startTime = Date.now();

      // Make the menu_create API call with admin token
      const response = await request.post(`${BASE_URL}/menu_create`, {
        data: payload,
        headers: {
          Authorization: `Bearer ${adminToken}`,
          'Content-Type': 'application/json',
        },
      });

      // Record end time and calculate response time
      const endTime = Date.now();
      const responseTimeMs = endTime - startTime;

      // Log response time
      console.log(`Response time for ${title}: ${responseTimeMs} ms`);

      // Attach response time to Playwright report
      await test.info().attach(`Response Time (${title})`, {
        body: `${responseTimeMs} ms`,
        contentType: 'text/plain',
      });

      // Attach response body to Playwright report
      const responseBody = await response.json();

      // Print response body to terminal
      console.log(`Create Menu Response (${title}):`, JSON.stringify(responseBody, null, 2));

      // Assert status code is 200 or 201, else log error
      try {
        expect([200, 201]).toContain(response.status());
      } catch (error) {
        console.error('Unexpected status:', response.status(), responseBody);
        // Optionally attach response only on failure
        await test.info().attach(`Create Menu Response (${title}) [FAILURE]`, {
          body: JSON.stringify(responseBody, null, 2),
          contentType: 'application/json',
        });
        throw error;
      }

      // Attach response body to Playwright report (on success)
      await test.info().attach(`Create Menu Response (${title})`, {
        body: JSON.stringify(responseBody, null, 2),
        contentType: 'application/json',
      });
    });
  }

  test('Create 200 menus via API', async ({ request }) => {
    const adminToken = await getAuthToken(request, { mobile: '8787987898' });

    const menuPayloads = Array.from({ length: 200 }, (_, i) => ({
      outlet_id: "598",
      user_id: "1036",
      menu_cat_id: "1135",
      name: `Menu_${i + 1}`,
      food_type: "veg",
      description: "",
      spicy_index: "",
      portion_data: [
        {
          portion_name: "Regular",
          price: 140,
          unit_value: "",
          unit_type: "",
          flag: 1
        }
      ],
      ingredients: "",
      offer: "0",
      rating: "0.0",
      app_source: "pos_app",
      images: [],
      is_special: false
    }));

    // Batch size (adjust as needed)
    const BATCH_SIZE = 10;
    for (let i = 0; i < menuPayloads.length; i += BATCH_SIZE) {
      const batch = menuPayloads.slice(i, i + BATCH_SIZE);
      const responses = await Promise.all(
        batch.map(payload =>
          request.post(`${BASE_URL}/menu_create`, {
            data: payload,
            headers: {
              Authorization: `Bearer ${adminToken}`,
              'Content-Type': 'application/json',
            },
          })
        )
      );
      for (let j = 0; j < responses.length; j++) {
        const response = responses[j];
        const responseBody = await response.json();
        console.log(`Menu ${i + j + 1} response:`, response.status(), responseBody);
        expect([200, 201]).toContain(response.status());
      }
    }
  });
});
