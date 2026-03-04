# 智能物流管理系统 - Vercel + Supabase 部署指南

## 前置要求
- Node.js 18+ 已安装
- Git 已安装
- Vercel 账号（免费）
- Supabase 账号（免费）

## 第一步：设置 Supabase 数据库

### 1. 创建 Supabase 项目
1. 访问 [https://supabase.com](https://supabase.com)
2. 注册并登录
3. 点击 "New Project" 创建新项目
4. 填写项目信息：
   - Name: `smart-logistics`
   - Database Password: 设置强密码并保存
   - Region: 选择离你最近的区域
5. 等待项目创建完成（约2分钟）

### 2. 执行数据库脚本
1. 进入项目仪表板
2. 点击左侧菜单 "SQL Editor"
3. 点击 "New Query"
4. 复制 `supabase/schema.sql` 文件内容
5. 粘贴到编辑器中
6. 点击 "Run" 执行脚本

### 3. 获取 API 凭证
1. 在项目仪表板，点击 "Settings" → "API"
2. 复制以下信息：
   - Project URL
   - anon public key
   - service_role key（保密，不要泄露）

## 第二步：配置本地环境

### 1. 安装依赖
```bash
cd /Users/wurenjie/HCN
npm install
```

### 2. 配置环境变量
```bash
cp .env.example .env.local
```

编辑 `.env.local` 文件，填入 Supabase 凭证：
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 3. 本地测试
```bash
npm run dev
```

访问 `http://localhost:3000` 测试应用

## 第三步：部署到 Vercel

### 方法一：使用 Vercel CLI（推荐）

#### 1. 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 2. 登录 Vercel
```bash
vercel login
```

#### 3. 部署项目
```bash
cd /Users/wurenjie/HCN
vercel
```

按照提示操作：
- 选择 "Link to existing project" 或创建新项目
- 确认项目设置
- 等待部署完成

#### 4. 配置环境变量
在 Vercel 控制台：
1. 进入项目设置
2. 点击 "Environment Variables"
3. 添加以下变量：
   - `SUPABASE_URL`: 你的 Supabase 项目 URL
   - `SUPABASE_ANON_KEY`: 你的 Supabase anon key
4. 保存后重新部署

#### 5. 生产环境部署
```bash
vercel --prod
```

### 方法二：使用 Vercel 控制台

#### 1. 连接 Git 仓库
1. 访问 [https://vercel.com](https://vercel.com)
2. 点击 "Add New Project"
3. 导入你的 Git 仓库（需要先推送到 GitHub/GitLab）

#### 2. 配置项目
- Framework Preset: Other
- Root Directory: `./`
- Build Command: 留空
- Output Directory: 留空

#### 3. 添加环境变量
在 Environment Variables 部分添加：
- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

#### 4. 部署
点击 "Deploy" 按钮，等待部署完成

## 第四步：验证部署

### 1. 检查 API 端点
- 获取订单列表: `https://your-domain.vercel.app/api/orders`
- 创建订单: `https://your-domain.vercel.app/api/orders/create` (POST)
- 获取单个订单: `https://your-domain.vercel.app/api/orders/[id]`
- 更新订单: `https://your-domain.vercel.app/api/orders/update/[id]` (PUT)
- 删除订单: `https://your-domain.vercel.app/api/orders/update/[id]` (DELETE)

### 2. 测试前端
访问你的 Vercel 域名，确认应用正常运行

## 常见问题

### Q: 部署后 API 返回 500 错误
A: 检查 Vercel 环境变量是否正确配置，确保 Supabase 凭证有效

### Q: 数据库连接失败
A: 确认 Supabase 项目已激活，检查网络连接和防火墙设置

### Q: CORS 错误
A: API 已配置 CORS 头，如仍有问题，检查前端请求地址是否正确

### Q: 如何更新部署
A: 使用 `vercel --prod` 重新部署，或推送到 Git 仓库触发自动部署

## 免费额度

### Vercel 免费套餐
- 100GB 带宽/月
- 无限部署
- 自动 HTTPS
- 边缘网络

### Supabase 免费套餐
- 500MB 数据库存储
- 1GB 文件存储
- 50,000 月活跃用户
- 2GB 出站流量/月

## 下一步

1. **添加认证**: 实现 Supabase Auth 用户登录
2. **实时功能**: 使用 Supabase Realtime 实现实时更新
3. **文件上传**: 使用 Supabase Storage 存储文件
4. **监控**: 添加 Vercel Analytics 和 Supabase Logs

## 技术支持

- Vercel 文档: https://vercel.com/docs
- Supabase 文档: https://supabase.com/docs
- 问题反馈: 在项目仓库提交 Issue