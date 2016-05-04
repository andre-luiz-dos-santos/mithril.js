"use strict"

var o = require("../../ospec/ospec")
var domMock = require("../../test-utils/domMock")
var vdom = require("../../render/render")

o.spec("event", function() {
	var $window, root, onevent, render
	o.beforeEach(function() {
		$window = domMock()
		root = $window.document.body
		onevent = o.spy()
		render = vdom($window, onevent).render
	})

	o("handles onclick", function() {
		var spy = o.spy()
		var div = {tag: "div", attrs: {onclick: spy}}
		var e = $window.document.createEvent("MouseEvents")
		e.initEvent("click", true, true)
		
		render(root, [div])
		div.dom.dispatchEvent(e)
		
		o(spy.callCount).equals(1)
		o(spy.this).equals(div.dom)
		o(spy.args[0].type).equals("click")
		o(spy.args[0].target).equals(div.dom)
		o(onevent.callCount).equals(1)
		o(onevent.this).equals(div.dom)
		o(onevent.args[0].type).equals("click")
		o(onevent.args[0].target).equals(div.dom)
	})
})