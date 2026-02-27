import React from 'react'
import { Form as AntForm, FormInstance, FormProps as AntFormProps } from 'antd'
import { Form as MobileForm } from 'antd-mobile'
import { useResponsive } from './ResponsiveContext'

export type { FormInstance }

type AntFormPropsGeneric = AntFormProps<Record<string, unknown>>
type MobileFormProps = React.ComponentProps<typeof MobileForm>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MobileFormInstance = any

export interface ResponsiveFormProps extends Omit<AntFormPropsGeneric, 'form'> {
  children: React.ReactNode
  form?: FormInstance | MobileFormInstance
}

/** 返回当前端对应的 form 实例，用于在响应式 Form 中统一使用 */
export function useForm<T = Record<string, unknown>>(): [FormInstance<T>] {
  const [antForm] = AntForm.useForm<T>()
  const [mobileForm] = (
    (MobileForm as unknown as { useForm: () => [MobileFormInstance] }).useForm
  )()
  const { isMobile } = useResponsive()
  return [isMobile ? (mobileForm as FormInstance<T>) : antForm]
}

const FormBase = React.forwardRef<FormInstance, ResponsiveFormProps>(
  function ResponsiveForm(props, ref) {
    const { isMobile } = useResponsive()
    const { children, form, ...rest } = props

    if (isMobile) {
      return (
        <MobileForm
          ref={ref as React.Ref<FormInstance>}
          form={form as MobileFormInstance}
          {...(rest as MobileFormProps)}
        >
          {children}
        </MobileForm>
      )
    }
    return (
      <AntForm ref={ref} form={form} {...rest}>
        {children}
      </AntForm>
    )
  }
)

type AntItemProps = React.ComponentProps<typeof AntForm.Item>
type MobileItemProps = React.ComponentProps<typeof MobileForm.Item>

export interface ResponsiveFormItemProps {
  label?: React.ReactNode
  name?: AntItemProps['name']
  rules?: AntItemProps['rules']
  children?: React.ReactNode
  required?: boolean
  [key: string]: unknown
}

export function FormItem(props: ResponsiveFormItemProps) {
  const { isMobile } = useResponsive()
  const { label, name, rules, children, required, ...rest } = props

  if (isMobile) {
    return (
      <MobileForm.Item
        name={name as string}
        label={label}
        rules={rules as MobileItemProps['rules']}
        required={required}
        {...(rest as Partial<MobileItemProps>)}
      >
        {children}
      </MobileForm.Item>
    )
  }
  return (
    <AntForm.Item label={label} name={name} rules={rules} required={required} {...rest}>
      {children}
    </AntForm.Item>
  )
}

export const Form = Object.assign(FormBase, { Item: FormItem }) as typeof FormBase & {
  Item: typeof FormItem
}
