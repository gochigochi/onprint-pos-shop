import React, { ReactNode } from 'react'
import Nav from './nav/Nav'

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <>
        <Nav />
        <main>{children}</main>
    </>
  )
}

export default Layout