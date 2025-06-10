# 项目开发备忘录

## 项目基本信息

- **项目名称**: UI画布尺寸计算器 (UI Canvas Size Calculator)
- **技术栈**: Next.js 15.3.3, React, TypeScript, Tailwind CSS, Shadcn/ui
- **开发端口**: 9002
- **部署地址**: https://ui-size.victor42.work/

## 主要功能改进历程

### 1. 国际化（i18n）双语系统实现

#### 核心架构
- **语言提供者**: `src/components/language-provider.tsx`
  - 使用React Context管理全局语言状态
  - localStorage持久化用户语言偏好
  - 支持中文(zh)和英文(en)切换

#### 翻译配置
- **翻译文件**: `src/lib/translations.ts`
  - 完整的中英文对照表
  - 涵盖UI所有文本：表单字段、按钮、提示、单位等
  - 特别注意："倍"翻译为"x"，"近距离/触屏"等专业术语

#### 关键实现细节
- **动态选项生成**: `src/lib/constants.ts`
  ```typescript
  export const generateCanvasWidthOptions = (t: (key: string) => string) => [
    { value: 375, label: `375px (1${t('timesUnit')})` },
    { value: 750, label: `750px (2${t('timesUnit')})` },
    { value: 1125, label: `1125px (3${t('timesUnit')})` }
  ];
  ```

- **计算逻辑分离**: 移除`calculator.ts`中的硬编码文本，文本格式化移至UI层

### 2. 用户界面优化

#### 语言切换按钮
- **位置**: 页面右上角，主题切换按钮左侧
- **交互方式**: 直接点击切换（非下拉菜单）
- **视觉提示**: 
  - 中文模式显示"EN"按钮
  - 英文模式显示"中"按钮
- **实现文件**: `src/components/language-toggle.tsx`

#### 主题切换按钮
- **优化**: 从下拉菜单改为直接点击切换
- **图标**: 使用Sun/Moon图标表示浅色/深色主题
- **实现文件**: `src/components/theme-toggle.tsx`

### 3. SEO和元数据优化

#### 品牌信息清理
- 移除所有"CanvasAlchemist"相关文本
- 更新页面标题为"UI画布尺寸计算器"
- 清理OpenGraph和Twitter Card元数据

#### 元数据文件
- **主文件**: `src/app/layout.tsx`
- **静态导出配置**: robots.ts, sitemap.ts添加`export const dynamic = 'force-static'`

## 技术难点和解决方案

### 1. ESLint构建错误
**问题**: 未使用变量导致构建失败
**解决**: 
- 移除`language-toggle.tsx`中的`isOpen`, `setIsOpen`
- 移除`calculator-form.tsx`中的`locale`变量
- 优化代码避免不必要的变量声明

### 2. TypeScript类型安全
**问题**: 翻译函数使用`any`类型
**解决**: 
```typescript
const getNestedTranslation = (obj: Record<string, any>, path: string): string => {
  return path.split('.').reduce((current, key) => current?.[key], obj) || path;
};
```

### 3. 静态导出配置
**问题**: robots.txt和sitemap.xml路由构建失败
**解决**: 在相关文件中添加强制静态导出标记

### 4. 组件重渲染优化
**问题**: 语言切换时部分组件不更新
**解决**: 确保所有显示文本的组件都正确订阅语言上下文

## 代码架构要点

### 目录结构
```
src/
├── app/
│   ├── layout.tsx          # 根布局，包含SEO元数据
│   ├── page.tsx           # 主页面
│   ├── robots.ts          # robots.txt生成
│   └── sitemap.ts         # sitemap.xml生成
├── components/
│   ├── language-provider.tsx    # 语言上下文提供者
│   ├── language-toggle.tsx      # 语言切换按钮
│   ├── theme-toggle.tsx         # 主题切换按钮
│   ├── calculator-form.tsx      # 计算表单
│   └── calculator-results.tsx   # 结果显示
└── lib/
    ├── translations.ts          # 翻译配置
    ├── constants.ts            # 常量和选项生成
    └── calculator.ts           # 计算逻辑
```

### 状态管理模式
- **语言状态**: React Context + localStorage
- **主题状态**: next-themes库管理
- **表单状态**: React useState
- **计算状态**: 实时计算，无状态存储

## 性能优化要点

### 1. 构建优化
- 使用Turbopack作为开发服务器
- 静态导出优化SEO页面
- 组件懒加载（如需要）

### 2. 用户体验优化
- 语言偏好本地存储
- 主题切换平滑过渡
- 实时计算反馈

### 3. 代码分割
- 翻译文件按需加载（当前全量加载，可优化）
- 组件级别的代码分割

## 未来优化方向

### 1. 功能增强
- [ ] 添加更多语言支持（日语、韩语等）
- [ ] 添加计算历史记录
- [ ] 导出计算结果功能
- [ ] 添加更多设备预设

### 2. 技术优化
- [ ] 翻译文件按需加载
- [ ] 组件性能优化（React.memo）
- [ ] PWA支持
- [ ] 单元测试覆盖

### 3. 用户体验
- [ ] 键盘快捷键支持
- [ ] 无障碍访问改进
- [ ] 移动端优化
- [ ] 加载状态优化

## 部署和维护

### 开发环境
```bash
npm run dev          # 开发服务器 (localhost:9002)
npm run build        # 构建生产版本
npm run export       # 静态导出
```

### 关键文件监控
- `src/lib/translations.ts` - 翻译更新
- `src/components/*-toggle.tsx` - UI组件
- `src/app/layout.tsx` - SEO元数据
- `package.json` - 依赖管理

### 问题排查清单
1. 构建失败 → 检查ESLint错误
2. 翻译缺失 → 检查translations.ts配置
3. 样式问题 → 检查Tailwind类名
4. 路由问题 → 检查static export配置

## 开发注意事项

1. **始终测试双语切换** - 每次修改后验证中英文显示
2. **保持类型安全** - 避免使用any类型
3. **遵循组件设计模式** - 单一职责，可复用性
4. **注意SEO优化** - 元数据和静态导出配置
5. **性能监控** - 关注构建时间和包大小

## 重要修改记录

### 2024年6月10日 - v1.0 双语支持完整版
- ✅ 实现完整的中英文双语系统
- ✅ 优化语言和主题切换按钮为直接点击方式
- ✅ 移除所有CanvasAlchemist品牌信息
- ✅ 完善所有单位翻译（"倍" → "x"）
- ✅ 解决所有ESLint构建错误
- ✅ 优化SEO元数据配置

---

*最后更新: 2024年6月10日*
*版本: v1.0 - 双语支持完整版*