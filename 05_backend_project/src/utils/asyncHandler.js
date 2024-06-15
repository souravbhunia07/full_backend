// Description: This file contains a function that wraps an async function in a try/catch block so that we can catch any errors that occur and pass them to the error handling middleware.

// using async/await
// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     } catch (error) {
//         res.status(err.code || 500).json({
//             success: false,
//             message: err.message || 'An unknown error occurred!'
//         })
//     }
// }

// using promise
const asyncHandler = (requestHandler) =>{
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}

export {asyncHandler};