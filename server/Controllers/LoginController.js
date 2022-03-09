function Login(req, res) {
  res.status(200).json({
    messaage: "this is Login ",
    route: "/",
  });
}
module.export = Login;
