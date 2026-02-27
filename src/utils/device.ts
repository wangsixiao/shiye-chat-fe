/**
 * 设备与视口工具
 * - 大于 600px 判定为 PC 端，否则为移动端
 * - 监听屏幕变化，动态设置根 font-size（rem 适配）
 * - PC 端使用固定根字体大小
 */

const PC_BREAKPOINT = 600
const PC_ROOT_FONT_SIZE = 16
const MOBILE_BASE_WIDTH = 375
const MOBILE_BASE_FONT_SIZE = 37.5 // 375/10，方便 1rem ≈ 10px 设计稿

type Listener = (isMobile: boolean, width: number) => void

const listeners = new Set<Listener>()

function getWidth(): number {
  if (typeof window === 'undefined') return 0
  return window.innerWidth ?? document.documentElement.clientWidth
}

/**
 * 是否为移动端（视口宽度 <= 600 为移动端，> 600 为 PC）
 */
export function isMobile(): boolean {
  return getWidth() <= PC_BREAKPOINT
}

/**
 * 获取当前视口宽度
 */
export function getViewportWidth(): number {
  return getWidth()
}

/**
 * 设置根元素 font-size
 * - PC（>600）：固定为 PC_ROOT_FONT_SIZE
 * - 移动端：按设计稿宽度比例计算，实现 rem 适配
 */
function setRootFontSize(): void {
  if (typeof document === 'undefined') return
  const width = getWidth()
  const root = document.documentElement
  if (width > PC_BREAKPOINT) {
    root.style.fontSize = `${PC_ROOT_FONT_SIZE}px`
  } else {
    const fontSize = (width / MOBILE_BASE_WIDTH) * MOBILE_BASE_FONT_SIZE
    root.style.fontSize = `${fontSize}px`
  }
}

/**
 * 监听屏幕尺寸变化，自动更新根 font-size 并通知订阅者
 */
function handleResize(): void {
  setRootFontSize()
  const w = getWidth()
  const mobile = w <= PC_BREAKPOINT
  listeners.forEach((fn) => fn(mobile, w))
}

/**
 * 初始化：设置一次根 font-size，并监听 resize
 * 在应用入口调用一次即可
 */
export function initResponsive(): () => void {
  setRootFontSize()
  window.addEventListener('resize', handleResize)
  return () => {
    window.removeEventListener('resize', handleResize)
    listeners.clear()
  }
}

/**
 * 订阅视口变化（isMobile、width）
 * 返回取消订阅函数
 */
export function subscribeResponsive(fn: Listener): () => void {
  listeners.add(fn)
  fn(isMobile(), getWidth())
  return () => {
    listeners.delete(fn)
  }
}

export const BREAKPOINT = PC_BREAKPOINT
export const MOBILE_BASE_FONT_SIZE_PX = MOBILE_BASE_FONT_SIZE
export const PC_ROOT_FONT_SIZE_PX = PC_ROOT_FONT_SIZE
