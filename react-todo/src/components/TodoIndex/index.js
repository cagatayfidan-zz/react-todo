import moment from 'moment';
import React from 'react'
import styles from './style.module.scss'

export default class TodoIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            valueArray: [],
            isVisible: true
        };
    }
    handleChange = (e) => {
        if (this.state.value !== e.target.value || this.state.value !== "" || this.state.value !== null) {
            this.setState({ value: e.target.value });
        }
    }
    updateLocalStorage = () => {
        window.localStorage.setItem("values", JSON.stringify(this.state.valueArray))
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13 && this.state.valueArray.includes(this.state.value) === false) {
            var valueArray = this.state.valueArray;
            if (valueArray !== "" || valueArray !== null) {
                    valueArray.push({ text: this.state.value, checked: false, createdAt: moment().format('l') })
                this.setState({ valueArray: valueArray, value: '' }, this.updateLocalStorage)
            }
        }
    } 
    changeVisibility = () => {
        this.setState({ isVisible: !this.state.isVisible })
    }
    checkItem = (index) => {
        var localArray = this.state.valueArray;
        if (localArray[index].checked) {
            localArray[index].checked = false;
        }
        else {
            localArray[index].checked = true;
        }
        this.setState({ valueArray: localArray }, this.updateLocalStorage)
    }
    deleteItem = (item) => {
        var index = this.state.valueArray.indexOf(item);
        let localArray = this.state.valueArray;
        if (index > -1) {
            localArray.splice(index, 1)
            this.setState({ valueArray: localArray }, this.updateLocalStorage)
        }
    }
    componentDidMount() {
        let deger = localStorage.getItem('values')
        if (deger) {
            let values = JSON.parse(deger);
            this.setState({ valueArray: values })
        }
    }
    render() {
        return (
            <div className={styles.todo} >
                <h1>React To-Do</h1>
                <input value={this.state.value} onKeyDown={this.handleEnterKey} onChange={this.handleChange} type="text" />
                <button onClick={this.changeVisibility} type="button">Bas</button>
                <>
                    {this.state.valueArray.map((item, index) => {
                        return (
                            <div style={{ display: this.state.isVisible || !item.checked ? "block" : "none" }} key={index} className={styles.items}>
                                <span onClick={() => this.checkItem(index)}>✓</span>
                                <span className={this.state.valueArray[index].checked ? styles.strikeThrough : styles.unChecked}>{item.text}</span>
                                <span>{item.createdAt}</span>
                                <span onClick={() => this.deleteItem(item)}>X</span>
                            </div>
                        )
                    })}
                </>
            </div >
        );
    }
}


