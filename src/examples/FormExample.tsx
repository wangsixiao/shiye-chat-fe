import { useState } from 'react'
import { Form, FormItem, Input, Button, Switch, useForm, useResponsive } from '@/components'
import './FormExample.css'

interface FormValues {
  username: string
  phone: string
  email: string
  notify: boolean
}

export default function FormExample() {
  const [form] = useForm<FormValues>()
  const [submitted, setSubmitted] = useState<FormValues | null>(null)
  const { isMobile } = useResponsive()

  const onFinish = (values: FormValues) => {
    setSubmitted(values)
  }

  return (
    <section className="form-example">
      <h2 className="form-example-title">表单示例（rem 适配）</h2>
      <p className="form-example-desc">
        当前：{isMobile ? '移动端 (antd-mobile)' : 'PC 端 (antd)'} · 宽度 &gt; 600px 切换为 PC
      </p>

      <Form
        form={form}
        layout="vertical"
        onFinish={(values) => onFinish(values as unknown as FormValues)}
        className="form-example-form"
      >
        <FormItem
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input placeholder="请输入用户名" />
        </FormItem>

        <FormItem
          label="手机号"
          name="phone"
          rules={[
            { required: true, message: '请输入手机号' },
            { pattern: /^1\d{10}$/, message: '手机号格式不正确' },
          ]}
        >
          <Input placeholder="请输入手机号" type="tel" />
        </FormItem>

        <FormItem
          label="邮箱"
          name="email"
          rules={[{ type: 'email', message: '请输入正确邮箱' }]}
        >
          <Input placeholder="选填邮箱" />
        </FormItem>

        <FormItem label="接收通知" name="notify" valuePropName="checked" initialValue={true}>
          <Switch />
        </FormItem>

        <FormItem className="form-example-actions">
          <Button type="primary" htmlType="submit" block={isMobile}>
            提交
          </Button>
          <Button
            type="default"
            htmlType="button"
            onClick={() => form.resetFields()}
            style={{ marginTop: '0.27rem' }}
            block={isMobile}
          >
            重置
          </Button>
        </FormItem>
      </Form>

      {submitted && (
        <div className="form-example-result">
          <h3>提交结果</h3>
          <pre>{JSON.stringify(submitted, null, 2)}</pre>
        </div>
      )}
    </section>
  )
}
