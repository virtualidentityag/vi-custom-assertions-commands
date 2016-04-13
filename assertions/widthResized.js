/**
 * @name          widthResized
 * @version       0.1
 * @lastmodified  2016-04-12
 * @package       html-css-js
 * @subpackage    Nightwatchjs Custom Assertions
 * @author        AB, VI
 *
 * asserts the width of a certain element for multiple viewports
 *
 * Required Parameters:
 * element: css selector
 * viewports: array
 * width: array
 */

exports.assertion = function(element, viewports, widths) {
	var self = this;

	self.expected = widths || [0];
	self.elementWidths = [];
	self.viewPorts = viewports || [1280];
	self.message = '';

	self.pass = function(value) {
		var assertionState = true;

		self.viewPorts.forEach(function(item, index) {
			if (self.elementWidths[index] === self.expected[index]) {
				self.message += 'Correct element size ' + self.expected[index] + 'px for element ' + element + ' on viewport ' + self.viewPorts[index] + '\n';
			} else {
				self.message += 'Wrong element size for element ' + element + ' on viewport ' + self.viewPorts[index] + ' | expected: ' + self.expected[index] + 'px got ' + self.elementWidths[index] + 'px \n';
				assertionState = false;
			}
		});

		return assertionState;
	}

	self.value = function() {
		// calls pass with value
		return self.elementWidths;
	}

	self.command = function(callback) {
		// callback calls value()
		self.viewPorts.forEach(function(item, index) {
			self.api.resizeWindow(item, 800);
			self.api.getElementSize(element, function(result) {
				self.elementWidths.push(result.value.width);
				if(index === self.viewPorts.length - 1) {
					callback();
				}
			});
		});
		return this;
	}
}
