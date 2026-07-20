/* ==================================
   TRAP MOVIES PREMIUM UI
   GLASSMORPHISM SYSTEM
================================== */


/* =========================
        RESET
========================= */


*{

margin:0;
padding:0;
box-sizing:border-box;

font-family:'Poppins',sans-serif;

}



html{

scroll-behavior:smooth;

}



body{


background:

radial-gradient(
circle at top,
#3b005f 0%,
#080808 45%,
#050505 100%
);


color:white;


overflow-x:hidden;


}



img{

width:100%;

display:block;

}



button{

font-family:inherit;

cursor:pointer;

border:none;

}



a{

text-decoration:none;

color:white;

}







/* =========================
        GLOBAL GLASS
========================= */


.glass{


background:

rgba(255,255,255,.08);



backdrop-filter:

blur(25px);



-webkit-backdrop-filter:

blur(25px);



border:

1px solid rgba(255,255,255,.18);



box-shadow:

0 20px 50px rgba(0,0,0,.45);


}







/* =========================
        SCROLL BAR
========================= */


::-webkit-scrollbar{

width:8px;

}



::-webkit-scrollbar-track{

background:#050505;

}



::-webkit-scrollbar-thumb{


background:

linear-gradient(
180deg,
#e50914,
#8a2be2
);



border-radius:20px;


}







/* =========================
        HEADER
========================= */


.header{


position:fixed;


top:20px;


left:20px;


right:20px;



height:72px;



padding:0 25px;



display:flex;


align-items:center;


justify-content:space-between;





background:

rgba(255,255,255,.10);





backdrop-filter:

blur(30px);



-webkit-backdrop-filter:

blur(30px);





border:

1px solid rgba(255,255,255,.2);





border-radius:25px;





z-index:1000;





box-shadow:

0 15px 50px rgba(0,0,0,.6);


}









/* =========================
        LOGO
========================= */


.logo{


font-size:27px;


font-weight:900;


letter-spacing:1px;


}



.logo span{


background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



-webkit-background-clip:text;



background-clip:text;



color:transparent;


}








/* =========================
        HEADER BUTTONS
========================= */


.menu-btn,
.search-btn{


width:45px;


height:45px;



display:flex;


align-items:center;


justify-content:center;




border-radius:50%;





color:white;



background:

rgba(255,255,255,.12);





border:

1px solid rgba(255,255,255,.18);





transition:.35s;


}





.menu-btn:hover,
.search-btn:hover{


background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



transform:

scale(1.1)
rotate(5deg);


}









/* =========================
        MAIN NAVIGATION
========================= */


.main-nav{


position:fixed;


top:110px;


left:50%;


transform:translateX(-50%);





display:flex;



align-items:center;



gap:40px;



padding:

15px 35px;





background:

rgba(255,255,255,.07);





backdrop-filter:

blur(25px);





-webkit-backdrop-filter:

blur(25px);





border:

1px solid rgba(255,255,255,.15);





border-radius:50px;





z-index:999;



box-shadow:

0 15px 40px rgba(0,0,0,.4);


}








.main-nav a{


position:relative;


font-size:15px;


font-weight:600;



color:#aaa;



transition:.3s;


}





.main-nav a:hover,
.main-nav a.active{


color:white;


}






.main-nav a::after{


content:"";



position:absolute;



left:50%;



bottom:-10px;



transform:translateX(-50%);





height:3px;



width:0;



border-radius:20px;



background:

linear-gradient(
90deg,
#e50914,
#8a2be2
);





transition:.35s;


}






.main-nav a:hover::after,
.main-nav a.active::after{


width:100%;


}
/* =========================
        SIDE MENU
========================= */


.side-menu{


position:fixed;


top:0;


left:-340px;



width:320px;


height:100vh;



padding:30px;



background:

rgba(255,255,255,.08);



backdrop-filter:

blur(35px);



-webkit-backdrop-filter:

blur(35px);





border-right:

1px solid rgba(255,255,255,.18);





z-index:2000;



transition:.45s ease;



box-shadow:

20px 0 60px rgba(0,0,0,.7);



overflow-y:auto;


}




