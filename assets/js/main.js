const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show')
        } 
    })
})

const fadeIn = document.querySelectorAll('.fade-in')
const fadeInLeft = document.querySelectorAll('.fade-in-left')
const fadeInRight = document.querySelectorAll('.fade-in-right')
fadeIn.forEach((el) => observer.observe(el))
fadeInLeft.forEach((el) => observer.observe(el))
fadeInRight.forEach((el) => observer.observe(el))



const scrollToTop = document.querySelector('.scroll-top')
console.log(scrollToTop)

window.onscroll = function() {scrollfunciton()}


function scrollfunciton() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 400) {
        scrollToTop.style.display = "block";
      } else {
        scrollToTop.style.display = "none";
    }
}