import React, { Component } from "react";
import "./App.css";

import Query from "./Query";
import Mutation from "./Mutation";




class App extends Component {
  state = { count: "100", todoText: "" };

  handleCountChange = e => {
    this.setState({ count: e.target.value });
  };

  handleToDoTextChange = e => {
    this.setState({ todoText: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchData();
  };

  render() {
    return (
      <Query
        query={`
          query($count: Int) {
            todoItems(first: $count) {
              id
              text
              completed
            }
          }
        `}
        variables={{
          count: parseInt(this.state.count)
        }}
      >
        {({ refetch, loading, error, data }) => (
          <div className="app">
            <form
              className="count-form"
              onSubmit={e => {
                e.preventDefault();
                refetch();
              }}
            >
              <input
                type="number"
                value={this.state.count}
                placeholder="Enter the number of items to return"
                onChange={this.handleCountChange}
              />
              <input 
                type="text"  
                value={this.state.todoText}
                placeholder="Enter new to-do item" 
                onChange={this.handleToDoTextChange}
              />
              <Mutation
                mutation={`
                  mutation(
                    $data: TodoItemCreateInput!
                  ) {
                    createTodoItem(data: $data) {
                      text
                      completed
                    }
                  }
                `}
              >
                
                {({ mutate, data }) => {
                  

                  return (
                    <button 
                      onClick={() => {
                          mutate({
                            data: { text: this.state.todoText, completed: false }
                          });
                          setTimeout(function(){}, 100000);
                          refetch();
                        }
                      }
                    >
                      Submit
                    </button>
                    
                  );
                }}
              </Mutation>
            </form>
            <div className="item-list-container">
              <h1>To-do items:</h1>
              {error && <p>{error.message}</p>}
              {loading && <p>Loading...</p>}
              {data && (
                <ul className="item-list">
                  {data.todoItems.map(todoItem => (
                    <Mutation
                      mutation={`
                        mutation(
                          $where: TodoItemWhereUniqueInput!
                          $data: TodoItemUpdateInput!
                        ) {
                          updateTodoItem(where: $where, data: $data) {
                            id
                            text
                            completed
                          }
                        }
                      `}
                      key={todoItem.id}
                    >
                      {({ mutate, data }) => {
                        const mutationResultExists = Boolean(data);
                        const completed = mutationResultExists
                          ? data.updateTodoItem.completed
                          : todoItem.completed;

                        return (
                          <li
                            className={
                              completed ? "item-complete" : "item-incomplete"
                            }
                            onClick={() =>
                              mutate({
                                where: { id: todoItem.id },
                                data: { completed: !completed }
                              })
                            }
                          >
                            {todoItem.text}
                          </li>
                        );
                      }}
                    </Mutation>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
      </Query>
    );
  }
}

export default App;
