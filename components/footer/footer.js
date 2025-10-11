export function footer(){
    const pathPrefix = window.location.pathname.includes("/pages/")
      ? "../components/Images/"
      : "./components/Images/";
    return `<div class="footer">
    <div class="footer-top">
      <div class="footer-brand">
        <img
          src="${pathPrefix}60gye-logo.svg"
          class="logo"
          alt="60계 치킨 로고"
        />
        <div>
          <p class="brand-name">60계 치킨 대전 관평점</p>
          <p>대표 : 관평점주 김치킨 ｜ 사업자등록번호 : 123-45-67890</p>
          <p>대전광역시 유성구 관평동 887-3 1층 ｜ 매장번호 042-931-5222</p>
        </div>
      </div>
      <div class="footer-links">
        <div>
          <h4>브랜드</h4>
          <a href="#store">브랜드 스토리</a>
          <a href="#menu">메뉴 소개</a>
          <a href="#benefit">이벤트</a>
        </div>
        <div>
          <h4>고객 지원</h4>
          <a href="">자주 묻는 질문</a>
          <a href="">고객센터</a>
          <a href="">매장 찾기</a>
        </div>
        <div>
          <h4>정책 안내</h4>
          <a href="">이용약관</a>
          <a href="">개인정보 처리방침</a>
          <a href="">영상정보처리기기 운영방침</a>
        </div>
        <div>
          <h4>가맹 안내</h4>
          <a href="">가맹 문의</a>
          <a href="">상담 신청</a>
          <a href="">제휴 제안</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="store-apps">
        <p>60계 치킨 앱 다운로드</p>
        <div class="app-badges">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
            alt="Google Play"
          />
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9f/Download_on_the_App_Store_Badge_KR_RGB_blk.svg"
            alt="App Store"
          />
        </div>
      </div>
      <div class="socialmedia-links">
        <a href="https://www.instagram.com">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
            alt="instagram"
        /></a>
        <a href="https://www.facebook.com">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
            alt="facebook"
        /></a>
        <a href="https://pf.kakao.com">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/5c/KakaoTalk_logo.svg"
            alt="kakaotalk"
        /></a>
      </div>
    </div>

    <p class="copyright">
      COPYRIGHT © 2024 60GYE CHICKEN. ALL RIGHTS RESERVED.
    </p>
  </div>`
}

document.querySelector(".footer-div").innerHTML = footer();
