import { useRouter } from "next/router";
const Product = ({ product }) => {
  const router = useRouter();
  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }
  return (
    <div>
      <h1>{product.name}</h1>
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
  const res = await fetch(`http://localhost:3000/api/product/${id}`);
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

export default Product;
