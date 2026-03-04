-- 订单表
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(100) NOT NULL,
  customer_phone VARCHAR(20),
  customer_address TEXT,
  product_name VARCHAR(200) NOT NULL,
  quantity INTEGER DEFAULT 1,
  price DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  shipping_method VARCHAR(50),
  tracking_number VARCHAR(100),
  warehouse_id VARCHAR(50),
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 仓库表
CREATE TABLE IF NOT EXISTS warehouses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address TEXT,
  manager VARCHAR(100),
  phone VARCHAR(20),
  capacity INTEGER,
  current_stock INTEGER DEFAULT 0,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 物流跟踪表
CREATE TABLE IF NOT EXISTS tracking (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  status VARCHAR(50) NOT NULL,
  location VARCHAR(200),
  description TEXT,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  full_name VARCHAR(100),
  phone VARCHAR(20),
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);
CREATE INDEX IF NOT EXISTS idx_tracking_order_id ON tracking(order_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- 启用行级安全
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- 删除已存在的策略（如果存在）
DROP POLICY IF EXISTS "Enable all access for orders" ON orders;
DROP POLICY IF EXISTS "Enable all access for warehouses" ON warehouses;
DROP POLICY IF EXISTS "Enable all access for tracking" ON tracking;
DROP POLICY IF EXISTS "Enable all access for users" ON users;

-- 创建策略（允许所有操作，生产环境需要更严格的策略）
CREATE POLICY "Enable all access for orders" ON orders FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for warehouses" ON warehouses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for tracking" ON tracking FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Enable all access for users" ON users FOR ALL USING (true) WITH CHECK (true);

-- 插入示例数据（使用 ON CONFLICT 避免重复插入）
INSERT INTO warehouses (name, address, manager, phone, capacity, current_stock) VALUES
('北京仓库', '北京市朝阳区物流园区', '张经理', '13800138001', 10000, 3500),
('上海仓库', '上海市浦东新区物流中心', '李经理', '13800138002', 8000, 4200),
('广州仓库', '广州市白云区物流基地', '王经理', '13800138003', 6000, 2800)
ON CONFLICT DO NOTHING;

INSERT INTO users (username, email, password_hash, role, full_name) VALUES
('admin', 'admin@example.com', '$2a$10$placeholder_hash', 'admin', '系统管理员'),
('user1', 'user1@example.com', '$2a$10$placeholder_hash', 'user', '普通用户')
ON CONFLICT (username) DO NOTHING;