.side-menu.active{


left:0;


}







.menu-header{


display:flex;


align-items:center;


justify-content:space-between;



margin-bottom:35px;


}




.menu-header h2{


font-size:24px;


font-weight:800;


}





.close-btn{


width:42px;


height:42px;



display:flex;


align-items:center;


justify-content:center;



border-radius:50%;



background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



color:white;


}







.side-menu ul{


list-style:none;


}





.side-menu li{


display:flex;


align-items:center;


gap:18px;



padding:15px;



margin:10px 0;



border-radius:18px;





background:

rgba(255,255,255,.06);





border:

1px solid rgba(255,255,255,.1);





color:#ddd;



transition:.3s;


}





.side-menu li i{


color:#e50914;


width:20px;


}





.side-menu li:hover{


background:

rgba(138,43,226,.35);



transform:

translateX(8px);


}










/* =========================
        OVERLAY
========================= */


.overlay-bg{


position:fixed;


inset:0;




background:

rgba(0,0,0,.75);



backdrop-filter:

blur(10px);





opacity:0;



visibility:hidden;





transition:.3s;



z-index:1500;


}





.overlay-bg.active{


opacity:1;


visibility:visible;


}











/* =========================
        HERO SLIDER
========================= */


.hero{


position:relative;



height:550px;



margin:

160px 20px 50px;





border-radius:35px;



overflow:hidden;





border:

1px solid rgba(255,255,255,.15);





box-shadow:


0 0 70px rgba(138,43,226,.35);


}






.slides-container{


height:100%;


width:100%;


position:relative;


}







.slide{


position:absolute;



inset:0;



opacity:0;



visibility:hidden;



transition:1s ease;


}





.slide.active{


opacity:1;



visibility:visible;


}





.slide img{


height:100%;



object-fit:cover;



animation:

zoomEffect 12s infinite alternate;


}







@keyframes zoomEffect{


from{

transform:scale(1);

}


to{

transform:scale(1.1);

}


}







.hero-overlay{


position:absolute;



inset:0;





display:flex;


align-items:flex-end;





padding:50px;





background:

linear-gradient(

90deg,

rgba(0,0,0,.95),

rgba(0,0,0,.5),

transparent

);



}









.movie-info{


max-width:620px;



padding:35px;



border-radius:30px;



background:

rgba(255,255,255,.08);





backdrop-filter:

blur(25px);



-webkit-backdrop-filter:

blur(25px);





border:

1px solid rgba(255,255,255,.18);



}



.movie-info h1{


font-size:50px;



font-weight:900;



margin:15px 0;


}



.movie-info p{


color:#ddd;


line-height:1.7;


}






.tag{


display:inline-block;



padding:8px 20px;



border-radius:30px;



background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



font-weight:700;


}







.hero-buttons{


display:flex;



gap:15px;



margin-top:25px;


}




.watch,
.info{


padding:

14px 30px;



border-radius:40px;



font-weight:700;



transition:.3s;


}



.watch{


background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



color:white;


}





.info{


background:

rgba(255,255,255,.15);



backdrop-filter:

blur(15px);



color:white;


}





.watch:hover,
.info:hover{


transform:

translateY(-5px);


}









/* =========================
        MOVIE ROWS
========================= */


.movie-row{


margin:

50px 20px;


}



.movie-row h2{


font-size:28px;


margin-bottom:20px;


}






.movie-container{


display:flex;



gap:22px;



overflow-x:auto;



scroll-behavior:smooth;


}





.movie-container::-webkit-scrollbar{


display:none;


}








/* =========================
        MOVIE CARDS
========================= */


.movie-card{


min-width:190px;



border-radius:25px;



overflow:hidden;



cursor:pointer;





background:

rgba(255,255,255,.08);



backdrop-filter:

blur(20px);



-webkit-backdrop-filter:

blur(20px);





border:

1px solid rgba(255,255,255,.15);





box-shadow:

0 15px 40px rgba(0,0,0,.45);





transition:.35s;


}






