import React from 'react';
import {
    Table,
    Button,
    Modal
} from 'antd';
import { connect } from 'react-redux';
import LLCDateHelper from "date-helper";
import * as PathConstants from "../../constants/routeConstants";
import { actions } from '../../redux/userModal';
import UserInfoController from './userInfoController';

const namespace = 'userlist';

const mapStateToProps = (state) => {
    const userinfoData = state[namespace];
    return {
        loading: userinfoData.loading,
        userList: userinfoData.userList,
        pagesize: userinfoData.pagesize,
        totalpage: userinfoData.totalpage,
        page: userinfoData.totalpage
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryUserInfo: (page) => {
            dispatch(actions.queryUserInfo({ page }));
        }
    };
};
class UserListController extends React.Component {
    constructor(props) {
        super(props);

        this.columns = [
            {
                title: '昵称',
                width: 120,
                dataIndex: 'nickname',
                key: 'nickname',
                align: 'center'
                // fixed: 'left',
            },
            {
                title: '手机号',
                width: 135,
                dataIndex: 'phone',
                key: 'phone',
                align: 'center'
                // fixed: 'left',
            },
            {
                title: '头像',
                dataIndex: 'portrait',
                key: 'portrait',
                width: 70,
                align: 'center',
                render: (portrait) => {
                    if (portrait) {
                        return <img width='35px' src={portrait} alt="" />;
                    } else {
                        return null;
                    }
                }
            },
            {
                title: '性别',
                dataIndex: 'sex',
                key: 'sex',
                width: 70,
                align: 'center',
                render: (sex) => {
                    let text = '未选择';
                    switch (sex) {
                        case 0:
                            text = '未选择';
                            break;
                        case 1:
                            text = '男';
                            break;
                        case 2:
                            text = '女';
                            break;
                        default:
                            break;
                    }
                    return <span>{text}</span>
                }
            },
            {
                title: '常住地', dataIndex: 'city', key: 'city', width: 80,
            },
            {
                title: '注册时间',
                dataIndex: 'registertime',
                key: 'registertime',
                width: 130,
                align: 'center',
                render: (registertime) => {
                    return <span>{LLCDateHelper.formatDate(registertime)}</span>
                }
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                width: 80,
                align: 'center',
                render: (state) => {
                    let text = '正常';
                    if (state === 1) {
                        //     return <span style="color:green">{text}</span>;
                    } else {
                        text = '冻结';
                        //     return <span style="color:#FF6347">{text}</span>;
                    }
                    return <span>{text}</span>;
                }
            },
            {
                title: '操作',
                key: 'operate',
                // fixed: 'right',
                width: 120,
                align: 'center',
                render: (user) => (
                    <Button
                        onClick={(e) => {
                            this.detailTapped(user);
                        }}
                        type={'default'}
                        size={'default'}
                    >详情</Button>)
            }
            ,
        ];
        this.page = 1;
        this.state = {
            userInfoModalVisible: false,
            userInfoModalUser: undefined
        };
    }

    componentDidMount() {
        this.props.queryUserInfo(this.page);
    }

    setUserInfoModalVisible = (userInfoModalVisible = true) => {
        this.setState({ userInfoModalVisible });
    }

    detailTapped = (user) => {
        // this.props.history.push(PathConstants.kUserinfoPath.path);
        this.setUserInfoModalVisible(true);
        this.setState({ userInfoModalUser: user });
    }

    render() {
        return (
            <div style={{ height: '100vh' }} >
                <Table
                    rowKey={record => record.userid}
                    loading={this.props.loading}
                    columns={this.columns}
                    dataSource={this.props.userList}
                    scroll={{ y: 560 }}
                    pagination={{
                        total: this.props.totalpage * this.props.pagesize,
                        pageSize: this.props.pagesize,
                        current: this.props.page
                    }}
                />
                <Modal
                    visible={this.state.userInfoModalVisible}
                    footer={null}
                    onCancel={() => this.setUserInfoModalVisible(false)}
                    width={1024}
                    style={{
                    }}
                >
                    <UserInfoController
                        user={this.state.userInfoModalUser}
                    />
                </Modal>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserListController);
