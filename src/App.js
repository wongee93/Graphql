import './App.css';
import { graphql } from "@octokit/graphql";
import { useState, useEffect } from "react";

function App() {

  let [discussion, setDiscussion] = useState([]);

  async function agoradiscussion(){
    
    const { repository } = await graphql(
      `
        {
          repository(owner: "codestates-seb", name: "agora-states-fe") {
            discussions(last: 15) {
              edges {
                node {
                  title
                  createdAt
                  id
                  author {
                    avatarUrl
                    login
                  }
                  answer {
                    author {
                      login
                    }
                  }
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token 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`,
        },
      }
    );
    return repository;
  }

  useEffect(() => {
    agoradiscussion()
    .then(res => {
      console.log(res.discussions.edges);
      setDiscussion(res.discussions.edges);
    })
  },[])


  return (
    <div className="App">
      <header className="App-header">
      <div>
      <div>{discussion.map((el, idx)=>{
        return (<ul key={idx}>
          <li>Title : {el.node.title}</li>
          <li>ID : {el.node.author.login} / Date : {el.node.createdAt}</li>
          <li>Answer : {el.node.answer !== null? <span>O</span> : <span>X</span>}</li>
        </ul>)
      })}</div>
    </div>      
      </header>
    </div>
  );
}

export default App;
