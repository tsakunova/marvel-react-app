import './charList.scss';
import { Component } from 'react';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';

class CharList extends Component {
    state = {
        charList: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateCharList()
    }

    updateCharList = () => {
        this.marvelService
            .getAllCharacters()
            .then(this.onCharLoaded)
    }

    onCharLoaded = (charList) => {
        this.setState({
            charList,
            loading: false
        })
    }

     onError = () => {
         this.setState({
             error: true,
             loading: false
         })
     }
    
    renderItems = (arr) => {
        const CharLi = arr.map(char => {
            const {
                id,
                name,
                thumbnail,
            } = char;
            let imgStyle = {
                'objectFit': 'cover'
            };
            if (thumbnail.includes('image_not_available')) {
                imgStyle = {
                    'objectFit': 'unset'
                };
            }
                return (
                    <li className="char__item" key={id}
                    onClick={()=> this.props.onCharSelected(id)}>
                        <img src={thumbnail} alt={name} style={imgStyle}/>
                        <div className="char__name">{name}</div>
                    </li>
                )
        })
        return (
            <ul className="char__grid">
               {CharLi}
            </ul>
        )
    }

    render() {
        const {
            charList,
            loading,
            error
        } = this.state;
        const items = this.renderItems(charList);
        
       const errorMessage = error ? <ErrorMessage/> : null;
       const spinner = loading ? < Spinner/> : null;
       const content = !(loading || error) ? items : null;
        
       return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    ) 
    }
    
}

export default CharList;