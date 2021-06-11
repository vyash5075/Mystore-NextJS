import initDB from "../../Helpers/initDB";
import User from "../../models/User";
import bcrypt from "bcryptjs";

initDB();

export default async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "please add all the fields" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: "user already exists" });
    }
    const hashedpassword = await bcrypt.hash(password, 12);

    const newuser = await new User({
      name: name,
      email: email,
      password: hashedpassword,
    }).save();
    console.log(newuser);
    res.status(201).json({ message: "signup successfull " });
  } catch (err) {
    console.log(err);
  }
};
