// 바닐라 JavaScript로 메뉴 드롭다운 구현
document.addEventListener("DOMContentLoaded", function () {
  const gnb = document.getElementById("gnb");
  const header = document.getElementById("header");
  const allTwoD = document.querySelectorAll(".twoD");
  const infoD = document.querySelector(".infoD");
  let infoTimeout; // timeout ID 저장용
  let leaveTimeout; // 지연된 숨김용 timeout

  console.log("DOM 로드됨");
  console.log("GNB 요소:", gnb);
  console.log("Header 요소:", header);
  console.log("드롭다운 메뉴 개수:", allTwoD.length);
  console.log("InfoD 요소:", infoD);

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
    });

    // infoD 요소는 220ms 지연 후 표시
    if (infoD) {
      // 기존 timeout이 있으면 클리어
      if (infoTimeout) {
        clearTimeout(infoTimeout);
      }

      infoTimeout = setTimeout(function () {
        // 모든 스타일 강제 적용
        infoD.style.display = "block";
        infoD.style.visibility = "visible";
        infoD.style.opacity = "1";
        infoD.style.position = "absolute";
        infoD.style.top = "462px";
        infoD.style.left = "50%";
        infoD.style.transform = "translateX(-50%)";
        infoD.style.zIndex = "1001";
        infoD.style.background = "rgba(255, 255, 255, 0.95)";

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
        twoD.style.display = "none";
      });

      // infoD 요소도 즉시 숨김
      if (infoD) {
        infoD.style.display = "none";
        console.log("InfoD 숨김");
      }
    }, 200); // 200ms 지연 후 숨김
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
        twoD.style.display = "none";
      });

      // infoD 요소도 즉시 숨김
      infoD.style.display = "none";
      console.log("InfoD 즉시 숨김");
    });
  }
});
