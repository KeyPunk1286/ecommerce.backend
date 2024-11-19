const isUserCreateNotValid = (req, res) => {

    const errorResponse = {
        success: false,
        message: 'Validation errors',
        errors: []
    };

    validateEmail();

    if (errorResponse.errors.length > 0) {
        return res.status(400).json(errorResponse);
    }

    return false;
};

// --- Validation rules for module User

const validateEmail = (req, errorResponse) => {
    // emaill я назвав для тесту щоб стопудово сипалась помилка (треба прибрати подвійну букву ll - зробити її одинарною "email")
    if (req.body.emaill === null || req.body.emaill === undefined || req.body.emaill === '') {
        errorResponse.errors.push('Email is required!');
    }
}

module.exports = { isUserCreateNotValid };