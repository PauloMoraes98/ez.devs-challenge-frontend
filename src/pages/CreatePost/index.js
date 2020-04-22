import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Post() {
    //Create post
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [resume, setResume] = useState('');
    const [category_id, setCategory_id] = useState();

    const history = useHistory();
    
    //Cadastrar novo post
    function handleNewPost(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            resume,
            category_id    
        };
        
        try {
            api.post(`/categories/${category_id}/posts`, data);
            alert("Cadastro realizado com sucesso!");
            

            history.push('/');
        } catch (err) {
            alert("Erro no cadastro, tente novamente.")
        }
    }

    //Listar categoria
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get('categories').then(response => {
            setCategories(response.data);
            console.log(response.data)
        })
    }, [])

    //Listar posts
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('posts').then(response => {
            setPosts(response.data);
        })
    }, [])

    //Deletar post
    async function handleDeletePost(id){
        try {
            await api.delete(`posts/${id}`);

            setPosts(posts.filter(post => post.id != id))
        } catch (err) {
            alert('Erro ao deletar post, tente novamente.')
        }
    }

    function buttonCancel(){
        return history.push('/');
    }

    return (
        <div>
            <Header> 
                Cadastrar post
            </Header>
            <div className="create-post-container">
                <form onSubmit={handleNewPost}>
                    <input 
                        placeholder="Digite o titulo" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <div className="input-group">
                        <select
                            onChange={e => setCategory_id(e.target.value)}
                        >
                            <option disabled selected>
                                Categoria:
                            </option>
                            {categories.map(category => (
                                <option 
                                    value={category.id}
                                    key={category.id}
                                >
                                    {category.category}
                                </option>
                            ))}
                        </select>               
                    </div>
                    <input 
                        placeholder="Digite a Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <textarea 
                        placeholder="Digite o resumo" 
                        value={resume}
                        onChange={e => setResume(e.target.value)}
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
            </div>

            <div className="list-post-container">
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <strong>
                                Post: 
                            </strong>
                            <p>
                                {post.title}
                            </p>
                            <button onClick={() => handleDeletePost(post.id)} className="btnExcluir">
                                Excluir
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}