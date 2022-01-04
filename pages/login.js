import Link from "next/link"
import { useState } from "react"
import cookies from "js-cookie"
import { useRouter } from 'next/router'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()

    const userLogin = async (e) => {
        e.preventDefault()
        const res = await fetch('http://localhost:3000/api/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        const res2 = await res.json()
        if (res2.error) {
            M.toast({ html: res2.error, classes: "red" })
        } else {
            console.log(res2);
            cookies.set('token', res2.token)
            cookies.set('user', JSON.stringify(res2.user))
            router.push('/account')
        }
    }
    return (
        <div className="container card authcard center-align">
            <h3>Login Here</h3>
            <form onSubmit={(e) => userLogin(e)}>
                <input type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="btn waves-effect waves-light #37474f blue-grey darken-3" type="submit" >Login
                    <i className="material-icons right">forward</i>
                </button>
                <Link href="/register"><a><h5>Do not have an account?</h5></a></Link>
            </form>

        </div>
    )
}

export default Login