.movie-card:hover{


transform:

translateY(-12px)
scale(1.03);



box-shadow:

0 25px 60px rgba(138,43,226,.45);


}







.movie-card img{


height:270px;



object-fit:cover;


}







.movie-card h3{


padding:14px;



font-size:16px;



white-space:nowrap;



overflow:hidden;



text-overflow:ellipsis;


}







.movie-card p{


padding:

0 14px 18px;



color:#ccc;


}
/* =========================
      MOVIE DETAILS PAGE
========================= */


.movie-details-page{


padding-top:130px;


}







.movie-hero{


position:relative;



min-height:700px;



margin:20px;



border-radius:35px;



overflow:hidden;



border:

1px solid rgba(255,255,255,.15);



}








.movie-backdrop{


position:absolute;



inset:0;



background-size:cover;



background-position:center;



filter:blur(3px);



opacity:.45;


}








.movie-content{


position:relative;



z-index:2;



display:flex;



align-items:center;



gap:50px;



padding:60px;



background:



linear-gradient(

90deg,

rgba(0,0,0,.9),

rgba(0,0,0,.35)

);


}







/* POSTER */


.movie-poster{


width:280px;



flex-shrink:0;


}




.movie-poster img{


width:280px;



height:430px;



object-fit:cover;



border-radius:30px;



border:

1px solid rgba(255,255,255,.2);



box-shadow:

0 25px 70px rgba(0,0,0,.8);


}








/* MOVIE INFO */


.movie-info-box{


max-width:650px;



padding:35px;



border-radius:30px;



background:

rgba(255,255,255,.08);



backdrop-filter:

blur(25px);



-webkit-backdrop-filter:

blur(25px);



border:

1px solid rgba(255,255,255,.18);



}







.movie-info-box h1{


font-size:52px;



font-weight:900;



margin-bottom:20px;


}








.movie-description{


color:#ddd;



line-height:1.8;



margin:25px 0;


}







/* META TAGS */


.movie-meta{


display:flex;



gap:12px;



flex-wrap:wrap;


}





.movie-meta span{


padding:

8px 18px;



border-radius:30px;



background:

rgba(255,255,255,.12);



border:

1px solid rgba(255,255,255,.15);



backdrop-filter:

blur(15px);


}







/* GENRES */


.genres{


display:flex;



gap:10px;



flex-wrap:wrap;



margin-top:20px;


}




.genres span{


padding:

8px 18px;



border-radius:30px;



background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



font-size:13px;


}









/* =========================
        EXTRA INFO BOXES
========================= */


.movie-extra-info{


margin:

50px 20px;


}




.movie-extra-info h2{


font-size:30px;



margin-bottom:25px;


}







.info-grid{


display:grid;



grid-template-columns:

repeat(
auto-fit,
minmax(220px,1fr)
);



gap:20px;


}








.info-box{


padding:25px;



border-radius:25px;



background:

rgba(255,255,255,.08);



backdrop-filter:

blur(20px);



border:

1px solid rgba(255,255,255,.15);



transition:.3s;


}





.info-box:hover{


transform:

translateY(-8px);



background:

rgba(255,255,255,.15);


}





.info-box h3{


color:#e50914;



margin-bottom:10px;


}







.info-box p{


color:#ddd;



line-height:1.5;


}









/* =========================
        WATCHLIST BUTTON
========================= */


.watchlist-btn{


padding:

14px 30px;



border-radius:40px;



background:

rgba(255,255,255,.15);



border:

1px solid rgba(255,255,255,.2);



color:white;



font-weight:700;



backdrop-filter:

blur(15px);



transition:.3s;


}





.watchlist-btn:hover{


background:

linear-gradient(
45deg,
#e50914,
#8a2be2
);



transform:

translateY(-5px);


}









/* =========================
        TRAILER SECTION
========================= */


