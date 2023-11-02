const initSlider = () => {
    const imageList = document.querySelector(".slider-wrapper .image-list");
    const slideButtons = document.querySelectorAll(".slider-wrapper .slide-button");
    const sliderScrollbar = document.querySelector(".container .slider-scrollbar");
    const scrollbarThumb = sliderScrollbar.querySelector(".scrollbar-thumb");
    const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;
    
    scrollbarThumb.addEventListener("mousedown", (e) => {
        const startX = e.clientX;
        const thumPosition = scrollbarThumb.offsetLeft;
        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const newThumbPosition = thumPosition + deltaX;
            scrollbarThumb.style.left = `${newThumbPosition}px`;
        }
        const handleMouseUp=() => {
            document.addEventListener("mousemove", handleMouseMove);
            document.addEventListener("mouseuo", handleMouseUp);
        }

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseuo", handleMouseUp);
    });
    slideButtons.forEach(button => {
        button.addEventListener("click", () => {
            const direction = button.id === "prev-slide" ? -1: 1;
            const scrollAmout = imageList.clientWidth * direction;
            imageList.scrollBy({ left: scrollAmout, behavior: "smooth"});
        });
    });

    const handleSlideButtons = () =>{
        slideButtons[0].style.display = imageList.scrollLeft <= 0 ? "none" : "block";
        slideButtons[1].style.display = imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    const updateScrollThumbPosition = () => {
        const scrollPosition = imageList.scrollLeft;
        const thumPosition = (scrollPosition / maxScrollLeft) * (sliderScrollbar.clientWidth - scrollbarThumb.offsetWidth);
        scrollbarThumb.style.left = `${thumPosition}px`;
        };

    imageList.addEventListener("scroll",() => {
        handleSlideButtons();
        updateScrollThumbPosition();
    });
}

window.addEventListener("load",initSlider);