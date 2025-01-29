function countDown(selector) {
    var countDownElement = $(selector);
    var startAt = parseFloat(countDownElement.attr('data-start-at'));
    var endAt = parseFloat(countDownElement.attr('data-end-at'));
    var animationDuration = parseFloat(countDownElement.attr('data-animation-duration').replace('ms', ''));
    var currentValue = startAt;
    var interval = 50;
    var steps = (startAt - endAt) / (animationDuration / interval);
    var timer = setInterval(function () {
        currentValue -= steps;
        countDownElement.text(currentValue.toFixed(0));
        if (currentValue <= endAt) {
            clearInterval(timer);
            countDownElement.text(endAt.toFixed(0));
        }
    }, interval);
}
let countDownSelectors = ".count-down";
if ($(countDownSelectors).length > 0) {
    $(countDownSelectors).each(function (index, item) {
        var waypoint = new Waypoint({
            element: $(this),
            handler: function () {
                countDown(item);
                this.destroy();
            },
            offset: 'bottom-in-view',
        });
    });
}