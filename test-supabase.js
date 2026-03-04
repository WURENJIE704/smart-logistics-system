const { createClient } = require('@supabase/supabase-js');

require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

console.log('🔍 测试 Supabase 连接...\n');
console.log('URL:', supabaseUrl ? '✅ 已配置' : '❌ 未配置');
console.log('Key:', supabaseKey ? '✅ 已配置' : '❌ 未配置\n');

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ 环境变量未正确配置');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  try {
    console.log('📡 测试数据库连接...');
    
    const { data, error } = await supabase
      .from('warehouses')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ 连接失败:', error.message);
      process.exit(1);
    }
    
    console.log('✅ 数据库连接成功！\n');
    
    console.log('📦 测试查询仓库数据...');
    const { data: warehouses, error: warehouseError } = await supabase
      .from('warehouses')
      .select('*');
    
    if (warehouseError) {
      console.error('❌ 查询失败:', warehouseError.message);
    } else {
      console.log(`✅ 找到 ${warehouses.length} 个仓库:`);
      warehouses.forEach(wh => {
        console.log(`   - ${wh.name} (${wh.address})`);
      });
    }
    
    console.log('\n👥 测试查询用户数据...');
    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*');
    
    if (userError) {
      console.error('❌ 查询失败:', userError.message);
    } else {
      console.log(`✅ 找到 ${users.length} 个用户:`);
      users.forEach(user => {
        console.log(`   - ${user.username} (${user.role})`);
      });
    }
    
    console.log('\n🎉 所有测试通过！Supabase 配置正确！');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    process.exit(1);
  }
}

testConnection();