import React from 'react'
import { Button } from '../ui/button'
import Logo from '../../../public/logo'
const Header = () => {
    return (
        <div className='p-2 shadow-sm flex justify-between px-5 items-center'>
            <Logo/>
            <img src="https://logoipsum.com/artwork/286" alt="" />
            <Button >Sign Up</Button>
        </div>
    )
}

export default Header
