import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./ui/button";

interface Review {
  name: string;
  service: string;
  rating: number;
  review: string;
  image: string;
}

interface ReviewsCarouselProps {
  reviews: Review[];
}

export function ReviewsCarousel({ reviews }: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  const itemsPerView = {
    mobile: 1,
    tablet: 2,
    desktop: 3,
  };

  // Determine items to show based on screen size
  const [itemsToShow, setItemsToShow] = useState(itemsPerView.desktop);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsToShow(itemsPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setItemsToShow(itemsPerView.tablet);
      } else {
        setItemsToShow(itemsPerView.desktop);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!autoPlay) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (reviews.length - itemsToShow + 1));
    }, 5000);

    return () => clearInterval(interval);
  }, [autoPlay, itemsToShow, reviews.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? reviews.length - itemsToShow : prev - 1
    );
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % (reviews.length - itemsToShow + 1));
    setAutoPlay(false);
    setTimeout(() => setAutoPlay(true), 8000);
  };

  const visibleReviews = reviews.slice(
    currentIndex,
    currentIndex + itemsToShow
  );

  return (
    <section className="py-16 sm:py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 sm:mb-16">
          What people are saying
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Reviews Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {visibleReviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 animate-fade-in"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#3d6a68] to-[#2d5a58] flex items-center justify-center text-white font-bold text-lg">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{review.name}</h3>
                    <p className="text-sm text-gray-600">{review.service}</p>
                  </div>
                  <div className="ml-auto flex items-center gap-1 text-yellow-500 font-semibold">
                    <span>★</span>
                    <span>{review.rating}</span>
                  </div>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {review.review}
                </p>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4">
            <Button
              onClick={goToPrevious}
              className="bg-[#3d6a68] hover:bg-[#2d5a58] text-white rounded-full p-2 h-10 w-10"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            {/* Dots Indicator */}
            <div className="flex gap-2 items-center">
              {Array.from({ length: reviews.length - itemsToShow + 1 }).map(
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentIndex(index);
                      setAutoPlay(false);
                      setTimeout(() => setAutoPlay(true), 8000);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? "bg-[#3d6a68] w-8"
                        : "bg-gray-300 w-2 hover:bg-gray-400"
                    }`}
                  />
                )
              )}
            </div>

            <Button
              onClick={goToNext}
              className="bg-[#3d6a68] hover:bg-[#2d5a58] text-white rounded-full p-2 h-10 w-10"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Review Counter */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Showing {currentIndex + 1}-{Math.min(currentIndex + itemsToShow, reviews.length)} of {reviews.length} reviews
          </div>
        </div>
      </div>
    </section>
  );
}
