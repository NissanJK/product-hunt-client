import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Banner = () => {
  const banners = [
    {
        image: "/10780308_19198946.jpg",
        title: "Discover the Future of Tech",
        description: "Explore the latest innovations and upvote your favorites.",
      },
      {
        image: "/11669186_20943803.jpg",
        title: "Join the ProductHunt Community",
        description: "Share your discoveries and connect with like-minded people.",
      },
      {
        image: "/14449322_5464026.jpg",
        title: "Unleash Your Creativity",
        description: "Submit your own products and get feedback from the community.",
      },
      {
        image: "/5061100_2667824.jpg",
        title: "Stay Ahead of the Curve",
        description: "Discover trending products and be the first to know about new releases.",
      },
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {banners.map((banner, index) => (
        <SwiperSlide key={index}>
          <div
            className="hero min-h-[400px]"
            style={{ backgroundImage: `url(${banner.image})` }}
          >
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
              <div className="max-w-md">
                <h1 className="text-5xl font-bold">{banner.title}</h1>
                <p className="py-6">{banner.description}</p>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;