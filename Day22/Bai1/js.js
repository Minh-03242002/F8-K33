var errors = {
    name: {
        required: "Vui lòng nhập họ tên",
        min: "Họ tên phải từ 5 ký tự"
    },
    email: {
        email: "Định dạng email không hợp lệ",
        unique: "Email đã có người sử dụng",
        required: "Vui lòng nhập địa chỉ email"
    },
    password: {
        required: "Vui lòng nhập mật khẩu",
        same: "Mật khẩu phải khớp với mật khẩu nhập lại"
    }
};

function getError(field) {
    if (errors[field]) {
        for (const errorType in errors[field]) {
            return errors[field][errorType];
        }
    }
    return " Không có lỗi nào "; 
}

console.log(getError('email')); // "Định dạng email không hợp lệ"
