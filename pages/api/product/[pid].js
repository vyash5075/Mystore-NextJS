import Product from "../../../models/Product";
import initDB from "../../../Helpers/initDB";
initDB();
export default async (req, res) => {
  switch (req.method) {
    case "GET":
      await getProduct(req, res);
      break;

    case "DELETE":
      await deleteproduct(req, res);
      break;
  }
};

const getProduct = async (req, res) => {
  const { pid } = req.query;
  const product = await Product.findOne({ _id: pid });
  res.status(200).json(product);
};

const deleteproduct = async (req, res) => {
  const { pid } = req.query;
  await Product.findByIdAndDelete({ _id: pid });
  res.status(200).json({});
};
