import React from 'react'
import { Button as AntButton } from 'antd'
import { Button as MobileButton } from 'antd-mobile'
import { useResponsive } from './ResponsiveContext'

type AntButtonProps = React.ComponentProps<typeof AntButton>
type MobileButtonProps = React.ComponentProps<typeof MobileButton>

type ResponsiveButtonProps = Omit<AntButtonProps, 'size'> & {
  size?: 'small' | 'middle' | 'large'
}

export function Button(props: ResponsiveButtonProps) {
  const { isMobile } = useResponsive()
  if (isMobile) {
    const { size, type, children, ...rest } = props
    const color: 'primary' | 'default' = type === 'primary' ? 'primary' : 'default'
    return (
      <MobileButton color={color} size={size ?? 'middle'} {...(rest as MobileButtonProps)}>
        {children}
      </MobileButton>
    )
  }
  return <AntButton {...props} size={props.size} />
}
