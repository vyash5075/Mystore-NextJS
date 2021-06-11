import initDB from "../../Helpers/initDB";
import Product from "../../models/Product";
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getallProducts(req, res);
      break;

    case "POST":
      await saveProducts(req, res);
      break;
  }
};

const saveProducts = async (req, res) => {
  const { name, price, description, mediaUrl } = req.body;
  console.log(name, price, description, mediaUrl);
  try {
    if (!name || !price || !description || !mediaUrl) {
      return res.status(422).json({ error: "Please add all the fields" });
    }
    const product = await new Product({
      name,
      price,
      description,
      mediaUrl,
    }).save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
    console.log(err);
  }
};

const getallProducts = async (req, res) => {
  Product.find()
    .then((products) => {
      res.status(200).json(products);
    })
    .catch((err) => {
      console.log(err);
    });
};
