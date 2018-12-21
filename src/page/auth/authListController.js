import React from 'react';
import {
    Table,
    Button,
    Tag
} from 'antd';
import { connect } from 'react-redux';
import LLCDateHelper from "date-helper";
import * as PathConstants from "../../constants/routeConstants";
import NoteView from '../../view/noteView';
import { actions } from '../../redux/authListModel';

const namespace = 'authlist';

const mapStateToProps = (state) => {
    const authinfoData = state[namespace];
    return {
        loading: authinfoData.loading,
        authList: authinfoData.authList,
        pagesize: authinfoData.pagesize,
        totalpage: authinfoData.totalpage,
        page: authinfoData.totalpage,
        authstage: authinfoData.authstage,
        officialauth: authinfoData.officialauth
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        queryAuthInfo(page, authstage, officialauth) {
            dispatch(actions.queryAuthInfo({
                page,
                authstage,
                officialauth
            }));
        },
        selectAuth: (auth) => {
            dispatch(actions.selectedAuth({
                type: `${namespace}/selectedAuth`,
                auth
            }));
        },
        updateAuthToPass: (authlist, note) => {
            dispatch(actions.updateAuthToPass({
                authlist,
                note
            }));
        },
        updateAuthToReject: (authlist, note) => {
            dispatch(actions.updateAuthToReject({
                authlist,
                note
            }));
        }
    };
};

class AuthListController extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedRowKeys: [],
            loading: false
        };

        this.page = 1;
        this.operate = 0;
        this.collectColumn();

        this.detailTapped = this.detailTapped.bind(this);
        this.selectRow = this.selectRow.bind(this);
        this.onSelectedRowKeysChange = this.onSelectedRowKeysChange.bind(this);

        this.passTapped = this.passTapped.bind(this);
        this.rejectTapped = this.rejectTapped.bind(this);

        this.packageSelected = this.packageSelected.bind(this);
        this.okTapped = this.okTapped.bind(this);
    }

    collectColumn() {
        this.columns = [
            {
                title: '认证类型',
                width: 90,
                dataIndex: 'authtype',
                key: 'authtype',
                align: 'center',
                render: (authtype) => {
                    let color = '#00CED1';
                    let text = '开发者';

                    switch (authtype) {
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

                    return (
                        <Tag
                            color={color}
                        >{text}</Tag>
                    );
                }
            },
            {
                title: '状态',
                width: 100,
                dataIndex: 'authstate',
                key: 'authstate',
                align: 'center',
                render: (authstate) => {
                    let color = '#00CED1';
                    let text = '开发者';

                    switch (authstate) {
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

                    return (
                        <Tag
                            color={color}
                        >{text}</Tag>
                    );
                }
            },
            {
                title: '微信号',
                dataIndex: 'wxid',
                key: 'wxid',
                width: 120,
                align: 'center'
            },
            {
                title: '联系人姓名',
                dataIndex: 'username',
                key: 'username',
                width: 90,
                align: 'center'
            },
            {
                title: '公司名称',
                dataIndex: 'registertime',
                key: 'registertime',
                width: 130,
                align: 'center'
            },
            {
                title: '申请时间',
                dataIndex: 'createtime',
                key: 'createtime',
                width: 130,
                align: 'center',
                render: (createtime) => {
                    return <span>{LLCDateHelper.formatDate(createtime)}</span>
                }
            },
            {
                title: '操作',
                key: 'operate',
                // fixed: 'right',
                width: 120,
                align: 'center',
                render: (auth) => {
                    return (
                        <Button
                            onClick={(e) => {
                                this.detailTapped(auth);
                            }}
                            type={'default'}
                            size={'default'}
                        >详情</Button>
                    );
                }
            },
        ];
    }

    componentDidMount() {
        this.props.queryAuthInfo(this.page, this.props.authstage, this.props.officialauth);
    }

    okTapped(note) {
        if (this.operate === 0) {
            this.props.updateAuthToPass(this.packageSelected(), note);
        } else if (this.operate === 1) {
            this.props.updateAuthToReject(this.packageSelected(), note);
        }

        this.noteView && this.noteView.hide();
    }

    passTapped() {
        this.operate = 0;
        this.noteView && this.noteView.show();
    }

    rejectTapped() {
        this.operate = 1;
        this.noteView && this.noteView.show();
    }

    packageSelected() {
        let arr = [];

        for (let i = 0; i < this.state.selectedRowKeys.length; i += 1) {
            const aSelected = this.state.selectedRowKeys[i];
            for (let j = 0; j < this.props.authList.length; j += 1) {
                const aAuth = this.props.authList[j];
                if (aAuth.userid === aSelected) {
                    arr.push({
                        userid: aAuth.userid,
                        authstate: aAuth.authstate
                    });
                    break;
                }
            }
        }

        return arr;
    }

    detailTapped(auth) {
        this.props.selectAuth(auth);
        // router.push({
        //     pathname: PathConstants.kAuthinfoPath.path
        // });
    }

    selectRow(record) {
        const selectedRowKeys = [...this.state.selectedRowKeys];
        if (selectedRowKeys.indexOf(record.userid) >= 0) {
            selectedRowKeys.splice(selectedRowKeys.indexOf(record.userid), 1);
        } else {
            selectedRowKeys.push(record.userid);
        }
        this.setState({
            selectedRowKeys
        });
    }

    onSelectedRowKeysChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }

    render() {
        const { loading, selectedRowKeys } = this.state;

        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectedRowKeysChange,
        };

        const hasSelected = selectedRowKeys.length > 0;

        return (
            <div>
                <div style={{ minHeight: 100 }}>
                </div>
                <div
                    style={{
                        marginBottom: 16,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}
                >
                    <Button
                        type="primary"
                        onClick={this.passTapped}
                        disabled={!hasSelected}
                        loading={loading}
                    >通过</Button>
                    <Button
                        style={{ marginLeft: 25 }}
                        type="danger"
                        onClick={this.rejectTapped}
                        disabled={!hasSelected}
                        loading={loading}
                    >驳回</Button>
                    <span style={{ marginLeft: 8 }}>{hasSelected ? `选中 ${selectedRowKeys.length} 个` : ''}</span>
                </div>
                <Table
                    rowSelection={rowSelection}
                    rowKey={record => record.userid}
                    loading={this.props.loading}
                    columns={this.columns}
                    dataSource={this.props.authList}
                    scroll={{ x: 805, y: 460 }}
                    pagination={{
                        total: this.props.totalpage * this.props.pagesize,
                        pageSize: this.props.pagesize,
                        current: this.props.page
                    }}
                    onRow={(record) => ({
                        onClick: () => {
                            this.selectRow(record);
                        },
                    })}
                />
                <NoteView
                    ref={noteView => this.noteView = noteView}
                    okTapped={this.okTapped}
                />
            </div>
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(AuthListController);
