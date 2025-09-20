import React, { useEffect } from "react";
import Review from "./Review";
import Recommends from "./Recommends";

function Reviews() {
  return (
    <section className="p-2 md:p-24">
      <h1 className="text-center py-6 text-3xl font-bold">Rating & Reviews</h1>
      <div className="">
        <h1 className="py-4 text-xl font-medium text-gray-600">
          All Reviews (45)
        </h1>
        <div className="reviews grid lg:grid-cols-2 gap-8">
          <Review
            rate={5}
            name="Samantha D."
            body="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="Posted on August 14, 2023"
          />
          <Review
            rate={3}
            name="Alex M."
            body="The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I'm quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."
            date="Posted on August 22, 2023"
          />
          <Review
            rate={5}
            name="Samantha D."
            body="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="Posted on August 14, 2023"
          />
          <Review
            rate={5}
            name="Samantha D."
            body="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="Posted on August 14, 2023"
          />
          <Review
            rate={5}
            name="Samantha D."
            body="I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It's become my favorite go-to shirt."
            date="Posted on August 14, 2023"
          />
        </div>
        <button className="mx-auto p-3 my-20 rounded-3xl text-sm border-2 border-gray-400 w-fit block">
          Load More
        </button>
        {/* <Recommends /> */}
      </div>
    </section>
  );
}

export default Reviews;
