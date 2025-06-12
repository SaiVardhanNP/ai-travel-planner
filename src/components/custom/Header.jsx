import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
    return (
        <div className='p-2 shadow-sm flex justify-between px-5 items-center'>

            <img src="logo.svg" alt="" />
            <Button >Sign Up</Button>
        </div>
    )
}

export default Header
