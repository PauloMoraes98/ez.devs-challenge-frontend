import React, { useState, useEffect }from 'react';
import Header from '../../components/Header/index';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Post() {
    const [category, setCategory] = useState('');
    const [categories, setCategories] = useState([]);

    const history = useHistory();

    //Adicionando categoria
    function handleNewCategory(e) {
        e.preventDefault();

        const data = {
            category 
        };

        try {
            api.post('categories', data);
            alert("Cadastro realizado com sucesso!");

            history.push('/');
        } catch (err) {
            alert("Erro no cadastro, tente novamente.")
        }
    }

    //listando categoria
    useEffect(() => {
        api.get('categories').then(
            response => {
                setCategories(response.data)
            }
        )
    }, [])

    //deletar categoria
    async function handleDeleteCategory(id){
        try {
            await api.delete(`categories/${id}`);

            setCategories(categories.filter(category => category.id != id))
        } catch (err) {
            alert('Erro ao deletar categoria, tente novamente.')
        }
    }

    function buttonCancel(){
        return history.push('/');
    }

    return (
        <div>
            <Header> 
                Cadastrar categoria
            </Header>
            <div className="create-category-container">
                <section className="form">
                    <form onSubmit={handleNewCategory}>
                        <input 
                            placeholder="Digite a categoria" 
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        />
                        <div className="style-button">
                            <button className="btnCancelar" onClick={() => buttonCancel()}>
                                Cancelar
                            </button>
                            <button className="btnSalvar" type="submit">
                                Salvar
                            </button>
                        </div>
                    </form>    
                </section>
            </div>
            
            <div className="list-post-container">
                <ul>
                   {categories.map(category =>
                        <li>
                            <strong>
                                Categoria: 
                            </strong>
                            <p>
                                {category.category}
                            </p>
                            <button onClick={() => handleDeleteCategory(category.id)} className="btnExcluir">
                                Excluir
                            </button>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}