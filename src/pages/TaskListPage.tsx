import React, { useEffect } from 'react'
import ToDoListSvg from '../assets/undraw_to_do_list_re_9nt7.svg';


interface Task {
    text: string
    done: boolean
}

function TaskListPage() {

    const [taskList, updateTaskList] = React.useState<Task[]>([])
    const [inputValue, setInputValue] = React.useState('');
    const inputRef = React.useRef<HTMLInputElement>(null);
    // const deletedRef = React.useRef<number[]>([])

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
        updateTaskList((prevTaskList) => {
            return [newTask, ...prevTaskList]
        })
        setInputValue('')
        focusInput()
    }

    // Makes sure the correct task is deleted AND makes sure it doesn't get deleted when the user unchecks.
    function deleteTask(task: Task) {
        updateTaskList((prevTaskList) => {
            const newTaskList = prevTaskList.filter((t) => {
                if (t.text === task.text && t.done === true) {
                    return false
                }
                return true
            });
            return newTaskList;
        });
    }

    function completeTask(task: Task) {
        const newTaskList: Task[] = []
        const targetIndex = taskList.indexOf(task)
        // Re-create our task list. This is required for React to update the UI, otherwise our checkboxes won't update.
        for (let i = 0; i < taskList.length; ++i) {
            if (i === targetIndex) {
                newTaskList.push({
                    text: taskList[i].text,
                    done: !taskList[i].done
                })
                continue
            }
            newTaskList.push({
                text: taskList[i].text,
                done: taskList[i].done
            })
        }
        updateTaskList(newTaskList)
    }


    // Focus on the input field when mounted
    useEffect(() => {
        focusInput()
    }, []);


    return (
        <>

            <h1>Task List</h1>

            <div className='flex'>
                <input className='textInput' type='text' placeholder='Enter a new task' value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} ref={inputRef} />
                <button className='primary' disabled={inputValue.length === 0} onClick={addTask} >Create</button>
            </div>
            <div className='card flex center'>
                <ul className='flex1'>
                    {taskList.map((task, index) => (
                        <li className='flex checkListItem' key={index}>
                            <div className={task.done ? 'checkboxInputChecked' : 'checkboxInput'}>
                                {<input type='checkbox' id={'checkbox' + index} checked={task.done} onChange={() => {
                                    completeTask(task)
                                    setTimeout(() => {
                                        deleteTask(task)
                                    }, 4000)
                                }} />}
                            </div>
                            <div className={task.done ? 'flex1 alignLeft strikethru' : 'flex1 alignLeft'}>{task.text}</div>
                            {<button className='link' onClick={() => deleteTask(task)}><img height='16px' src='/iconmonstr-trash-can-thin-240-white.png' /></button>}
                        </li>
                    ))}
                </ul>
            </div>
            {taskList.length === 0 && (
                <div className='card center'>
                    <img src={ToDoListSvg} alt='empty task list'></img>
                </div>
            )}
        </>
    )
}

export default TaskListPage
