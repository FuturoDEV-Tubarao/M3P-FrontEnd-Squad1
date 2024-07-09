import { Routes, Route } from 'react-router-dom'
import { Dashboard } from './pages/Dashboard/components'
import { Home } from './pages/Home'

export function Router() {
    return (
        <Routes>
            <Route path="/" element={<Home/>}/>  
            <Route path="/dashboard" element={<Dashboard/>}/>  
        </Routes>
    )
}