import './index.css'

import { useNavigate } from 'react-router'


const PokeCard = ({frenchName, englishName, type = [], image, base, id, onClick = () => null}) => {

    const typeClassName = `type-${type[0]}`

    
    
    return (
        <div onClick={onClick} className={`poke-card ${typeClassName}`}>
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
                <span>HP: {base?.HP || 0}</span>
                <span>Attack: {base?.Attack || 0}</span>
                <span>Defense: {base?.Defense || 0}</span>
                <span>Speed: {base?.Speed || 0}</span>
            </div>
        </div>
    )
}

export default PokeCard;