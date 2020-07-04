
export const isEmail = email => {
    const emailRegex = /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
};

export const isPhone = phone => {
    const phoneNumberRegExp = /^\d{2,3}-\d{3,4}-\d{4}$/;
    return phoneNumberRegExp.test(phone);
}

export default {}