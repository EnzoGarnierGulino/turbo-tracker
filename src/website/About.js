import './App.css'
import Title from "./Title.js";

function About() {
    return (
        <div>
            <Title/>
            <p className={"aboutPresentation"}>
                TurboTracker est un ensemble de technologies permettant d'accéder, de sauvegarder et
                d'afficher les statistiques d'un serveur Discord. Il comprend un bot Discord qui
                récupère les statistiques, une base de données SQLite qui stocke les données,
                et un affichage dynamique et propre grâce à un site web. TurboTracker a été codé
                en Javascript.
            </p>
        </div>
    );
}

export default About;