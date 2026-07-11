const logo=document.querySelector(".logo");

logo.animate(

[
{transform:"translateY(-15px)"},
{transform:"translateY(15px)"}
],

{

duration:3000,

iterations:Infinity,

direction:"alternate"

}

);