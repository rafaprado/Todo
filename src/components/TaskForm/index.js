import './TaskForm.css';
import { AiOutlinePlusCircle } from 'react-icons/ai'

const TaskForm = (props) => {
    return (
        <form onSubmit={event => props.submit(event)} className='taskForm'>
            <input type='text' spellCheck="false" placeholder='Type a task here' required />
            <button type='submit'>
                Create
                <AiOutlinePlusCircle size={24} />
            </button>
        </form>
    );
}

export default TaskForm;