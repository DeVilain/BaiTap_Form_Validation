import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import './style.css'
import { addUserAction, editUserAction } from '../redux/actions/QuanLyUserActions'
import TableUser from './TableUser'
import _ from 'lodash';

class Form extends Component {
    state = {
        values: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            tuoi: '',
        },
        errors: {
            taiKhoan: '',
            matKhau: '',
            email: '',
            soDt: '',
            tuoi: '',
        }
    }

    handleChange = (event) => {
        let { name, value, type } = event.target;

        var newValues = {
            ...this.state.values,
            [name]: value
        }

        // thông báo lỗi nếu bỏ trống
        var newErrors = {
            ...this.state.errors,
            [name]: value.trim() === '' ? `không được bỏ trống` : ''
        }

        // kiểm tra email
        if (type === 'email') {
            let regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regexEmail.test(value)) {
                newErrors[value] = name + 'không hợp lệ!';
            }
        }

        var newState = {
            values: newValues,
            errors: newErrors
        }

        this.setState(newState, () => {
            console.log(this.state);
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();

        // kiểm tra các giá trị trong state values có rỗng hay không?
        let valid = true;
        for (let key in this.state.values) {
            if (this.state.values[key] === '') {
                valid = false;
                break;
            }
        }

        for (let key in this.state.errors) {
            if (this.state.errors[key] !== '') {
                valid = false;
            }
        }

        if (!valid) {
            alert('Dữ liệu ko hợp lệ!!!')
            return;
        }

        this.props.dispatch(addUserAction(this.state.values));
        this.props.dispatch(editUserAction(this.state.values));
    }

    

    render() {
        let { taiKhoan, matKhau, email, hoTen, tuoi, soDt } = this.state.values;
        return (
            <Fragment>
                <img src="./img/bg.jpg" alt="" />
                <form className="login-box container" onSubmit={this.handleSubmit} >
                    <h1>Register</h1>
                    <div className="row">
                        <div className="col-6">
                            <div className="textbox form-group">
                                <i className="fas fa-user" />
                                <input name="taiKhoan" className="form-control"
                                    onChange={this.handleChange} value={taiKhoan} placeholder="Tài khoản" />
                                <p className="text-danger">{this.state.errors.taiKhoan}</p>
                            </div>
                            <div className="textbox form-group">
                                <i className="fas fa-lock" />
                                <input type="password" name="matKhau" className="form-control"
                                    onChange={this.handleChange} value={matKhau} placeholder="Mật khẩu" />
                                <p className="text-danger">{this.state.errors.matKhau}</p>
                            </div>
                            <div className="textbox form-group">
                                <i class="fa fa-envelope"></i>
                                <input name="email" className="form-control"
                                    onChange={this.handleChange} value={email} placeholder="Email" />
                                <p className="text-danger">{this.state.errors.email}</p>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="textbox form-group">
                                <i class="fa fa-address-book"></i>
                                <input name="hoTen" className="form-control"
                                    onChange={this.handleChange} value={hoTen} placeholder="Họ tên" />
                                <p className="text-danger">{this.state.errors.hoTen}</p>
                            </div>
                            <div className="textbox form-group">
                                <i class="fa fa-phone"></i>
                                <input name="soDt" className="form-control"
                                    onChange={this.handleChange} value={soDt} placeholder="Số điện thoại" />
                                <p className="text-danger">{this.state.errors.soDt}</p>
                            </div>
                            <div className="textbox form-group">
                                <i class="fa fa-birthday-cake"></i>
                                <input name="tuoi" className="form-control"
                                    onChange={this.handleChange} value={tuoi} placeholder="Tuổi" />
                                <p className="text-danger">{this.state.errors.tuoi}</p>
                            </div>
                        </div>
                    </div>
                    <div className="submit mt-4">
                        <button className="btn btn-success">Submit</button>
                    </div>
                </form>
                <TableUser></TableUser>
            </Fragment>
        )
    }

    componentDidUpdate(prevProps, prevState) { //Nhận vào state props trước khi thay đổi, và state hiện tại

        //So sánh props trước khi thay đổi và props hiện tại khác nhau không 
        if (!_.isEqual(this.props.userEdit, prevProps.userEdit)) {
            this.setState({
                values: this.props.userEdit
            })
        }
    }

}

const mapStateToProps = (state) => {
    return {
        userEdit: state.ValidationFormReducer.userEdit
    }
}

export default connect(mapStateToProps)(Form)