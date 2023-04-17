import './App.css'
import Title from "./Title.js";
import Label from "./Label.js";

function App() {
  return (
      <p>
        <Title/>
        <Label text={"Nombre d'utilisateurs : "}/>
        <Label text={"Nombre d'utilisateurs connectés :"}/>
          <Label text={"Nombre de messages dans général : "}/>
          <Label text={"Nombre de messages par heure :"}/>
      </p>
  );
}

export default App;