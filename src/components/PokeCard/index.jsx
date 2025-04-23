import './index.css'




const PokeCard = ({frenchName, englishName, type, image, base}) => {
    // console.log("🚀 ~ PokeCard ~ props:", props)
    // console.log(typeof props)

    const typeClassName = `type-${type[0]}`

    
    return (
        <div className={`poke-card ${typeClassName}`}>
            <div className="poke-card-header-name"> 
            <span>{frenchName}</span>
            <span>{englishName}</span>
            </div>
            <div className="poke-card-type">
                {type.map(type => {
                    return (
                        <span>{type}</span>
                    )
                })}
            </div>
            <div className="poke-card-image">
                <img className="poke-card-image-img" src={image} alt={englishName} />
            </div>
            <div className="poke-card-base">
                <span>HP: {base.HP}</span>
                <span>Attack: {base.Attack}</span>
                <span>Defense: {base.Defense}</span>
                <span>Speed: {base.Speed}</span>
            </div>
        </div>
    )
}

export default PokeCard;