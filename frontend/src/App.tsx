import { useSelector } from "react-redux";
import Header from "./components/Header";
import { ProductContainer } from "./components/ProductContainer";
import { RootState } from "./redux/store";
import { CustomAlert } from "./components/Alert";
import { hideAlert } from "./redux/alertSlice";

function App() {
  const alert = useSelector((state: RootState) => state.alert);

  return (
    <div className="homepage">
      <Header />
      <ProductContainer />
      <CustomAlert
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={hideAlert}
      />
      ;
    </div>
  );
}

export default App;
