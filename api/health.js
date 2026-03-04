module.exports = async (req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  const envInfo = {
    supabaseUrl: process.env.SUPABASE_URL ? '✅ Configured' : '❌ Missing',
    supabaseKey: process.env.SUPABASE_ANON_KEY ? '✅ Configured' : '❌ Missing',
    timestamp: new Date().toISOString()
  };

  return res.status(200).set(corsHeaders).json({
    status: 'ok',
    message: 'API is running',
    environment: envInfo
  });
};