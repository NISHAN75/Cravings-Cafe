function countDown(selector) {
    var countDownElement = $(selector);
    var startAt = parseFloat(countDownElement.attr('start-at'));
    var endAt = parseFloat(countDownElement.attr('end-at'));
    var animationDuration = parseFloat(countDownElement.attr('animation-duration').replace('ms', ''));
    var currentValue = startAt;
    var interval = 50;
    var steps = (startAt - endAt) / (animationDuration / interval);
    var timer = setInterval(function () {
        currentValue -= steps;
        countDownElement.text(currentValue.toFixed(2));
        if (currentValue <= endAt) {
            clearInterval(timer);
            countDownElement.text(endAt.toFixed(2));
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