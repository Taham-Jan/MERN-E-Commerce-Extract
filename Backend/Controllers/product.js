const createHttpError = require("http-errors");
const Product = require("../Models/product");
const ApiFeatures = require("../util/apiFeatures");
const cloudinary = require("cloudinary");

exports.createProduct = async (req, res, next) => {
  try {
    let images = req.body.image;
    if (typeof images === "string") {
      images = [images];
    }
    const flattenedImages = flatten(images);
    const imageLink = [];
    for (let i = 0; i < flattenedImages.length; i++) {
      try {
      const result = await cloudinary.v2.uploader.upload(flattenedImages[i], {
        resource_type: "auto",
        folder: "products",
        timeout: 120000,
        allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4"],
      });
      imageLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    } catch (error) {
      next(`Error uploading image ${error.message}`);
      console.log(`Error uploading image ${error.message}`);
    }
    }
    req.body.image = imageLink;
    req.body.user = req.user.id;
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      throw createHttpError(404, "Product not found!");
    }

    let image = [];

    if (typeof req.body.image === "string") {
      image.push(req.body.image);
    } else {
      image = req.body.image;
    }

    const flattenedImage = flatten(image);

    if (flattenedImage.length > 0) {
      // Deleting image From Cloudinary
      for (let i = 0; i < product.image.length; i++) {
        await cloudinary.v2.uploader.destroy(product.image[i].public_id),
          {
            timeout: 120000,
          };
      }

      const imageLinks = [];

      for (let i = 0; i < flattenedImage.length; i++) {
        try {
        const result = await cloudinary.v2.uploader.upload(flattenedImage[i], {
          resource_type: "auto",
          timeout: 120000,
          folder: "products",
          allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4"],

        });

        imageLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      } catch (error) {
        next(`Error uploading image ${error.message}`);
        console.log(`Error uploading image ${error.message}`);
      }
      }

      req.body.image = imageLinks;
    } else {
      req.body.image = product.image;
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};
function flatten(arr) {
  if (!arr || arr.length === 0) {
    return [];
  }
  return arr.reduce(function (flat, toFlatten) {
    return flat.concat(
      Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten
    );
  }, []);
}
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw createHttpError(404, "Product not found!");
    }

    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.v2.uploader.destroy(product.image[i].public_id);
    }
    for (let i = 0; i < product.image.length; i++) {
      await cloudinary.v2.uploader.destroy(product.image[i].public_id, {
        resource_type: "video",
      });
    }

    await product.deleteOne();
    res
      .status(200)
      .json({ success: true, message: "Product Deleted Success!" });
  } catch (error) {
    next(error);
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    // throw createHttpError(500,"TEST ERROR");
    const resultPerPage = 8;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query.clone();
    // Add sale price and sale end date if sale is active
    const now = new Date();
    products = products.map((product) => {
      const isSaleActive =
        product.saleEndDate > now && product.saleStartDate <= now;
      const salePrice = isSaleActive
        ? product.price - (product.price * product.salePercentage) / 100
        : null;
      return {
        ...product.toJSON(),
        price: product.price,
        originalPrice: isSaleActive ? product.price : null,
        salePrice: isSaleActive ? salePrice : null,
        isSaleActive,
        saleStartDate: isSaleActive ? product.saleStartDate : null,
        saleEndDate: isSaleActive ? product.saleEndDate : null,
      };
    });

    res.status(200).json({
      success: true,
      products,
      productCount,
      resultPerPage,
      filteredProductCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllAdminProducts = async (req, res, next) => {
  try {
    let products = await Product.find();
// Add sale price and sale end date if sale is active
const now = new Date();
products = products.map((product) => {
  const isSaleActive =
    product.saleEndDate > now && product.saleStartDate <= now;
  const salePrice = isSaleActive
    ? product.price - (product.price * product.salePercentage) / 100
    : null;
  return {
    ...product.toJSON(),
    price: product.price,
    originalPrice: isSaleActive ? product.price : null,
    salePrice: isSaleActive ? salePrice : null,
    isSaleActive,
    saleStartDate: isSaleActive ? product.saleStartDate : null,
    saleEndDate: isSaleActive ? product.saleEndDate : null,
  };
});
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    next(error);
  }
};
exports.getProductDetails = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      throw createHttpError(404, "Product not found!");
    }
    const now = new Date();

    const isSaleActive =
      product.saleEndDate > now && product.saleStartDate <= now;
    const salePrice = isSaleActive
      ? product.price - (product.price * product.salePercentage) / 100
      : null;
    const productDetails = {
      ...product.toJSON(),
      price: product.price,
      originalPrice: isSaleActive ? product.price : null,
      salePrice: isSaleActive ? salePrice : null,
      isSaleActive,
      saleStartDate: isSaleActive ? product.saleStartDate : null,
      saleEndDate: isSaleActive ? product.saleEndDate : null,
    };
    res.status(200).json({
      success: true,
      product: productDetails,
    });
  } catch (error) {
    next(error);
  }
};

//REVIEW
exports.createProductReview = async (req, res, next) => {
  try {
    let { rating, comment, media, productId } = req.body;
    if (typeof media === "string") {
      media = [media];
    }
    const flattenedImages = flatten(media);
    const imageLink = [];
    for (let i = 0; i < flattenedImages.length; i++) {
      const result = await cloudinary.v2.uploader.upload(flattenedImages[i], {
        // resource_type: "auto",
        folder: "reviewImages",
        // allowed_formats: ["jpg", "jpeg", "png", "gif", "mp4"],
      });
      imageLink.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
    const review = {
      user: req.user._id,
      name: req.user.name,
      rating: Number(rating),
      comment,
      media: imageLink,
    };

    const product = await Product.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );

    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numberOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg = avg + rev.rating;
    });
    product.ratings = avg / product.reviews.length;
    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

exports.getProductReviews = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.id);

    if (!product) {
      throw createHttpError(404, "Product not found!");
    }

    res.status(200).json({
      success: true,
      reviews: product.reviews,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteReview = async (req, res, next) => {
  try {
    const product = await Product.findById(req.query.productId);

    if (!product) {
      throw createHttpError(404, "Product not found!");
    }

    const reviews = product.reviews.filter(
      (rev) => rev._id.toString() !== req.query.id.toString()
    );
    for (let i = 0; i < reviews.media.length; i++) {
      await cloudinary.v2.uploader.destroy(reviews.media[i].public_id);
    }

    let avg = 0;

    reviews.forEach((rev) => {
      avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
      ratings = 0;
    } else {
      ratings = avg / reviews.length;
    }

    const numberOfReviews = reviews.length;

    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numberOfReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

// exports.getAllProductsReviews = async (req, res,next) => {
//   try {
//     const products = await Product.find({});
//     const allReviews = [];
//     products.forEach((product) => {
//       allReviews.push(...product.reviews);
//     });
//     res.status(200).json({ success: true, reviews: allReviews });
//   } catch (error) {
//     next(error);
//   }
// };
exports.getAllProductsReviews = async (req, res, next) => {
  try {
    const products = await Product.find({});
    const allReviews = [];
    products.forEach((product) => {
      product.reviews.forEach((review) => {
        allReviews.push({
          ...review.toObject(),
          productId: product._id,
          productImages:product.image
        });
      });
    });
    res.status(200).json({ success: true, reviews: allReviews });
  } catch (error) {
    next(error);
  }
};
