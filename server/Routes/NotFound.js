module.exports = (req, res) => {
  res.status(404).json({
    success: true,
    message: "route not found",
  });
};
