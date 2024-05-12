const Inventory = require('../models/inventory')

// module.exports = {
//   addInventory: async (inventoryData) => {
//     try {
//       return await Product.insertMany(inventoryData);
//     } catch (error) {
//       console.error("Error adding inventory:", error);
//       throw new Error('Failed to add inventory to the database');
//     }
//   },
//   // Other inventory-related controller functions...
// };

// Controller method to insert vendors' data with geopoints
const insertInventory = async (req, res) => {
  try {
    // // Extract vendor data including geopoint from request body
    // const { vendorData } = req.body;
    // console.log(JSON.stringify(req.body))
    // // Create a new vendor instance
    const newProduct = new Inventory(req.body);

    // Save the vendor to the database
    await newProduct.save();

    res.status(201).json({ message: 'Inventory data inserted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controller function to get inventory by SKU ID
const getInventoryBySkuId = async (req, res) => {
  try {
    // Extract the SKU ID from the request parameters
    const { skuids } = req.body;

    const inventoryArray = [];
    
    for (let i = 0; i < skuids.length; i++) {
      const inventory = await Inventory.findOne({ skuId: skuids[i] });
      inventoryArray.push(inventory);
    }
    // If inventory data exists, send it in the response
    if (inventoryArray.length > 0) {
      res.status(200).json({ success: true, data: inventoryArray });
    } else {
      // If no inventory data found, send an appropriate message
      res.status(404).json({ success: false, message: 'Inventory not found for the provided SKU IDs' });
    }
  } catch (error) {
    // If an error occurs, send an error response
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { insertInventory, getInventoryBySkuId }