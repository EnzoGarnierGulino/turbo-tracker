import {useNavigate} from "react-router-dom";
import Title from "./Title.js";
import Card from "./Card.js";

let nMembers = 100;
let nMembersConnected = 50;
let nMessages = 10000;
let nMessagesPerHour = 200;

function Homepage() {
    let navigate = useNavigate();
    const routeChange = () => {
        console.log("test")
        let path = `/About`;
        navigate(path);
    }

    return (
        <div>
            <Title onClick={routeChange}/>
            <Card textCardTitle={"Membres"} textCardValue={nMembers}/>
            <Card textCardTitle={"Membres connectés"} textCardValue={nMembersConnected}/>
            <Card textCardTitle={"Messages dans général"} textCardValue={nMessages}/>
            <Card textCardTitle={"Messages par heure"} textCardValue={nMessagesPerHour}/>
        </div>
    )
}

export default Homepage;