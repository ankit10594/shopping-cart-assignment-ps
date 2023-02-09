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
    categories,
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

exports.products = async (req, res, next) => {
  const reqProducts = await axios.get("http://localhost:5000/products");
  const reqCategories = await axios.get("http://localhost:5000/categories");
  const products = reqProducts.data.map((pro) => {
    return {
      ...pro,
      imageURL: pro.imageURL?.replace("/static/images", "/assets"),
    };
  });
  const categories = reqCategories.data.map((cat) => {
    return {
      ...cat,
      imageUrl: cat.imageUrl?.replace("/static/images", "/assets"),
    };
  });
  res.render("products", {
    title: "Products - Sabka Bazaar",
    products,
    categories,
  });
};
