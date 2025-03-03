document.addEventListener("DOMContentLoaded", function () {

    // カルーセルの自動スライド無効
    document.addEventListener("DOMContentLoaded", function () {
        var myCarousel = document.querySelector("#carouselExampleIndicators");
        var carousel = new bootstrap.Carousel(myCarousel, {
            interval: false,
            ride: false
        });
        carousel.pause();
    });

    // トリガー以外のクリックでポップオーバーを閉じる
    const popoverTrigger = document.querySelector('[data-bs-toggle="popover"]');
    const popover = new bootstrap.Popover(popoverTrigger);

    document.addEventListener("click", function (event) {
        if (!popoverTrigger.contains(event.target)) {
            popover.hide();
        }
    });

});