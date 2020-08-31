import React, { useState, useEffect } from "react";
import "./App.css";

const imgs = [
  "https://img.ivsky.com/img/tupian/pre/202003/18/xingkong-005.jpg",
  "https://img.ivsky.com/img/tupian/pre/202003/18/xingkong-007.jpg",
  "https://img.ivsky.com/img/tupian/pre/202003/18/xingkong-008.jpg",
];

function useInterval(cb, interval) {
  useEffect(() => {
    const start = new Date().getTime();
    const I = setInterval(() => {
      cb(new Date().getTime() - start);
    }, interval);
    return () => clearInterval(I);
  }, []);
}

function useSlider(N, speed = 1000) {
  const [slider, setSlider] = useState(0);
  useInterval((diff) => {
    setSlider(() => Math.floor(diff / speed) % N);
  }, speed);
  return slider;
}

function App() {
  const slider = useSlider(imgs.length);

  return (
    <div className="scroller">
      <div
        className="inner"
        style={{
          width: `${imgs.length * 100}%`,
          transform: `translateX(-${(100 * slider) / imgs.length}%)`,
        }}
      >
        {imgs.map((src) => (
          <img
            src={src}
            key={src}
            style={{
              width: `${100 / imgs.length}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
