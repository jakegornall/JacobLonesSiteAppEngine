// menu button controller
$(document).ready(function() {
    $('#menu-icon').click(function() {
        var marginLeft = $('#nav-bar').css('margin-left');
        if (marginLeft !== '0px'){
            $('#nav-bar').animate({
                marginLeft: "0px",
                height: "45px"
            });
            setTimeout(function(){
                $('#nav-bar').css('height', 'auto');
            }, 501)
        } else {
            $('#nav-bar').animate({
                marginLeft: "-150%",
                height: "0px",
            });
        }
    })
})

$(window).resize(function() {
    // reset nav bar as resizes.
    var navBarMarginLeft = $('#nav-bar').css('margin-left');
    var windowWidth = $(window).width();
    if (windowWidth > 992) {
        $('#nav-bar').css('height', 'auto');
        $('#nav-bar').css('margin-left', '0px');
        $('.menu-item').css('height', 'auto');
    } else if (navBarMarginLeft === '0px') {
        $('#nav-bar').css('height', 'auto');
        $('#nav-bar').css('margin-left', '0px');
    } else {
        $('#nav-bar').css('height', '0px');
        $('#nav-bar').css('margin-left', '-150%');
    }

    // reset mobile nav bar as screen resizes.
    if (windowWidth > 780) {
        $('#content').css('margin-left', '0px');
        $('#mobile-menu-bar').css('display', 'none');
        $('#mobile-menu-bar').css('margin-left', '0px');
        $('#mobile-side-menu').css('left', '-60%');
    } else {
        $('#mobile-menu-bar').css('display', 'block');
    }
})

// shows top nav bar when scrolled past 400px.
var fixedNavBar = $('#fixed-nav-bar');
$(document).scroll(function() {
    var y = $(this).scrollTop();
    var width = $(this).width();
    if (y > 400 && width > 780) {
      fixedNavBar.fadeIn();
    } else {
      fixedNavBar.fadeOut();
    }
});

// displays mobile menu on mobile-menu-btn click.
$(document).ready(function(){
    $('#mobile-menu-btn').click(function(){
        var contentMarginLeft = $('#content').css('margin-left');
        if (contentMarginLeft === '0px') {
            $('#content').animate({
                marginLeft: '50%'
            });
            $('#mobile-menu-bar').animate({
                marginLeft: '50%'
            });
            $('#mobile-side-menu').animate({
                left: '0px'
            });
        } else {
            $('#content').animate({
                marginLeft: '0px'
            });
            $('#mobile-menu-bar').animate({
                marginLeft: '0px'
            });
            $('#mobile-side-menu').animate({
                left: '-60%'
            });
        }
    })
})



// creates smooth window scroll when a tag is clicked.
var $root = $('html, body');
$('a').click(function() {
    var href = $.attr(this, 'href');
    $root.animate({
        scrollTop: $(href).offset().top
    }, 1000, 'swing', function () {
        window.location.hash = href;
    });
    return false;
});

angular.module('lonesSite', []).controller('calendarController', function() {
    var calendar = this;

    calendar.shows = [];

    calendar.getShows = function() {
        $.ajax({
            url: "/Shows",
            success: function(response) {
                calendar.shows = [];
                if (response.success == true) {
                    for (var i = 0; i < response.length; i++) {
                        if (response[i].confirmed == true) {
                            calendar.shows.push(response[i]);
                        }
                    }
                } else {
                    console.log(response.msg);
                }
            },
            error: function() {
                console.log("Server not responding...");
            }
        });
    };

    calendar.open = function() {
        calendar.getShows();
        $('#booking-modal').animate({
            "width": "100%",
            "padding": "10px"
        });
    };

    calendar.close = function() {
        $('#booking-modal').animate({
            "width": "0px",
            "padding": "0px"
        });
    };
});