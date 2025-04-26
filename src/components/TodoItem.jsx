import { Trash2 } from 'lucide-react';

function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item flex items-center justify-between p-4 bg-gray-50 rounded-xl shadow-sm hover:bg-gray-100 transition-all">
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggle(todo.id)}
          className="w-6 h-6 accent-blue-600 rounded-md"
        />
        <span
          className={`todo-title text-lg font-medium ${
            todo.completed ? 'line-through text-gray-400' : 'text-gray-800'
          }`}
        >
          {todo.title}
        </span>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="todo-delete w-10 h-10 flex items-center justify-center bg-red-100 hover:bg-red-500 text-red-600 hover:text-white rounded-full transition-all"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default TodoItem;