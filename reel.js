/* ==================================
        TRAP MOVIES REELS UI
================================== */


body{
    background:#000;
    overflow:hidden;
}



/* REELS CONTAINER */

#reelsContainer{

    height:100vh;

    width:100%;

    overflow-y:scroll;

    scroll-snap-type:y mandatory;

    scroll-behavior:smooth;

}



/* HIDE SCROLL BAR */

#reelsContainer::-webkit-scrollbar{

    display:none;

}





/* SINGLE REEL */

.reel{


    position:relative;


    height:100vh;


    width:100%;


    scroll-snap-align:start;


    background:#000;


    overflow:hidden;


}





/* VIDEO */


.reel-video,
.video-box,
.reel-video iframe{


    position:absolute;


    width:100%;


    height:100%;


    top:0;


    left:0;


}




.reel-video iframe{


    object-fit:cover;


    transform:scale(1.35);


}







/* DARK CINEMA GRADIENT */


.reel-gradient{


    position:absolute;


    inset:0;


    background:

    linear-gradient(

    transparent 40%,

    rgba(0,0,0,.85)

    );


}








/* MOVIE DETAILS */

.reel-info{


    position:absolute;


    bottom:80px;


    left:20px;


    width:70%;


    z-index:5;


}



.reel-info h1{


    font-size:30px;


    font-weight:900;


    margin-bottom:15px;


}



.reel-info p{


    font-size:18px;


    margin-bottom:20px;


}



.reel-info button{


    padding:13px 30px;


    border:none;


    border-radius:30px;


    color:white;


    font-weight:700;


    background:

    linear-gradient(

    135deg,

    #e50914,

    #8a2be2

    );


}








/* RIGHT ACTION BAR */


.reel-actions{


    position:absolute;


    right:20px;


    bottom:120px;


    display:flex;


    flex-direction:column;


    gap:22px;


    z-index:10;


}





.reel-actions button{


    width:55px;


    height:55px;


    border-radius:50%;


    border:none;


    font-size:25px;


    background:

    rgba(255,255,255,.15);


    backdrop-filter:blur(15px);


    color:white;


}





.reel-actions button:hover{


    transform:scale(1.15);


}






/* HEADER */


.reels-header{


    position:fixed;


    top:20px;


    left:20px;


    right:20px;


    z-index:50;


}





.reels-header .logo{


    font-size:25px;


    font-weight:900;


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








/* MOBILE OPTIMIZATION */


@media(max-width:600px){



.reel-info h1{


font-size:24px;


}



.reel-actions{


right:12px;


}



.reel-actions button{


width:48px;


height:48px;


font-size:20px;


}



}