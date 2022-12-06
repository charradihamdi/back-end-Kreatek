const User = require("../../models/admin");
const Client = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortid = require("shortid");
const ObjectID = require("mongoose").Types.ObjectId;
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin already registered",
      });

    User.estimatedDocumentCount(async (err, count) => {
      if (err) return res.status(400).json({ error });
      let role = "admin";
      if (count === 0) {
        role = "super-admin";
      }

      const { FullName, email, password } = req.body;
      const hash_password = await bcrypt.hash(password, 10);
      const _user = new User({
        FullName,
        email,
        hash_password,
        role,
      });

      _user.save((error, data) => {
        if (error) {
          console.log(error);
          return res.status(400).json({
            message: "Something went wrong",
          });
        }

        if (data) {
          return res.status(201).json({
            message: "Admin created Successfully..!",
          });
        }
      });
    });
  });
};

exports.signin = (req, res) => {
  User.findOne({ email: req.body.email }).exec(async (error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      const isPassword = await user.authenticate(req.body.password);
      if (
        isPassword &&
        (user.role === "admin" || user.role === "super-admin")
      ) {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1d" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1d" });
        res.status(200).json({
          token,
          user: { _id, firstName, lastName, email, role, fullName },
        });
      } else {
        return res.status(400).json({
          message: "Invalid Password",
        });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: "Signout successfully...!",
  });
};

module.exports.getusers = async (req, res) => {
  const users = await Client.find().select("-password");
  res.status(200).json(users);
};

module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  Client.findById(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else console.log("ID unknown : " + err);
  }).select("-password");
};

module.exports.deleteUser = async (req, res) => {
  console.log(req.params.id);
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  try {
    await Client.remove({ _id: req.params.id }).exec();
    res.status(200).json({ message: "Successfully deleted. " });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
};
