import {Component} from 'react';
import React from 'react';
import {Picker} from 'emoji-mart';
import { Emoji } from 'emoji-mart';
import sendImg from '../images/sendArrow.png'


class Input extends Component {
    state = {
        text: '',
        img: Image
    }

    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.myButton = React.createRef();
    }

    onSelect(e) {
        this.setState({img: e.native});
    }

    onChange(e) {
        this.setState({text: e.target.value});
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({text: '', img: Image});
        this.props.onSendMessage(this.state.text || this.state.img);
    }

    // Pop Up Functionality
    popUp(e) {
        let div = this.myRef.current;

        if (div.style.display === 'none') {
            div.style.display = 'block';
        } else {
            div.style.display = 'none';
        }
    }

    render() {
        return (

            <div className='Input'>
                <form onSubmit={e => this.onSubmit(e)}>
                    <input 
                        onChange={e => this.onChange(e)} 
                        value={this.state.text || this.state.img}
                        type='text'
                        placeholder='React Message...'
                        autoFocus={true}
                    />
                    <button>
                        <img style={{height: '30px'}} src={sendImg} alt=''/>
                    </button>
                </form>
                <div className='emojiContainer' id='emojiContainer' >
                    <div ref={this.myRef} style={{display: 'none'}}>
                        <Picker 
                            set='apple'
                            onSelect={e => this.onSelect(e)}
                            title='Pick your emoji...' emoji='point_up' 
                            style={{width: '100%'}}
                        />
                    </div>
                    <div className='emojipopup' id='emojipopup' >
                        <Emoji 
                            emoji={{ id: 'smile', skin: 3 }} 
                            size={32} 
                            onClick={e => this.popUp(e)}
                            id='emoji-button'
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default Input;