const cron = require("node-cron");
const Product = require("../Models/product");

cron.schedule("0 0 * * *", async () => { // Runs every day at midnight
    // cron.schedule("*/1 * * * *", async () => { // Runs every 5 minutes
        console.log("Cron job running...");
  const expiredSales = await Product.find({ saleEndDate: { $lt: new Date() } });
  if (expiredSales.length > 0) {
    await Promise.all(
      expiredSales.map(async (product) => {
        product.salePercentage = 0;
        product.saleEndDate = null;
        product.saleStartDate = null;
        await product.save();
      })
    );
    console.log(`${expiredSales.length} sales have expired.`);
  } else {
    console.log("No expired sales found.");
  }
});