import ContactDashboardGraph from '@/components/admin/ContactDashboardGraph'
import AdminLayoutWithAuth from '@/components/layout/layout'
import React from 'react'

const Home = () => {
  return (
    <AdminLayoutWithAuth>
        <div>
          <ContactDashboardGraph />
        </div>
    </AdminLayoutWithAuth>
  )
}

export default Home