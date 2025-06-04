import './index.css'

import { useNavigate } from 'react-router'

const PokeCard = ({frenchName, englishName, type = [], image, base = {}, onClick = () => null}) => {
    // console.log("🚀 ~ PokeCard ~ props:", props)
    // console.log(typeof props)

    const typeClassName = `type-${type[0]}`

    
    
    return (
        <div onClick={onClick} className={`poke-card ${typeClassName}`}>
            <div className="poke-card-header-name"> 
                <span>{frenchName}</span>
                <span>{englishName}</span>
            </div>
            <div className="poke-card-type">
                {type.map((pokemonType, index) => (
                    <span key={index}>{pokemonType}</span>
                ))}
            </div>
            {image ? (
                <div className="poke-card-image">
                    <img className="poke-card-image-img" src={image} alt={englishName} />
                </div>
            ) : (
                <div className="pokeball-loader">
                    <div className="pokeball">
                        <div className="pokeball-top"></div>
                        <div className="pokeball-middle"></div>
                        <div className="pokeball-bottom"></div>
                    </div>
                </div>
            )}
            <div className="poke-card-base">
                <span>HP: <strong>{base?.HP || 0}</strong></span>
                <span>Attack: <strong>{base?.Attack || 0}</strong></span>
                <span>Defense: <strong>{base?.Defense || 0}</strong></span>
                <span>Speed: <strong>{base?.Speed || 0}</strong></span>
            </div>
        </div>
    )
}

export default PokeCard;