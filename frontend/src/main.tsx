import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";

console.log(import.meta.env)
ReactDOM.createRoot(document.getElementById("root")!).render(<App />);