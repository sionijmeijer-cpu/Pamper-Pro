/**
 * Quick test to verify SendGrid configuration
 */
function testSendGridConfig() {
  console.log('\n=== SendGrid Configuration Test ===\n');
  
  const apiKey = process.env.SENDGRID_API_KEY;
  const emailFrom = process.env.EMAIL_FROM;
  
  console.log('SENDGRID_API_KEY set:', !!apiKey);
  if (apiKey) {
    console.log('SENDGRID_API_KEY length:', apiKey.length);
    console.log('SENDGRID_API_KEY prefix:', apiKey.substring(0, 10) + '...');
  }
  
  console.log('EMAIL_FROM:', emailFrom || 'NOT SET (will use default)');
  console.log('\nEnvironment variables containing "SEND" or "EMAIL":');
  Object.keys(process.env).forEach(key => {
    if (key.toUpperCase().includes('SEND') || key.toUpperCase().includes('EMAIL')) {
      console.log(`  ${key}: [SET]`);
    }
  });
  
  return {
    hasApiKey: !!apiKey,
    hasEmailFrom: !!emailFrom,
    apiKeyLength: apiKey ? apiKey.length : 0
  };
}

module.exports = { testSendGridConfig };
