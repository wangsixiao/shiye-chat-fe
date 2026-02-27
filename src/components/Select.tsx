import React from 'react'
import { Select as AntSelect } from 'antd'
import { useResponsive } from './ResponsiveContext'

type AntSelectProps = React.ComponentProps<typeof AntSelect>

export interface ResponsiveSelectProps extends AntSelectProps {}

/** 响应式 Select：移动端与 PC 端均使用 antd Select，保证表单内行为一致 */
export function Select(props: ResponsiveSelectProps) {
  const { isMobile } = useResponsive()
  return <AntSelect {...props} size={isMobile ? 'middle' : props.size} />
}
