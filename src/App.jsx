import "./App.css";
import { CarComponent } from "./components/CarComponent";
import { FormComponent } from "./components/FormComponent";
import { NavbarComponent } from "./components/NavbarComponent";

function App() {
  return (
    <>
      <NavbarComponent />
      <FormComponent />
      <CarComponent/>
    </>
  );
}

export default App;
