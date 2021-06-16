import { useRouter } from "next/router";
import baseurl from "../../Helpers/baseurl";
import { useRef, useEffect, useState } from "react";
import { parseCookies } from "nookies";
import cookie2 from "js-cookie";

const Product = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const modalRef = useRef(null);
  const cookie = parseCookies();
  const user = cookie.user ? JSON.parse(cookie.user) : "";
  useEffect(() => {
    M.Modal.init(modalRef.current);
  }, []);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you Sure, You want to delete this</p>
        </div>
        <div className="modal-footer">
          <button
            className="btn waves-effect waves-light #1565c0 red darken-3"
            onClick={() => deleteProduct()}
          >
            Yes
          </button>
          <button className="btn waves-effect waves-light #1565c0 blue darken-3">
            cancel
          </button>
        </div>
      </div>
    );
  };

  const deleteProduct = async () => {
    const res = await fetch(`${baseurl}/api/product/${product._id}`, {
      method: "DELETE",
    });

    await res.json();
    router.push("/");
  };

  const AddToCart = async () => {
    const res = await fetch(`${baseurl}/api/cart`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: cookie.token,
      },
      body: JSON.stringify({
        quantity: quantity,
        productId: product._id,
      }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: "red" });
      cookie2.remove("user");
      cookie2.remove("token");
      router.push("/login");
    }
    M.toast({ html: res2.message, classes: "green" });
  };
  return (
    <div className="container center-align">
      <h1>{product.name}</h1>
      <img style={{ width: "30%" }} src={product.mediaUrl} />
      <h5>{product.price}</h5>
      <input
        type="number"
        style={{ width: "400px", margin: "10px" }}
        min="1"
        placeholder="Quantity"
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      {user ? (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => AddToCart()}
        >
          Add <i className="material-icons right">add</i>
        </button>
      ) : (
        <button
          className="btn waves-effect waves-light #1565c0 blue darken-3"
          onClick={() => router.push("/login")}
        >
          Login TO Add <i className="material-icons right">add</i>
        </button>
      )}

      <p className="left-align">Rs.{product.description}</p>
      {user.role != "user" && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
        >
          Delete
          <i className="material-icons left">delete</i>
        </button>
      )}
      {getModal()}
    </div>
  );
};

//via getServerSideProps
// export async function getServerSideProps({ params: { id } }) {
//   const res = await fetch(`http://localhost:3000/api/product/${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       product: data,
//     }, //will be passed to page component as props
//   };
// }

//via getStaticProps
export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`${baseurl}/api/product/${id}`);
  const data = await res.json();
  return {
    props: {
      product: data,
    }, //will be passed to page component as props
  };
}
//we have to add getStaticPath,getStaticPath me hum log ko path mention krna padta hai  so that wo page ko build time pr ready krke rkhe
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "60c0f3161e75571fb168caaa" } }],
    fallback: true,
  };
}

// export async function getServerSideProps({ params: { id } }) {
//   const res = await fetch(`${baseurl}/api/product/${id}`);
//   const data = await res.json();
//   return {
//     props: {
//       product: data,
//     }, //will be passed to page component as props
//   };
// }

export default Product;
