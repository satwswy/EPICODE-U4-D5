import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const reviewSchema = {
  comment: {
    in: ["body"],
    isString: {
      errorMessage: "Comment is a mandatory field and needs to be a string!",
    },
  },
  productId: {
    in: ["body"],
    isString: {
      errorMessage: "ProductId is a mandatory field and needs to be a string!",
    },
  },
  rate: {
    in: ["body"],
    isDecimal: {
      errorMessage: "Rate must be a decimal!",
    },
  },
}


export const checkReviewSchema = checkSchema(reviewSchema) 

export const checkValidationResult = (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
  
    next(createHttpError(400, "Validation errors in request body!", { errorsList: errors.array() }))
  } else {
    
    next()
  }
}
