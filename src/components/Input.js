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

    render() {
        return (

            <div className='Input'>
                <form onSubmit={e => this.onSubmit(e)}>
                    <input 
                        onChange={e => this.onChange(e)} 
                        value={this.state.text || this.state.img}
                        type='text'
                        placeholder='Enter your message and press ENTER'
                        autofocus='true'
                    />
                    <button>Send</button>
                </form>
                <div className='emojiContainer' id='emojiContainer' >
                    <Picker 
                        set='google'
                        onSelect={e => this.onSelect(e)}
                        title='Pick your emoji...' emoji='point_up' 
                        style={{width: '900px', margin: '0 auto'}}
                    />
                    <div className='emojipopup' id='emojipopup' >
                        <Emoji emoji={{ id: 'smile', skin: 3 }} size={32} />
                    </div>
                </div>
            </div>
        );
    }
}

export default Input;