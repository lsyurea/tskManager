import './Todo.css'
import PropTypes from 'prop-types'
import { MdDelete } from 'react-icons/md'

const Todo = ({ todo, onDelete }) => {
    const handleDelete = () => {
        onDelete(todo.id)
    } 
    return (
        <div className="todo">
            <h3>{todo.task}</h3>
            <button onClick={handleDelete}><MdDelete /></button>
        </div>
    )
}

// good practice to include propType validation
Todo.propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      task: PropTypes.string.isRequired,
    }).isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default Todo