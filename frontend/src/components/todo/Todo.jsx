import './Todo.css'
import PropTypes from 'prop-types'
// import { MdDelete } from 'react-icons/md'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useState } from 'react'

const Todo = ({ todo, onDelete, onUpdate }) => {
    const [task, setTask] = useState(todo.task)
    const [edit, setEdit] = useState(false)
    
    const handleDelete = () => {
        onDelete(todo.id)
    } 

    const handleUpdate = () => {
        onUpdate(todo.id, task)
        setEdit(false)
    }

    const handleEdit = () => {
        setEdit(true)
    }

    const handleInputChange = (e) => {
        setTask(e.target.value)
    }

    return (
        <div className="todo">
            {edit 
                ? <input 
                    type="text"
                    style={{ backgroundColor: 'rgba(48, 69, 68, 0.5)', width: '50%'}}
                    value={task}
                    onChange={handleInputChange}
                    onBlur={handleUpdate}
                    autoFocus
                    />
                :<h3>{todo.task}</h3>}
            <div className="buttons">
                <button onClick={handleDelete}><FaTrash /></button>
                <button onClick={handleEdit}><FaEdit /></button>
            </div>
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
    onUpdate: PropTypes.func.isRequired,
};

export default Todo