import React from 'react'
import styles from './style.module.scss'
import TodoItems from '../TodoItems'

export default class TodoIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            valueArray: []
        };
    }
    handleEnterKey = (e) => {
        let myValue = this.state.value;
        if (e.keyCode === 13 && this.state.valueArray.includes(myValue) === false) {
            this.state.valueArray.push(myValue)
        }
    }
    handleChanges = (e) => {
        this.setState({ value: e.target.value })        
    }
    render() {
        return (
            <div className={styles.todo} >
                <h1>React To-Do</h1>
                <input onKeyDown={this.handleEnterKey} onChange={this.handleChanges} type="text" />
                <>
                    {this.state.valueArray.map((item, key) => {
                        return <TodoItems items={item} />
                    })}
                </>
            </div>
        );
    }
}


