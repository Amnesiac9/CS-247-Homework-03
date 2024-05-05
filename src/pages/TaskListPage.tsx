import React, { useEffect } from 'react'
import ToDoListSvg from '../assets/undraw_to_do_list_re_9nt7.svg';


interface Task {
    id: string
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
        updateTaskList((prevTaskList) => {
            const newTask: Task = {
                id: prevTaskList.length + "-" + Date.now().toString(),
                text: inputValue,
                done: false,
            }
            return [newTask, ...prevTaskList]
        })
        setInputValue('')
        focusInput()
    }

    // Makes sure the correct task is deleted AND makes sure it doesn't get deleted when the user unchecks.
    function deleteTaskDelay(task: Task) {
        setTimeout(() => {
            updateTaskList((prevTaskList) => {
                return prevTaskList.filter((t) => {
                    if (t.id === task.id && t.done === true) {
                        return false
                    }
                    return true
                });
            });
        }, 4000)
    }

    function deleteTask(index: number) {
        updateTaskList((prevTaskList) => {
            return prevTaskList.filter((_, i) => i !== index)
        })
    }

    function completeTask(index: number) {
        updateTaskList((prevTaskList) => {
            //Re-create our task list. This is required for React to update the UI, otherwise our checkboxes won't update.
            const newTaskList: Task[] = []
            for (let i = 0; i < prevTaskList.length; ++i) {
                if (i === index) {
                    newTaskList.push({
                        id: prevTaskList[i].id,
                        text: prevTaskList[i].text,
                        done: !prevTaskList[i].done
                    })
                    continue
                }
                newTaskList.push({
                    id: prevTaskList[i].id,
                    text: prevTaskList[i].text,
                    done: prevTaskList[i].done
                })
            }
            return newTaskList
        })
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
                                    console.log(task)
                                    completeTask(index)
                                    deleteTaskDelay(task)
                                }} />}
                            </div>
                            <div className={task.done ? 'flex1 alignLeft strikethru' : 'flex1 alignLeft'}>{task.text}</div>
                            {<button className='link' onClick={() => deleteTask(index)}><img height='16px' src='/iconmonstr-trash-can-thin-240-white.png' /></button>}
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
