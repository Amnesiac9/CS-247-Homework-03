import React, { Component } from 'react'
import NoTasksYet from '../components/NoTasksYet';
import NewTaskBar from '../components/NewTaskBar';



interface Task {
    id: string
    text: string
    done: boolean
}

interface State {
    taskList: Task[],
    inputValue: string,
}

class TaskListPage extends Component<Record<string, Task[]>, State> {

    constructor(props: Record<string, Task[]>) {
        super(props);
        this.state = {
            taskList: [],
            inputValue: ''
        };
    }

    focusInput = () => {
        const textInput = document.getElementById('textInput') as HTMLInputElement
        textInput.focus()
    }

    handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ inputValue: event.target.value })
    };

    handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
        if (event.key === 'Enter') {
            this.addTask();
        }
    }


    addTask = () => {

        const newTask: Task = {
            id: this.state.taskList.length + '-' + Date.now().toString(),
            text: this.state.inputValue,
            done: false,
        }
        this.setState((prevState) => ({ taskList: [newTask, ...prevState.taskList], inputValue: '' }))
        this.focusInput()
    }

    // Makes sure the correct task is deleted AND makes sure it doesn't get deleted when the user unchecks.
    deleteTaskDelay = (task: Task) => {
        setTimeout(() => {
            this.setState((prevState) => ({
                taskList: prevState.taskList.filter(t => {
                    if (t.id === task.id && t.done === true) {
                        return false;
                    }
                    return true;
                })
            }));
        }, 4000);
    };

    deleteTask = (index: number) => {
        this.setState((prevState) => ({
            taskList: prevState.taskList.filter((_, i) => i !== index)
        }))
    }

    // Method to toggle task completion status
    completeTask = (index: number) => {
        this.setState(prevState => {
            const newTaskList: Task[] = prevState.taskList.map((task, idx) => {
                if (idx === index) {
                    return { ...task, done: !task.done };
                }
                return task;
            });
            return { taskList: newTaskList };
        });
    };

    componentDidMount() {
        this.focusInput()
    }


    render() {
        return (
            <>
                <h1>Task List</h1>
                <NewTaskBar
                    inputValue={this.state.inputValue}
                    addTask={this.addTask}
                    handleInputChange={this.handleInputChange}
                    handleKeyDown={this.handleKeyDown}
                />

                <div className='card flex center'>
                    <ul className='flex1'>
                        {this.state.taskList.map((task, index) => (
                            <li className='flex checkListItem' key={index}>
                                <div className={task.done ? 'checkboxInputChecked' : 'checkboxInput'}>
                                    {<input type='checkbox' id={'checkbox' + index} checked={task.done} onChange={() => {
                                        this.completeTask(index)
                                        this.deleteTaskDelay(task)
                                    }} />}
                                </div>
                                <div className={task.done ? 'flex1 alignLeft strikethru' : 'flex1 alignLeft'}>{task.text}</div>
                                {<button className='link' onClick={() => this.deleteTask(index)}><img height='16px' src='/iconmonstr-trash-can-thin-240-white.png' /></button>}
                            </li>
                        ))}
                    </ul>
                </div>
                {this.state.taskList.length === 0 && (
                    <NoTasksYet />
                )}
            </>
        )
    }
}

export default TaskListPage
