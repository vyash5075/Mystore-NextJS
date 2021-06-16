import jwt from "jsonwebtoken";
import Cart from "../../models/Cart";
import initDb from "../../helpers/initDB";
import Authenticated from "../../Helpers/Authenticated";
initDb();

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await fetchUserCart(req, res);
      break;

    case "PUT":
      await addProduct(req, res);
      break;

    case "DELETE":
      await removeProduct(req, res);
      break;
  }
};

// function Authenticated(icomponent) {
//   return (req, res) => {
//     const { authorization } = req.headers;
//     if (!authorization) {
//       return res.status(401).json({ error: "you must logged in" });
//     }
//     try {
//       const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
//       console.log("--------------" + userId);
//       req.userId = userId;
//       return icomponent(req, res);
//     } catch (err) {
//       console.log(err);
//       return res.status(401).json({ error: "you must logged in" });
//     }
//   };
// }
const fetchUserCart = Authenticated(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    "products.product"
  );
  res.status(200).json(cart.products);
});

const addProduct = Authenticated(async (req, res) => {
  const { quantity, productId } = req.body;

  const cart = await Cart.findOne({ user: req.userId });
  const pExists = cart.products.some(
    (pdoc) => productId === pdoc.product.toString()
  );

  if (pExists) {
    await Cart.findOneAndUpdate(
      { _id: cart._id, "products.product": productId },
      { $inc: { "products.$.quantity": quantity } }
    );
  } else {
    const newProduct = { quantity, product: productId };
    await Cart.findOneAndUpdate(
      { _id: cart._id },
      { $push: { products: newProduct } }
    );
  }
  res.status(200).json({ message: "product added to cart" });
});

const removeProduct = Authenticated(async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: req.userId },
    { $pull: { products: { product: productId } } },
    { new: true } //is se cart me se remove hokr hame cart return hoga
  ).populate("products.product");
  res.status(200).json(cart.products);
});
