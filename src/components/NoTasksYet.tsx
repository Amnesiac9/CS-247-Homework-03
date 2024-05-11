
import ToDoListSvg from '../assets/undraw_to_do_list_re_9nt7.svg';

export default function NoTasksYet() {
    return (
        <div className='card center'>
            <img src={ToDoListSvg} alt='empty task list'></img>
            <h2>No tasks yet!</h2>
        </div>
    )
}
