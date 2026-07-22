const logo = document.querySelector(".logo");

logo.animate(
[
    {
        transform:"translateY(0px)"
    },
    {
        transform:"translateY(-12px)"
    }
],
{
    duration:2500,
    direction:"alternate",
    iterations:Infinity
});

const stars=document.querySelector(".stars");

let pos=0;

setInterval(()=>{

    pos++;

    stars.style.backgroundPosition=`0 ${pos}px`;

},40);

const googleBtn =
document.querySelector(".google-btn");

const guestBtn =
document.querySelector(".guest-btn");

googleBtn.addEventListener("click",()=>{

    window.location.href="login.html";

});

guestBtn.addEventListener("click",()=>{

    window.location.href="login.html";

});