.trailer-section{


margin:

50px 20px;


}





.trailer-section h2{


font-size:30px;



margin-bottom:25px;


}







.trailer-box{


width:100%;



min-height:420px;



border-radius:30px;



overflow:hidden;



background:

rgba(255,255,255,.08);



backdrop-filter:

blur(20px);



border:

1px solid rgba(255,255,255,.15);


}





.trailer-box iframe{


width:100%;



height:450px;



border:none;


}









/* =========================
        CAST SECTION
========================= */


.cast-section{


margin:

50px 20px;


}






.cast-container{


display:flex;



gap:20px;



overflow-x:auto;


}





.cast-container::-webkit-scrollbar{


display:none;


}







.cast-card{


min-width:150px;



border-radius:25px;



overflow:hidden;



text-align:center;



background:

rgba(255,255,255,.08);



backdrop-filter:

blur(20px);



border:

1px solid rgba(255,255,255,.15);



transition:.3s;


}







.cast-card:hover{


transform:

translateY(-10px);


}







.cast-card img{


height:190px;



object-fit:cover;


}







.cast-card h3{


padding:

12px 5px 5px;



font-size:14px;



white-space:nowrap;



overflow:hidden;



text-overflow:ellipsis;


}





.cast-card p{


color:#aaa;



font-size:12px;



padding-bottom:15px;


}









/* =========================
        SIMILAR MOVIES
========================= */


.similar-section{


margin:

50px 20px;


}



.similar-section h2{


font-size:30px;



margin-bottom:25px;


}
/* ==================================
        SEARCH PAGE
        PREMIUM GLASS UI
================================== */


.search-page{


    position:fixed;

    inset:0;

    z-index:3000;


    padding:30px;


    overflow-y:auto;



    background:

    rgba(5,5,5,.85);



    backdrop-filter:

    blur(30px);



    -webkit-backdrop-filter:

    blur(30px);



    transform:

    translateY(100%);



    transition:

    .5s cubic-bezier(.4,0,.2,1);


}




.search-page.active{


    transform:

    translateY(0);


}






.search-header{


    display:flex;


    align-items:center;


    gap:20px;


    margin-bottom:40px;


}





.back-search{


    width:48px;

    height:48px;


    border-radius:50%;


    border:

    1px solid rgba(255,255,255,.2);



    color:white;



    background:

    rgba(255,255,255,.12);



    backdrop-filter:

    blur(15px);



    transition:.3s;


}




.back-search:hover{


    background:#e50914;


    transform:

    scale(1.1);


}









.search-box{


    max-width:850px;


    margin:auto;



    display:flex;


    align-items:center;


    gap:15px;



    padding:

    18px 25px;



    border-radius:50px;



    background:

    rgba(255,255,255,.1);



    border:

    1px solid rgba(255,255,255,.18);



    backdrop-filter:

    blur(25px);



    box-shadow:

    0 20px 50px rgba(0,0,0,.5);



}




.search-box i{


    color:#e50914;


    font-size:20px;


}






.search-box input{


    flex:1;


    background:none;


    border:none;


    outline:none;


    color:white;


    font-size:17px;


}




.search-box input::placeholder{


    color:#aaa;


}










/* SEARCH FILTER */


.search-filter{


    display:flex;


    justify-content:center;


    flex-wrap:wrap;


    gap:15px;


    margin:35px 0;


}





.filter{


    padding:

    10px 25px;



    border-radius:30px;


    border:

    1px solid rgba(255,255,255,.15);



    color:white;



    background:

    rgba(255,255,255,.08);



    backdrop-filter:

    blur(15px);



    transition:.3s;


}





.filter:hover{


    transform:

    translateY(-3px);


}




.filter.active{


    background:

    linear-gradient(

    45deg,

    #e50914,

    #8a2be2

    );


}









/* SEARCH RESULTS */


.search-results{


    display:grid;


    grid-template-columns:


    repeat(

    auto-fit,

    minmax(170px,1fr)

    );



    gap:25px;


    margin-top:40px;


}






