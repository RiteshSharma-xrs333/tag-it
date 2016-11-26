(function (w) {
	var _defaultConf = {
		container: document.body,
		burst : true,
		breakAt: '|'
	};
	var _updatedConf = {};

	w.tag= function (prefs) {
		return init(prefs);
	}

	function init(prefs) {
		var initialElements;
		_setConfs(prefs);
		initialElements= generateInitialElements();

		_bindInitialEvents();
		return initialElements;

	}

	function _setConfs(prefs) {


		prefs = prefs || {};

		for(var i in _defaultConf){
			if(!prefs[i]){
				prefs[i]= _defaultConf[i];
			}
		}
		_updatedConf= prefs;

		_checkElem(_updatedConf.container)
			? null
			: _updatedConf.container = _defaultConf.container
	}



	function generateInitialElements() {
		var cont= _updatedConf.container;
		cont.className += ' tag-container';
		cont.innerHTML= '';
		var ul= _createElement('ul');
		var input= _createElement('input');
		ul.className= 'tag-ul';
		ul.innerHTML = '<li class="dummy"><span class="text"></span><span class="cross">&#215;</span></li>'
		input.className= 'tag-input';
		cont.appendChild(ul);
		cont.appendChild(input);
		var elems= {
			ul: ul,
			input: input,
			dummy : ul.getElementsByClassName('dummy')[0]
		}
		_updatedConf.elems= elems;
	}

	function _bindInitialEvents() {
		_bindInputEvents(_updatedConf.elems.input);
		_bindContainerEvents();
	}

	function _bindInputEvents(inputRef) {
		inputRef.addEventListener('keyup', function (e) {
			if(e.keyCode=== 13 || e.keyCode=== 32){
				var breakAtChar = _updatedConf.breakAt;
				if(inputRef.value.indexOf(breakAtChar) > 0){
					var tags = inputRef.value.split(breakAtChar);

					for(var i = 0, l = tags.length; i < l; i++){
						_addTag(tags[i]);
					}
				} else {
					_addTag(inputRef.value);
				}
				inputRef.value= '';
			}
		});
	}

	function _bindTagEvents(tagRef) {
		tagRef.addEventListener('click', function (event) {
			if(event.target.className === 'cross'){
				tagRef.parentElement.removeChild(tagRef);
			}
		})
	}

	function _bindContainerEvents() {
		var container = _updatedConf.container;

		container.addEventListener('click', function (event) {
			if(event.target === event.currentTarget){
				_updatedConf.elems.input.focus();
			}
		});
	}
	function _addTag(tagValue) {
		var tag = _updatedConf.elems.dummy.cloneNode(true);

		tag.className= 'tag';
		tag.getElementsByClassName('text')[0].innerHTML= tagValue;
		_updatedConf.elems.ul.appendChild(tag);
		_bindTagEvents(tag)
	}

	function _checkElem(elem) {
		try{
			return elem instanceof HTMLElement;
		}catch(err){
			return (typeof elem === "object") && (elem.nodeType===1) && (typeof elem.style === "object") && (typeof elem.ownerDocument ==="object");
		}
	}

	function _createElement(element) {
		var newElement= document.createElement(element);
		return newElement;
		console.log(newElement);
	}

})(window)