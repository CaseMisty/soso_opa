import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { connect } from 'react-redux';
import { changeNavBarActiveIdx } from '../redux/action/navBar';
import { loginRequestAction } from '../redux/sagas/loginModel';

const FormItem = Form.Item;

class LoginController extends React.Component {
    componentDidMount() {

    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.login(values.username, values.password);
            }
        });
        // this.props.changeActiveIdx(this.props.activeIdx + 1);
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="flexDiv" style={{
                display: 'flex',
                width: '100vw',
                height: '100vh',
                // backgroundColor: 'yellow',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Form onSubmit={this.handleSubmit} style={{ maxWidth: '500px' }}>
                    <FormItem>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '请输入账号!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" style={{ width: '300px' }} />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '请输入密码!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" style={{ width: '300px' }} />
                        )}
                    </FormItem>
                    <FormItem>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            // justifyContent: 'center'
                        }}>
                            <div style={{
                                width: '50%',
                                // backgroundColor: 'yellow'
                            }}>
                                {getFieldDecorator('remember', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                })(
                                    <Checkbox>记住我</Checkbox>
                                )}
                            </div>
                            <div style={{
                                display: 'flex',
                                width: '50%',
                                justifyContent: 'flex-end',
                                // backgroundColor: 'green'
                            }}>
                                <a className="login-form-forgot" href="">忘记密码</a>
                            </div>
                        </div>
                        <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                            登 录
                        </Button>
                    </FormItem>
                </Form>
            </div>
        );
    }
}
const mapStateToProps = (state) => ({
    activeIdx: state.navBarStore.activeIdx
});
const mapDispatchToProps = (dispatch) => ({
    login(accountname, passwd) {
        dispatch(loginRequestAction({ accountname, passwd }));
        // dispatch({
        //     type: `login/launchLoginRequest`,
        //     accountname,
        //     passwd
        // });
    },
    changeActiveIdx(idx) {
        dispatch(changeNavBarActiveIdx(idx));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(LoginController));
