const createHttpError = require("http-errors");
const OrderModel = require("../Models/order");
const ProductModel = require("../Models/product");

exports.newOrder = async (req, res, next) => {
  try {
    const {
      paymentInfo,
      totalPrice,
      taxPrice,
      shippingPrice,
      grandTotalPrice,
      shippingInfo,
      orderItems,
    } = req.body;

    const order = await OrderModel.create({
      paymentInfo,
      totalPrice,
      taxPrice,
      shippingPrice,
      grandTotalPrice,
      shippingInfo,
      orderItems,
      paymentDate: Date.now(),
      user: req.user._id,
    });
    res.status(201).json({ success: true, order });
  } catch (error) {
    next(error);
  }
};

exports.getSingleOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id)
      .populate("user", "name email")
      .lean();
    if (!order) {
      throw createHttpError(404, "Order not found!");
    }
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

exports.userMyOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).lean();

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await OrderModel.find();
    const totalAmount = orders.reduce(
      (sum, order) => sum + order.grandTotalPrice,
      0
    );
    res.status(200).json({
      success: true,
      totalAmount,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      throw createHttpError(404, "Order not found with this ID!");
    }

    if (order.orderStatus === "Delivered") {
      throw createHttpError(400, "Order already delivered!");
    }

    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }

    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

async function updateStock(id, quantity) {
  const product = await ProductModel.findById(id);

  product.stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

exports.deleteOrder = async (req, res, next) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id).lean();
    if (!order) throw new Error("Order not found");
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    next(error);
  }
};
