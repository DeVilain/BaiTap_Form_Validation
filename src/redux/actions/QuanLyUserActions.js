import { add_user, edit_user } from '../types/QuanLyUserTypes'

export const addUserAction = (user) => {
    return {
        type: add_user,
        user: user
    }
}

export const editUserAction = (user) => {
    return {
        type: edit_user,
        user: user
    }
}