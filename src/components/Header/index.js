import React from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import './styles.css';

export default function Header({ children }) {
    const history = useHistory();
    function refreshPage(){
        window.location.reload(history.push('/'));
    }

    return (
        <div>
            <div className="logo">
                WebPost 
            </div>
            <div className="header-container">
                <section className="link">
                    <Link to="/" onClick={ refreshPage }>
                        LISTAR POSTS
                    </Link>
                    <Link to="/post/new" refresh="true">
                        CADASTRAR POST
                    </Link>
                    <Link to="/category/new" refresh="true">
                        CADASTRAR CATEGORIA
                    </Link>
                    <Link to="/post/change" refresh="true">
                        ALTERAR POST
                    </Link>
                </section>
            </div>
            <div className="title">
                <h1>
                    { children }
                </h1>
            </div>
        </div>
    );
}