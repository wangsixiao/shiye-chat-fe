import { useState, useEffect, useRef } from "react";
import TestImage from "./test.jpg";
import DefaultImage from './default.png'
import imgLimit from './limitClass'
import './index.css'

export default function ImageScroll() {
  const [images, setImages] = useState<string[]>([]);
  const imgDomList = useRef();

  useEffect(() => {
    const fetchImages = async () => {
      let result = []
      for (let i = 0; i < 20; i++) {
        result.push(DefaultImage);
      }
      setImages(result);
    };
    fetchImages();
  }, []);

  useEffect(() => {
    if(!images.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          const img = entry.target;
          // 方案二
          if (entry.isIntersecting) {
            imgLimit.run(img)
            observer.unobserve(img);
          }
          // 方案一
          // if (entry.isIntersecting) {
          //   // 进入视口，延迟加载
          //   const timerId = setTimeout(() => {
          //     img.src = TestImage;
          //     observer.unobserve(img);
          //   }, 200);
          //   img._lazyTimer = timerId;
          // } else {
          //   // 离开视口，清除延迟任务
          //   if (img._lazyTimer) {
          //     clearTimeout(img._lazyTimer);
          //     delete img._lazyTimer;
          //   }
          // }
        });
      }, { 
        threshold: 0.8
      });

      const imgRef = imgDomList.current.children || []
      Array.from(imgRef).forEach(img => {
        observer.observe(img);
      });
  }, [images]);

  return (
    <div>
    <div ref={imgDomList}>
      {images.map((image, index) => (
        <img data-src={TestImage} data-index={index} key={index} src={image} alt="image" />
      ))}
    </div>
    <img src={TestImage} loading="lazy" />
    </div>
  );
}
