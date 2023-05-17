const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter product name.."],
      trim: true,
    },
    description: {
      basicDescription: {
        type: String,
        required: [true, "Please enter product description.."],
      },
      KeyBenefits: {
        type: String,
      },
      howToUse: {
        type: String,
      },
      cautions: {
        type: String,
      },
      ingredients: {
        type: String,
      },
      faq: {
        type: String,
      },
    },
    price: {
      type: Number,
      required: [true, "Please enter product price.."],
      maxLength: [8, "Price cannot exceed 8 characters"],
    },
    isSaleActive: {
      type: Boolean,
      default: false,
    },
    saleStartDate: {
      type: Date,
      default: null,
    },
    saleEndDate: {
      type: Date,
      default: null,
    },
    salePercentage: {
      type: Number,
      min: 0,
      max: 100,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    image: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Please enter product category.."],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock.."],
      maxLength: [4, "stock cannot exceed 4 characters"],
      default: 1,
    },
    numberOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          max: 5,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        media: [
          {
            type: {
              type: String,
              enum: ["image", "video"],
              required: true,
            },
            url: {
              type: String,
              required: true,
            },
          },
        ],
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

productSchema.virtual("salePrice").get(function () {
  if (this.isSaleActive){
    const now = Date.now();
    if (now >= this.saleStartDate && now <= this.saleEndDate) {
    return this.price - (this.price * this.salePercentage) / 100;
    }
  }
  return this.price;
});
module.exports = mongoose.model("Product", productSchema);
