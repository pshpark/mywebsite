function init() {
    $('#footer').load('inc.html #footer .cont');
    $('#header').load('inc.html #header .stn',logoClickHandler);
    // footer load event

    let num = 0;
    let idx = 0;
    let delta;
    let LIST = "";
    const indexBody = document.querySelector(".index_body");
    const mainImg = document.querySelector(".photozone");
    const mainTit = document.querySelector(".main_tit01");
    const elMainCon = document.querySelectorAll(".main-page");
    const elMainCon1 = document.querySelector(".page1");
    const elHeader = document.querySelector("#header");
    const elHeaderBar = document.querySelectorAll(".btn_menu span");
    const elHeaderSpan = document.querySelectorAll("#header span");
    const elLogo = document.querySelector(".logo");
    const projectList = document.querySelector(".work_list ul");
    const loadPage = document.querySelector(".load");
    const workPage = document.querySelector(".work_page");
    const descWrap = document.querySelector(".project_page .desc_wrap");
    const projectPageVisual = document.querySelector(".project_page .visual");
    const btnGoTop = document.querySelector(".btn_goTop");
    const elContact = document.querySelector(".contact");

    // forEach for "IE"
    if (window.NodeList && !NodeList.prototype.forEach) {
        NodeList.prototype.forEach = Array.prototype.forEach;
    }


    // device check
    const isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
      
    const userAgent = navigator.userAgent.toLowerCase();
    const isTablet = /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(.*touch))|kindle|playbook|silk|(puffin(?!.*(IP|AP|WP))))/.test(userAgent);

    if (document.body.contains(workPage)) {
        fetch('resource/data/data.json')
        .then(  res => res.json()    )
        .then(  data => callback(data)   );

        function callback(data){
            data.list.forEach(function(item){
                LIST += `
                    <li data-list="${item.data}">
                        <a href="${item.url}" target="_self" title="${item.tit02}">
                            <img src="${item.img}" alt="${item.tit02}">
                            <div class="desc_wrap">
                                <p>${item.tit01}</p>
                                <p>${item.tit02}</p>
                            </div>
                        </a>
                    </li>
                `;
                projectList.innerHTML = LIST;
            })

            // list tab click event
            const btnListTab = document.querySelectorAll(".tab_wrap button");
            const workList = document.querySelectorAll(".work_list ul li");
            btnListTab.forEach(function(item,key){
                item.addEventListener("click",function(){
                    btnListTab.forEach(function(listAll){
                        listAll.classList.remove("on");
                    })
                    this.classList.add("on");
                    workList.forEach(function(list){
                        switch(key){
                            case 0: list.classList.remove("hide"); break;
                            case 1:
                                list.classList.remove("hide");
                                if( list.dataset.list == "etc" ){
                                    list.classList.add("hide");
                                }
                                break;
                            case 2:
                                list.classList.remove("hide");
                                if( list.dataset.list == "work" ){
                                    list.classList.add("hide");
                                }
                                break;
                        }
                    })
                })
            })
        };
    }

    if (document.body.contains(descWrap)) {
        window.addEventListener("scroll",function(){
            if( descWrap.getBoundingClientRect().top <= 50 ){
                elHeader.classList.add("on");
            } else {
                elHeader.classList.remove("on");
            }
            if( projectPageVisual.getBoundingClientRect().top <= 100 ){
                projectPageVisual.classList.add("on");
            }
            if( projectPageVisual.getBoundingClientRect().top >= 0 ) {
                projectPageVisual.classList.remove("on");
            }
        })
    }

    if (document.body.contains(mainImg)) {
        if( window.innerWidth > 1024 ){
            $(window).on('mousewheel DOMMouseScroll', function (e) {
                delta = e.originalEvent.wheelDelta || e.originalEvent.detail * -1;
                if (delta < 0) {
                    if (!(num == 11)) {
                        num++;
                        if (num <= 10) {
                            mainImg.style = `width:${(num * 5) + 50}vw; height:${(num * 5) + 50}vh;`;
                        }
                    }
                    if ((num == 11) && (idx < elMainCon.length)) {
                        idx++;
                    }
                } else {
                    if (!(idx == 0)) {
                        idx--;
                    }
                    if ((num > 0) && (idx == 0)) {
                        num--;
                        mainImg.style = `width:${(num * 5) + 50}vw; height:${(num * 5) + 50}vh;`;
                    }
                }
                if (num >= 10) {
                    mainTit.style = `color:#fff;`;
                    mainImg.classList.add("on");
        
                } else {
                    mainTit.style = `color:#000;`;
                    mainImg.classList.remove("on");
                }
                if (idx >= 1) {
                    elMainCon1.style = `background:#111;`;
                }
                if (idx != 1) {
                    elMainCon1.style = `background:#fff;`;
                }
                if (idx == 0 || idx == 1) {
                    elHeaderBar.forEach(item => item.style.background = "#fff");
                    elLogo.style.background = "#fff";
                    elHeaderSpan.forEach(item => item.style.color = "#fff");
                } else {
                    elHeaderBar.forEach(item => item.style.background = "#141150");
                    elLogo.style.background = "#141150";
                    elHeaderSpan.forEach(item => item.style.color = "#141150");
                }
                $('html,body').stop().animate({
                    scrollTop: ($(window).height()) * idx
                }, 600)
            }) 
        } else {
            indexBody.style.overflow = "visible";
        }
    }

    function logoClickHandler(){
        const elLogo = document.querySelector(".logo");
        const btnMenu = document.querySelector(".btn_menu");
        const workWrap = document.querySelector(".bd_work_wrap");
        const projectWrap = document.querySelector(".bg_project_wrap");

        elLogo.addEventListener("click", function () {
            $('html, body').animate({ scrollTop: '0' }, 300);
        })
        btnMenu.addEventListener("click",function(){
            elHeader.classList.toggle("active");
            if (document.body.contains(workWrap)) {
                workWrap.classList.toggle("on");
            }
            if (document.body.contains(projectWrap)) {
                projectWrap.classList.toggle("on");
            }
            if (document.body.contains(btnGoTop)) {
                btnGoTop.classList.toggle("on");
            }
            if (document.body.contains(indexBody)) {
                if( elHeader.classList.contains("active") ){
                    indexBody.style.overflow = "hidden";
                } else {
                    indexBody.style.overflow = "visible";
                }
            }
        })
    }

    // device check
    function deviceCheck(){
        if( isTablet ){
            console.log('tablet');
        } else if ( isMobile.any() ){
            console.log('mobile');
        } else {
            console.log('pc');
            card3d();
        }
    }
    deviceCheck();

    // Card Rotate 3D
    function card3d(){
        const cardFrame = document.querySelector(".card_frame");
        function rotate3D(e){
            let degX = e.clientX / window.innerWidth - 0.5;
            let degY = e.clientY / window.innerHeight - 0.5;
            cardFrame.style = `transform:rotateX(${44 * degY}deg) rotateY(${-42 * degX}deg);transition: 0.2s;`;
        }
        
        function mouseGone(){
            cardFrame.style = `transform: rotateX(0deg) rotateY(0deg); transition: 1.5s;`;
        }
        if (document.body.contains(elContact)) {
            window.addEventListener("mousemove",function(e){
                rotate3D(e);
            })
            window.addEventListener("mouseout",function(){
                mouseGone();
            })
        }
    }


    // page loading effect
    // loadPage.classList.add("hide");
    setTimeout(() => {
        loadPage.classList.add("hide");
    },1000);

    if (document.body.contains(btnGoTop)) {
        $(window).scroll(function () {
            const scrollTop = $(window).scrollTop();
    
            // wide_imgBox scroll animation
            if( scrollTop > 5) {
                $('.btn_goTop').css({
                    right: 20,
                    opacity: 1,
                }, 100);
            } else {
                $('.btn_goTop').css({
                    right: -50,
                    opacity: 0,
                }, 100);
            }
        });
        $('.btn_goTop').click(function(){
            $('html, body').animate({scrollTop: '0'}, 300);
        })
    }
}
window.addEventListener("load",function(){
    init();
})
window.addEventListener("resize",function(){
    deviceCheck();
});