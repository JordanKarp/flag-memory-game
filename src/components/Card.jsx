export default function Card( {countryCode, click} ) {
    const returnCode = () => {
        console.log(countryCode)
        return countryCode
    }
    let url = `https://flagsapi.com/${countryCode}/flat/64.png`
    return (
        <button className="card" onClick={click} value={countryCode} key={countryCode}>
            <img src={url} value={countryCode} onClick={() => returnCode} id={countryCode} />
            {/* <p className="code" id={countryCode}>{countryCode}</p> */}
        </button>
    )
}