import React, { useEffect } from 'react';
import { useSnapshot } from 'valtio';
import TodoStore from './TodoStore';

function App() {

  const _store = useSnapshot(TodoStore);

  useEffect(() => {
    TodoStore.init();
    return () => {
      TodoStore.destroy();
    }
  });

  return (
   <div>
      <style jsx>{`
        .header {
          margin: 16px;
        }
        h1, h2 {
          margin-left: 16px;
        }
        .close-icon {
          background: #000;
          color: #fff;
          width: 20px;
          height: 20px;
          margin-left: 16px;
          border-radius: 50%;
          display: inline-block;
          text-align: center;
          cursor: pointer;
        }
        ul li {
          margin: 8px 0;
        }
      `}
      </style>
    <h1>Todo App</h1>
    <div className='header'>
      <input type="text" id="task" />
      <button onClick={(e) => {
        const inputEle = e.currentTarget.parentElement.querySelector('input');
        const taskValue = inputEle.value;
        if (!taskValue) {
          alert("Enter a task");
          return;
        }
        inputEle.value = '';
        const task = {
          name: "Task-" + TodoStore.tasks.length,
          description: taskValue
        };
        TodoStore.tasks.push(task);
      }}>Add Task</button>
    </div>
    <h2>To do list</h2>
    <ul>
      {
        _store.isReady 
         ? _store.tasks.map((task, i) => <li key={i}>
            <span>{ task.description }</span>
            <span className='close-icon' onClick={() => {
              TodoStore.tasks.splice(i, 1);
            }}>x</span></li>)
         : <></>
      }
      {
        _store.tasks.length === 0 ? <li>Empty</li> : <></>
      }
    </ul>
   </div>
  );
}

export default App;
