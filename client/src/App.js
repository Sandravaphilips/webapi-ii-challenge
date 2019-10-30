import React, {useState, useEffect} from 'react';
import axios from 'axios';
import styled from 'styled-components'
import './App.css';

const AppStyle = styled.div`
  div{
    display: flex;
    flex-wrap: wrap;
    padding: 15px 20%;

    div{
      border: 1px solid black;
      background-color: lightgreen;
      border-radius:8px;
      width: 200px;
    }
  }
`

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:500/api/posts')
    .then(res => {
      setPosts(res.data)
    })
    .catch(err => console.log(err))
  })

  return (
    <AppStyle className="App">
      <h1>Welcome To My Posts' Page</h1>

      <div>
        {posts.map(post => {
          <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.contents}</p>
          </div>
        })}
      </div>
    </AppStyle>
  );
}

export default App;
