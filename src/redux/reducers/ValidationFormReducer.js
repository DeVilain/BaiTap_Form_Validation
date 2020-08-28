import { add_user, edit_user } from "../types/QuanLyUserTypes";


const stateUser = {
    userArray: [
        { taiKhoan: 'Nguyen Van A', matKhau: 123, hoTen: 'Nguyễn Văn A', email: 'nguyenvana@gmail.com', soDt: '857439', tuoi: '12' },
        { taiKhoan: 'Nguyen Van B', matKhau: 123, hoTen: 'Nguyễn Văn B', email: 'nguyenvanb@gmail.com', soDt: '432539', tuoi: '15' }
    ],
    userEdit: { taiKhoan: '', matKhau: '', hoTen: '', email: '', soDt: '', tuoi: '' }
}

export default (state = stateUser, action) => {
    switch (action.type) {
        case add_user: {
            let userUpdate = [...state.userArray, action.user];
            state.userArray = userUpdate;
            return { ...state };
        }
        case edit_user: {
            console.log(action.user);
            state.userEdit = action.user;
            
            
            return {...state};
        }
        default:
            return { ...state };
    }

}