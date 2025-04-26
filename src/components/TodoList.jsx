import { useEffect, useState } from 'react';
import TodoItem from './TodoItem';
import AddTodo from './AddTodo';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TodoList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  const addTodo = (title) => {
    const newTodo = { title, completed: false };
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTodo)
    })
      .then(res => res.json())
      .then(data => {
        setTodos([...todos, data]);
        toast.success('Đã thêm công việc!', { autoClose: 2000 });
      });
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    fetch(`http://localhost:3001/todos/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    })
      .then(() =>
        setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
      );
  };

  const deleteTodo = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' })
      .then(() => {
        setTodos(todos.filter(t => t.id !== id));
        toast.error('Đã xóa công việc!', { autoClose: 2000 });
      });
  };

  return (
    <div className="todo-container max-w-3xl w-full p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        Danh sách công việc
      </h2>
      <AddTodo onAdd={addTodo} />
      <div className="mt-6 space-y-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">Chưa có công việc nào, hãy thêm ngay!</p>
        ) : (
          todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={toggleTodo}
              onDelete={deleteTodo}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TodoList;