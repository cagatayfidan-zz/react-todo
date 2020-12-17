import React from 'react'

import styles from './style.module.scss'
import moment from 'moment';

export default class TodoIndex extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: '',
            valueArray: [],
            isVisible: true,
            itemCount: 0,
        };
    }
    handleChange = (e) => {
        if (this.state.value !== e.target.value || this.state.value !== "" || this.state.value !== null) {
            this.setState({ value: e.target.value });
        }
    }
    updateLocalStorage = () => {
        window.localStorage.setItem("values", JSON.stringify(this.state.valueArray))
        localStorage.setItem("count", JSON.stringify(this.state.itemCount))
    }
    handleEnterKey = (e) => {
        if (e.keyCode === 13 && !this.state.valueArray.includes(this.state.value)) {
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
        localArray[index].checked ? (localArray[index].checked = false) : (localArray[index].checked = true);
        this.setState({ valueArray: localArray }, this.updateLocalStorage, this.checkedItemCount())
    }
    deleteItem = (item) => {
        var index = this.state.valueArray.indexOf(item);
        if (index > -1) {
            this.state.valueArray.splice(index, 1)
            this.setState({ valueArray: this.state.valueArray }, this.updateLocalStorage, this.checkedItemCount())
        }
    }
    checkedItemCount = () => {
        this.setState({ itemCount: this.state.valueArray.filter(item => item.checked === true).length })
    }
    sortArrayAToZ = () => {
        var sortedArrayAToZ = this.state.valueArray.sort((a, b) => a.text !== b.text ? a.text < b.text ? -1 : 1 : 0);
        this.setState({ valueArray: sortedArrayAToZ }, this.updateLocalStorage)
    }
    sortArrayByDate = () => {
        var sortedArrayByDate = this.state.valueArray.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
        this.setState({ valueArray: sortedArrayByDate }, this.updateLocalStorage)
    }
    componentDidMount() {
        this.checkedItemCount()
        let deger = localStorage.getItem('values')
        if (deger) {
            let values = JSON.parse(deger);
            this.setState({ valueArray: values })
        }
        let count = localStorage.getItem('count')
        if (count) {
            let newCount = JSON.parse(count)
            this.setState({ itemCount: newCount })
        }
    }
    render() {
        return (
            <div className={styles.todo} >
                <h1>React To-Do</h1>
                <div className={styles.todoHeader}>
                    <div className={styles.popoverSorting}>
                        <div>
                            <span>Sırala &#129045;&#129047;</span>
                            <div className={styles.popoverItems}>
                                <span onClick={this.sortArrayAToZ}>Harfe göre</span>
                                <span onClick={this.sortArrayByDate}>Tarihe göre</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.inputDiv}>
                        <input value={this.state.value} onKeyDown={this.handleEnterKey} onChange={this.handleChange} type="text" placeholder="What dou yo want to-do" />
                    </div>
                    <div className={styles.inboxMenu}>
                        <button onClick={this.changeVisibility} type="button">{this.state.isVisible ? "Seçili olanları sakla" : "Seçili olanları getir"}</button>
                        <span>{this.state.itemCount}</span>
                    </div>
                </div>
                <>
                    {this.state.valueArray.map((item, index) => {
                        return (
                            <div className={styles.todoBox} style={{ display: this.state.isVisible || !item.checked ? "grid" : "none" }} key={index} >
                                <div className={styles.todoBoxActions}>
                                    <span onClick={() => this.checkItem(index)}>✓</span>
                                    <span onClick={() => this.deleteItem(item)}>X</span>
                                </div>
                                <div className={styles.todoBoxText}>
                                    <span className={this.state.valueArray[index].checked ? styles.strikeThrough : styles.unChecked}>{item.text}</span>
                                </div>
                                <div className={styles.todoBoxDate}>
                                    <span>{item.createdAt}</span>
                                </div>
                            </div>
                        )
                    })}
                </>
            </div >
        );
    }
}


