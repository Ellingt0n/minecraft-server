$(document).ready(function() {
    $('.leaderboard__server-copy').on('click', function() {
        var ipText = $('.leaderboard__server-ip-value').text();
        
        navigator.clipboard.writeText(ipText).then(function() {
            showCopyNotification();
        }).catch(function() {
            var textArea = $('<textarea>').val(ipText).appendTo('body').select();
            document.execCommand('copy');
            textArea.remove();
            showCopyNotification();
        });
    });
    
    function showCopyNotification() {
        $('.leaderboard__server-copy').addClass('copied');
        setTimeout(function() {
            $('.leaderboard__server-copy').removeClass('copied');
        }, 2000);
    }

    $('.select-trigger').on('click', function(e) {
        e.stopPropagation();
        var $customSelect = $(this).closest('.custom-select');
        
        $('.custom-select').not($customSelect).removeClass('active');
        
        $customSelect.toggleClass('active');
    });

    $('.select-option').on('click', function(e) {
        e.stopPropagation();
        var $option = $(this);
        var $customSelect = $option.closest('.custom-select');
        var $trigger = $customSelect.find('.select-trigger');
        var $icon = $trigger.find('.select-icon');
        var newIconSrc = $option.find('img').attr('src');
        var newValue = $option.attr('data-value');
        
        $icon.attr('src', newIconSrc);
        $icon.attr('alt', newValue.toUpperCase());
        
        $customSelect.removeClass('active');
    });

    $(document).on('click', function() {
        $('.custom-select').removeClass('active');
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('.custom-select').removeClass('active');
        }
    });

    // Попап профиля
    $('.profile-popup-btn').on('click', function() {
        $('#profilePopup').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $('.profile-popup__overlay').on('click', function() {
        $('#profilePopup').removeClass('active');
        $('body').css('overflow', 'auto');
    });

    $(document).on('keydown', function(e) {
        if (e.key === 'Escape' && $('#profilePopup').hasClass('active')) {
            $('#profilePopup').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
});