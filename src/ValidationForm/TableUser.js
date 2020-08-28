import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editUserAction } from '../redux/actions/QuanLyUserActions'


class TableUser extends Component {

    renderTable = () => {
        return this.props.userArray.map((nguoiDung, index) => {
            return <tr key={index}>
                <td>{nguoiDung.taiKhoan}</td>
                <td>{nguoiDung.hoTen}</td>
                <td>{nguoiDung.matKhau}</td>
                <td>{nguoiDung.email}</td>
                <td>{nguoiDung.soDt}</td>
                <td>{nguoiDung.tuoi}</td>
                <td><button onClick={() => {
                    this.props.dispatch(editUserAction(nguoiDung))
                }} className="btn btn-primary">Chỉnh sửa</button></td>
            </tr>
        })
    }

    render() {
        return (
            <div className="container">
                <div className="card text-white bg-white">
                    <div className="card-header bg-dark text-white font-weight-bold">
                        Danh sách người dùng
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Tài khoản</th>
                                    <th>Mật khẩu</th>
                                    <th>Họ tên</th>
                                    <th>Email</th>
                                    <th>Số điện thoại</th>
                                    <th>Tuổi</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.renderTable()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        userArray: state.ValidationFormReducer.userArray
    }
}

export default connect(mapStateToProps)(TableUser);