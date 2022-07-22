import { checkSchema, validationResult } from "express-validator"
import createHttpError from "http-errors"

const productSchema = {
  name: {
    in: ["body"],
    isString: {
      errorMessage: "Name is a mandatory field and needs to be a string!",
    },
  },
  description: {
    in: ["body"],
    isString: {
      errorMessage: "Description is a mandatory field and needs to be a string!",
    },
  },
  brand: {
    in: ["body"],
    isString: {
      errorMessage: "Brand is a mandatory field and needs to be a string!",
    },
  },
  price: {
    in: ["body"],
    isDecimal: {
      errorMessage: "The product price must be a decimal!",
    },
  },
  category: {
    in: ["body"],
    isString: {
      errorMessage: "Category is a mandatory field and needs to be a string!",
    },
  },
 
}


export const checkProductSchema = checkSchema(productSchema) 

export const checkValidationResult = (req, res, next) => {

  const errors = validationResult(req)

  if (!errors.isEmpty()) {
  
    next(createHttpError(400, "Validation errors in request body!", { errorsList: errors.array() }))
  } else {
    
    next()
  }
}
