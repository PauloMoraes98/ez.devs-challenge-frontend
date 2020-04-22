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
    const [posts_id, setPosts_id] = useState();

    const history = useHistory();

    //Cadastrar novo post
    function handleNewPost(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            resume   
        };
        
        try {
            api.put(`/posts/${posts_id}`, data);
            alert("Post alterado com sucesso!");
            

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
        })
    }, [])

    //Listar post
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get('posts').then(response => {
            setPosts(response.data);
        })
    }, [])

    function buttonCancel(){
        return history.push('/');
    }

    return (
        <div>
            <Header> 
                Alterar post
            </Header>
            <div className="change-post-container">
                <form className="change-post-form" onSubmit={handleNewPost}>
                    <select className="selectPost"
                        onChange={e => setPosts_id(e.target.value)}
                    >
                        <option>Selecione o post que será alterado:</option>
                        {posts.map(post => (
                            <option 
                                value={post.id}
                                key={post.id}
                            >
                                {post.title}
                            </option>
                            ))}
                    </select>
                    <input 
                        placeholder="Digite o titulo" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <div className="input-group">
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
                    </div>
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
        </div>
    );
}