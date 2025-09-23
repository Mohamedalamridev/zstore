import React from "react";
import HeadTitle from "./HeadTitle";
import Product from "./Product";

function TopSelling({ products }) {
  return (
    <section className="">
      <div>
        <HeadTitle text="Top Selling" />
        <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 p-3 md:p-6 md:gap-x-6 gap-y-14">
          {products
            ?.filter((e) => e.isTopSelling)
            .map((p) => (
              <Product
                key={p?._id}
                id={p?._id}
                title={p?.title}
                img={p?.imgs?.[0] || "/default-image.jpg"}
                info={p?.moreInfo}
                price={p?.price}
                discount={p?.oldPrice ? p.oldPrice - p.price : 0}
                oldPrice={p?.oldPrice}
                sizes={p?.availableSizes}
              />
            ))}
        </div>
      </div>
    </section>
  );
}

export default TopSelling;
