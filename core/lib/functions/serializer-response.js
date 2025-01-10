/*export const successSerializer = (data) => ({
    data,
    success: true,
    error: null,
    message: ''
})*/

export const successSerializer = (res, code, data) => res.status(code).json({
    data,
    success: true,
    error: null,
    message: ''
})


export const failedSerializer = (res, code, message, error = 'Exception') => res.status(code).json({
    data: null,
    success: false,
    error,
    message
})
