import baseurl from "../helpers/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
const Cart = ({ error }) => {
  const { token } = parseCookies();
  const router = useRouter();

  if (!token) {
    return (
      <div className="center-align">
        <h3>Please login to view your cart</h3>
        <Link href="/login">
          <a>
            <button className="btn #1565c0 blue darken-3">Login</button>
          </a>
        </Link>
      </div>
    );
  }

  if (error) {
    M.toast({ html: error, classes: "red" });
    cookie.remove("user");
    cookie.remove("token");
    router.push("/login");
  }
  return <h1></h1>;
};

export async function getServerSideProps(ctx) {
  const { token } = parseCookies(ctx);
  if (!token) {
    return {
      props: { products: [] },
    };
  }

  const res = await fetch(`${baseurl}/api/cart`, {
    headers: {
      Authorization: token,
    },
  });
  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log("products", products);
  return {
    props: { products },
  };
}
export default Cart;
