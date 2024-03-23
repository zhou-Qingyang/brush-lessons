import React from 'react'
import ReactDOM from 'react-dom/client'
import BaseRouter from '@/router/index.jsx'
import "normalize.css"
import { Provider } from 'react-redux';
import store from './store';

//仅在开发模式("development")下，且使用了严格模式("Strict Mode")下会触发。
// 生产环境("production")模式下和原来一样，仅执行一次。
ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <BaseRouter />
    </React.StrictMode>
  </Provider>,
)
