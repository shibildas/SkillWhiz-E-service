import banner1 from "../../assets/asset26.jpeg";
import banner2 from "../../assets/asset27.jpeg";

const Banner = () => {
  return (
    <div className="md:mx-60 my-10 ">
      <div className="carousel rounded-2xl">
        <div id="slide1" className="carousel-item relative w-full">
          <img src={banner1} className="w-full" />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" className="text-slate-400">
              ❮
            </a>
            <a href="#slide2" className="text-slate-400">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" className="carousel-item relative w-full">
          <img src={banner2} className="w-full" />
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
