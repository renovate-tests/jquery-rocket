;(function($) {
      $.fn.rocket = $.fn.rocket || function(options) {
          var defaults = {
              base_url: 'https://raw.github.com/moul/jquery-rocket/master/rocket-original/img/',
              enterOn: 'now',
              delayTime: 5000,
              spread: 3
          };
          var options = $.extend(defaults, options);

          return this.each(function() {
                               var _this = $(this);
                               var _started = false;
                               var _propulation = false;
                               var _on_the_launchpad = false;

                               var rocketMarkup = '<div id="rocket" style="display: none"></div>';
                               $('body').append(rocketMarkup);
                               var rocket = $('#rocket').css({
                                                                 width: 275,
                                                                 height: 375,
                                                                 zIndex: 9999,
                                                                 background: "url('" + options.base_url + "/rocket-off.png') no-repeat",
                                                                 margin: "140px 0 50px",
                                                                 position: "absolute"
                                                             });

                               rocket.append('<div id="rocketFire"></span>');
                               var fire = $('#rocketFire').css({
                                                                   position: 'absolute',
                                                                   height: 375,
                                                                   width: 275,
                                                                   background: 'url("' + options.base_url + '/rocket-fire.png") no-repeat'
                                                               });

                               rocket.append('<span id="rocketSteam"></span>');
                               var steam = $('#rocketSteam').css({
                                                                     position: 'absolute',
                                                                     bottom: 78,
                                                                     left: 50,
                                                                     width: 80,
                                                                     height: 80,
                                                                     background: 'url("' + options.base_url + '/steam.png") no-repeat',
                                                                     opacity: 0.8,
                                                                     display: 'none'
                                                                 });

                               function propulsion() {
                                   if (!_propulsion) {
                                       return ;
                                   }
                                   var rotate = Math.floor(Math.random() * options.spread) - ((options.spread - 1) / 2);
                                   rocket.css('WebkitTransform', 'rotate(' + rotate + 'deg)');
                                   steam.css({
                                                 left: 50,
                                                 bottom: 78,
                                                 display: 'block',
                                                 marginLeft: -10 + Math.floor(Math.random() * 20),
                                                 backgroundPosition: (Math.floor(Math.random() * 2) < 1 ? '0% 0%' : 'left bottom')
                                             })
                                       .animate({
                                                    left: '-=58',
                                                    bottom: '-=100'
                                                }, 120,
                                                function(){
                                                    setTimeout(propulsion, 10);
                                                });
                               }

                               function init() {
                                   if (_started) {
                                       return ;
                                   }
                                   _on_the_launchpad = false;
                                   _started = true;
                                   var _overflow_state = rocket.parent().css('overflow');
                                   var _width = $('body').width();
                                   var _height = Math.max($('body').height(), $(window).height());
                                   fire.css('opacity', 0);
                                   rocket.parent().css('overflow', 'hidden');
                                   $("html:not(:animated),body:not(:animated)")
                                       .animate({scrollTop: _height - $(window).height()}, 500, function() {
                                                    if (_on_the_launchpad) {
                                                        return ;
                                                    }
                                                    _on_the_launchpad = true;
                                                    rocket.css({
                                                                   display: 'block',
                                                                   left: _width - 275,
                                                                   top: _height
                                                               })
                                                        .animate({top: '-=500'}, 500).animate({top: '+=25'}, 200)
                                                        .delay(200)
                                                        .animate({left: '-=' + (_width - 250)}, 1000)
                                                        .animate({left: '+=25'}, 200, function() {
                                                                     fire
                                                                         .delay(100)
                                                                         .animate({opacity: '+=1'}, 300, function() {
                                                                                      _propulsion = true;
                                                                                      propulsion();
                                                                                      $("html:not(:animated),body:not(:animated)")
                                                                                          .delay(2300)
                                                                                          .animate({scrollTop: 0}, 3200);
                                                                                      rocket
                                                                                          .delay(2000)
                                                                                          .animate({'left':'+=' + _width, "top": '-=' + (_height + 400)}, 5000,
                                                                                                   function() {
                                                                                                       rocket.parent().css('overflow', _overflow_state);
                                                                                                       _propulsion = false;
                                                                                                       _started = false;
                                                                                                       steam.css('display' ,'none');
                                                                                                   });
                                                                                  });
                                                                 });
                                                });
                               }

                               if (options.enterOn == 'now') {
                                   init();
                               } else if (options.enterOn == 'timer') {
                                   setTimeout(init, options.delayTime);
                               } else if(options.enterOn == 'click') {
                                   _this.bind('click', function(e) {
                                                  e.preventDefault();
                                                  init();
                                              });
                               } else if(options.enterOn == 'konami-code') {
                                   var kkeys = [], konami = "38,38,40,40,37,39,37,39,66,65";
                                   $(window).bind("keydown.rocketz", function(e) {
                                                      kkeys.push(e.keyCode);
                                                      if (kkeys.toString().indexOf(konami) >= 0) {
                                                          init();
                                                          kkeys = []
                                                      }
                                                  }, true);
                               }

                           });
      }
  })(jQuery);
