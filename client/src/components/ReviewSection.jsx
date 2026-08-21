import React, {
    useEffect,
    useState,
} from "react";

import {
    getFoodReviews,
    addReview,
    deleteReview,
} from "../services/reviewApi";

import "./ReviewSection.css";

function ReviewSection({
    foodId,
}) {
    const [reviews, setReviews] =
        useState([]);

    const [rating, setRating] =
        useState(5);

    const [comment, setComment] =
        useState("");

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const fetchReviews = async () => {
        try {
            const data =
                await getFoodReviews(
                    foodId
                );

            setReviews(
                data.reviews || []
            );
        } catch (error) {
            console.error(
                "GET REVIEWS ERROR:",
                error
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReviews();
    }, [foodId]);

    const handleSubmit = async (
        e
    ) => {
        e.preventDefault();

        const token =
            localStorage.getItem(
                "token"
            );

        if (!token) {
            alert(
                "Please log in to write a review."
            );
            return;
        }

        if (!comment.trim()) {
            alert(
                "Please write a review."
            );
            return;
        }

        try {
            setSubmitting(true);

            await addReview(
                foodId,
                rating,
                comment,
                token
            );

            alert(
                "Review added successfully! ⭐"
            );

            setRating(5);
            setComment("");

            await fetchReviews();
        } catch (error) {
            console.error(
                "ADD REVIEW ERROR:",
                error
            );

            alert(
                error.response
                    ?.data
                    ?.message ||
                    "Unable to add review."
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete =
        async (reviewId) => {
            const token =
                localStorage.getItem(
                    "token"
                );

            if (!token) {
                return;
            }

            try {
                await deleteReview(
                    reviewId,
                    token
                );

                alert(
                    "Review deleted."
                );

                await fetchReviews();
            } catch (error) {
                console.error(
                    "DELETE REVIEW ERROR:",
                    error
                );

                alert(
                    error.response
                        ?.data
                        ?.message ||
                        "Unable to delete review."
                );
            }
        };

    return (
        <section className="review-section">
            <div className="review-heading">
                <h2>
                    Customer Reviews ⭐
                </h2>

                <span>
                    {reviews.length} review
                    {reviews.length !==
                    1
                        ? "s"
                        : ""}
                </span>
            </div>

            <form
                className="review-form"
                onSubmit={
                    handleSubmit
                }
            >
                <h3>
                    Share your
                    experience
                </h3>

                <div className="star-selector">
                    {[1, 2, 3, 4, 5].map(
                        (star) => (
                            <button
                                type="button"
                                key={
                                    star
                                }
                                className={
                                    star <=
                                    rating
                                        ? "star active"
                                        : "star"
                                }
                                onClick={() =>
                                    setRating(
                                        star
                                    )
                                }
                            >
                                ★
                            </button>
                        )
                    )}
                </div>

                <textarea
                    value={comment}
                    onChange={(
                        e
                    ) =>
                        setComment(
                            e
                                .target
                                .value
                        )
                    }
                    placeholder="Tell us what you thought about this dish..."
                    maxLength={
                        500
                    }
                />

                <button
                    type="submit"
                    className="review-submit"
                    disabled={
                        submitting
                    }
                >
                    {submitting
                        ? "Submitting..."
                        : "Submit Review"}
                </button>
            </form>

            <div className="reviews-list">
                {loading ? (
                    <p>
                        Loading
                        reviews...
                    </p>
                ) : reviews.length ===
                  0 ? (
                    <p>
                        No reviews yet.
                        Be the first
                        one! ⭐
                    </p>
                ) : (
                    reviews.map(
                        (review) => (
                            <div
                                className="review-card"
                                key={
                                    review._id
                                }
                            >
                                <div className="review-top">
                                    <div>
                                        <h4>
                                            {review
                                                .user
                                                ?.name ||
                                                "Customer"}
                                        </h4>

                                        <div className="review-stars">
                                            {"★".repeat(
                                                review.rating
                                            )}

                                            <span>
                                                {"★".repeat(
                                                    5 -
                                                        review.rating
                                                )}
                                            </span>
                                        </div>
                                    </div>

                                    <small>
                                        {new Date(
                                            review.createdAt
                                        ).toLocaleDateString()}
                                    </small>
                                </div>

                                <p>
                                    {
                                        review.comment
                                    }
                                </p>

                                <button
                                    className="delete-review"
                                    onClick={() =>
                                        handleDelete(
                                            review._id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        )
                    )
                )}
            </div>
        </section>
    );
}

export default ReviewSection;