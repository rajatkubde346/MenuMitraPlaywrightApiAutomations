// tests/authHelper.js
const COMMON_BASE_URL = 'https://men4u.xyz/v2/admin';

async function getAuthToken(request, {
  mobile = '7676766767',
  otp = '1234',
  app_type = 'admin',
  fcm_token = '457896354789',
  device_id = '8888888888',
  device_model = 'Laptop 122'
} = {}) {
  // Step 1: Login - Send OTP (admin only)
  const loginRes = await request.post(`${COMMON_BASE_URL}/admin_login`, {
    data: { mobile, app_type }
  });

  const loginBody = await loginRes.json();
  let otpAppType = app_type;
  if (loginBody.role === 'admin') otpAppType = 'admin';

  // Step 2: Verify OTP via /admin/admin_verify_otp only
  const otpPayload = {
    mobile,
    otp,
    app_type: otpAppType,
    fcm_token,
    device_id,
    device_model,
  };

  const adminOtpRes = await request.post(`${COMMON_BASE_URL}/admin_verify_otp`, {
    data: otpPayload,
  });

  if (adminOtpRes.status() === 200 || adminOtpRes.status() === 201) {
    const adminOtpBody = await adminOtpRes.json();
    const token = adminOtpBody.access_token || adminOtpBody.token || adminOtpBody.data?.access_token;
    if (!token) throw new Error('No access_token found in admin OTP verification response');
    return token;
  } else {
    const errorText = await adminOtpRes.text();
    throw new Error(`Admin OTP verification failed: status ${adminOtpRes.status()} - ${errorText}`);
  }
}

async function apiCallWithStatusCheck(request, method, url, options) {
  const response = await request[method](url, options);
  if (response.status() !== 200) {
    throw new Error(`API call to ${url} failed with status ${response.status()}`);
  }
  return response;
}

module.exports = { getAuthToken };