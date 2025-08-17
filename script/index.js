// 바닐라 JavaScript로 메뉴 드롭다운 구현
document.addEventListener("DOMContentLoaded", function () {
  const gnb = document.getElementById("gnb");
  const header = document.getElementById("header");
  const allTwoD = document.querySelectorAll(".twoD");
  const infoD = document.querySelector(".infoD");
  const searchPop = document.querySelector(".searchPop");
  const searchBtn = document.querySelector(".sch");
  const closeBtn = document.querySelector(".searchPop .closeBtn");
  const searchInput = document.querySelector(
    ".searchPop input[name='searchKey']"
  );
  let infoTimeout; // timeout ID 저장용
  let leaveTimeout; // 지연된 숨김용 timeout

  console.log("DOM 로드됨");
  console.log("GNB 요소:", gnb);
  console.log("Header 요소:", header);
  console.log("드롭다운 메뉴 개수:", allTwoD.length);
  console.log("InfoD 요소:", infoD);
  console.log("SearchPop 요소:", searchPop);

  if (!gnb || !header) {
    console.error("필요한 요소를 찾을 수 없습니다");
    return;
  }

  // GNB 전체에 호버 이벤트 적용
  gnb.addEventListener("mouseenter", function () {
    console.log("GNB 마우스 진입");
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

  // infoD 영역에 마우스 이벤트 추가
  if (infoD) {
    infoD.addEventListener("mouseenter", function () {
      console.log("InfoD 마우스 진입");

      // 지연된 숨김 취소
      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        leaveTimeout = null;
      }
    });

    infoD.addEventListener("mouseleave", function () {
      console.log("InfoD 마우스 벗어남");

      // 즉시 숨김
      header.classList.remove("on");

      // 모든 드롭다운 메뉴 숨김
      allTwoD.forEach(function (twoD) {
        twoD.classList.remove("show");
        setTimeout(function () {
          twoD.style.display = "none";
        }, 600); // 애니메이션 완료 후 숨김
      });

      // infoD 요소도 즉시 숨김
      infoD.style.display = "none";
      console.log("InfoD 즉시 숨김");
    });
  }

  // 검색 팝업 기능
  if (searchBtn && searchPop) {
    // 검색 버튼 클릭 시 팝업 열기
    searchBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("검색 팝업 열기");
      searchPop.classList.add("show");
      document.body.style.overflow = "hidden"; // 스크롤 방지

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
        document.body.style.overflow = ""; // 스크롤 복원
      });
    }

    // 배경 클릭 시 팝업 닫기
    searchPop.addEventListener("click", function (e) {
      if (e.target === searchPop) {
        console.log("배경 클릭으로 검색 팝업 닫기");
        searchPop.classList.remove("show");
        document.body.style.overflow = ""; // 스크롤 복원
      }
    });

    // ESC 키로 팝업 닫기
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && searchPop.classList.contains("show")) {
        console.log("ESC 키로 검색 팝업 닫기");
        searchPop.classList.remove("show");
        document.body.style.overflow = ""; // 스크롤 복원
      }
    });

    // 검색 실행 (Enter 키 또는 검색 버튼)
    const searchSubmitBtn = document.querySelector(".searchPop .btn");

    function performSearch() {
      const searchTerm = searchInput.value.trim();
      if (searchTerm) {
        console.log("검색어:", searchTerm);
        // 여기에 실제 검색 로직을 추가할 수 있습니다
        alert(`"${searchTerm}"에 대한 검색을 실행합니다.`);
        searchPop.classList.remove("show");
        document.body.style.overflow = ""; // 스크롤 복원
      } else {
        alert("검색어를 입력해주세요.");
        searchInput.focus();
      }
    }

    // Enter 키로 검색
    if (searchInput) {
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          performSearch();
        }
      });
    }

    // 검색 버튼으로 검색
    if (searchSubmitBtn) {
      searchSubmitBtn.addEventListener("click", function (e) {
        e.preventDefault();
        performSearch();
      });
    }
  }

  // Swiper 초기화
  const swiper = new Swiper(".swiper-container", {
    // 기본 설정
    direction: "horizontal",
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 1000,
    effect: "slide",

    // 페이지네이션
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      renderBullet: function (index, className) {
        return '<span class="' + className + '"></span>';
      },
    },

    // 네비게이션 버튼
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
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
      enabled: true,
    },

    // 슬라이드 변경 이벤트
    on: {
      slideChangeTransitionStart: function () {
        // 모든 텍스트 아래로 숨기기
        const allTxtElements = document.querySelectorAll(".swiper-slide .txt1");
        allTxtElements.forEach((txt) => {
          txt.style.opacity = "0";
          txt.style.transform = "translateY(20px)";
          txt.style.transition = "all 0.25s ease-in";
        });
      },
      slideChangeTransitionEnd: function () {
        // 활성 슬라이드의 텍스트만 아래에서 위로 표시
        const activeSlide = document.querySelector(".swiper-slide-active");
        if (activeSlide) {
          const activeTxt = activeSlide.querySelector(".txt1");
          if (activeTxt) {
            setTimeout(() => {
              activeTxt.style.opacity = "1";
              activeTxt.style.transform = "translateY(0)";
              activeTxt.style.transition =
                "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
            }, 200);
          }
        }
      },
      init: function () {
        // 초기 로드 시 첫 번째 슬라이드 텍스트를 아래에서 위로 표시
        setTimeout(() => {
          const firstActiveTxt = document.querySelector(
            ".swiper-slide-active .txt1"
          );
          if (firstActiveTxt) {
            firstActiveTxt.style.opacity = "1";
            firstActiveTxt.style.transform = "translateY(0)";
            firstActiveTxt.style.transition =
              "all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
          }
        }, 300);
      },
    },
  });

  console.log("Swiper 초기화 완료:", swiper);

  // 재생/정지 버튼 기능
  const playBtn = document.querySelector(".playBtn");
  let isPlaying = true;

  if (playBtn) {
    playBtn.addEventListener("click", function () {
      if (isPlaying) {
        swiper.autoplay.stop();
        playBtn.classList.add("paused");
        isPlaying = false;
        console.log("자동재생 정지");
      } else {
        swiper.autoplay.start();
        playBtn.classList.remove("paused");
        isPlaying = true;
        console.log("자동재생 시작");
      }
    });
  }
});
