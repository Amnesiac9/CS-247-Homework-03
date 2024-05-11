import { KeyboardEventHandler } from "react";


export default function NewTaskBar(props: { inputValue: string, addTask: () => void, handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void, handleKeyDown: KeyboardEventHandler<HTMLInputElement> }) {
    return (
        <div className='flex'>
            {/* ref={this.inputRef} */}
            <input className='textInput' id='textInput' type='text' placeholder='Enter a new task' value={props.inputValue} onChange={props.handleInputChange} onKeyDown={props.handleKeyDown} />
            <button className='primary' disabled={props.inputValue.length === 0} onClick={props.addTask} >Create</button>
        </div>
    )
}
