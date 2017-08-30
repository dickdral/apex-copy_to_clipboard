// APEX Copy to Clipboard
// Author: Dick Dral (Detora)
// Version: 1.1
// support for Apex hidden items added

// global namespace
var apexcopytoclipboard = {

copy_to_clipboard: function ( elem )
{
	  // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var isInput = ( elem.tagName === "INPUT" || elem.tagName === "TEXTAREA" ) && elem.type.toLowerCase() != 'hidden';
    var origSelectionStart, origSelectionEnd;
    if (isInput) {
        // can just use the original source element for the selection and copy
        target = elem;
        origSelectionStart = elem.selectionStart;
        origSelectionEnd = elem.selectionEnd;
    } else {
        // must use a temporary form element for the selection and copy
        target = document.getElementById(targetId);
        if (!target) {
            var target = document.createElement("textarea");
            target.style.position = "absolute";
            target.style.left = "-9999px";
            target.style.top = "0";
            target.id = targetId;
            document.body.appendChild(target);
        }
        if ( elem.tagName == "INPUT" )
        { target.textContent = $(elem).val(); }
        else
        { target.textContent = $(elem).text(); }
        
    }
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);
    
    // copy the selection
    var succeed;
    try {
    	  succeed = document.execCommand("copy");
    } catch(e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }
    
    if (isInput) {
        // restore prior selection
        elem.setSelectionRange(origSelectionStart, origSelectionEnd);
    } else {
        // clear temporary content
        target.textContent = "";
    }
    return succeed;
},

    // function that gets called from plugin
    doIt: function() {
        // plugin attributes
        var daThis = this;
        var vElementsArray = daThis.affectedElements;
        var elem = vElementsArray[0];
		try { var local_logging = ( page_logging ) ? true : false;
		} catch(e) { local_logging = false;}
		if ( local_logging)
		{ console.log('Element with content to be copied:',elem); }
        apexcopytoclipboard.copy_to_clipboard(elem);
    }
};