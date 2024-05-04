import React, { useEffect } from "react"
import iconTrashCan from '../assets/iconmonstr-trash-can-thin.svg.svg'


interface Task {
    text: string
    done: boolean
}

function TaskListPage() {

    const [taskList, updateTaskList] = React.useState<Task[]>([])
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);

    function focusInput() {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    }


    function addTask() {
        const newTask: Task = {
            text: inputValue,
            done: false,
        }
        updateTaskList([...taskList, newTask])
        setInputValue('')
        focusInput()
    }

    // Focus on the input field when mounted
    useEffect(() => {
        focusInput()
    }, []);

    return (
        <>
            <h1>Task List</h1>
            <input type='text' placeholder="Enter a new task" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} ref={inputRef} />
            <button onClick={addTask} >Create</button>
            <div>
                <ul>
                    {taskList.map((task, index) => (
                        <li key={index}>
                            {task.text}
                            {<button><img src={iconTrashCan} /></button>}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TaskListPage
