const { test, describe, expect } = require('@playwright/test');
const { getAuthToken } = require('./authCommonHelper.js');

const BASE_URL = 'https://men4u.xyz/v2/common';

describe('Admin Menu API', () => {
  test('Create menu with specific payload via API', async ({ request }) => {
    const menuPayload = {
      outlet_id: "535",
      menu_cat_id: "917",
      user_id: 1,
      name: "Dosa",
      food_type: "veg",
      description: "",
      spicy_index: "1",
      ingredients: "",
      offer: "0",
      app_source: "admin_app",
      portion_data: [
        {
          portion_name: "Full",
          price: 150,
          unit_value: "150",
          unit_type: "gm",
          flag: 1
        }
      ],
      images: []
    };

    // Attach request body to Playwright report
    await test.info().attach('Create Menu Request (Specific Payload)', {
      body: JSON.stringify(menuPayload, null, 2),
      contentType: 'application/json',
    });

    // Get auth token using a static admin mobile (must exist in DB)
    const adminToken = await getAuthToken(request, { mobile: '8787987898' });

    // Make the menu_create API call with admin token
    const response = await request.post(`${BASE_URL}/menu_create`, {
      data: menuPayload,
      headers: {
        Authorization: `Bearer ${adminToken}`,
        'Content-Type': 'application/json',
      },
    });

    // Attach response body to Playwright report
    const responseBody = await response.json();

    // Print response body to terminal
    console.log('Create Menu Response (Specific Payload):', JSON.stringify(responseBody, null, 2));

    // Assert status code is 200 or 201, else log error
    try {
      expect([200, 201]).toContain(response.status());
    } catch (error) {
      console.error('Unexpected status:', response.status(), responseBody);
      throw error;
    }

    // Attach response body to Playwright report
    await test.info().attach('Create Menu Response (Specific Payload)', {
      body: JSON.stringify(responseBody, null, 2),
      contentType: 'application/json',
    });
  });
});
