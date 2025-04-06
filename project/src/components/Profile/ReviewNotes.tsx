import React, { useState } from 'react';

interface Review {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
  rating: number;
}

interface ReviewNotesProps {
  postId: string;
  initialReviews?: Review[];
}

export const ReviewNotes: React.FC<ReviewNotesProps> = ({
  postId,
  initialReviews = []
}) => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(5);
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const review: Review = {
      id: Date.now().toString(),
      author: {
        name: 'You',
        avatar: 'https://placehold.co/32x32'
      },
      content: newReview,
      timestamp: new Date().toISOString(),
      rating
    };

    setReviews(prev => [review, ...prev]);
    setNewReview('');
    setRating(5);
    setShowReviewForm(false);
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="mt-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-white">Game Reviews</h3>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          <i className="fas fa-pen-to-square mr-2"></i>
          Write a review
        </button>
      </div>

      {showReviewForm && (
        <form onSubmit={handleSubmitReview} className="mb-6 bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="mb-4">
            <div className="flex items-center space-x-1 mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredStar(star)}
                  onMouseLeave={() => setHoveredStar(null)}
                  className="text-xl focus:outline-none"
                >
                  <i className={`fas fa-star ${
                    (hoveredStar !== null ? star <= hoveredStar : star <= rating)
                      ? 'text-yellow-400'
                      : 'text-gray-600'
                  }`}></i>
                </button>
              ))}
            </div>
            <textarea
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              placeholder="Share your thoughts about this game..."
              className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400"
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-4 py-2 text-gray-400 hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {reviews.map(review => (
          <div key={review.id} className="flex space-x-3">
            <img
              src={review.author.avatar}
              alt={review.author.name}
              className="w-8 h-8 rounded-full"
            />
            <div className="flex-1">
              <div className="bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                <div className="flex justify-between items-start">
                  <p className="font-medium text-sm text-white">{review.author.name}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star text-sm ${
                          i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                        }`}
                      ></i>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 mt-1">{review.content}</p>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {formatTimestamp(review.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};