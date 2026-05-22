import InvoiceForm from "./components/InvoiceForm";
import API from "./services/api";
import { toast, ToastContainer } from "react-toastify";

function App() {
  const saveInvoice = async (data) => {
    try {
      await API.post("/invoices", data);
      toast.success("Invoice Saved");
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <ToastContainer />

      <h1 className="text-3xl font-bold mb-6">
        Invoice Generator
      </h1>

      <InvoiceForm onSave={saveInvoice} />
    </div>
  );
}

export default App;