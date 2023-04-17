

const Banner = () => {
  return (
    <div className=" my-10 shadow-2xl w-full">
      <div className="carousel rounded-2xl">
        <div id="slide1" className="carousel-item relative h-fit w-full">
          <img src="https://res.cloudinary.com/dpfnxwvps/image/upload/v1681655938/asset27_tchgic.avif" className="w-full" alt="image"/>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="text-slate-400">
              ❮
            </a>
            <a href="#slide2" className="text-slate-400">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative h-fit w-full">
          <img src="https://res.cloudinary.com/dpfnxwvps/image/upload/v1681655937/asset26_ysz8qr.avif" className="w-full" alt="image"/>
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" className="text-slate-400">
              ❮
            </a>
            <a href="#slide1" className="text-slate-400">
              ❯
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Banner;
