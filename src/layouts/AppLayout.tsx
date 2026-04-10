import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { AppstoreOutlined, MessageOutlined, FileTextOutlined } from '@ant-design/icons'
import './AppLayout.css'

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="app-shell">
      <aside className={`app-sidebar${collapsed ? ' collapsed' : ''}`}>
        <div className="sidebar-brand">
          <button
            type="button"
            className="sidebar-toggle"
            aria-label={collapsed ? '展开菜单' : '收起菜单'}
            onClick={() => setCollapsed((c) => !c)}
          >
            <AppstoreOutlined />
          </button>
          <span className="brand-name">四小</span>
        </div>
        <nav className="sidebar-nav" aria-label="主导航">
          <div className="sidebar-section-label">通用</div>
          <NavLink
            to="/chat"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            title="聊天"
          >
            <MessageOutlined />
            <span className="sidebar-link-label">聊天</span>
          </NavLink>
          <NavLink
            to="/resume"
            className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            title="简历修改"
          >
            <FileTextOutlined />
            <span className="sidebar-link-label">简历修改</span>
          </NavLink>
        </nav>
      </aside>
      <div className="app-main-wrap">
        <Outlet />
      </div>
    </div>
  )
}
