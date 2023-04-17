import './App.css'
import Title from "./Title.js";
import Card from "./Card.js";

function App() {
  return (
      <p>
          <Title/>
          <Card textCardTitle={"Membres"} textCardValue={"152"}/>
          <Card textCardTitle={"Membres connectés"} textCardValue={"238"}/>
          <Card textCardTitle={"Messages dans général"} textCardValue={"4520"}/>
          <Card textCardTitle={"Messages par heure"} textCardValue={"69"}/>
      </p>
  );
}

export default App;