import { ResponsiveProvider } from '@/components'
import FormExample from './examples/FormExample'
import Modal from './components/Modal'
import CountDown from './components/CountDown'
import './App.css'
import { useState } from 'react'

function App() {
  const [show, setShow] = useState(false)
  return (
    <ResponsiveProvider>
      <div className="app">
        <header className="app-header">
          <h1>MT 响应式组件库示例</h1>
          <p className="subtitle">移动端 antd-mobile · PC 端 antd · rem 适配</p>
          <Modal visible={show} mountNode="#modal-test"/>
          <CountDown/>
          <div onClick={() => setShow(true)} id="modal-test">弹窗</div>
        </header>
        <main className="app-main">
          <FormExample />
        </main>
      </div>
    </ResponsiveProvider>
  )
}

export default App
