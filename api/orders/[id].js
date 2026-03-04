const supabase = require('../supabaseClient');

module.exports = async (req, res) => {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  };

  if (req.method === 'OPTIONS') {
    return res.status(200).set(corsHeaders).end();
  }

  const { id } = req.query;

  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return res.status(200).set(corsHeaders).json({ data });
  } catch (error) {
    return res.status(500).set(corsHeaders).json({ error: error.message });
  }
};