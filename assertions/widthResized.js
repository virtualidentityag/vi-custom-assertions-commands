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

exports.assertion = function(element, viewports, widths, maxWidth) {
	var self = this;

	self.expected = widths || [0];
	self.viewports = viewports || [1280];
	self.maxWidth = maxWidth;
	self.valueCorrection = [];
	self.elementWidths = [];
	self.message = '';

	self.pass = function(value) {
		var assertionState = true;

		self.viewports.forEach(function(item, index) {
			var correctedValue = self.expected[index];
			if (self.viewports[index] < self.maxWidth) {
				correctedValue -= self.valueCorrection[index]
			}
			if (self.elementWidths[index] === correctedValue) {
				self.message += 'Correct element size ' + self.expected[index] + 'px for element ' + element + ' on viewport ' + self.viewports[index] + '\n';
			} else {
				self.message += 'Wrong element size for element ' + element + ' on viewport ' + self.viewports[index] + ' | expected: ' + self.expected[index] + 'px got ' + self.elementWidths[index] + 'px \n';
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
		self.viewports.forEach(function(item, index) {
			self.api.resizeWindow(item, 400);

			//console.log(window.innerWidth);
			self.api.getElementSize('body', function (result) {
				self.valueCorrection.push(item - result.value.width);
			});

			self.api.getElementSize(element, function(result) {
				self.elementWidths.push(result.value.width);
				if(index === self.viewports.length - 1) {
					callback();
				}
			});
		});
		return this;
	}
}
