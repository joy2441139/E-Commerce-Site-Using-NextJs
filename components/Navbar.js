import Link from "next/link"
import { useRouter } from "next/router"
import { parseCookies } from "nookies"
import cookies from "js-cookie"
import cookieCutter from 'cookie-cutter'

const NavBar = () => {
    const router = useRouter()
    const cookieuser = parseCookies()
    const { user } = parseCookies()
    const obj = user ? JSON.parse(user) : "empty"
    const { token } = parseCookies()
    let users = false
    if (token) {
        users = true
    }
    else {
        users = false
    }
    function isActive(route) {
        if (route == router.pathname) {
            return "active"
        }
        else ""
    }
    return (
        <nav>
            <div className="nav-wrapper #37474f blue-grey darken-3">
                <Link href="/"><a className="brand-logo left">Paango Store</a></Link>
                <ul id="nav-mobile" className="right" >
                    <li className={isActive('/cart')}><Link href="/cart"><a>Cart</a></Link></li>
                    {obj.role == "admin" &&
                        <li className={isActive('/create')}><Link href="/create"><a>Create</a></Link></li>
                    }

                    {users ?
                        <>
                            <li className={isActive('/account')}><Link href="/account"><a>Account</a></Link></li>
                            <button className="btn red" onClick={() => {
                                cookies.remove('token')
                                cookies.remove('user')
                                router.push('/login')

                            }}>LogOut</button></>

                        :
                        <>
                            <li className={isActive('/login')}><Link href="/login"><a>Login</a></Link></li>
                            <li className={isActive('/register')}><Link href="/register"><a>Register</a></Link></li>

                        </>
                    }


                </ul >
            </div >
        </nav >
    )
}

export default NavBar