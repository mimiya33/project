/**
 * 함수호출
 * */
heroSlider();
recruitSlider();
gnb();
newsSlider();
brandSlider();
initSearchPop();
/**
 * 함수선언
 **/

//메인 슬라이더
function heroSlider() {
  const swiper = new Swiper(".hero", {
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
    },
    speed: 1000,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        if (index < 7) {
          return '<span class="' + className + '"></span>';
        } else {
          return "";
        }
      },
    },
    navigation: {
      nextEl: ".hero .swiper-button-next",
      prevEl: ".hero .swiper-button-prev",
    },

    // 슬라이드 설정
    slidesPerView: 1,
    spaceBetween: 0,

    // 터치/마우스 설정
    touchRatio: 1,
    touchAngle: 45,
    grabCursor: true,

    // 키보드 제어
    keyboard: {
      enabled: true,
    },

    // 마우스휠 제어
    mousewheel: {
      enabled: false,
    },

    // 슬라이드 변경 이벤트
    on: {
      slideChangeTransitionStart: function () {
        // 모든 텍스트 아래로 숨기기
        const allTxtElements = document.querySelectorAll(".hero .swiper-slide .txt1");
        allTxtElements.forEach((txt) => {
          txt.style.opacity = "0";
          txt.style.transform = "translateY(20px)";
          txt.style.transition = "all 0.25s ease-in";
        });
      },
      slideChange: function () {
        // loop 상태에서도 항상 올바른 불릿에 active 적용
        const realIndex = this.realIndex % 7;
        const bullets = document.querySelectorAll(".hero .swiper-pagination-bullet");
        bullets.forEach((b, i) => {
          if (i === realIndex) {
            b.classList.add("swiper-pagination-bullet-active");
          } else {
            b.classList.remove("swiper-pagination-bullet-active");
          }
        });
      },
      slideChangeTransitionEnd: function () {
        // 활성 슬라이드의 텍스트만 아래에서 위로 표시
        const activeSlide = document.querySelector(".hero .swiper-slide-active");
        if (activeSlide) {
          const activeTxt = activeSlide.querySelector(".txt1");
          if (activeTxt) {
            setTimeout(() => {
              activeTxt.style.opacity = "1";
              activeTxt.style.transform = "translateY(0)";
              activeTxt.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            }, 200);
          }
        }
        const realIndex = this.realIndex % 7;
        const bullets = document.querySelectorAll(".hero .swiper-pagination-bullet");
        bullets.forEach((b, i) => {
          if (i === realIndex) {
            b.classList.add("swiper-pagination-bullet-active");
          } else {
            b.classList.remove("swiper-pagination-bullet-active");
          }
        });
      },
      init: function () {
        setTimeout(() => {
          const firstActiveTxt = document.querySelector(".swiper-slide-active .txt1");
          if (firstActiveTxt) {
            firstActiveTxt.style.opacity = "1";
            firstActiveTxt.style.transform = "translateY(0)";
            firstActiveTxt.style.transition = "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          }
        }, 300);
        const swiper = this;
        setTimeout(() => {
          const realIndex = swiper.realIndex % 7;
          const bullets = document.querySelectorAll(".swiper-pagination-bullet");
          bullets.forEach((b, i) => {
            if (i === realIndex) {
              b.classList.add("swiper-pagination-bullet-active");
            } else {
              b.classList.remove("swiper-pagination-bullet-active");
            }
          });
        }, 10);
      },
    },
  });

  const playBtn = document.querySelector(".hero .playBtn");
  let isPlaying = true;

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (isPlaying) {
        swiper.autoplay.stop();
        playBtn.classList.add("paused");
        isPlaying = false;
      } else {
        swiper.autoplay.start();
        playBtn.classList.remove("paused");
        isPlaying = true;
      }
    });
  }
}
//Recruit 슬라이더
function recruitSlider() {
  new Swiper(".recruitSlider .recruit-container", {
    loop: true,
    autoplay: {
      delay: 4000,
    },
    pagination: {
      el: ".recruitDots",
      clickable: true,
    },
  });
}
//gnb
function gnb() {
  const gnb = document.getElementById("gnb");
  const header = document.getElementById("header");
  const allTwoD = document.querySelectorAll(".twoD");
  const infoD = document.querySelector(".infoD");
  const searchPop = document.querySelector(".searchPop");
  const searchBtn = document.querySelector(".sch");
  const closeBtn = document.querySelector(".searchPop .closeBtn");
  const searchInput = document.querySelector(".searchPop input[name='searchKey']");
  let infoTimeout; // timeout ID 저장용
  let leaveTimeout; // 지연된 숨김용 timeout

  // GNB 전체에 호버 이벤트 적용
  gnb.addEventListener("mouseenter", function () {
    header.classList.add("on");

    // 지연된 숨김 취소
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = null;
    }

    // 모든 드롭다운 메뉴 표시
    allTwoD.forEach(function (twoD) {
      twoD.style.display = "block";
      setTimeout(function () {
        twoD.classList.add("show");
      }, 5); // 거의 즉시 애니메이션 시작
    });

    // infoD 요소는 220ms 지연 후 표시
    if (infoD) {
      // 기존 timeout이 있으면 클리어
      if (infoTimeout) {
        clearTimeout(infoTimeout);
      }

      infoTimeout = setTimeout(function () {
        // CSS 클래스 추가로 표시
        infoD.style.display = "block";
        console.log("InfoD 표시됨 (지연 후)");
      }, 220); // 220ms 지연
    }
  });

  gnb.addEventListener("mouseleave", function () {
    console.log("GNB 마우스 벗어남");

    // 지연된 숨김 실행 (200ms 후에 숨김)
    leaveTimeout = setTimeout(function () {
      header.classList.remove("on");

      // timeout 클리어 (infoD가 나타나기 전에 마우스가 벗어날 경우)
      if (infoTimeout) {
        clearTimeout(infoTimeout);
        infoTimeout = null;
      }

      // 모든 드롭다운 메뉴 숨김
      allTwoD.forEach(function (twoD) {
        twoD.classList.remove("show");
        setTimeout(function () {
          twoD.style.display = "none";
        }, 100); // 빠른 애니메이션 완료 후 숨김
      });

      // infoD 요소도 즉시 숨김
      if (infoD) {
        infoD.style.display = "none";
        console.log("InfoD 숨김");
      }
    }, 50); // 50ms 지연 후 숨김
  });
}
//뉴스 슬라이더
function newsSlider() {
  const news = new Swiper("#newsList", {
    direction: "vertical",
    loop: true,
    autoplay: {
      delay: 2500,
    },
    navigation: {
      nextEl: ".btnA .next",
      prevEl: ".btnA .prev",
    },
  });
}

