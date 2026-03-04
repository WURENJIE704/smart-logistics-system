const supabase = require('./supabaseClient');

module.exports = async (req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return res.status(200).set(corsHeaders).json({ data });
  } catch (error) {
    return res.status(500).set(corsHeaders).json({ error: error.message });
  }
};