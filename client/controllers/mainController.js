const axios = require("axios");
exports.home = async (req, res, next) => {
  const reqBanners = await axios.get("http://localhost:5000/banners");
  const reqCategories = await axios.get("http://localhost:5000/categories");
  const banners = reqBanners.data;
  const categories = reqCategories.data.map((cat) => {
    return {
      ...cat,
      imageUrl: cat.imageUrl?.replace("/static/images", "/assets"),
    };
  });
  res.render("main", {
    title: "Sabka Bazaar",
    data: banners?.map((item) => {
      const remove = item.bannerImageUrl?.replace("/static/images", "/assets");
      return {
        ...item,
        bannerImageUrl: remove,
      };
    }),
    categories: categories,
  });
};

exports.cart = (req, res, next) => {
  res.render("cart", { title: "Cart - Sabka Bazaar" });
};

exports.register = (req, res, next) => {
  res.render("register", { title: "Register - Sabka Bazaar" });
};

exports.login = (req, res, next) => {
  res.render("login", { title: "Login - Sabka Bazaar" });
};

exports.products = (req, res, next) => {
  res.render("products", { title: "Products - Sabka Bazaar" });
};
