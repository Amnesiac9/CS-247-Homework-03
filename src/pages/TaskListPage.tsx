import React, { useEffect } from "react"


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

    function deleteTask(targetIndex: number) {
        const newTaskList = taskList.filter((_, index) => index !== targetIndex)
        updateTaskList(newTaskList)
    }

    function completeTask(targetIndex: number) {

        const newTaskList: Task[] = []

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
            <input type='text' placeholder="Enter a new task" value={inputValue} onChange={handleInputChange} onKeyDown={handleKeyDown} ref={inputRef} />
            <button onClick={addTask} >Create</button>
            <div>
                <ul>
                    {taskList.map((task, index) => (
                        <li key={index}>
                            {<input type='checkbox' id={'checkbox' + index} checked={task.done} onChange={() => completeTask(index)} />}
                            {task.text}
                            {<button onClick={() => deleteTask(index)}><img src='/iconmonstr-trash-can-thin-16.png' /></button>}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default TaskListPage
