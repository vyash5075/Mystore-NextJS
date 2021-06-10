import Link from "next/link";
import { useEffect, useState } from "react";
const Product = () => {
  const [text, setText] = useState("loading");
  useEffect(() => {
    fetch("http://localhost:3000/api/test")
      .then((res) => res.json())
      .then((data) => {
        setText(data.message);
      });
  });
  return (
    <div>
      <h1>product js</h1>
      <h2>{text} </h2>
      <Link href="/">
        <a>home </a>
      </Link>
    </div>
  );
};

export default Product;
