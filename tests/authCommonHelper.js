// tests/authHelper.js
const COMMON_BASE_URL_COMMON = 'https://men4u.xyz/v2/common';

// In-memory cache to track login per mobile number
const loginCache = {};

async function getAuthToken(request, {
  mobile = '8787987898',
  otp = '1234',
  app_type = 'owner', // Changed default to 'user' or remove if not needed
  fcm_token = '457896354789',
  device_id = '8888888888',
  device_model = 'Laptop 122'
} = {}) {
  // Step 1: Login - Send OTP (only if not already done for this mobile)
  if (!loginCache[mobile]) {
    const loginResCommon = await request.post(`${COMMON_BASE_URL_COMMON}/login`, {
      data: { mobile, app_type }
    });
    // Optionally, check loginResCommon.status() here
    loginCache[mobile] = true;
  }

  // Step 2: Verify OTP (use /common/verify_otp)
  const otpPayload = {
    mobile,
    otp,
    app_type,
    fcm_token,
    device_id,
    device_model,
  };
  const otpRes = await request.post(`${COMMON_BASE_URL_COMMON}/verify_otp`, {
    data: otpPayload,
  });

  if (otpRes.status() !== 200 && otpRes.status() !== 201) {
    const errorText = await otpRes.text();
    throw new Error(`OTP verification failed: status ${otpRes.status()} - ${errorText}`);
  }

  const otpResponseBody = await otpRes.json();
  const token = otpResponseBody.access_token || otpResponseBody.token || otpResponseBody.data?.access_token;

  if (!token) throw new Error('No access_token found in OTP verification response');
  return token;
}

async function apiCallWithStatusCheck(request, method, url, options) {
  const response = await request[method](url, options);
  if (response.status() !== 200) {
    throw new Error(`API call to ${url} failed with status ${response.status()}`);
  }
  return response;
}

module.exports = { getAuthToken };