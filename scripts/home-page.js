var loader;

function loadNow(opacity) {
  if (opacity <= 0) {
    displayContent();
  } else {
    loader.style.opacity = opacity;
    window.setTimeout(function () {
      loadNow(opacity - 0.05);
    }, 100);
  }
}

function displayContent() {
  loader.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  loader = document.getElementById("loader");
  loadNow(1);
});

import { navbar } from "../components/navbar/navbar.js";
document.querySelector(".navbar").innerHTML = navbar();

import { footer } from "../components/footer/footer.js";
document.querySelector(".footer-div").innerHTML = footer();

// navbar linking
document.querySelector("#navbar-kfc-logo").onclick = () => {
  location.href = "./index.html";
};
document.querySelector("#navbar-menu").onclick = () => {
  location.href = "./pages/menu.html";
};
document.querySelector("#navbar-man-icon").onclick = () => {
  location.href = "./pages/signup.html";
};
document.querySelector("#navbar-account").onclick = () => {
  location.href = "./pages/signup.html";
};
document.querySelector("#navbar-cart-bucket").onclick = () => {
  location.href = "./pages/cart.html";
};
document.querySelector(".cart-count").onclick = () => {
  location.href = "./pages/cart.html";
};

// Hero slider setup
const sliderImg = document.querySelector(".slider .img");
const sliderDots = document.querySelector(".slider-dots");
const heroTitle = document.querySelector(".hero-text h1");
const heroSubtitle = document.querySelector(".hero-sub");

const slides = [
  {
    src: "./components/Images/slider-delivery.svg",
    alt: "배달 프로모션",
    title: "집에서도 즐기는 관평점의 바삭한 치킨",
    subtitle:
      "관평동 전역 빠른 배달로 따끈한 치킨을 만나보세요. 멤버십 적립은 기본입니다.",
  },
  {
    src: "./components/Images/slider-takeout.svg",
    alt: "포장 프로모션",
    title: "전화 주문 042-931-5222",
    subtitle:
      "매일 16:00 - 24:00 운영 · 라스트 오더 23:00, 포장 예약은 미리 전화 주세요.",
  },
  {
    src: "./components/Images/slider-special.svg",
    alt: "시즌 한정 메뉴",
    title: "대전 관평점 전용 시즌 한정 메뉴",
    subtitle: "봄맞이 시그니처 라인업과 지역 한정 혜택을 지금 바로 만나보세요.",
  },
];

let currentSlide = 0;
let sliderInterval;

function renderDots() {
  sliderDots.innerHTML = "";
  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `${index + 1}번째 배너 보기`);
    dot.addEventListener("click", () => {
      updateSlider(index);
      restartSliderInterval();
    });
    sliderDots.appendChild(dot);
  });
}

function updateSlider(index) {
  currentSlide = index % slides.length;
  const slide = slides[currentSlide];
  sliderImg.innerHTML = `<img src="${slide.src}" alt="${slide.alt}" />`;
  heroTitle.textContent = slide.title;
  heroSubtitle.textContent = slide.subtitle;

  const dots = sliderDots.querySelectorAll("button");
  dots.forEach((dot, dotIndex) => {
    dot.classList.toggle("active", dotIndex === currentSlide);
  });
}

function startSliderInterval() {
  sliderInterval = window.setInterval(() => {
    updateSlider(currentSlide + 1);
  }, 5000);
}

function restartSliderInterval() {
  window.clearInterval(sliderInterval);
  startSliderInterval();
}

renderDots();
updateSlider(0);
startSliderInterval();

