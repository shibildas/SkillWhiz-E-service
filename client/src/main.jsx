import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {Provider} from "react-redux"
import "./index.css"
import { configureStore } from '@reduxjs/toolkit'
import userReducer from './redux/user'

const store= configureStore({
  reducer:{
    user:userReducer,
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>,
)
