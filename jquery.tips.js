/**
 * Plug-In name: jquery.tips.js
 * Versions: 1.0.6
 * Modify time: 2017/04/05
 * Created by TomnTang on 2017/03/26
 * Website: http://www.lovevivi.com/plugin/jquery.tips.js/
 */

;(function($, win){
    $.fn.tips = function(options){
        var defaults = {
            type: 1,
            title: '',
            text: '',
            color: '#24a1dd',
            borderColor: '',
            backgroundColor: '#fff',
            fontSize: '12px',
            maxWidth: '200px',
            position: 'top',
            time: 2,
            animation: true,
            beforeTips: null,
            afterTips: null
        };

        var settings = $.extend({}, defaults, options), $target = (this.selector).replace('.', '').replace('#', '');

        return this.each(function(){
            var $that = $(this), html = '', $tips = null, offset = 6, set = {} , index = 0, timer = null;

            set.type = parseInt($that.attr('tips-type') ? $that.attr('tips-type') : settings.type);

            // 初始化属性配置方法
            function init() {
                set.title = $that.attr('tips-title') ? $that.attr('tips-title') : settings.title;
                set.text = $that.attr('tips-text') ? $that.attr('tips-text') : settings.text;
                set.color = $that.attr('tips-color') ? $that.attr('tips-color') : settings.color;
                set.borderColor = $that.attr('tips-bordercolor') ? $that.attr('tips-bordercolor') : (settings.borderColor ? settings.borderColor : set.color);
                set.backgroundColor = $that.attr('tips-backgroundcolor') ? $that.attr('tips-backgroundcolor') : (settings.backgroundColor ? settings.backgroundColor : set.borderColor);
                set.fontSize = $that.attr('tips-fontsize') ? $that.attr('tips-fontsize') : settings.fontSize;
                set.maxWidth = $that.attr('tips-maxwidth') ? $that.attr('tips-maxwidth') : settings.maxWidth;
                set.position = $that.attr('tips-position') ? $that.attr('tips-position') : settings.position;
                set.time = parseInt($that.attr('tips-time') ? $that.attr('tips-time') : (settings.time > 2) ? settings.time : 2);
                set.animation = $that.attr('tips-animation') !== undefined ? getBoolean($that.attr('tips-animation')) : settings.animation;
                set.beforeTips = settings.beforeTips ? settings.beforeTips : null;
                set.afterTips = settings.afterTips ? settings.afterTips : null;
            }

            function getBoolean(value) {
                return (value === 'true') ? true : false;
            }

            // 生成提示框方法
            function createTips() {
                init(); // 初始化属性配置
                set.beforeTips && set.beforeTips(); // 调用显示前回调方法

                index = parseInt(Math.random() * 100000);
                // console.log(index);
                html = '<div class="tips-box target-'+ $target +'-'+ index +' '+ set.position +'" style="border-color: '+ set.borderColor +'; background-color: '+ set.backgroundColor +'; max-width: '+ set.maxWidth +'">'+
                            '<div class="arrow"><div class="core"></div></div>'+
                            '<div class="tips-content" style="color: '+ set.color +'; font-size: '+ set.fontSize +';">'+
                                set.text+
                            '</div>'+
                        '</div>';
                $('body').append(html); // 生成弹框

                $tips = $('.target-'+ $target +'-'+ index); // 获取弹框对象

                // 提示框方向
                switch (set.position) {
                    case 'top':
                        set.top = $that.offset().top - $tips.outerHeight() - offset;
                        set.left = $that.offset().left + $that.outerWidth() / 2 - $tips.outerWidth() / 2;
                        $tips.find('.arrow').css({'borderTopColor': set.borderColor}).find('.core').css({'borderTopColor': set.backgroundColor});
                        $tips.addClass(set.animation ? 'fadeInDown animated' : '');
                        break;
                    case 'right':
                        set.top = $that.offset().top + $that.outerHeight() / 2 - $tips.outerHeight() / 2;
                        set.left = $that.offset().left + $that.outerWidth() + offset;
                        $tips.find('.arrow').css({'borderRightColor': set.borderColor}).find('.core').css({'borderRightColor': set.backgroundColor});
                        $tips.addClass(set.animation ? 'fadeInRight animated' : '');
                        break;
                    case 'bottom':
                        set.top = $that.offset().top + $that.outerHeight() + offset;
                        set.left = $that.offset().left + $that.outerWidth() / 2 - $tips.outerWidth() / 2;
                        $tips.find('.arrow').css({'borderBottomColor': set.borderColor}).find('.core').css({'borderBottomColor': set.backgroundColor});
                        $tips.addClass(set.animation ? 'fadeInUp animated' : '');
                        break;
                    case 'left':
                        set.top = $that.offset().top + $that.outerHeight() / 2 - $tips.outerHeight() / 2;
                        set.left = $that.offset().left - $tips.outerWidth() - offset ;
                        $tips.find('.arrow').css({'borderLeftColor': set.borderColor}).find('.core').css({'borderLeftColor': set.backgroundColor});
                        $tips.addClass(set.animation ? 'fadeInLeft animated' : '');
                        break;
                }
                $tips.css({'display': 'block', 'top': set.top+'px', 'left': set.left+'px'});
            }

            // 移除提示框方法
            function removeTips() {
                if (set.type === 1) {
                    $tips.remove();
                    set.afterTips && set.afterTips();
                } else if (set.type === 3) {
                    timer = setTimeout(function() {
                        $tips.remove();
                        set.afterTips && set.afterTips();
                        clearTimeout(timer);
                    }, set.time * 1000);
                }
            }

            // 提示类型
            switch (set.type) {
                case 1:
                    $that.on({
                        'mouseenter': function () {
                            createTips();
                        },
                        'mouseleave': function () {
                            removeTips();
                        }
                    });
                    break;
                case 2:
                    createTips();
                    break;
                case 3:
                    createTips();
                    removeTips();
                    break;
            }

        });

    }
})(jQuery, window);