//브랜드슬라이더
function brandSlider() {
  const swiper = new Swiper(".tabConDiv", {
    effect: "fade",
    fadeEffect: {
      crossFade: true
    },
    slidesPerView: 1,
    spaceBetween: 0,
    loop: false,
    speed: 1000,
    initialSlide: 0,
    pagination: {
      el: ".tabAreaD",
      clickable: true,
      renderBullet: function (index, className) {
        const name = ["칠성사이다", "펩시콜라", "델몬트", "밀키스", "칸타타", "핫식스", "아이시스8.0", "레쓰비", "처음처럼", "새로", "클라우드", "크러시"];
        return '<span class="brand ' + className + '">' + name[index] + "</span>";
      },
    },
    on: {
      init: function () {
        setTimeout(() => {
          const firstBullet = document.querySelector('.tabAreaD .brand');
          if (firstBullet) {
            firstBullet.classList.add('swiper-pagination-bullet-active');
          }
        }, 10);
      }
    }
  });
}

// 검색 팝업 기능
function initSearchPop() {
  const searchPop = document.querySelector(".searchPop");
  const searchBtn = document.querySelector(".sch");
  const closeBtn = document.querySelector(".searchPop .closeBtn");
  const searchInput = document.querySelector(".searchPop input[name='searchKey']");

  console.log("Search elements:", { searchPop, searchBtn, closeBtn, searchInput });

  if (searchBtn && searchPop) {
    // 검색 버튼 클릭 시 팝업 열기
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("검색 팝업 열기");
      searchPop.classList.add("show");
      document.body.style.overflow = "hidden";

      // 입력 필드에 포커스
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
        }
      }, 300);
    });

    // 닫기 버튼 클릭 시 팝업 닫기
    if (closeBtn) {
      closeBtn.addEventListener("click", function (e) {
        e.preventDefault();
        console.log("검색 팝업 닫기");
        searchPop.classList.remove("show");
        document.body.style.overflow = "";
      });
    }

    // 배경 클릭 시 팝업 닫기
    searchPop.addEventListener("click", function (e) {
      if (e.target === searchPop) {
        console.log("배경 클릭으로 검색 팝업 닫기");
        searchPop.classList.remove("show");
        document.body.style.overflow = "";
      }
    });

    // ESC 키로 팝업 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchPop.classList.contains("show")) {
        console.log("ESC 키로 검색 팝업 닫기");
        searchPop.classList.remove("show");
        document.body.style.overflow = "";
      }
    });
  } else {
    console.error("검색 요소를 찾을 수 없습니다:", { searchBtn, searchPop });
  }
}
