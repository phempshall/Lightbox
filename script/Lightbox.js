// ==ClosureCompiler==
// @output_file_name Lightbox.min.js
// @compilation_level ADVANCED_OPTIMIZATIONS
// ==/ClosureCompiler==

var Lightbox = (function() {
	var overlay = document.getElementById('lightbox-overlay');

	function Create (evnt) {
		evnt.preventDefault();

		var target = document.getElementById(this.href.replace(/.*#/,''));

		overlay.style.display = 'block';
		target.style.display = 'block';

		/*	set up target handlers for destruction
		 *****************************************************/
		if (target.querySelectorAll('.lightbox-button-close').length >0) {
			var close_buttons = target.querySelectorAll('.lightbox-button-close');
			
			for (var i = 0; i < close_buttons.length; i++) {
				close_buttons[i].addEventListener('click', Destroy, false);
			}
		}
		document.addEventListener('keyup', Destroy, false);
		document.addEventListener('mouseup', Destroy, false);

		Lightbox.Active = target;
	} /* end Create() */

	function Destroy (evnt) {
		if (Lightbox.Active === null || testEvents() === false) { return!1; }

		var target = Lightbox.Active;

		overlay.style.display = 'none';
		target.style.display = 'none';

		/*	destroy target handlers
		 **************************************/
		if (target.querySelectorAll('.lightbox-button-close').length >0) {
			var close_buttons = target.querySelectorAll('.lightbox-button-close');
			
			for (var i = 0; i < close_buttons.length; i++) {
				close_buttons[i].removeEventListener('click', Destroy, false);
			}
		}
		document.removeEventListener('keyup', Destroy, false);
		document.removeEventListener('mouseup', Destroy, false);

		Lightbox.Active = null;

		function testEvents () {
			var eventFlag = false;

			if (evnt.target === overlay) { eventFlag = true; return eventFlag; }
			if (evnt.type === 'click' && evnt.target.className.match(/lightbox-button-close/)) { evnt.preventDefault(); eventFlag = true; return eventFlag; }
			if (evnt.keyCode == 27) { eventFlag = true; return eventFlag; }
			
			return eventFlag;
		} /* end testEvents() */
	} /* end Destroy() */

	return {
		Initialize: function () {
			var lightboxes = document.querySelectorAll('.lightbox-trigger');
			
			if (this.Initialized === true) { return!1; }
				else { this.Initialized = false; }

			if (lightboxes.length > 0) { 
				this.Initialized = true; 

				for (var i = 0; i < lightboxes.length; i++) {
					lightboxes[i].addEventListener('click', Create, false);
				}
			}

			return this.Initialized;
		}
	};
})();

Lightbox.Initialize();