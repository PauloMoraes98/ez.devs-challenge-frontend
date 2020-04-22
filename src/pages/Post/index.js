import React, { useState, useEffect } from 'react';
import Header from '../../components/Header/index';
import api from '../../services/api';
import './styles.css';

export default function Post() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState();
    const [date, setDate] = useState();

    useEffect(() => {
        api.get(`/categories/${search}/posts`).then(response => {
            setPosts(response.data);
        })
    }, [search])

    useEffect(() => {
        api.get(`/posts/${date}`).then(response => {
            setPosts(response.data);
        })
    }, [date])

    useEffect(() => {
        api.get(`posts`).then(response => {
            setPosts(response.data);
        })
    }, [])

    useEffect(() => {
        api.get('categories').then(response => {
            setCategories(response.data);
        })
    }, []);

    function refreshPage(){
        window.location.reload();
    }

    return (
        <div>
            <Header> 
                Posts Cadastrados 
            </Header>
            <div className="search-container">
                <section className="form">
                    <form>
                        <select 
                            onChange={e => setSearch(e.target.value)}
                        >
                            <option disabled selected>
                                Selecione categoria que deseja filtrar:
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
                        <input 
                            type="date" 
                            onChange={e => setDate(e.target.value)}
                        />
                    </form>    
                </section>
            </div>
            <div className="post-container">
                <ul>
                    {posts.map(post => (
                        <li key={post.id}>
                            <strong>
                                Post: 
                            </strong>
                            <p>
                                {post.title}
                            </p>
                            <strong>
                                Descrição: 
                            </strong>
                            <p>
                                {post.description}
                            </p>
                            <strong>
                                Resumo:
                            </strong>
                            <p>
                                {post.resume}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>          
    );
}