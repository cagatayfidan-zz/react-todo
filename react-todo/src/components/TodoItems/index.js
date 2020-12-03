import React from 'react'
import styles from './style.module.scss'

export default class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            valueArray: []
        };
    }
    render() {
        const { items } = this.props;
        return (
            <div className={styles.todoItem}>
                <h1>{items}</h1>
            </div>
        );
    }
}


