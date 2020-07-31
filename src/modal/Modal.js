import React from 'react';
import './Modal.css'


//Создаем класс Modal и наследуем его от React.Componenta
export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
        }
        // Эта привязка обязательна для работы `this` в колбэке.
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        if(event.target.classList.contains('modal') || 
        event.target.classList.contains('buttonOpenModel') ||
        event.target.classList.contains('buttonCloseModel') )
        this.setState({isOpen: !this.state.isOpen})
    }
    
    render() {
        return (
            

            {/*Используется для отмены добавления React-oм корневого элемента*/},
            <React.Fragment>
                <button className='buttonOpenModel' onClick={this.handleClick}>Open Modal</button>
                {
                this.state.isOpen && 
                    (<div className="modal" onClick={this.handleClick}>
                        <div className="modal-body">
                            <h1>Modal-Title</h1>
                            <p>Info Modal</p>
                            <button className='buttonCloseModel' onClick={this.handleClick}>Close Modal</button>
                        </div>
                    </div>)
                }
            </React.Fragment>
        )
    }
}