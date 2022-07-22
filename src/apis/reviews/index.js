import express from "express"
import uniqid from "uniqid"
import createHttpError from "http-errors"
import { checkReviewSchema, checkValidationResult } from "./validation.js"
import { getReviews, writeReviews } from "../../lib/fs-tools.js"

const reviewsRouter = express.Router()

reviewsRouter.post("/", checkReviewSchema, checkValidationResult, async (req, res, next) => {
  try {
    const newReview = { ...req.body, createdAt: new Date(), id: uniqid() }
    const reviews = await getReviews()

    reviews.push(newReview)

    await writeReviews(reviews)

    res.status(201).send({ id: newReview.id })
  } catch (error) {
    next(error)
  }
})

export default reviewsRouter