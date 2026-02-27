import React from 'react'
import { Input as AntInput } from 'antd'
import { Input as MobileInput } from 'antd-mobile'
import { useResponsive } from './ResponsiveContext'

type AntInputProps = React.ComponentProps<typeof AntInput>
type MobileInputProps = React.ComponentProps<typeof MobileInput>

export interface ResponsiveInputProps
  extends Omit<AntInputProps, 'size'>,
    Pick<MobileInputProps, 'clearable'> {
  size?: AntInputProps['size']
  label?: string
}

export function Input(props: ResponsiveInputProps) {
  const { isMobile } = useResponsive()
  const { label, clearable, value, ...rest } = props

  if (isMobile) {
    const strValue = value === undefined || value === null ? undefined : String(value)
    return (
      <MobileInput
        value={strValue}
        clearable={clearable ?? true}
        placeholder={rest.placeholder}
        onChange={rest.onChange ? (val: string) => (rest.onChange as (e: { target: { value: string } }) => void)({ target: { value: val } }) : undefined}
        onClear={rest.onClear}
      />
    )
  }
  return <AntInput {...props} />
}
