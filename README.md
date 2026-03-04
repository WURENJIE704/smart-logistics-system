# 智能物流管理系统 - 快速开始

## 🚀 5分钟快速部署

### 第一步：设置 Supabase（2分钟）

1. **创建项目**
   - 访问 https://supabase.com
   - 注册并创建新项目
   - 等待项目初始化完成

2. **执行数据库脚本**
   - 进入 SQL Editor
   - 复制 `supabase/schema.sql` 内容
   - 粘贴并执行

3. **获取 API 凭证**
   - Settings → API
   - 复制 Project URL 和 anon key

### 第二步：配置环境变量（1分钟）

```bash
cp .env.example .env.local
```

编辑 `.env.local`：
```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

### 第三步：本地测试（1分钟）

```bash
npm run dev
```

访问 http://localhost:3000

### 第四步：部署到 Vercel（1分钟）

```bash
npm install -g vercel
vercel login
vercel
```

在 Vercel 控制台添加环境变量，然后：
```bash
vercel --prod
```

## 📁 项目结构

```
HCN/
├── api/                    # Vercel API Routes
│   ├── supabaseClient.js   # Supabase 客户端
│   └── orders/             # 订单相关 API
│       ├── index.js        # 获取所有订单
│       ├── [id].js         # 获取单个订单
│       ├── create.js       # 创建订单
│       └── update/[id].js  # 更新/删除订单
├── supabase/
│   └── schema.sql          # 数据库表结构
├── package.json            # 项目配置
├── vercel.json             # Vercel 配置
├── .env.example            # 环境变量示例
└── 智能物流管理系统_完整升级版_V2 (2) (1).html  # 前端页面
```

## 🔌 API 端点

| 方法 | 端点 | 说明 |
|------|------|------|
| GET | `/api/orders` | 获取所有订单 |
| GET | `/api/orders/[id]` | 获取单个订单 |
| POST | `/api/orders/create` | 创建新订单 |
| PUT | `/api/orders/update/[id]` | 更新订单 |
| DELETE | `/api/orders/update/[id]` | 删除订单 |

## 💡 使用示例

### 获取订单列表
```javascript
fetch('/api/orders')
  .then(res => res.json())
  .then(data => console.log(data));
```

### 创建订单
```javascript
fetch('/api/orders/create', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    order_number: 'ORD001',
    customer_name: '张三',
    product_name: '商品A',
    quantity: 10,
    price: 99.99,
    total_amount: 999.90
  })
});
```

## 🎯 下一步

- [ ] 添加用户认证
- [ ] 实现实时数据更新
- [ ] 添加文件上传功能
- [ ] 配置自定义域名

## 📚 详细文档

查看 [DEPLOYMENT.md](./DEPLOYMENT.md) 获取完整部署指南。