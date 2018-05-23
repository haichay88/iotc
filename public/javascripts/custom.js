var mobile_threshold             = 415;
 var tablet_threshold             = 841;
 var mobile_view                  = ($(window).width() < mobile_threshold);
 var tablet_view                  = $(window).width() > mobile_threshold && $(window).width() <= tablet_threshold;
 var mobile_default_position      = 'fixed';
 var mobile_default_top_position  = '20%';
 var mobile_default_left_position = 'initial';

function showConfirmationDropdown(e, main_table, type)
 {
     var main_table = main_table || false;
     var type       = type || 'vps';
     var dropdown   = $('div.dropdown-confirmation-blue');
     var dropdowns  = $('div.dropdown-confirmation');
     var disclaimer = e.attr('dropdown-disclaimer');
     var label      = e.attr('aria-label');
     var info       = Base64.decode(e.attr('dropdown-info'));
     var action     = e.attr('dropdown-action');
     var fn         = e.attr('dropdown-function');
     var position   = e.position();
     var width      = e.outerWidth();

     // Hide tooltip on toggle.
     $('.tooltip').hide();

     // Dynamically add info to the dropdown.
     dropdown.find('.server-info').html('Server: <b>'+info+'</b>');
     dropdown.find('#dropdown-label').html(label);
     dropdown.find('a.btn-confirmation').html(label);
     dropdown.find('a.btn-confirmation').attr('name', action);
     dropdown.find('#dropdown-disclaimer').html(disclaimer);
     dropdown.removeClass('arrow-change');

     if ($.inArray(action, ['api-allow-ipv6', 'api-allow-ipv4', 'delete-block-storage']) !== -1)
     {
         dropdown.find('.server-info').html('');
     }
     else
     {
         dropdown.find('.server-info').html(label.substr(label.indexOf(' ') + 1) + ': <b>' + info + '</b>');
     }

     // These subs require an additional param ( SUBID ),
     // append the value here before binding the submit function to the button.
     if (main_table)
     {
         var position = e.parent().position();
         var subid    = e.attr('dropdown-subid');

         if (type == 'vps')
         {
             var form        = $('#vpsform'+action);
             var form_action = $('#vpsform'+action+ ' input[name=SUBID]');

             form_action.val(subid);
             form.attr('action', '/subs/?SUBID='+subid);
         }

         if (type == 'baremetal')
         {
             var bm_action = action.replace('-bm', '');
             $('#serveractionbm input[name=SUBID]').val(subid);
             $('#serveractionbm input[name=action]').val(bm_action);
             $('#serveractionbm').attr('action', '/subs/?SUBID=' + subid);
         }
     }

     // Bind the passed through function to the submit button.
     //dropdown.find('a.btn-confirmation').attr('ng-click', fn);

     var dropdowns = $('.dropdown-confirmation-red');

     if (dropdowns.is(':visible'))
     {
         dropdowns
             .animate({
                 'margin-top' : '0px',
                 'opacity'    : '0',
             }, 200, function()
             {
                 $(this).hide();
             });
         ;
     }

     // Some of the dropdowns require a bit of fine tuning to render on the correct spot on the page.
     // If on mobile, render the dropdown as a modern-style popup.
     if (mobile_view)
     {
         var position_type = 'fixed';
         var top_position  = '20%';
         var left_position = 'initial';
     }
     else if (main_table)
     {
         var position_type = 'absolute';
         var top_position  = (position.top - 40) + 'px';
         var left_position = (position.left + width - 265) + 'px';
     }
     else if ($.inArray(action, ['remove-domain', 'remove-firewall-group', 'remove-iso', 'remove-network', 'delete-user', 'remove-snapshot', 'delete-ssh-key', 'delete-startup-script', 'remove-ip']) !== -1)
     {
         var position_type = 'absolute';
         var top_position  = (position.top) + 'px';
         var left_position = (position.left - 233) + 'px';
     }
     else if ($.inArray(action, ['remove-snapshot-header', 'delete-startup-script-header', 'delete-ssh-key-header', 'remove-domain-header', 'delete-block-storage', 'remove-ip-header', 'remove-firewall-group-header']) !== -1)
     {
         var position_type = 'absolute';
         var top_position  = e.offset().top + e.height() - 20;
         var left_position = e.offset().left - 233;
     }
     else if ($.inArray(action, ['api-allow-ipv6', 'api-allow-ipv4']) !== -1)
     {
         var position_type = 'absolute';
         var top_position  = (position.top + 20) + 'px';
         var left_position = (position.left - 170) + 'px';
     }
     else if ($(window).width() > mobile_threshold && $(window).width() <= tablet_threshold && !main_table && $.inArray(action, ['stop', 'restart']) !== -1)
     {
         var position_type = 'absolute';
         var top_position  = (e.parent().offset().top + e.height()) - 60;
         var left_position = e.parent().offset().left - 100;
     }
     else
     {
         var position_type = 'absolute';
         var top_position  = (position.top + 20) + 'px';
         var left_position = (position.left + width - 265) + 'px';
         if (left_position.replace('px', '') < 0)
         {
             left_position = 0;
             dropdown.addClass('arrow-change');
         }
     }

     showDropdown(dropdown, position_type, top_position, left_position, main_table);
 }
function showDropdown(dropdown, position_type, top_position, left_position, main_table)
 {
     var main_table = main_table || false;

     dropdown
         .css({
             'position' : position_type,
             'top'      : top_position,
             'left'     : left_position,
         })
         .show()
         .animate({
             'margin-top' : '20px',
             'opacity'    : '1',
         }, 200)
     ;

     if (!main_table && !mobile_view && !tablet_view)
     {
         if (!isScrolledIntoView(dropdown))
         {
             $('html, body').animate({
                 scrollTop: top_position
             }, 1500);
         }
     }
 }

 function hideDropdowns()
 {
     var dropdowns = $('.dropdown-confirmation');

     if (dropdowns.is(':visible'))
     {
         dropdowns
             .animate({
                 'margin-top' : '0px',
                 'opacity'    : '0',
             }, 200, function()
             {
                 $(this).hide();
             });
         ;
     }

     var checkboxes = ['reinstall', 'destroy'];
     $.each(checkboxes, function(index)
     {
         var checkbox = checkboxes[index];

         $('input[type=checkbox][name='+checkbox+']').attr('checked', false);
     });
 }