.loading{


    text-align:center;


    font-size:22px;


    color:#e50914;


    margin-top:40px;


}









/* ==================================
        FOOTER PREMIUM
================================== */



footer{


    margin-top:80px;


    padding:

    60px 20px;



    text-align:center;



    position:relative;



    background:

    rgba(255,255,255,.06);



    backdrop-filter:

    blur(25px);



    -webkit-backdrop-filter:

    blur(25px);



    border-top:

    1px solid rgba(255,255,255,.15);



}





footer::before{


    content:"";


    position:absolute;


    top:0;


    left:50%;


    width:250px;


    height:2px;



    transform:

    translateX(-50%);



    background:

    linear-gradient(

    90deg,

    #e50914,

    #8a2be2

    );


}







footer h2{


    font-size:32px;


    font-weight:900;



    background:

    linear-gradient(

    45deg,

    #e50914,

    #8a2be2

    );



    -webkit-background-clip:text;


    color:transparent;


}





footer p{


    margin-top:15px;


    color:#aaa;


    line-height:1.6;


}





footer .socials{


    display:flex;


    justify-content:center;


    gap:15px;


    margin-top:25px;


}





footer .socials a{


    width:45px;


    height:45px;



    display:flex;


    align-items:center;


    justify-content:center;



    border-radius:50%;



    color:white;



    background:

    rgba(255,255,255,.1);



    border:

    1px solid rgba(255,255,255,.15);



    transition:.3s;


}





footer .socials a:hover{


    background:#e50914;


    transform:

    translateY(-5px);


}









/* ==================================
        TABLET RESPONSIVE
================================== */



@media(max-width:900px){



.main-nav{


    gap:25px;


}




.movie-info h1{


    font-size:38px;


}




.movie-content{


    gap:25px;


}





.movie-info-box h1{


    font-size:40px;


}




}










/* ==================================
        MOBILE RESPONSIVE
================================== */



@media(max-width:768px){



.header{


    top:10px;


    left:10px;


    right:10px;


    height:65px;


    padding:0 15px;


}





.logo{


    font-size:20px;


}





.main-nav{


    top:90px;


    width:90%;


    justify-content:center;


    gap:18px;


    padding:12px;



}





.main-nav a{


    font-size:13px;


}






.hero{


    height:500px;


    margin:

    140px 12px 30px;


}





.hero-overlay{


    padding:20px;


}





.movie-info{


    padding:20px;


}





.movie-info h1{


    font-size:28px;


}





.movie-details{


    gap:8px;


}





.watch,
.info{


    width:100%;


}





.hero-buttons{


    flex-direction:column;


}





.movie-row{


    margin:35px 12px;


}





.movie-row h2{


    font-size:22px;


}







.movie-card{


    min-width:150px;


}





.movie-card img{


    height:220px;


}






.movie-content{


    flex-direction:column;


    text-align:center;


    padding:30px 15px;


}





.movie-poster img{


    width:220px;


    height:330px;


}





.movie-info-box{


    width:100%;


    padding:25px;


}





.movie-info-box h1{


    font-size:30px;


}





.movie-meta,


.genres{


    justify-content:center;


}







.trailer-box iframe{


    height:230px;


}





.cast-card{


    min-width:110px;


    max-width:110px;


}




.cast-card img{


    width:110px;


    height:140px;


}






.search-page{


    padding:20px;


}





.search-box{


    padding:15px 20px;


}





.search-results{


    grid-template-columns:


    repeat(2,1fr);


    gap:15px;


}







footer h2{


    font-size:26px;


}




}









/* ==================================
        SMALL PHONES
================================== */



@media(max-width:450px){



.main-nav{


    display:none;


}




.movie-info h1{


    font-size:24px;


}





.movie-card{


    min-width:140px;


}




.movie-card img{


    height:200px;


}





.search-results{


    grid-template-columns:


    repeat(2,1fr);


}





.side-menu{


    width:280px;


}





footer{


    padding:40px 15px;


}



}