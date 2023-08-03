import { useEffect, useState } from "react"
import Card from "./Card"

const countryCodes = ["AE", "AF", "AM", "AT", "AU", "BE", "BO", "BZ", "CL", "CN", "CR", "DE", "EG", "JM", "MX", "NZ", "PH", "PR", "SE", "TH", "US", "VE", "ZA"]
const introText = "Welcome to the Memory game! Choose as many flags as you can, but be sure not to repeat yourself!"

export default function Content() {
    const [score, setScore] = useState(0)
    const [highScore, setHighScore] = useState(0)
    const [chosenFlags, setChosenFlags] = useState([])
    const [displayMessage, setDisplayMessage] = useState(introText)
    const [displayColor, setDisplayColor] = useState("white")
    const [scoreColor, setScoreColor] = useState("white")

    useEffect(() => {
        if (score >= highScore) {
            if (highScore > 0) {
                setScoreColor("green")
            }
            setHighScore(score);
        } else {
            setScoreColor("white")
        }
    }, [score, highScore])

    useEffect(() => {
        if (highScore >= countryCodes.length) {
            setDisplayColor("green")
            setDisplayMessage("You win! You've found all the flags!");
        }
    }, [highScore])

    const addPoint = () => setScore(score+1)
    const resetScore = () => setScore(0)
    const randomCountryCode = () => countryCodes[Math.floor(Math.random() * countryCodes.length)]

    const handleClick = (event) => {
        let val = event.target.value || event.target.id
        if (chosenFlags.includes(val)) {
            resetScore()
            setChosenFlags([])
            setDisplayColor("red")
            setDisplayMessage(`Sorry, ${val} already picked. Game over.`)
        } else {
            addPoint()
            setDisplayMessage(`Correct!`)
            setDisplayColor("white")
            setChosenFlags(chosenFlags => [...chosenFlags, val]);
        }
    }


    return (
        <div className="content">
            <div className="scoreboard">
                <p>Score: {score}</p>
                <p>High Score: <span style={{color: scoreColor}}>{highScore}</span></p>
            </div>
            <p className="message" style={{color: displayColor}}>{displayMessage}</p>
            <div className="playboard">
                <Card countryCode={randomCountryCode()} click={handleClick} />
                <Card countryCode={randomCountryCode()} click={handleClick}/>
                <Card countryCode={randomCountryCode()} click={handleClick}/>
                <Card countryCode={randomCountryCode()} click={handleClick}/>
                <Card countryCode={randomCountryCode()} click={handleClick}/>
                <Card countryCode={randomCountryCode()} click={handleClick}/>
            </div>
        </div>
    )
}