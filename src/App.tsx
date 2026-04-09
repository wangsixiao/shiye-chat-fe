import { ResponsiveProvider } from '@/components'
import FormExample from './examples/FormExample'
import Modal from './components/Modal'
import './App.css'
import { useState, useEffect } from 'react'
import ImageScroll from './components/ImageScroll'
import MemoryFun from './components/MemoryFun'

function App() {
  const [show, setShow] = useState(false)

  const a = () => {
    console.log('a')

  }

  useEffect(() => {
    a()
  }, [])

  return (
    <ResponsiveProvider>
      <div className="app">
        <header className="app-header">
          <h1>MT 响应式组件库示例1234</h1>
          <MemoryFun />
          <p className="subtitle">移动端 antd-mobile · PC 端 antd · rem 适配</p>
          <Modal visible={show} mountNode="#modal-test"/>

          <div onClick={() => setShow(true)} id="modal-test">弹窗</div>
        </header>
        <main className="app-main" style={{marginBottom: 300}}>
          <FormExample />
        </main>
        <ImageScroll />
      </div>
    </ResponsiveProvider>
  )
}

export default App
