/**
 * @name          offsetBetweenElementsEquals
 * @version       0.1
 * @lastmodified  2016-04-04
 * @package       html-css-js
 * @subpackage    Nightwatchjs Custom Assertions
 * @author        CH, VI
 *
 * Assertion calculate the offset between two elements
 *
 * Required Parameters:
 * firstElement: css selector
 * secondElement: css selector
 * orientation: 'x' for horizontal or 'y' for vertical
 * expected: number
 */

exports.assertion = function(firstElement, secondElement, orientation, expected) {

    var self = this;
    this.message = 'Unexpected offsetBetweenElements error.';

    this.firstElementValue = 0;
    this.secondElementValue = 0;
    this.orientation = orientation || 'y';
    this.expected = expected || 0;

    this.pass = function(value) {
        var pass = value === this.expected;
        if(pass) {
            self.message = 'Testing if the "' + self.orientation + '"-offset between the "' + firstElement + '" and "' + secondElement + '" element is "' + expected + 'px"';
        } else {
            self.message = '"' + self.orientation + '"-offset between the "' + firstElement + '" and "' + secondElement + '" element test failed!';
        }
        return pass;
    };

    this.value = function(result) {
        // calls pass
        self.secondElementValue = self.orientation === 'x' ? result.value.x : result.value.y;
        return  Math.abs(self.secondElementValue - self.firstElementValue);
    };

    this.command = function(callback) {
        // callback calls value
        this.api.getLocation(firstElement, function(result) {
            self.firstElementValue = self.orientation === 'x' ? result.value.x : result.value.y;
        });
        this.api.getLocation(secondElement, callback);

        return this;
    };
};