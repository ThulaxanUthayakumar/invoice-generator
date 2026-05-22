import { useState } from "react";

const InvoiceForm = ({ onSave }) => {
  const [invoice, setInvoice] = useState({
    clientName: "",
    clientEmail: "",
    status: "Draft",
    items: [
      {
        description: "",
        quantity: 1,
        price: 0,
      },
    ],
    tax: 0,
    discount: 0,
    notes: "",
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoice.items];
    updatedItems[index][field] = value;

    setInvoice({
      ...invoice,
      items: updatedItems,
    });
  };

  const addItem = () => {
    setInvoice({
      ...invoice,
      items: [
        ...invoice.items,
        {
          description: "",
          quantity: 1,
          price: 0,
        },
      ],
    });
  };

  const subtotal = invoice.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const total =
    subtotal +
    subtotal * (invoice.tax / 100) -
    subtotal * (invoice.discount / 100);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      ...invoice,
      subtotal,
      total,
      invoiceNumber: `INV-${Date.now()}`,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 rounded-xl shadow"
    >
      <input
        type="text"
        placeholder="Client Name"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setInvoice({ ...invoice, clientName: e.target.value })
        }
      />

      <input
        type="email"
        placeholder="Client Email"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setInvoice({ ...invoice, clientEmail: e.target.value })
        }
      />

      {invoice.items.map((item, index) => (
        <div key={index} className="grid grid-cols-3 gap-2">
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded"
            onChange={(e) =>
              handleItemChange(index, "description", e.target.value)
            }
          />

          <input
            type="number"
            placeholder="Qty"
            className="border p-2 rounded"
            onChange={(e) =>
              handleItemChange(index, "quantity", Number(e.target.value))
            }
          />

          <input
            type="number"
            placeholder="Price"
            className="border p-2 rounded"
            onChange={(e) =>
              handleItemChange(index, "price", Number(e.target.value))
            }
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addItem}
        className="bg-gray-200 px-4 py-2 rounded"
      >
        Add Item
      </button>

      <input
        type="number"
        placeholder="Tax %"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setInvoice({ ...invoice, tax: Number(e.target.value) })
        }
      />

      <input
        type="number"
        placeholder="Discount %"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setInvoice({ ...invoice, discount: Number(e.target.value) })
        }
      />

      <textarea
        placeholder="Notes"
        className="w-full border p-2 rounded"
        onChange={(e) =>
          setInvoice({ ...invoice, notes: e.target.value })
        }
      />

      <button className="bg-black text-white px-6 py-2 rounded">
        Save Invoice
      </button>
    </form>
  );
};

export default InvoiceForm;