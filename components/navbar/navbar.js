export function navbar() {
  const pathPrefix = window.location.pathname.includes("/pages/")
    ? "../components/Images/"
    : "./components/Images/";
  return ` <div class="navbar-left">
    <div class="nav-checkbtn">
      <span class="material-symbols-outlined"> menu </span>
    </div>
    <img
      src="${pathPrefix}60gye-logo.svg"
      alt="60계 치킨 로고"
      id="navbar-kfc-logo"
    />
    <p id="navbar-menu" class="hide-item">메뉴</p>
    <a id="blog" href="#store"><p id="navbar-about" class="hide-item">매장 소개</p> </a>
    <a id="blog" href="#benefit"><p id="navbar-deals" class="hide-item">이벤트</p> </a>
  </div>

  <div class="navbar-right">
    <img
      class="man-icon hide-item" id="navbar-man-icon"
      src="https://images.ctfassets.net/wtodlh47qxpt/6bJdGLRkksNvWP4LI9ZiFF/cb89d6393492fd093e0f99980abfa39e/Account_Icon.svg"
      alt="man-icon"
    />
    <p id="navbar-account" class="account hide-item">마이페이지</p>

    <p id="navbar-price">₩0</p>
    <img id="navbar-cart-bucket"
      src="https://images.ctfassets.net/wtodlh47qxpt/6qtBVFuno7pdwOQ9RIvYm9/d13e9b7242980972cf49beddde2cc295/bucket_cart_icon.svg"
    />
  </div>`;
}

document.querySelector(".navbar").innerHTML = navbar();

//import code sample

// import  {navbar} from "./demo.js"
// let na = document.querySelector(".navbar");
// na.innerHTML = navbar();


// 2. Dont' forget to add type="module" in your script tag
