export const Constants = {
    monthNames: [
        null,
        'Január',
        'Február',
        'Március',
        'Április',
        'Május',
        'Június',
        'Július',
        'Augusztus',
        'Szeptember',
        'Október',
        'November',
        'December'
    ],

    mongoDbCollections: {
        monthlyData: 'monthlyData',
        user: 'user'
    },

    userNameRegex: /^(?=.{3,20}$)[a-z][a-z0-9]*(?:[._][a-z0-9]+)*$/,
    passwordRegex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])\S{12,64}$/,
    emailRegex: /^(?!.*\.\.)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
};