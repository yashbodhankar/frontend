"use client";

import { useEffect } from "react";

export function ScrollEffects() {
  useEffect(() => {
    let raf = 0;

    const updateParallax = () => {
      const scrollY = window.scrollY;
      const nodes = document.querySelectorAll<HTMLElement>("[data-parallax]");

      nodes.forEach((node) => {
        const speed = Number(node.dataset.parallax ?? "0");
        node.style.willChange = 'transform';
        node.style.transform = `translate3d(0, ${scrollY * speed}px, 0)`;
      });
    };


    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateParallax);
    };

    const revealNodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.14 },
    );

    revealNodes.forEach((node) => observer.observe(node));
    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return null;
}
