import React from 'react'
import { Switch as AntSwitch } from 'antd'
import { Switch as MobileSwitch } from 'antd-mobile'
import { useResponsive } from './ResponsiveContext'

type AntSwitchProps = React.ComponentProps<typeof AntSwitch>
type MobileSwitchProps = React.ComponentProps<typeof MobileSwitch>

export type ResponsiveSwitchProps = AntSwitchProps | (MobileSwitchProps & { checked?: boolean })

export function Switch(props: ResponsiveSwitchProps) {
  const { isMobile } = useResponsive()
  const { checked, ...rest } = props as AntSwitchProps & { checked?: boolean }

  if (isMobile) {
    return <MobileSwitch checked={checked} {...(rest as MobileSwitchProps)} />
  }
  return <AntSwitch checked={checked} {...(rest as AntSwitchProps)} />
}
