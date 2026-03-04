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

  if (req.method === 'POST') {
    try {
      const orderData = req.body;
      
      const { data, error } = await supabase
        .from('orders')
        .insert([{
          ...orderData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) throw error;

      return res.status(201).set(corsHeaders).json({ data });
    } catch (error) {
      return res.status(500).set(corsHeaders).json({ error: error.message });
    }
  }

  return res.status(405).set(corsHeaders).json({ error: 'Method not allowed' });
};