import router from "next/router"
import { parseCookies } from 'nookies'
import { useState } from "react"

const Account = () => {
    const { user } = parseCookies()
    const obj = user ? JSON.parse(user) : "empty"
    console.log(obj.role);

    if (obj.role == "admin") {
        return (
            <>
                <div className="container">
                    <h1>Welcome back Admin</h1>
                </div>
            </>

        )
    }
    else {
        return (
            <>
                <div className="container" >
                    <h1>Welcome back Shopper</h1>
                    <h3>Happy Shopping</h3>
                </div>
            </>
        )
    }
}

export const getServerSideProps = async (ctx) => {
    const { token } = parseCookies(ctx)
    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        }
    }
    return {
        props: {}
    }
}
export default Account