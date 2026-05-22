const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: String,
    clientName: String,
    clientEmail: String,
    status: {
      type: String,
      enum: ["Draft", "Pending", "Paid", "Overdue"],
      default: "Draft",
    },
    items: [itemSchema],
    subtotal: Number,
    tax: Number,
    discount: Number,
    total: Number,
    notes: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Invoice", invoiceSchema);