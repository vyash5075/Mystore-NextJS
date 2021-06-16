import Link from "next/link";
import NavBar from "../components/Navbar";
import baseurl from "../Helpers/baseurl";
const Home = ({ products }) => {
  const productList = products.map((product) => {
    return (
      <div className="card pcard" key={product._id}>
        <div className="card-image">
          <img src={product.mediaUrl} />
          <span className="card-title">{product.name}</span>
        </div>
        <div className="card-content">
          <p>₹ {product.price}</p>
        </div>
        <div className="card-action">
          <Link href={"/product/[id]"} as={`/product/${product._id}`}>
            <a>View Product</a>
          </Link>
        </div>
      </div>
    );
  });
  //console.log(products);
  return (
    <div className="rootcard">
      {productList}

      <style jsx>{`
        h1 {
          color: red;
        }
      `}</style>
    </div>
  );
};

export async function getStaticProps(context) {
  const res = await fetch(`${baseurl}/api/products`);
  const data = await res.json();
  return {
    props: {
      products: data,
    }, //will be passed  to the page component as props
  };
}

// export async function getServerSideProps(context) {
//   const res = await fetch(`${baseurl}/api/products`);
//   const data = await res.json();
//   return {
//     props: {
//       products: data,
//     }, //will be passed  to the page component as props
//   };
// }
export default Home;
