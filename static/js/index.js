/*******************************
 # iosOverlay.js [DASHBOARD]
 # Author: suwonchon <masuwonchon@gmail.com>
 #
 # LICENSE TERMS: 3-clause BSD license (outlined in license.html)
 *******************************/

var $TABLE = $('#table');
var $BTN = $('#export-btn');
var $EXPORT = $('#export');

$('.table-add').click(function () {
  var $clone = $TABLE.find('tr.hide').clone(true).removeClass('hide table-line');
  $TABLE.find('table').append($clone);
});

$('.table-remove').click(function () {
  $(this).parents('tr').detach();
});

$('.table-up').click(function () {
  var $row = $(this).parents('tr');
  if ($row.index() === 1) return; // Don't go above the header
  $row.prev().before($row.get(0));
});

$('.table-down').click(function () {
  var $row = $(this).parents('tr');
  $row.next().after($row.get(0));
});

// A few jQuery helpers for exporting only
jQuery.fn.pop = [].pop;
jQuery.fn.shift = [].shift;

// Bind progress buttons and simulate loading progress

$(document).on("click", "#loadToSuccess", function(e) {
        document.getElementById("loadToSuccess").disabled = true;
        var opts = {
                lines: 13, // The number of lines to draw
                length: 11, // The length of each line
                width: 5, // The line thickness
                radius: 17, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                color: '#FFF', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
        };
        var target = document.createElement("div");
        document.body.appendChild(target);
        var spinner = new Spinner(opts).spin(target);
        var overlay = iosOverlay({
                text: "Commit Rules",
                spinner: spinner
        });

        var $rows = $TABLE.find('tr:not(:hidden)');
        var headers = [];
        var data = [];

        var frm = $(document.myform);

        $($rows.shift()).find('th:not(:empty)').each(function () {
                headers.push($(this).text().toLowerCase());
                });

        $rows.each(function () {
                var $td = $(this).find('td');
                var h = {};

                headers.forEach(function (header, i) {
                        h[header] = $td.eq(i).text();
                        });

                data.push(h);
                });

        xhr = new XMLHttpRequest();
        var url = "http://10.50.10.104:5011/commitrules";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                    window.setTimeout(function() {
                            overlay.update({
                            icon: "static/ios/check.png",
                            text: "Success"
                            });
                    }, 3e3);

                    window.setTimeout(function() {
                            overlay.hide();
                            document.getElementById("loadToSuccess").disabled = false;
                            }, 5e3);
                    }

            if (xhr.readyState == 4 && xhr.status == 400) {
                    window.setTimeout(function() {
                            overlay.update({
                            icon: "static/ios/cross.png",
                            text: "Fail"
                            });
                    }, 1000);

                    window.setTimeout(function() {
                            overlay.update({
			    icon: "none",
                            text: xhr.response
                            });
                    }, 2000);

                    window.setTimeout(function() {
                            overlay.hide();
                    }, 10000);

	    }
        }

        var vdata = JSON.stringify(data);
        xhr.send(vdata);

        return false;
});

$(document).on("click", "#loadToFw", function(e) {
        document.getElementById("loadToFw").disabled = true;
        var opts = {
                lines: 13, // The number of lines to draw
                length: 11, // The length of each line
                width: 5, // The line thickness
                radius: 17, // The radius of the inner circle
                corners: 1, // Corner roundness (0..1)
                rotate: 0, // The rotation offset
                color: '#FFF', // #rgb or #rrggbb
                speed: 1, // Rounds per second
                trail: 60, // Afterglow percentage
                shadow: false, // Whether to render a shadow
                hwaccel: false, // Whether to use hardware acceleration
                className: 'spinner', // The CSS class to assign to the spinner
                zIndex: 2e9, // The z-index (defaults to 2000000000)
                top: 'auto', // Top position relative to parent in px
                left: 'auto' // Left position relative to parent in px
        };
        var target = document.createElement("div");
        document.body.appendChild(target);
        var spinner = new Spinner(opts).spin(target);
        var overlay = iosOverlay({
                text: "Commit RULES",
                spinner: spinner
        });

        var $rows = $TABLE.find('tr:not(:hidden)');
        var headers = [];
        var data = [];

        var frm = $(document.myform);

        $($rows.shift()).find('th:not(:empty)').each(function () {
                headers.push($(this).text().toLowerCase());
                });

        $rows.each(function () {
                var $td = $(this).find('td');
                var h = {};

                headers.forEach(function (header, i) {
                        h[header] = $td.eq(i).text();
                        });

                data.push(h);
                });

        xhr = new XMLHttpRequest();
        var url = "http://10.50.10.104:5011/searchfw";
        xhr.open("POST", url, true);
        xhr.setRequestHeader("Content-type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                    window.setTimeout(function() {
                            overlay.update({
                            icon: "static/ios/check.png",
                            text: "Success"
                            });
                    }, 3e3);

                    window.setTimeout(function() {
                            overlay.hide();
                            document.getElementById("loadToFw").disabled = false;
                            }, 5e3);

		    document.getElementById('demo').innerHTML = xhr.responseText;
                    }


            if (xhr.readyState == 4 && xhr.status == 400) {
                    document.getElementById("loadToFw").disabled = false;
                    window.setTimeout(function() {
                            overlay.update({
                            icon: "static/ios/check.png",
                            text: "Fail"
                            });
                    }, 3e3);

                    window.setTimeout(function() {
                            overlay.hide();
                            document.getElementById("loadToFw").disabled = false;
                            }, 5e3);
                    }
        }

        var vdata = JSON.stringify(data);
        xhr.send(vdata);

        return false;
});
