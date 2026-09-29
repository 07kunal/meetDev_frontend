const validationRegex = {
 alphabetWithCapsAndSmallRegex : /^[A-Za-z]+$/,
 numRegex: /^[0-9]+$/,
 alphaNumReg: /^[a-zA-Z0-9 ]+$/,
 alphaNumWithSpecialRegx:  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).+$/,
 onlyCapAlpha: /[A-Z]/,
 onlyNumRegx: /\d/,
 onlyContainSpecialRegex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
 emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
}

export default validationRegex;