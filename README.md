# MT Mobile - 响应式组件库测试

React 18 项目：移动端使用 antd-mobile，PC 端使用 antd，并根据视口动态切换；提供 rem 适配与表单示例。

## 功能概览

### 1. 响应式组件库

- **移动端（视口宽度 ≤ 600px）**：使用 **antd-mobile** 组件
- **PC 端（视口宽度 > 600px）**：使用 **antd** 组件

已封装组件：`Button`、`Input`、`Form` / `Form.Item`、`Select`、`Switch`。使用方式与 antd 基本一致，由内部根据当前端自动切换实现。

### 2. 公共方法（`src/utils`）

- **`isMobile()`**：是否为移动端。规则：**大于 600 判定为 PC 端**，即 `window.innerWidth > 600` 为 PC，否则为移动端。
- **`getViewportWidth()`**：当前视口宽度。
- **`initResponsive()`**：初始化响应式逻辑（在 `main.tsx` 中已调用一次）：
  - 监听窗口 `resize`
  - **动态设置根节点 `font-size`**：
    - **PC 端**：固定为 `16px`
    - **移动端**：按设计稿宽度 375 比例计算，实现 rem 适配
- **`subscribeResponsive(fn)`**：订阅视口变化，回调参数为 `(isMobile, width)`，返回取消订阅函数。

### 3. 示例：rem 适配 + 表单场景

- **`src/examples/FormExample.tsx`**：表单示例（用户名、手机号、邮箱、通知开关、提交/重置）。
- 样式使用 **rem** 做移动端适配（如 `FormExample.css`、`App.css` 中的 rem 单位）。
- 根 `font-size` 由 `initResponsive()` 根据 PC/移动端自动设置，保证 rem 在不同宽度下一致可用。

## 使用方式

```bash
# 安装依赖（若从其他环境拷贝项目，请在本机重新安装以避免 esbuild 平台错误）
npm install

# 开发
npm run dev

# 构建
npm run build

# 预览构建结果
npm preview
```

## 项目结构

```
src/
├── main.tsx              # 入口，调用 initResponsive()
├── App.tsx / App.css     # 根布局，使用 ResponsiveProvider
├── utils/
│   ├── device.ts         # isMobile、initResponsive、subscribeResponsive、根 font-size 逻辑
│   └── index.ts
├── components/           # 响应式组件库
│   ├── ResponsiveContext.tsx  # 提供 useResponsive()
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Form.tsx          # Form + Form.Item + useForm
│   ├── Select.tsx
│   ├── Switch.tsx
│   └── index.ts
└── examples/
    ├── FormExample.tsx   # 表单示例（rem + 表单场景）
    └── FormExample.css
```

## 在业务中使用

1. 根节点包一层 `ResponsiveProvider`（示例中已在 `App.tsx` 使用）。
2. 使用 `useResponsive()` 获取 `{ isMobile, width }`。
3. 使用封装好的 `Button`、`Input`、`Form`、`Form.Item`、`Switch`、`Select` 等，会自动按端切换。
4. 需要 rem 时依赖根 `font-size` 已由 `initResponsive()` 设置，直接写 rem 单位即可。
