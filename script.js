/* =========================
   TRAP MOVIES GLOBAL STYLE
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

    background:#050505;
    color:white;
    overflow-x:hidden;

}



img{

    width:100%;
    display:block;

}



button{

    font-family:inherit;

}



::-webkit-scrollbar{

    width:8px;

}


::-webkit-scrollbar-track{

    background:#050505;

}


::-webkit-scrollbar-thumb{

    background:linear-gradient(
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


    height:70px;


    display:flex;

    align-items:center;

    justify-content:space-between;


    padding:0 25px;


    background:rgba(255,255,255,.08);

    backdrop-filter:blur(18px);


    border:1px solid rgba(255,255,255,.15);


    border-radius:25px;


    z-index:1000;


    box-shadow:

    0 10px 30px rgba(0,0,0,.5);

}





.logo{

    font-size:25px;

    font-weight:800;

}





.logo span{

    background:

    linear-gradient(
    45deg,
    #e50914,
    #8a2be2
    );


    -webkit-background-clip:text;

    color:transparent;

}





.menu-btn,
.search-btn{


    width:45px;

    height:45px;


    display:flex;

    justify-content:center;

    align-items:center;


    border-radius:50%;


    background:rgba(255,255,255,.12);


    cursor:pointer;


    transition:.3s;

}



.menu-btn:hover,
.search-btn:hover{


    background:#e50914;

    transform:scale(1.1);

}






/* =========================
        SIDE MENU
========================= */


.side-menu{


    position:fixed;


    top:0;

    left:-330px;


    width:300px;

    height:100vh;


    overflow-y:auto;


    padding:25px;


    background:

    linear-gradient(
    180deg,
    #160025,
    #050505
    );


    z-index:2000;


    transition:.4s;


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

    font-size:22px;

}





.close-btn{


    width:40px;

    height:40px;


    display:flex;

    justify-content:center;

    align-items:center;


    background:#e50914;


    border-radius:50%;


    cursor:pointer;

}





.side-menu ul{

    list-style:none;

}




.side-menu li{


    display:flex;

    align-items:center;


    gap:18px;


    padding:15px;


    margin:8px 0;


    border-radius:15px;


    color:#ddd;


    cursor:pointer;


    transition:.3s;

}



.side-menu li i{

    width:20px;

    color:#e50914;

}



.side-menu li:hover{


    background:rgba(138,43,226,.25);


    transform:translateX(8px);


    color:white;

}





.side-menu hr{

    border:none;

    height:1px;


    background:rgba(255,255,255,.15);


    margin:20px 0;

}





.logout{

    margin-top:30px;

}






/* =========================
        OVERLAY
========================= */


.overlay-bg{


    position:fixed;


    inset:0;


    background:rgba(0,0,0,.75);


    z-index:1500;


    opacity:0;


    visibility:hidden;


    transition:.3s;

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


    height:520px;


    margin:110px 20px 30px;


    border-radius:30px;


    overflow:hidden;


    box-shadow:

    0 0 40px rgba(138,43,226,.3);

}




.slides-container{


    height:100%;

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


    animation:zoom 12s infinite alternate;

}





@keyframes zoom{


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


    padding:45px;


    z-index:2;


    background:

    linear-gradient(
    90deg,
    rgba(0,0,0,.95),
    rgba(0,0,0,.5),
    transparent
    );

}





.movie-info{


    max-width:600px;


    animation:fadeUp .8s ease;

}



@keyframes fadeUp{


from{

opacity:0;

transform:translateY(40px);

}


to{

opacity:1;

transform:translateY(0);

}


}





.tag{


    display:inline-block;


    padding:7px 18px;


    border-radius:30px;


    font-weight:600;


    background:

    linear-gradient(
    45deg,
    #e50914,
    #8a2be2
    );

}





.movie-info h1{


    font-size:48px;

    margin:15px 0;

}




.movie-info p{


    color:#ddd;

    line-height:1.6;

}




.movie-details{


    display:flex;


    gap:12px;


    margin:20px 0;


    flex-wrap:wrap;

}





.movie-details span{


    padding:7px 15px;


    border-radius:20px;


    background:rgba(255,255,255,.12);


    backdrop-filter:blur(10px);

}






.hero-buttons{


    display:flex;

    gap:15px;

}





.watch,
.info{


    padding:14px 30px;


    border:none;


    border-radius:40px;


    cursor:pointer;


    font-weight:700;


    display:flex;


    align-items:center;


    justify-content:center;


    gap:10px;


    transition:.3s;

}



.watch{


    color:white;


    background:

    linear-gradient(
    45deg,
    #e50914,
    #8a2be2
    );

}



.info{


    color:white;


    background:rgba(255,255,255,.15);


    backdrop-filter:blur(10px);

}



.watch:hover,
.info:hover{


    transform:translateY(-5px);

}





/* SLIDER DOTS */


.slider-dots{


    position:absolute;


    bottom:20px;


    left:50%;


    transform:translateX(-50%);


    display:flex;


    gap:12px;


    z-index:5;

}



.slider-dots span{


    width:12px;


    height:12px;


    background:#777;


    border-radius:50%;


}



.slider-dots .active{


    background:#e50914;


}







/* =========================
 MOVIE SECTIONS
========================= */


.movie-row{

    margin:45px 20px;

}



.movie-row h2{

    margin-bottom:20px;

}





.movie-container{

    display:flex;


    gap:20px;


    overflow-x:auto;

}





/* =========================
 FOOTER
========================= */


footer{


    text-align:center;


    padding:45px 20px;


    background:#090909;

}





footer h2{

    color:#e50914;

}







/* =========================
 RESPONSIVE
========================= */


@media(max-width:600px){


.header{

    top:12px;

    left:12px;

    right:12px;

    height:65px;

}



.logo{

    font-size:20px;

}



.hero{


    margin:95px 12px 25px;

    height:480px;

}



.hero-overlay{

    padding:25px;

}



.movie-info h1{

    font-size:30px;

}



.hero-buttons{

    flex-direction:column;

}



.watch,
.info{

    width:100%;

}



.side-menu{

    width:280px;

}


}