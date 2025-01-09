import "./App.css";
import AppRoutes from "./components/Routes/AppRoutes";
import Modal from "./components/Modal"
import { useSelector } from "react-redux";
import { selectIsModalOpen } from "./redux/modal/selectors";

function App() {

  const isModalOpen = useSelector(selectIsModalOpen)

  return (
    <>
      <AppRoutes />
      {
        isModalOpen && (
          <Modal/>
        )
      }
    </>
  )
}

export default App;
