import React from 'react';
import './Modal.css'


//Создаем класс Modal и наследуем его от React.Componenta
export default class Modal extends React.Component {
    state = {
        isOpen: false,
    }
    
    render() {
        return (
            

            {/*Используется для отмены добавления React-oм корневого элемента*/},
            <React.Fragment>
                <button onClick={() => this.setState({isOpen: true})}>Open Modal</button>

                {
                this.state.isOpen && 
                    (<div className="modal">
                        <div className="modal-body">
                            <h1>Modal-Title</h1>
                            <p>Info Modal</p>
                            <button onClick={() => this.setState({isOpen: false})}>Close Modal</button>
                        </div>
                    </div>)
                }
            </React.Fragment>
        )
    }
}