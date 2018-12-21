import React from 'react';
import { Card, Col, Row, Tag, Affix } from 'antd';
import { connect } from 'react-redux';
import { actions } from '../../redux/authListModel';

const namespace = 'authlist';

const mapStateToProps = (state) => {
    const authinfoData = state[namespace];
    return {
        selectedAuth: authinfoData.selectedAuth,
        changePending: authinfoData.changePending
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryChangePending: (userid) => {
            dispatch(actions.queryChangePending({ userid}));
        }
    };
};

class AuthInfoController extends React.Component {
    constructor(props) {
        super(props);

        this.pickStateInfo = this.pickStateInfo.bind(this);
        this.pickTypeInfo = this.pickTypeInfo.bind(this);
    }

    componentDidMount() {
        this.props.queryChangePending(this.props.selectedAuth.userid);
    }

    renderLeft() {

        return (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Card
                    hoverable
                    style={{width: 450, marginTop: 25}}
                    title="联系方式"
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 90,
                            alignItems: 'flex-end',
                            paddingRight: 10
                        }}>
                            <p>微信号:</p>
                            <p>QQ号:</p>
                            <p>邮箱:</p>
                        </div>

                        <div>
                            <p>{this.props.selectedAuth.wxid ? this.props.selectedAuth.wxid : '-'}</p>
                            <p>{this.props.selectedAuth.qqid ? this.props.selectedAuth.qqid : '-'}</p>
                            <p>{this.props.selectedAuth.email ? this.props.selectedAuth.email : '-'}</p>
                        </div>
                    </div>

                </Card>

                {
                    this.props.selectedAuth.authtype === 3 ?
                        <Card
                            hoverable
                            style={{width: 450, marginTop: 30}}
                            title="公司信息"
                        >
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}>
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: 100,
                                    alignItems: 'flex-end',
                                    paddingRight: 10
                                }}>
                                    <p>公司名称:</p>
                                    <p>公司机构代码:</p>
                                    <p>公司营业执照:</p>
                                </div>

                                <div>
                                    <p>{this.props.selectedAuth.companyname ? this.props.selectedAuth.companyname : '-'}</p>
                                    <p>{this.props.selectedAuth.companyid ? this.props.selectedAuth.companyid : '-'}</p>
                                    {/*<p>{this.props.selectedUser.companylicencekey ? this.props.selectedUser.city : '-'}</p>*/}
                                </div>
                            </div>

                        </Card>
                        :
                        null
                }

                <Card
                    hoverable
                    style={{width: 450, marginTop: 30}}
                    title="联系人信息"
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 90,
                            alignItems: 'flex-end',
                            paddingRight: 10
                        }}>
                            <p>联系人姓名:</p>
                            <p>身份证号:</p>
                            <p>身份证正面:</p>
                            <p
                                style={{
                                    marginTop: 180
                                }}
                            >身份证背面:</p>
                            <p
                                style={{
                                    marginTop: 180
                                }}
                            >手持身份证:</p>
                        </div>

                        <div style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}>
                            <p>{this.props.selectedAuth.username ? this.props.selectedAuth.username : '-'}</p>
                            <p>{this.props.selectedAuth.uidentifier ? this.props.selectedAuth.uidentifier : '-'}</p>
                            <img
                                alt=""
                                style={{
                                    width: 300
                                }}
                                src={this.props.selectedAuth.uidfrontthumb} />

                            <img alt=""
                                style={{
                                    marginTop: 25,
                                    width: 300
                                }}
                                src={this.props.selectedAuth.uidbackthumb} />
                            <img alt=""
                                style={{
                                    marginTop: 25,
                                    width: 300
                                }}
                                src={this.props.selectedAuth.uidportraitthumb} />
                        </div>
                    </div>

                </Card>

                <Card
                    hoverable
                    style={{width: 450, marginTop: 25}}
                    title="银行卡信息"
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 90,
                            alignItems: 'flex-end',
                            paddingRight: 10
                        }}>
                            <p>银行卡号:</p>
                            <p>银行名称:</p>
                            <p>支行名称:</p>
                        </div>

                        <div>
                            <p>{this.props.selectedAuth.bankid ? this.props.selectedAuth.bankid : '-'}</p>
                            <p>{this.props.selectedAuth.bankname ? this.props.selectedAuth.bankname : '-'}</p>
                            <p>{this.props.selectedAuth.branchname ? this.props.selectedAuth.branchname : '-'}</p>
                        </div>
                    </div>

                </Card>

            </div>
        );
    }

    pickTypeInfo() {
        let color = '#00CED1';
        let text = '开发者';

        switch (this.props.selectedAuth.authtype) {
            case 1:
                color = '#00CED1';
                text = '开发者';
                break;
            case 2:
                color = '#DAA520';
                text = '设计师';
                break;
            case 3:
                color = '#696969';
                text = '企业';
                break;

            default:
                break;
        }

        return {color, text};
    }

    pickStateInfo() {
        let color = '#00CED1';
        let text = '开发者';

        switch (this.props.selectedAuth.authstate) {
            case 1:
                color = '#D3D3D3';
                text = '认证类型';
                break;
            case 2:
                color = '#D3D3D3';
                text = '联系方式';
                break;
            case 3:
                color = '#D3D3D3';
                text = '企业信息';
                break;
            case 4:
                color = '#D3D3D3';
                text = '联系人信息';
                break;
            case 5:
                color = '#D3D3D3';
                text = '银行卡信息';
                break;
            case 6:
                color = '#D3D3D3';
                text = '技术栈';
                break;
            case 7:
                color = '#D3D3D3';
                text = '项目作品';
                break;
            case 8:
                color = '#FA8072';
                text = '审核中';
                break;
            case 9:
                color = '#3CB371';
                text = '完成认证';
                break;
            case 10:
                color = '#FA8072';
                text = '更改申请';
                break;

            default:
                break;
        }

        return {color, text};
    }

    render() {
        const typeInfo = this.pickTypeInfo();
        const stateInfo = this.pickStateInfo();

        if (this.props.selectedAuth) {
            return (
                <div
                    style={{
                        height: '90vh',
                    }}
                    className="scrollable-container"
                    ref={(node) => { this.container = node; }}
                >
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <Tag
                            style={{
                                // marginLeft: 25,
                                width: 80,
                                height: 30,
                                fontSize: 20,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            color={typeInfo.color}
                        >{typeInfo.text}</Tag>

                        <Tag
                            style={{
                                marginLeft: 10,
                                marginTop: 8
                            }}
                            color={stateInfo.color}
                        >{stateInfo.text}</Tag>
                    </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        marginBottom: 50
                    }}>
                    <div
                        style={{
                            width: 450
                        }}
                    >
                        {
                            this.renderLeft()
                        }
                    </div>

                    <div style={{width: 450, marginLeft: 50, backgroundColor: 'yellow'}}>
                    </div>
                </div>
                </div>
            );
        } else {
            return null;
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthInfoController);
