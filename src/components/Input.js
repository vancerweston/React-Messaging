import {Component} from 'react';
import React from 'react';
import {Picker} from 'emoji-mart';
import { Emoji } from 'emoji-mart'


class Input extends Component {
    state = {
        text: '',
        img: Image
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
        console.log('I didnt pop');
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
                    <button>Send</button>
                </form>
                <div className='emojiContainer' id='emojiContainer' >
                    <Picker 
                        set='apple'
                        onSelect={e => this.onSelect(e)}
                        title='Pick your emoji...' emoji='point_up' 
                        style={{width: '100%'}}
                        id='picker'
                    />
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