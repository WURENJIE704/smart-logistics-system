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

  if (req.method === 'PUT') {
    try {
      const updateData = req.body;
      
      const { data, error } = await supabase
        .from('orders')
        .update({
          ...updateData,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return res.status(200).set(corsHeaders).json({ data });
    } catch (error) {
      return res.status(500).set(corsHeaders).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return res.status(200).set(corsHeaders).json({ message: 'Order deleted successfully' });
    } catch (error) {
      return res.status(500).set(corsHeaders).json({ error: error.message });
    }
  }

  return res.status(405).set(corsHeaders).json({ error: 'Method not allowed' });
};