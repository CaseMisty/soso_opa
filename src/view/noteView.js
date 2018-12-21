import React from 'react';
import {cancelBubble} from "../util/eventHelper";
import { Input, Button } from 'antd';

const { TextArea } = Input;

export default class NoteView extends React.Component {
    constructor(props) {
        super(props);

        this.state={
            visible: false
        };

        this.content = '';

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    show() {
        this.setState({
            visible: true
        });
    }

    hide() {
        this.setState({
            visible: false
        });
    }

    render() {
        return (
            <div
                style={{
                    display: this.state.visible ? 'flex' : 'none',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.3)',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                onClick={
                    ()=> {
                        this.hide();
                    }
                }
            >

                <div
                    style={{
                        display: 'flex',
                        width: 500,
                        height: 300,
                        backgroundColor: 'white',
                        borderRadius: 20,
                        flexDirection: 'column',
                        alignItems: 'center',
                        // justifyContent: 'center'
                    }}
                    onClick={(e) => {
                        cancelBubble(e);
                    }}
                >
                    <p
                        style={{
                            marginTop: 15,
                            width: 500,
                            height: 30,
                            fontSize: '18px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >填写备注</p>

                    <TextArea
                        style={{
                            width: 400,
                            height: 150
                        }}
                    />

                    <div style={{
                        marginTop: 25
                    }}>
                        <Button
                            style={{
                                width: 80,
                                height: 40
                            }}
                            type="danger"
                            onClick={this.hide}
                        >取消</Button>
                        <Button
                            style={{
                                width: 80,
                                height: 40,
                                marginLeft: 50
                            }}
                            type="primary"
                            onClick={() => {
                                this.props.okTapped(this.content)
                            }}
                        >确定</Button>
                    </div>
                </div>

            </div>
        );
    }
}