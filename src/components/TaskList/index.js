import './TaskList.css';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import { GoPencil } from 'react-icons/go';

const TaskList = (props) => {

    function onClickEdit(event) {
        const parent = event.currentTarget.parentNode.parentNode;
        const taskText = parent.querySelector(".task__text");
        const actions = event.currentTarget.parentNode;

        taskText.readOnly = false;
        taskText.focus();
        taskText.classList.add("task__text--editing");
        actions.classList.add("task__actions--editing");

    }

    function onBlurEdit(event) {
        const target = event.target;
        const parent = target.parentNode.parentNode;
        const actionsEl = parent.querySelector(".task__actions");

        target.classList.remove("task__text--editing");
        actionsEl.classList.remove("task__actions--editing")
        target.readOnly = true;
    }

    function onPressEnterEditing(event) {
        if(event.key === "Enter") {
            event.target.blur();
        }
    }

    return (
        <section className='taskList'>
            <div className='progress'>
                <div className='created'>
                    Created tasks
                    <span>{props.tasks.length}</span>
                </div>
                <div className='completed'>
                    Completed
                    <span>{`${props.completedTasks} of ${props.tasks.length}`}</span>
                </div>
            </div>

            <ul>
                {(props.tasks.length === 0 ) ? 
                <div className='empty-taskList'>
                    <p>There is no tasks available! 🤷‍♂️</p>
                </div>
                : 
                props.tasks.map(task => {
                    return (
                    <li key={task.id} className={`task ${task.completed ? 'task-completed' : ''}`}>
                        <div className='task__content'>
                            <input className="task-checkbox-input" id={task.id} onChange={event => props.completeTask(task.id)}  checked={task.completed ? 'checked' : ''} type='checkbox' />
                            <label className='task-checkbox' htmlFor={task.id}>
                                <AiOutlineCheck strokeWidth="70" className='task-checkbox__check-icon' />
                            </label>
                            <input onKeyDown={event => onPressEnterEditing(event)} spellCheck="false" onBlur={event => onBlurEdit(event)} onChange={event => props.onUpdateTask(task.id, event.target.value)} className='task__text' type='text' readOnly value={task.task} />
                        </div>
                        
                        <div className='task__actions'>
                            <button onClick={event => onClickEdit(event)} className='edit-task task-button'>
                                <GoPencil />
                            </button>

                            <button className='task-button' onClick={event => props.onDeleteTask(task.id)}>
                                <AiOutlineClose />
                            </button>
                        </div>
                    </li>
                    )
                })}
            </ul>
        </section>
    );
}

export default TaskList;