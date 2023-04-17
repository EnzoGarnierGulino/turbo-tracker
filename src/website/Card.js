import React from "react";
import CardTitle from "./CardTitle.js";
import CardValue from "./CardValue.js";

const Card = ({textCardTitle, textCardValue}) => {
    return (
        <p className={"card"}>
            <CardTitle textCardTitle={textCardTitle}/>
            <CardValue textCardValue={textCardValue}/>
        </p>
    )
};

export default Card;