// Signature menu data (네이버 관평점 메뉴 참고)
const menuItems = [
  {
    name: "60계 후라이드 치킨",
    price: "₩19,000",
    description: "겉은 바삭하고 속은 촉촉한 관평점 대표 후라이드",
    image:
      "https://images.unsplash.com/photo-1608032362912-3c9d197f054d?auto=format&fit=crop&w=600&q=80",
    alt: "후라이드 치킨",
  },
  {
    name: "60계 양념 치킨",
    price: "₩21,000",
    description: "매콤달콤 특제 양념이 어우러진 베스트셀러",
    image:
      "https://images.unsplash.com/photo-1553163147-622ab57e7c74?auto=format&fit=crop&w=600&q=80",
    alt: "양념 치킨",
  },
  {
    name: "60계 간장 치킨",
    price: "₩21,000",
    description: "짭조름한 간장과 고소한 마늘향이 살아있는 간장 치킨",
    image:
      "https://images.unsplash.com/photo-1582659042112-079a1c9860b1?auto=format&fit=crop&w=600&q=80",
    alt: "간장 치킨",
  },
  {
    name: "레몬크림 치킨",
    price: "₩22,000",
    description: "상큼한 레몬과 크리미 소스 조합으로 색다른 풍미",
    image:
      "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=600&q=80",
    alt: "레몬크림 치킨",
  },
  {
    name: "매운 깐풍 치킨",
    price: "₩22,000",
    description: "알싸한 매운맛과 바삭한 식감이 매력적인 깐풍 스타일",
    image:
      "https://images.unsplash.com/photo-1608032362825-81f12c8a9456?auto=format&fit=crop&w=600&q=80",
    alt: "매운 깐풍 치킨",
  },
  {
    name: "치즈볼 세트",
    price: "₩5,000",
    description: "겉은 바삭, 속은 쫄깃한 인기 사이드 치즈볼",
    image:
      "https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=600&q=80",
    alt: "치즈볼",
  },
];

function renderMenuItems() {
  const grid = document.querySelector(".menu-grid");
  if (!grid) return;
  grid.innerHTML = "";
  menuItems.forEach((item) => {
    const card = document.createElement("article");
    card.className = "menu-card";

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.alt;
    img.loading = "lazy";

    const title = document.createElement("h3");
    title.textContent = item.name;

    const price = document.createElement("p");
    price.className = "menu-price";
    price.textContent = item.price;

    const desc = document.createElement("p");
    desc.className = "menu-desc";
    desc.textContent = item.description;

    const btn = document.createElement("button");
    btn.className = "tertiary-btn start-order-btn";
    btn.textContent = "바로 주문";

    card.append(img, title, price, desc, btn);
    grid.append(card);
  });
}

renderMenuItems();

// delivery options modal
const deliveryContainer = document.querySelector(".delivery-options-container");
const closeDivBtn = document.querySelector(".close-delivery-btn");
const quickPickBtn = document.querySelector(".quick-pick-btn");
const deliveryBtn = document.querySelector(".delivery-btn");
const startOrderButtons = document.querySelectorAll(".start-order-btn");

startOrderButtons.forEach((button) => {
  button.addEventListener("click", () => {
    deliveryContainer.classList.add("display-block");
  });
});

closeDivBtn.addEventListener("click", () => {
  deliveryContainer.classList.remove("display-block");
});

quickPickBtn.addEventListener("click", () => {
  window.location.href = "./pages/address-page.html";
});

deliveryBtn.addEventListener("click", () => {
  window.location.href = "./pages/address-page.html";
});

const viewMenuButtons = document.querySelectorAll(".view-menu-btn");
viewMenuButtons.forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "./pages/menu.html";
  });
});

// navbar cart
const cartData = JSON.parse(localStorage.getItem("cart-data")) || [];

function totalCartAmount() {
  const cartTotalArea = document.querySelector("#navbar-price");
  const totalCart = cartData.reduce((acc, curr) => {
    const numeric = curr.price ? curr.price.replace(/[^0-9.]/g, "") : "0";
    const price = Number(numeric || 0);
    return acc + price;
  }, 0);

  cartTotalArea.innerHTML =
    "₩" + Math.round(totalCart).toLocaleString("ko-KR");
}

totalCartAmount();

function cartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  cartCountElement.innerHTML = cartData.length;
}

cartCount();
