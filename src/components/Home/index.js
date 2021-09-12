import React from "react";

function loadBoards(setStateFunction) {
  fetch("http://localhost:8010/proxy/boards.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      setStateFunction(response.boards);
    });
}

function loadPosts(setStateFunction, boardId) {
  fetch("http://localhost:8010/proxy/" + boardId + "/1.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      setStateFunction(response.threads);
    });
}


function cleanBoards(setStateFunction) {
  setStateFunction([]);
}

function Home() {



  const [boards, setBoards] = React.useState([]);

  const [threads, setThreads] = React.useState([]);
  
  
  return (
    <div>
      <button
        type="button"
        class="btn btn-primary"
        onClick={() => loadBoards(setBoards)}
      >
        Load Boards
      </button>
      <button
        type="button"
        class="btn btn-secondary"
        onClick={() => cleanBoards(setBoards)}
      >
        Clean Boards
      </button>
      <div class="container">
        <div class="row flex-nowrap">
          {boards.map(function (board) {
            return (
              <div class="col-sm">
                <div class="card">
                  <div class="card-body">
                    <h5 class="card-title">{board.title}</h5>
                    <button
                      type="button"
                      class="btn btn-primary"
                      onClick={() => loadPosts(setThreads, board.board)}
                    >
                      {" "}
                      Load Post{" "}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {threads.map(function (thread) {
        return (
          <div class="card">
            <div class="card-body">
              <p class="card-text">
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </p>
              <ul class="list-group">
                {thread.posts.map(function (post) {
                  return (
                    <li class="list-group-item">
                      <span dangerouslySetInnerHTML={{ __html: post.com }} />
                    </li>
                  );
                })}
                

              </ul>
            </div>
          </div>
        );
      })}
      
    </div>
  );
}

export default Home;
