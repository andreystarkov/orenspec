$(function () {
	
	
     $("body").queryLoader2({
          percentage: true,
          barHeight: 1,
          completeAnimation: "fade",
          minimumTime: 100,
		  onComplete: function(){
				animationStart();
		  }
      });

    $('nav').css({opacity: 0});

    $('.header').jrumble({ x: 5, y: 5 });

    function randomInt(minValue,maxValue){
        return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
    }

    // fucking hell starts now.

    function dwarfDance(obj){

        var a = randomInt(1, 0);

        obj.delay(2500).transition({ rotate: randomInt(3, 10)+'deg', x: randomInt(-5, -20)+'px', delay: randomInt(1500, 3600) }, randomInt(800, 3500), function(){
            obj.transition({ rotate: '7deg', x: randomInt(5, 20)+'px', delay: randomInt(300, 3000)}, randomInt(800, 3500) , function(){
                obj.transition({ x: randomInt(5, 20)+'px', delay: randomInt(800, 3500)}, randomInt(800, 3500), function(){
                     obj.transition({ x: randomInt(-5, -20)+'px', delay: randomInt(800, 3500)}, randomInt(1000, 2500), function(){
                                                    $('.back').animate({backgroundColor: 'rgba(255,255,255,0.8)'}, 500, function(){
                                 $('.back').animate({backgroundColor: 'rgba(0,0,0,1)'}, 200);
                            });
                        if (a == 1) {
                            obj.transition({ y: randomInt(5, 20)+'px', delay: randomInt(800, 3500)}, randomInt(800, 3500), function(){
                                  obj.transition({ y: randomInt(-5, -20)+'px', delay: randomInt(800, 3500)}, randomInt(1000, 2500), function(){
                                    dwarfDance(obj);
                                  });
                            });
                        } else {
                            dwarfDance(obj);
                        }

                    });
               });

            });

        });

    }


    function showMessage(obj, topOffset, rightOffset, fontSize){

        if(rightOffset != ''){
            obj.css({right: rightOffset, 'font-size': fontSize});
        }

        obj.animate({'top': topOffset}).transition({rotate: '-10deg'}, 200, function(){
            obj.transition({rotate: '5deg'}, 200, function(){
                  obj.transition({rotate: '0deg'}, 200);
            });
        });
    }

	$('.button-top').hover(function(){
	 $(this).animate({backgroundColor: '#e35f32'});
	}, function(){ $(this).animate({backgroundColor: '#cd603b'});
	
	});
	
	$('.hammer').dblclick(function(){
	$(this).transition({rotate: '-=30deg'}, 500, function(){
		$(this).transition({rotate: '+=40deg'}, 100, function(){
			$('.hammer .wreck').fadeTo(100, 1, function(){
			$('.hammer .wreck').fadeTo(300, 0);
			});
			$('.header').trigger('startRumble');
			
			$(this).transition({rotate: '-=10deg'}, 500, function(){
			$('.header').trigger('stopRumble');
			
			});
			
		});
	});
	});
	
	function animationStart(){
	    $('.hammer').animate({'left': '250px'}, function(){ 
			$('.hammer').transition({ rotate: '360deg' });
			$('.hammer').transition({'left': '770px', 'top': '330px', rotate: '-60deg'}, 600, function(){
				
			});
			$('.header').trigger('startRumble');
			
			$('.kaboom').animate({'opacity': '1'}, function(){
				$('.hole').fadeTo(200, 1); $('.back').animate({'opacity': '1'}, function(){
					 $('.header').trigger('stopRumble');

					$('.man').animate({'right': '130px', 'opacity': '1'}, 1000, function(){
						dwarfDance($('.man'));
					});              
					
					$('.bottom').slideToggle();
					$('.logo').transition({'left': '35px'}, function(){
					  $('.logo').transition({'left': '15px'});
					  $('.phone').transition({'left': '35px'}, function(){
						$('.phone').transition({'left': '15px'});
					  });
					});
		 //         showMessage($('.m1'), '140px', '15%', '52px');
		 //         showMessage($('.m3'), '550px', '32%', '36px');

				});
			});
		});
	}
	
    $('.item').hover(function(){
        $(this).animate({backgroundColor: 'rgba(255,255,255,0.1)', borderBottomColor: 'rgba(146,47,49,0.6);'});
    }, function(){
        $(this).animate({backgroundColor: 'rgba(255,255,255,0)', borderBottomColor: 'rgba(0,0,0,0);'});
    });


    var isT = 0;

    $(window).scroll(function(){

    if(($('body').scrollTop() >= 810) && (isT != 1)){
      console.log('psh');

      $('nav').animate({opacity: 0.9});
      isT = 1;
    }
     if(($('body').scrollTop() <= 790) && (isT == 1)){
   isT = 0;    $('nav').animate({opacity: 0});
     }
    });

    jQuery('a').click(function(e) {
        var t = jQuery(this), h = t.attr('href'), article;

        if (h.charAt(0) == '#' && h.length > 1 && (article = jQuery('article#' + h.substring(1))).length > 0)
        {
            var pos = Math.max(article.parent().offset().top - _nav.height() + 15, 0);
            e.preventDefault();
            _bh.animate({ scrollTop: pos }, 'slow', 'swing');
        }
    });
	
	if($.cookie('sent') == '1'){
			$('#button-send').html('<i class="icon-ok-circle icon-large"></i> Ваша заявка принята');
			$('#button-send').animate({color: 'rgba(255,255,255,1)'});
			$('#button-send').animate({backgroundColor: '#93cb5d', borderBottomColor: '#618d37', boxShadow: 'inset 0px 0px 0px 1px #618d37, inset 0px 2px 1px 0px rgba(255,255,255,0.75)', color: 'rgba(255,255,255,0)'});
		}
  $.cookie('sent', ''); 
  
	$('#button-send').click( function(){
		var name = $('#name').val();
		var email = $('#email').val();
		var text = $('textarea#message').val();
	
			if($.cookie('sent') != '1'){

				if(email == ""){ 
					$('.tt-warning').tooltipster('enable');
					$('.tt-warning').tooltipster('show');
				} else {
					
					$.ajax({
						type: 'POST',
						url: 'mail.php',
						data: { 
							'name': name,
							'email': email,
							'text': text
						},
						
						success: function(msg){
							$.cookie('sent', '1',{ expires: 1});
							$('.tt-sent').tooltipster('enable');
							$('.tt-sent').tooltipster('show');
							$('#button-send').animate({backgroundColor: '#93cb5d', borderBottomColor: '#618d37', boxShadow: 'inset 0px 0px 0px 1px #618d37, inset 0px 2px 1px 0px rgba(255,255,255,0.75)', color: 'rgba(255,255,255,0)'},
							function(){
							$('#button-send').html('<i class="icon-ok-circle icon-large"></i> Ваша заявка принята');
							$('#button-send').animate({color: 'rgba(255,255,255,1)'});
							});	
						}
					}); 
			}
			} else {
			   $('.tt-sent').tooltipster('enable');
			   $('.tt-sent').tooltipster('update', '<i class="icon-warning-sign icon-4x tt-ico"></i><span class="tt-txt">Вы уже отправили одну заявку несколько минут назад. Чтобы отправить ещё одну с этого же компьютера &mdash; подождите несколько минут. </span>');
			   $('.tt-sent').tooltipster('show');
			}
		
	});
	
    $('.tt-sent').tooltipster({
       animation: 'grow',
       content:  '<i class="icon-ok-circle tt-ico icon-4x"></i><span class="tt-txt">Спасибо за обращение! Ваша заявка была отправлена специалисту. Он свяжется с вами, удобным для Вас способом в кратчайшие сроки.</span>',
       position: 'top', theme: '.tooltipster-punk', maxWidth: 510, trigger: 'click' });
	$('.tt-sent').tooltipster('disable');
	
    $('.tt-warning').tooltipster({
       animation: 'grow',
       content:  'Вы должны ввести контакную информацию (E-Mail или номер телефона), что бы наш менеджер мог связаться с Вами.',
       position: 'bottom', theme: '.tooltipster-punk', maxWidth: 260, trigger: 'click' });	   
	$('.tt-warning').tooltipster('disable');
	
    $('.tt-dev').tooltipster({
   animation: 'grow',
   arrow: true,
   arrowColor: '',
   delay: 200,
   fixedWidth: 0,
   maxWidth: 0,
   functionBefore: function(origin, continueTooltip) {
      continueTooltip();
   },
   functionReady: function(origin, tooltip) {},
   functionAfter: function(origin) {},
   icon: '(?)',
   iconDesktop: false,
   iconTouch: false,
   iconTheme: '.tooltipster-icon',
   interactive: false,
   interactiveTolerance: 350,
   offsetX: 0,
   offsetY: 0,
   onlyOne: true,
   position: 'top',
   speed: 350,
   timer: 0,
   theme: '.tooltipster-punk',
   touchDevices: true,
   trigger: 'hover',
   updateAnimation: true
});


    $('.get-down').hover(function () {
        $('i', this).transition({color: 'rgba(0,0,0,0.4)'});
        $(this).transition({ y: '-15px',
            backgroundColor: 'rgba(0,0,0,0.2)', boxShadow: '0px 8px 16px rgba(0,0,0,0.5)'
        });
    }, function () {
        $('i', this).transition({color: 'rgba(0,0,0,0.2)'});
        $(this).transition({ y: '15px',
            backgroundColor: 'rgba(0,0,0,0.1)', boxShadow: '0px 4px 8px rgba(0,0,0,0.4)'
        });
    });

    $('.get-down').click(function(){

    });

});