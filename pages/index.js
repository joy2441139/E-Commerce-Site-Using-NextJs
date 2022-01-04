import Link from 'next/link'

const Home = ({ products }) => {
  const productList = products.map(product => {
    return (
      <div className="card pcard" key={product._id}>
        <div className="card-image">
          <img src={product.imgURL} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>Code: {product.code}</p>
          <p>Price: ${product.price}</p>
        </div>
        <div className="card-action">
          <Link href={'/product/[id]'} as={`/product/${product._id}`}><a>View Product</a></Link>
        </div>
      </div>
    )
  })


  return (

    <div className="rootcard">
      {productList}
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch(`http://localhost:3000/api/products`)
  const data = await res.json()
  return {
    props: {
      products: data
    }
  }
}

export default Home