$(function () {
    // .campaign-detail__table .js-toggleにis-openクラスを追加
    $('.campaign-detail__table .js-toggle').addClass('is-open');

    // Intersection Observerを使用して、.productsが画面内に入ったときにSlickを初期化
    const productsElement = document.querySelector('.products');
    if (productsElement) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    $(productsElement).slick({
                        slidesToShow: 3,
                        arrows: false,
                        responsive: [
                            {
                                breakpoint: 768,
                                settings: {
                                    slidesToShow: 1,
                                }
                            }
                        ]
                    });
                    observer.disconnect(); // 初期化後にオブザーバーを停止
                }
            });
        });

        observer.observe(productsElement);
    }
});
