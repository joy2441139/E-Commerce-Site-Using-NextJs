import Link from "next/link"
import { useState } from "react"
import { parseCookies } from "nookies"
import cookieCutter from 'cookie-cutter'
import { GetServerSideProps } from 'next'

const Create = () => {
    const [code, setCode] = useState("")
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [img, setImg] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const imgURL = await imageUpload()
            const res = await fetch(`http://localhost:3000/api/products`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    code: code,
                    name: name,
                    price: price,
                    imgURL: imgURL
                })
            })
            const res2 = await res.json()
            if (res2.error) {
                M.toast({ html: res2.error, classes: "red" })
            }
            else {
                M.toast({ html: "Product saved", classes: "green" })
            }

        } catch (error) {
            console.log(error);
        }

    }
    const imageUpload = async () => {
        const data = new FormData()
        data.append('file', img)
        data.append('upload_preset', "joystore")
        data.append('cloud_name', "joy2441139")
        const res = await fetch("https://api.cloudinary.com/v1_1/joy2441139/image/upload", {
            method: "POST",
            body: data
        })
        const res2 = await res.json()
        return res2.url
    }
    return (
        <form className="container" onSubmit={(e) => handleSubmit(e)}>
            <input
                type="text"
                name="code"
                placeholder="Product Code"
                value={code}
                onChange={(e) => { setCode(e.target.value) }}
            />
            <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={name}
                onChange={(e) => { setName(e.target.value) }}
            />
            <input
                type="number"
                name="price"
                placeholder="Product Price"
                value={price}
                onChange={(e) => { setPrice(e.target.value) }}
            />
            <div className="file-field input-field">
                <div className="btn">
                    <span>File</span>
                    <input type="file"
                        accept="image/*"
                        onChange={(e) => { setImg(e.target.files[0]) }}
                    />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <img className="responsive-img" src={img ? URL.createObjectURL(img) : ""} />
            <button className="btn waves-effect waves-light #37474f blue-grey darken-3" type="submit" >Submit
                <i className="material-icons right">send</i>
            </button>
        </form>
    )
}
export const getServerSideProps = async (ctx) => {
    const { user } = parseCookies(ctx)
    const obj = user ? JSON.parse(user) : "empty"
    if (obj.role == "user" || obj == "empty") {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }
    return {
        props: {}
    }
}


export default Create