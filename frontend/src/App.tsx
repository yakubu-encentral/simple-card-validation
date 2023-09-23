import CheckOut from "./components/checkout/checkout.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <div>
        <CheckOut />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
