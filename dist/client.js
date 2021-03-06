/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mainCtrl = __webpack_require__(2);

	var _mainCtrl2 = _interopRequireDefault(_mainCtrl);

	var _onChangeDirective = __webpack_require__(10);

	var _onChangeDirective2 = _interopRequireDefault(_onChangeDirective);

	var _excelService = __webpack_require__(11);

	var _excelService2 = _interopRequireDefault(_excelService);

	var _dataService = __webpack_require__(12);

	var _dataService2 = _interopRequireDefault(_dataService);

	var _svgService = __webpack_require__(13);

	var _svgService2 = _interopRequireDefault(_svgService);

	var _jsonService = __webpack_require__(14);

	var _jsonService2 = _interopRequireDefault(_jsonService);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	angular.module('radarApp', ['colorpicker.module', _onChangeDirective2.default, _excelService2.default, _dataService2.default, _svgService2.default, _jsonService2.default]).controller('MainCtrl', _mainCtrl2.default);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _index = __webpack_require__(3);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainCtrl = function () {
	    function MainCtrl($scope, $timeout, excelService, dataService, svgService, jsonService) {
	        var _this = this;

	        _classCallCheck(this, MainCtrl);

	        this.cfg = _index.Radar2.cfg;

	        $scope.$watch(function () {
	            return _this.cfg;
	        }, this.configWatcher.bind(this), true);
	        $scope.$watch(function () {
	            return _this.mainCats;
	        }, this.dataWatcher.bind(this), true);

	        this.$scope = $scope;
	        this.$timeout = $timeout;
	        this.excelService = excelService;
	        this.dataService = dataService;
	        this.svgService = svgService;
	        this.jsonService = jsonService;
	    }

	    _createClass(MainCtrl, [{
	        key: 'render',
	        value: function render() {
	            var mainCats = arguments.length <= 0 || arguments[0] === undefined ? this.mainCats : arguments[0];

	            console.info(new Date().toLocaleTimeString() + ": Rendering Radars");
	            this.renderRadar1(mainCats, this.cfg);
	            this.renderRadar2(mainCats, this.cfg);
	        }
	    }, {
	        key: 'renderRadar1',
	        value: function renderRadar1(mainCats, cfg) {
	            var r1 = new _index.Radar1(mainCats, cfg);
	            r1.render('#surveyRadar1');
	        }
	    }, {
	        key: 'renderRadar2',
	        value: function renderRadar2(mainCats, cfg) {
	            var r2 = new _index.Radar2(mainCats, cfg);
	            r2.render('#surveyRadar2');
	        }
	    }, {
	        key: 'reset',
	        value: function reset() {
	            this.cfg = JSON.parse(JSON.stringify(_index.Radar2.cfg));
	        }

	        // User change/input processing

	    }, {
	        key: 'configWatcher',
	        value: function configWatcher(newVal, oldVal) {
	            var _this2 = this;

	            if (oldVal !== newVal) {
	                if (oldVal.w !== newVal.w && newVal.w !== newVal.h) newVal.h = newVal.w;else if (oldVal.h !== newVal.h && newVal.h !== newVal.w) newVal.w = newVal.h;else {
	                    this.$timeout.cancel(this.timeoutPromise);
	                    this.timeoutPromise = this.$timeout(function () {
	                        _this2.render();
	                    }, 400);
	                }
	            }
	        }
	    }, {
	        key: 'dataWatcher',
	        value: function dataWatcher(newVal, oldVal) {
	            var _this3 = this;

	            if (oldVal !== newVal) {
	                this.$timeout.cancel(this.timeoutPromise);
	                this.timeoutPromise = this.$timeout(function () {
	                    _this3.render();
	                }, 400);
	            }
	        }

	        // File handling

	    }, {
	        key: 'handleWorkbook',
	        value: function handleWorkbook(input, event) {
	            var _this4 = this;

	            if (input.files.length > 0) {
	                this.selectedFile = input.files[0];
	            }
	            this.excelService.handleFile(event).then(function (workbook) {
	                _this4.workbook = workbook;
	            }, function (exception) {
	                return console.error('fail', exception);
	            });
	        }
	    }, {
	        key: 'parseFile',
	        value: function parseFile(sheetName, offsetCol, offsetRow) {
	            var _this5 = this;

	            var worksheet = this.workbook.Sheets[sheetName];
	            this.parsedWorkbook = this.excelService.restructureWorksheet(worksheet, offsetCol, offsetRow);
	            this.workbookCols = Object.keys(this.parsedWorkbook.cols).map(function (key) {
	                return { key: parseInt(key), name: _this5.parsedWorkbook.cols[key].colName };
	            });
	            this.mainCats = undefined;
	        }
	    }, {
	        key: 'parseMainCats',
	        value: function parseMainCats(parseCfg) {
	            var pw = this.excelService.detailParsing(this.parsedWorkbook, parseCfg.mainCatCol, parseCfg.subCatCol, parseCfg.questionCol, parseCfg.detailCol, parseCfg.valueCols);
	            this.originalData = this.dataService.prepareData(pw, parseCfg.maxScaleValue); // rerender triggered automatically by watcher
	            this.mainCats = JSON.parse(JSON.stringify(this.originalData));
	        }
	    }, {
	        key: 'downloadSVG',
	        value: function downloadSVG(svgContainerId) {
	            this.svgService.downloadSVG(svgContainerId);
	        }
	    }, {
	        key: 'downloadDataConfig',
	        value: function downloadDataConfig() {
	            this.jsonService.downloadDataConfig(this.originalData, this.mainCats);
	        }
	    }, {
	        key: 'handleDataConfig',
	        value: function handleDataConfig(input, event) {
	            var _this6 = this;

	            this.jsonService.handleFile(event).then(function (dataConfig) {
	                _this6.jsonService.merge(_this6.mainCats, dataConfig);
	            }, function (exception) {
	                return console.error('fail', exception);
	            });
	        }
	    }, {
	        key: 'exportConfig',
	        value: function exportConfig() {
	            this.jsonService.downloadConfig(this.cfg);
	        }
	    }, {
	        key: 'importConfig',
	        value: function importConfig() {
	            var _this7 = this;

	            this.jsonService.handleFile(event).then(function (cfg) {
	                _this7.cfg = cfg;
	            }, function (exception) {
	                return console.error('fail', exception);
	            });
	        }

	        // Config handling

	    }, {
	        key: 'addAvgLineColor',
	        value: function addAvgLineColor() {
	            this.cfg.avgLineColors.push("rgba(27, 86, 166, 1)");
	        }
	    }, {
	        key: 'removeAvgLineColor',
	        value: function removeAvgLineColor(idx) {
	            this.cfg.avgLineColors.splice(idx, 1);
	        }
	    }]);

	    return MainCtrl;
	}();

	exports.default = MainCtrl;


	MainCtrl.mainCats = [];

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Radar2 = exports.Radar1 = undefined;

	var _radar = __webpack_require__(4);

	var _radar2 = _interopRequireDefault(_radar);

	var _radar3 = __webpack_require__(9);

	var _radar4 = _interopRequireDefault(_radar3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Radar1 = exports.Radar1 = _radar2.default;
	var Radar2 = exports.Radar2 = _radar4.default;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mainCategories = __webpack_require__(5);

	var _mainCategories2 = _interopRequireDefault(_mainCategories);

	var _subCategories = __webpack_require__(6);

	var _subCategories2 = _interopRequireDefault(_subCategories);

	var _questions = __webpack_require__(7);

	var _questions2 = _interopRequireDefault(_questions);

	var _circles = __webpack_require__(8);

	var _circles2 = _interopRequireDefault(_circles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Radar1 = function () {
		function Radar1(mainCats, config) {
			_classCallCheck(this, Radar1);

			this.circles = JSON.parse(JSON.stringify(this.constructor.circles));
			this.mainCats = JSON.parse(JSON.stringify(mainCats));

			var cfg = JSON.parse(JSON.stringify(this.constructor.cfg));
			this.cfg = this.prepareConfig(Object.assign(cfg, config));
		}

		_createClass(Radar1, [{
			key: 'prepareConfig',
			value: function prepareConfig(cfg) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.mainCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var mainCat = _step.value;
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = mainCat.subCats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var subCat = _step2.value;

								cfg.questionsNr += subCat.questions.length;
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				cfg.centerX = cfg.w / 2;
				cfg.centerY = cfg.h / 2;
				cfg.radius = Math.min(cfg.centerX, cfg.centerY);
				cfg.pixel = cfg.radius / 400;

				return cfg;
			}
		}, {
			key: 'render',
			value: function render(containerId) {
				var cfg = this.cfg;

				d3.select(containerId).select("svg").remove();

				var g = d3.select(containerId).append("svg").attr("width", cfg.w + cfg.ExtraWidthX).attr("height", cfg.h + cfg.ExtraWidthY).append("g").attr("transform", 'translate(' + cfg.TranslateX + ', ' + cfg.TranslateY + ')');

				var c = new _circles2.default(g, cfg, this.circles);

				var subCatTitleInnerRadiusPct = c.circles[3].radiusPct,
				    subCatTitleOuterRadiusPct = c.circles[4].radiusPct,
				    questionsStartRadiusPct = subCatTitleOuterRadiusPct,
				    questionsTitleInnerRadiusPct = c.circles[8].radiusPct,
				    questionsTitleOuterRadiusPct = c.circles[9].radiusPct;

				var mc = new _mainCategories2.default(g, cfg, this.mainCats, questionsTitleOuterRadiusPct);

				var subCats = this.mainCats.map(function (mainCat) {
					return mainCat.subCats;
				}).reduce(function (aggregate, next) {
					return aggregate.concat(next);
				});
				var sc = new _subCategories2.default(g, cfg, subCats, subCatTitleInnerRadiusPct, subCatTitleOuterRadiusPct, questionsTitleOuterRadiusPct);

				var questions = subCats.map(function (subCat) {
					return subCat.questions;
				}).reduce(function (aggregate, next) {
					return aggregate.concat(next);
				});
				var q = new _questions2.default(g, cfg, questions, subCatTitleOuterRadiusPct, questionsTitleInnerRadiusPct, questionsTitleOuterRadiusPct);

				mc.renderBackgrounds();

				mc.renderTitles();
				q.renderTitles();
				sc.renderTitles();

				c.renderCircles("scale");

				sc.renderFillings();
				q.renderFillings();

				q.renderLines();
				sc.renderLines();
				mc.renderLines();

				c.renderCircles("heading");
				c.renderCenterDot();
				c.renderLegend();
			}
		}]);

		return Radar1;
	}();

	exports.default = Radar1;


	Radar1.cfg = {
		w: 800,
		h: 800,
		radians: 2 * Math.PI,
		TranslateX: 80,
		TranslateY: 30,
		ExtraWidthX: 100,
		ExtraWidthY: 100,
		questionsNr: 0,
		turnTextThresholds: [0.25, 0.75],
		backgroundOpacity: 0.1,
		mainCatFontSize: 0.7,
		mainCatLetterSpacing: 5,
		centerDotSize: 0.04,
		subCatFontSize: 0.35,
		questionFontSize: 0.26,
		tooltipFontSize: 7,
		legendDotPct: 0.015,
		mainCatLineWidth: 3,
		subCatLineWidth: 2,
		questionLineWidth: 1,
		showMainCatValues: false
	};

	Radar1.circles = [{
		height: 0.09, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 25,
		type: "scale"
	}, {
		height: 0.09, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 50,
		type: "scale"
	}, {
		height: 0.09, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 75,
		type: "scale"
	}, {
		height: 0.09, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}, {
		height: 0.09, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 25,
		type: "scale"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 50,
		type: "scale"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 75,
		type: "scale"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var MainCategories = function () {
		function MainCategories(g, cfg, mainCats, innerTitleRadiusPct) {
			_classCallCheck(this, MainCategories);

			this.g = g;
			this.cfg = {
				centerX: cfg.centerX,
				centerY: cfg.centerY,
				radius: cfg.radius,
				radians: cfg.radians,
				questionsNr: cfg.questionsNr,
				backgroundOpacity: cfg.backgroundOpacity,
				mainCatFontSize: cfg.mainCatFontSize,
				mainCatLetterSpacing: cfg.mainCatLetterSpacing,
				turnTextThresholds: cfg.turnTextThresholds,
				pixel: cfg.pixel,
				mainCatLineWidth: cfg.mainCatLineWidth,
				showMainCatValues: cfg.showMainCatValues
			};

			this.mainCats = mainCats;
			this.prepare();

			this.innerTitleRadius = innerTitleRadiusPct * this.cfg.radius; // TODO pass with cfg?
		}

		_createClass(MainCategories, [{
			key: "prepare",
			value: function prepare() {
				var radians = this.cfg.radians,
				    questionsNr = this.cfg.questionsNr;
				var questionCounter = 0;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.mainCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var mainCat = _step.value;

						mainCat.questionsNr = 0;
						mainCat.firstQuestionIdx = questionCounter;

						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = mainCat.subCats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var subCat = _step2.value;

								mainCat.questionsNr += subCat.questions.length;
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}

						mainCat.startAngle = radians / questionsNr * questionCounter;
						mainCat.endAngle = radians / questionsNr * (questionCounter + mainCat.questionsNr);
						questionCounter += mainCat.questionsNr;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "renderBackgrounds",
			value: function renderBackgrounds() {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.mainCats[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var mainCat = _step3.value;

						this.renderBackground(mainCat);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}, {
			key: "renderTitles",
			value: function renderTitles() {
				var _iteratorNormalCompletion4 = true;
				var _didIteratorError4 = false;
				var _iteratorError4 = undefined;

				try {
					for (var _iterator4 = this.mainCats[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
						var mainCat = _step4.value;

						this.renderTitle(mainCat);
					}
				} catch (err) {
					_didIteratorError4 = true;
					_iteratorError4 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion4 && _iterator4.return) {
							_iterator4.return();
						}
					} finally {
						if (_didIteratorError4) {
							throw _iteratorError4;
						}
					}
				}
			}
		}, {
			key: "renderBackground",
			value: function renderBackground(mainCat) {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    innerTitleRadius = this.innerTitleRadius,
				    backgroundOpacity = this.cfg.backgroundOpacity;

				var backgroundArc = d3.svg.arc().innerRadius(1).outerRadius(innerTitleRadius).startAngle(mainCat.startAngle).endAngle(mainCat.endAngle);

				this.g.append("path").attr("class", "arc").attr("d", backgroundArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", mainCat.color).style("opacity", backgroundOpacity);
			}
		}, {
			key: "renderTitle",
			value: function renderTitle(mainCat) {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    innerTitleRadius = this.innerTitleRadius,
				    radius = this.cfg.radius,
				    questionsNr = this.cfg.questionsNr,
				    mainCatFontSize = this.cfg.mainCatFontSize,
				    letterSpacing = this.cfg.mainCatLetterSpacing,
				    turnTextThresholds = this.cfg.turnTextThresholds,
				    pixel = this.cfg.pixel,
				    showMainCatValues = this.cfg.showMainCatValues;

				var id = Math.random() * new Date();

				var arc = d3.svg.arc().innerRadius(innerTitleRadius).outerRadius(radius).startAngle(mainCat.startAngle).endAngle(mainCat.endAngle);

				var textArc = d3.svg.arc().innerRadius(innerTitleRadius + (radius - innerTitleRadius) / 2).outerRadius(innerTitleRadius + (radius - innerTitleRadius) / 2).startAngle(mainCat.startAngle).endAngle(mainCat.endAngle);

				this.g.append("path").attr("class", "arc").attr("d", arc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", mainCat.color).attr("stroke", mainCat.color);

				this.g.append("path").attr("d", textArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("id", "mainCat_" + id);

				var textMiddle = (mainCat.firstQuestionIdx + mainCat.questionsNr / 2) / questionsNr;
				var offset = textMiddle > turnTextThresholds[0] && textMiddle < turnTextThresholds[1] ? 1 : 0;
				var startOffset = 25 + 50 * offset;
				var fontSize = (radius - innerTitleRadius) * mainCatFontSize;

				this.g.append("text").attr("class", "mainCatTitle").attr("dy", fontSize / 3).append("textPath").attr("xlink:href", "#mainCat_" + id).text(mainCat.mainCat + (showMainCatValues ? " [" + mainCat.values.map(function (v) {
					return Math.round(v * 100) + "%";
				}).toString() + "]" : "")).attr("fill", "white").attr("startOffset", startOffset + "%").style("text-anchor", "middle").style("font-size", fontSize + "px").style("letter-spacing", letterSpacing * pixel + "px");
			}
		}, {
			key: "renderLines",
			value: function renderLines() {
				var radians = this.cfg.radians,
				    questionsNr = this.cfg.questionsNr,
				    centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    pixel = this.cfg.pixel,
				    mainCatLineWidth = this.cfg.mainCatLineWidth;

				var mainCatAxis = this.g.selectAll(".mainAxis").data(this.mainCats).enter().append("g").attr("class", "mainAxis");

				mainCatAxis.append("line").attr("x1", centerX).attr("y1", centerY).attr("x2", function (mainCat) {
					return centerX * (1 - Math.sin(-mainCat.firstQuestionIdx * radians / questionsNr));
				}).attr("y2", function (mainCat, i) {
					return centerY * (1 - Math.cos(-mainCat.firstQuestionIdx * radians / questionsNr));
				}).attr("class", "line").style("stroke", "black").style("stroke-width", mainCatLineWidth * pixel + "px");
			}
		}]);

		return MainCategories;
	}();

	exports.default = MainCategories;

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var SubCategories = function () {
		function SubCategories(g, cfg, subCats, subCatTitleInnerRadiusPct, subCatTitleOuterRadiusPct, subAxisEndPct) {
			_classCallCheck(this, SubCategories);

			this.g = g;
			this.cfg = {
				centerX: cfg.centerX,
				centerY: cfg.centerY,
				radians: cfg.radians,
				radius: cfg.radius,
				questionsNr: cfg.questionsNr,
				centerDotSize: cfg.centerDotSize,
				turnTextThresholds: cfg.turnTextThresholds,
				pixel: cfg.pixel,
				subCatLineWidth: cfg.subCatLineWidth
			};

			this.subCats = subCats;
			this.prepare();

			this.subAxisEndPct = subAxisEndPct;

			this.subCatTitleInnerRadius = subCatTitleInnerRadiusPct * this.cfg.radius;
			this.subCatTitleOuterRadius = subCatTitleOuterRadiusPct * this.cfg.radius;
			this.subCatTitleMiddleRadius = this.subCatTitleInnerRadius + (this.subCatTitleOuterRadius - this.subCatTitleInnerRadius) / 2;

			this.centerDotSizePx = this.cfg.centerDotSize * this.cfg.radius;
			this.fontSize = (this.subCatTitleOuterRadius - this.subCatTitleInnerRadius) * cfg.subCatFontSize;
		}

		_createClass(SubCategories, [{
			key: "prepare",
			value: function prepare() {
				var radians = this.cfg.radians,
				    questionsNr = this.cfg.questionsNr;
				var questionCounter = 0;

				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					var _loop = function _loop() {
						var subCat = _step.value;

						subCat.firstQuestionIdx = questionCounter;
						subCat.questionsNr = subCat.questions.length;

						subCat.startAngle = radians / questionsNr * questionCounter;
						subCat.endAngle = radians / questionsNr * (questionCounter + subCat.questionsNr);
						var subCatValuesNr = subCat.values.length;
						subCat.valueStartAngles = subCat.values.map(function (value, idx) {
							return subCat.startAngle + (subCat.endAngle - subCat.startAngle) * idx / subCatValuesNr;
						});
						subCat.valueEndAngles = subCat.values.map(function (value, idx) {
							return subCat.startAngle + (subCat.endAngle - subCat.startAngle) * (idx + 1) / subCatValuesNr;
						});

						questionCounter += subCat.questionsNr;
					};

					for (var _iterator = this.subCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						_loop();
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "renderFillings",
			value: function renderFillings() {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.subCats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var _subCat = _step2.value;

						this.renderFilling(_subCat);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: "renderFilling",
			value: function renderFilling(subCat) {
				var _this = this;

				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY;

				var centerDotSizePx = this.centerDotSizePx,
				    subCatTitleInnerRadius = this.subCatTitleInnerRadius,
				    subCatTitleOuterRadius = this.subCatTitleOuterRadius,
				    subCatTitleMiddleRadius = this.subCatTitleMiddleRadius;

				subCat.values.forEach(function (value, idx) {
					var fillingArc = d3.svg.arc().innerRadius(1).outerRadius(centerDotSizePx + (subCatTitleInnerRadius - centerDotSizePx) * value).startAngle(subCat.valueStartAngles[idx]).endAngle(subCat.valueEndAngles[idx]);

					_this.g.append("path").attr("d", fillingArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", subCat.color);
				});
			}
		}, {
			key: "renderTitles",
			value: function renderTitles(withBackground) {
				var _iteratorNormalCompletion3 = true;
				var _didIteratorError3 = false;
				var _iteratorError3 = undefined;

				try {
					for (var _iterator3 = this.subCats[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
						var _subCat2 = _step3.value;

						if (withBackground) {
							this.renderTitleBackground(_subCat2);
						}
						this.renderTitle(_subCat2);
					}
				} catch (err) {
					_didIteratorError3 = true;
					_iteratorError3 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion3 && _iterator3.return) {
							_iterator3.return();
						}
					} finally {
						if (_didIteratorError3) {
							throw _iteratorError3;
						}
					}
				}
			}
		}, {
			key: "renderTitle",
			value: function renderTitle(subCat) {
				var _this2 = this;

				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    questionsNr = this.cfg.questionsNr,
				    turnTextThresholds = this.cfg.turnTextThresholds;

				var subCatTitleInnerRadius = this.subCatTitleInnerRadius,
				    subCatTitleOuterRadius = this.subCatTitleOuterRadius,
				    subCatTitleMiddleRadius = this.subCatTitleMiddleRadius,
				    fontSize = this.fontSize;

				var id = Math.random() * new Date();

				var textArc = d3.svg.arc().innerRadius(subCatTitleMiddleRadius).outerRadius(subCatTitleMiddleRadius).startAngle(subCat.startAngle).endAngle(subCat.endAngle);

				this.g.append("path").attr("d", textArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("id", "subCat_" + id);

				var textMiddle = (subCat.firstQuestionIdx + subCat.questionsNr / 2) / questionsNr;
				var offset = textMiddle > turnTextThresholds[0] && textMiddle < turnTextThresholds[1] ? 1 : 0;
				var startOffset = 25 + 50 * offset;

				var lines = subCat.title.split("\n");
				var linesNr = lines.length;

				lines.forEach(function (line, i) {
					_this2.g.append("text").attr("class", "subCatTitle").attr("dy", linesNr === 1 ? fontSize / 3 : (-linesNr / 2 + i + 0.75) * fontSize).append("textPath").attr("xlink:href", "#subCat_" + id).text(line).attr("startOffset", startOffset + "%").style("text-anchor", "middle").style("font-size", fontSize + "px");
				});
			}
		}, {
			key: "renderTitleBackground",
			value: function renderTitleBackground(subCat) {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY;

				var subCatTitleInnerRadius = this.subCatTitleInnerRadius,
				    subCatTitleOuterRadius = this.subCatTitleOuterRadius;

				var arc = d3.svg.arc().innerRadius(subCatTitleInnerRadius).outerRadius(subCatTitleOuterRadius).startAngle(subCat.startAngle).endAngle(subCat.endAngle);

				this.g.append("path").attr("d", arc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", subCat.color);
			}
		}, {
			key: "renderLines",
			value: function renderLines() {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    radians = this.cfg.radians,
				    questionsNr = this.cfg.questionsNr,
				    pixel = this.cfg.pixel,
				    subCatLineWidth = this.cfg.subCatLineWidth;
				var subAxisEndPct = this.subAxisEndPct;

				var subCatAxis = this.g.selectAll(".subAxis").data(this.subCats).enter().append("g").attr("class", "subAxis");

				subCatAxis.append("line").attr("x1", centerX).attr("y1", centerY).attr("x2", function (subCat) {
					return centerX * (1 - subAxisEndPct * Math.sin(-subCat.firstQuestionIdx * radians / questionsNr));
				}).attr("y2", function (subCat) {
					return centerY * (1 - subAxisEndPct * Math.cos(-subCat.firstQuestionIdx * radians / questionsNr));
				}).attr("class", "line").style("stroke", "black").style("stroke-width", pixel * subCatLineWidth + "px");
			}
		}]);

		return SubCategories;
	}();

	exports.default = SubCategories;

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Questions = function () {
		function Questions(g, cfg, questions, questionsStartRadiusPct, questionsTitleInnerRadiusPct, questionsTitleOuterRadiusPct) {
			_classCallCheck(this, Questions);

			this.g = g;
			this.cfg = {
				centerX: cfg.centerX,
				centerY: cfg.centerY,
				radians: cfg.radians,
				radius: cfg.radius,
				questionsNr: cfg.questionsNr,
				turnTextThresholds: cfg.turnTextThresholds,
				pixel: cfg.pixel,
				questionLineWidth: cfg.questionLineWidth,
				minMaxColor: cfg.minMaxColor,
				avgLineColors: cfg.avgLineColors
			};

			this.questions = questions;

			this.questionsStartRadius = questionsStartRadiusPct * this.cfg.radius;
			this.questionsStartRadiusPct = questionsStartRadiusPct;
			this.questionsTitleInnerRadius = questionsTitleInnerRadiusPct * this.cfg.radius;
			this.questionsTitleInnerRadiusPct = questionsTitleInnerRadiusPct;
			this.questionsTitleOuterRadius = questionsTitleOuterRadiusPct * this.cfg.radius;
			this.questionsTitleOuterRadiusPct = questionsTitleOuterRadiusPct;
			this.questionsTitleMiddleRadius = (questionsTitleInnerRadiusPct + (questionsTitleOuterRadiusPct - questionsTitleInnerRadiusPct) / 2) * this.cfg.radius;

			this.fontSize = (this.questionsTitleOuterRadius - this.questionsTitleInnerRadius) * cfg.questionFontSize;
			this.tooltipFontSize = cfg.pixel * cfg.tooltipFontSize;

			this.valuesNr = 0; // the # of values provided per question, to be set in calculateXYs()

			this.prepare();
		}

		_createClass(Questions, [{
			key: "prepare",
			value: function prepare() {
				var _this = this;

				var radians = this.cfg.radians,
				    questionsNr = this.cfg.questionsNr;

				var avgRad = radians / questionsNr;

				this.questions.forEach(function (question, i) {
					question.idx = i;
					question.startAngle = avgRad * i;
					question.endAngle = avgRad * (i + 1);
					var questionValuesNr = question.values.length;
					question.valueStartAngles = question.values.map(function (value, idx) {
						return question.startAngle + avgRad * idx / questionValuesNr;
					});
					question.valueEndAngles = question.values.map(function (value, idx) {
						return question.startAngle + avgRad * (idx + 1) / questionValuesNr;
					});

					var _calculateXYs = _this.calculateXYs(avgRad, i, question.values, 0.5);

					var _calculateXYs2 = _slicedToArray(_calculateXYs, 2);

					question.avgXs = _calculateXYs2[0];
					question.avgYs = _calculateXYs2[1];


					question.minDetails = question.values.map(function (_) {
						return 1;
					});
					question.maxDetails = question.values.map(function (_) {
						return 0;
					});

					var border = 0.15;
					var offset = (1 - 2 * border) / (question.details.length - 1);
					question.details.forEach(function (detail, j) {
						var _calculateXYs3 = _this.calculateXYs(avgRad, i, detail.values, j * offset + border);

						var _calculateXYs4 = _slicedToArray(_calculateXYs3, 2);

						detail.posXs = _calculateXYs4[0];
						detail.posYs = _calculateXYs4[1];

						detail.values.forEach(function (value, k) {
							if (value !== null && value > question.maxDetails[k]) question.maxDetails[k] = value;
							if (value !== null && value < question.minDetails[k]) question.minDetails[k] = value;
						});
					});
				});
			}
		}, {
			key: "calculateXYs",
			value: function calculateXYs(avgRad, i, values, offset) {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY;
				var questionsTitleInnerRadiusPct = this.questionsTitleInnerRadiusPct,
				    questionsStartRadiusPct = this.questionsStartRadiusPct;

				var xs = [],
				    ys = [];
				values.forEach(function (value) {
					var x = undefined,
					    y = undefined;
					if (value !== null) {
						x = centerX * (1 - value * (questionsTitleInnerRadiusPct - questionsStartRadiusPct) * Math.sin(-(i + offset) * avgRad) - questionsStartRadiusPct * Math.sin(-(i + offset) * avgRad)), y = centerY * (1 - value * (questionsTitleInnerRadiusPct - questionsStartRadiusPct) * Math.cos(-(i + offset) * avgRad) - questionsStartRadiusPct * Math.cos(-(i + offset) * avgRad));
					}
					xs.push(x);
					ys.push(y);
				});
				if (values.length > this.valuesNr) this.valuesNr = values.length;

				return [xs, ys];
			}
		}, {
			key: "renderFillings",
			value: function renderFillings() {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.questions[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var question = _step.value;

						this.renderFilling(question);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "renderFilling",
			value: function renderFilling(question) {
				var _this2 = this;

				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY;
				var questionsStartRadius = this.questionsStartRadius,
				    questionsTitleInnerRadius = this.questionsTitleInnerRadius;

				question.values.forEach(function (value, idx) {
					if (value !== null) {
						var fillingArc = d3.svg.arc().innerRadius(questionsStartRadius).outerRadius(questionsStartRadius + (questionsTitleInnerRadius - questionsStartRadius) * value).startAngle(question.valueStartAngles[idx]).endAngle(question.valueEndAngles[idx]);

						_this2.g.append("path").attr("d", fillingArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", question.color);
					}
				});
			}
		}, {
			key: "renderTitles",
			value: function renderTitles() {
				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.questions[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var question = _step2.value;

						this.renderTitle(question);
						this.renderTitleForeground(question);
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}, {
			key: "renderTitle",
			value: function renderTitle(question) {
				var _this3 = this;

				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    questionsNr = this.cfg.questionsNr,
				    turnTextThresholds = this.cfg.turnTextThresholds;
				var questionsTitleInnerRadius = this.questionsTitleInnerRadius,
				    questionsTitleOuterRadius = this.questionsTitleOuterRadius,
				    questionsTitleMiddleRadius = this.questionsTitleMiddleRadius,
				    fontSize = this.fontSize;

				var id = Math.random() * new Date();

				var textArc = d3.svg.arc().innerRadius(questionsTitleMiddleRadius).outerRadius(questionsTitleMiddleRadius).startAngle(question.startAngle).endAngle(question.endAngle);

				this.g.append("path").attr("d", textArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("id", "question_" + id);

				var textMiddle = question.idx / questionsNr;
				var offset = textMiddle > turnTextThresholds[0] && textMiddle < turnTextThresholds[1] ? 1 : 0;
				var startOffset = 25 + 50 * offset;

				var lines = question.title.split("\n");
				var linesNr = lines.length;

				lines.forEach(function (line, i) {
					_this3.g.append("text").attr("class", "questionTitle").attr("dy", linesNr === 1 ? fontSize / 3 : (-linesNr / 2 + i + 0.75) * fontSize).append("textPath").attr("xlink:href", "#question_" + id).text(line).attr("startOffset", startOffset + "%").style("text-anchor", "middle").style("font-size", fontSize + "px");
				});
			}
		}, {
			key: "renderTitleForeground",
			value: function renderTitleForeground(question) {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY;

				var questionsTitleInnerRadius = this.questionsTitleInnerRadius,
				    questionsTitleOuterRadius = this.questionsTitleOuterRadius,
				    fontSize = this.tooltipFontSize;

				var arc = d3.svg.arc().innerRadius(questionsTitleInnerRadius).outerRadius(questionsTitleOuterRadius).startAngle(question.startAngle).endAngle(question.endAngle);

				var foreground = this.g.append("path").attr("d", arc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", "white").style("opacity", 0);

				if (question.details.length > 0) {
					(function () {
						var divHtml = "<strong>Details:</strong>";
						var _iteratorNormalCompletion3 = true;
						var _didIteratorError3 = false;
						var _iteratorError3 = undefined;

						try {
							for (var _iterator3 = question.details[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
								var detail = _step3.value;

								var values = detail.values.join(", ");
								if (detail.values.length > 1) values = "[" + values + "]";
								divHtml += "<br />" + detail.title + ": " + values + "/1";
							}
						} catch (err) {
							_didIteratorError3 = true;
							_iteratorError3 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion3 && _iterator3.return) {
									_iterator3.return();
								}
							} finally {
								if (_didIteratorError3) {
									throw _iteratorError3;
								}
							}
						}

						var div = d3.select("#tooltipBin").append("div").html(divHtml).attr("class", "tooltip").style("font-size", fontSize * 1.5 + "px").style("opacity", 0).style("border-color", question.color);

						foreground.on("mouseover", function () {
							div.transition().duration(200).style("opacity", .9);
							div.style("left", d3.event.pageX + 10 + "px").style("top", d3.event.pageY + "px");
						}).on("mousemove", function () {
							div.style("left", d3.event.pageX + 10 + "px").style("top", d3.event.pageY + "px");
						}).on("mouseout", function () {
							div.transition().duration(500).style("opacity", 0);
						});
					})();
				}
			}
		}, {
			key: "renderLines",
			value: function renderLines() {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    pixel = this.cfg.pixel,
				    questionLineWidth = this.cfg.questionLineWidth;
				var questionsStartRadiusPct = this.questionsStartRadiusPct,
				    questionsTitleOuterRadiusPct = this.questionsTitleOuterRadiusPct;

				var questionAxis = this.g.selectAll(".questionAxis").data(this.questions).enter().append("g").attr("class", "questionAxis");

				questionAxis.append("line").attr("x1", function (question) {
					return centerX * (1 - questionsStartRadiusPct * Math.sin(question.startAngle));
				}).attr("y1", function (question) {
					return centerY * (1 - questionsStartRadiusPct * Math.cos(question.startAngle));
				}).attr("x2", function (question) {
					return centerX * (1 - questionsTitleOuterRadiusPct * Math.sin(question.startAngle));
				}).attr("y2", function (question) {
					return centerY * (1 - questionsTitleOuterRadiusPct * Math.cos(question.startAngle));
				}).attr("class", "line").style("stroke", "black").style("stroke-width", questionLineWidth * pixel + "px");
			}
		}, {
			key: "renderAverages",
			value: function renderAverages() {
				var _hoverElements,
				    _this4 = this;

				var pixel = this.cfg.pixel,
				    colors = this.cfg.avgLineColors;
				var valuesNr = this.valuesNr;
				var self = this;

				var coordinateLists = [],
				    hoverElements = [];

				var _loop = function _loop(i) {
					var _hoverElements2;

					var coordinates = _this4.questions.map(function (q) {
						return { x: q.avgXs[i], y: q.avgYs[i] };
					});
					coordinates = coordinates.filter(function (coordinate) {
						return coordinate.x !== undefined && coordinate.y !== undefined;
					});
					coordinateLists.push(coordinates);

					var nodes = _this4.g.selectAll(".avgNodes").data(coordinates).enter().append("svg:circle").attr("class", "avgLine" + i).attr('r', pixel * 2 + "px").attr("cx", function (coordinate) {
						return coordinate.x;
					}).attr("cy", function (coordinate) {
						return coordinate.y;
					}).attr("valueNr", i).style("fill", colors[i % colors.length]).style("opacity", valuesNr > 1 ? 0.35 : 1);

					hoverElements = (_hoverElements2 = hoverElements).concat.apply(_hoverElements2, _toConsumableArray(nodes));
				};

				for (var i = 0; i < valuesNr; i++) {
					_loop(i);
				}

				var areas = this.g.selectAll(".area").data(coordinateLists).enter().append("polygon").attr("class", function (d, i) {
					return "avgLine" + i;
				}).attr("valueNr", function (d, i) {
					return i;
				}).style("stroke-width", pixel * 1.5 + "px").style("stroke", function (c, i) {
					return colors[i % colors.length];
				}).style("opacity", valuesNr > 1 ? 0.35 : 1).attr("points", function (coordinates) {
					var str = "";
					var _iteratorNormalCompletion4 = true;
					var _didIteratorError4 = false;
					var _iteratorError4 = undefined;

					try {
						for (var _iterator4 = coordinates[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
							var coordinate = _step4.value;

							str += coordinate.x + "," + coordinate.y + " ";
						}
					} catch (err) {
						_didIteratorError4 = true;
						_iteratorError4 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion4 && _iterator4.return) {
								_iterator4.return();
							}
						} finally {
							if (_didIteratorError4) {
								throw _iteratorError4;
							}
						}
					}

					return str;
				}).style("fill", "none");

				hoverElements = (_hoverElements = hoverElements).concat.apply(_hoverElements, _toConsumableArray(areas));

				if (valuesNr > 1) {
					hoverElements.forEach(function (element) {
						var el = d3.select(element);
						var i = el.attr("valueNr");

						el.on("mouseover", function () {
							self.toggleQuestionDisplay(i, true);
						}).on("mouseout", function () {
							if (d3.select("#questionButton" + i).attr("active") === "true") return;

							self.toggleQuestionDisplay(i, false);
						});
					});
				}
			}
		}, {
			key: "renderAllDetails",
			value: function renderAllDetails() {
				var _iteratorNormalCompletion5 = true;
				var _didIteratorError5 = false;
				var _iteratorError5 = undefined;

				try {
					for (var _iterator5 = this.questions[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
						var question = _step5.value;

						this.renderQuestionDetails(question);
					}
				} catch (err) {
					_didIteratorError5 = true;
					_iteratorError5 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion5 && _iterator5.return) {
							_iterator5.return();
						}
					} finally {
						if (_didIteratorError5) {
							throw _iteratorError5;
						}
					}
				}
			}
		}, {
			key: "renderQuestionDetails",
			value: function renderQuestionDetails(question) {
				var _this5 = this;

				var pixel = this.cfg.pixel,
				    colors = this.cfg.avgLineColors;
				var valuesNr = this.valuesNr,
				    fontSize = this.tooltipFontSize;

				var _loop2 = function _loop2(i) {
					var details = question.details.filter(function (detail) {
						return !isNaN(detail.posXs[i]) && !isNaN(detail.posYs[i]);
					});
					var _iteratorNormalCompletion6 = true;
					var _didIteratorError6 = false;
					var _iteratorError6 = undefined;

					try {
						var _loop3 = function _loop3() {
							var detail = _step6.value;

							var div = d3.select("#tooltipBin").append("div").html(detail.title).attr("class", "tooltip").style("font-size", fontSize * 1.5 + "px").style("opacity", 0).style("border-color", colors[i % colors.length]);

							_this5.g.append("svg:circle").attr("class", "detailNodes" + i).attr('r', pixel * 2 + "px").attr("cx", detail.posXs[i]).attr("cy", detail.posYs[i]).style("fill", colors[i % colors.length]).style("opacity", valuesNr > 1 ? 0.1 : 1).on("mouseover", function () {
								d3.select(this).transition().duration(200).attr("opacity", 1); //TODO does not work
								div.transition().duration(200).style("opacity", .9);
								div.style("left", d3.event.pageX + 10 + "px").style("top", d3.event.pageY + "px");
							}).on("mouseout", function () {
								if (valuesNr === 1 || d3.select("#questionButton" + i).attr("active") === "true") {
									d3.select(this).attr("opacity", 0.1);
								}
								div.transition().duration(500).style("opacity", 0);
							});
						};

						for (var _iterator6 = details[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
							_loop3();
						}
					} catch (err) {
						_didIteratorError6 = true;
						_iteratorError6 = err;
					} finally {
						try {
							if (!_iteratorNormalCompletion6 && _iterator6.return) {
								_iterator6.return();
							}
						} finally {
							if (_didIteratorError6) {
								throw _iteratorError6;
							}
						}
					}
				};

				for (var i = 0; i < this.valuesNr; i++) {
					_loop2(i);
				}
			}
		}, {
			key: "renderMinMaxs",
			value: function renderMinMaxs() {
				var _iteratorNormalCompletion7 = true;
				var _didIteratorError7 = false;
				var _iteratorError7 = undefined;

				try {
					for (var _iterator7 = this.questions[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
						var question = _step7.value;

						if (question.details.length > 0) {
							this.renderMinMax(question);
						}
					}
				} catch (err) {
					_didIteratorError7 = true;
					_iteratorError7 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion7 && _iterator7.return) {
							_iterator7.return();
						}
					} finally {
						if (_didIteratorError7) {
							throw _iteratorError7;
						}
					}
				}
			}
		}, {
			key: "renderMinMax",
			value: function renderMinMax(question) {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    minMaxColor = this.cfg.minMaxColor;
				var questionsStartRadius = this.questionsStartRadius,
				    questionsTitleInnerRadius = this.questionsTitleInnerRadius;

				var valuesNr = question.values.length;
				for (var i = 0; i < valuesNr; i++) {
					var fillingArc = d3.svg.arc().innerRadius(questionsStartRadius + (questionsTitleInnerRadius - questionsStartRadius) * question.minDetails[i]).outerRadius(questionsStartRadius + (questionsTitleInnerRadius - questionsStartRadius) * question.maxDetails[i]).startAngle(question.startAngle).endAngle(question.endAngle);

					this.g.append("path").attr("d", fillingArc).attr("transform", "translate(" + centerX + ", " + centerY + ")").attr("fill", minMaxColor).attr("class", "minMax" + i).style("opacity", valuesNr > 1 ? 0 : 1);
				}
			}
		}, {
			key: "renderLegend",
			value: function renderLegend() {
				var _this6 = this;

				if (this.valuesNr < 2) return;

				var pixel = this.cfg.pixel,
				    colors = this.cfg.avgLineColors;
				var self = this;

				var _loop4 = function _loop4(i) {
					_this6.g.append("rect").attr("id", "questionButton" + i).attr("x", 10).attr("y", 10 + pixel * 20 * i).attr("width", pixel * 20).attr("height", pixel * 15).attr("fill", colors[i % colors.length]).attr("active", false).attr("opacity", 0.5).on("click", function () {
						var el = d3.select(this);
						var active = el.attr("active") === "true";
						el.transition().duration(200).attr("opacity", active ? 0.5 : 1).attr("active", !active);

						self.toggleQuestionDisplay(i, !active);
					}).on("mouseover", function () {
						d3.select(this).transition().duration(100).attr("opacity", 0.75);
						self.toggleQuestionDisplay(i, true);
					}).on("mouseout", function () {
						var el = d3.select(this);
						var active = el.attr("active") === "true";
						el.transition().duration(200).attr("opacity", active ? 1 : 0.5);

						if (!active) self.toggleQuestionDisplay(i, false);
					});
				};

				for (var i = 0; i < this.valuesNr; i++) {
					_loop4(i);
				}
			}
		}, {
			key: "toggleQuestionDisplay",
			value: function toggleQuestionDisplay(idx, display) {
				d3.selectAll(".detailNodes" + idx).transition().duration(100).style("opacity", display ? 1 : 0.1);
				d3.selectAll(".avgLine" + idx).transition().duration(100).style("opacity", display ? 1 : 0.35);
				d3.selectAll(".minMax" + idx).transition().duration(100).style("opacity", display ? 1 : 0);
			}
		}]);

		return Questions;
	}();

	exports.default = Questions;

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Circles = function () {
		function Circles(g, cfg, circles) {
			_classCallCheck(this, Circles);

			this.g = g;
			this.cfg = {
				radius: cfg.radius,
				centerX: cfg.centerX,
				centerY: cfg.centerY,
				centerDotSize: cfg.centerDotSize,
				legendDotPct: cfg.legendDotPct,
				pixel: cfg.pixel
			};
			this.circles = circles;
			this.prepare();
		}

		_createClass(Circles, [{
			key: "prepare",
			value: function prepare() {
				var centerDotSize = this.cfg.centerDotSize;

				this.circles[0].height += centerDotSize;

				var radiusPct = 0;
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.circles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var circle = _step.value;

						radiusPct += circle.height;
						circle.radiusPct = radiusPct;
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "renderCircles",
			value: function renderCircles(type) {
				var radius = this.cfg.radius,
				    centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    pixel = this.cfg.pixel;

				var circles = !type ? this.circles : this.circles.filter(function (c) {
					return c.type === type;
				});

				this.g.selectAll(".circle").data(circles).enter().append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", function (c) {
					return c.radiusPct * radius;
				}).attr("fill", "none").attr("stroke", function (c) {
					return c.stroke;
				}).attr("stroke-width", function (c) {
					return c.strength * pixel + "px";
				});
			}
		}, {
			key: "renderCenterDot",
			value: function renderCenterDot() {
				var centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    centerDotSize = this.cfg.centerDotSize,
				    radius = this.cfg.radius;

				this.g.append("circle").attr("cx", centerX).attr("cy", centerY).attr("r", centerDotSize * radius).attr("fill", "black");
			}
		}, {
			key: "renderLegend",
			value: function renderLegend() {
				var legendDotPct = this.cfg.legendDotPct,
				    centerX = this.cfg.centerX,
				    centerY = this.cfg.centerY,
				    radius = this.cfg.radius;

				var legendFontSize = legendDotPct * radius * 1.3;

				var _iteratorNormalCompletion2 = true;
				var _didIteratorError2 = false;
				var _iteratorError2 = undefined;

				try {
					for (var _iterator2 = this.circles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
						var circle = _step2.value;

						var posY = centerY - circle.radiusPct * radius;

						if (circle.legendValue) {
							var group = this.g.append("g").attr("transform", "translate(" + centerX + ", " + posY + ")");

							group.append("circle").attr("cx", 0).attr("cy", 0).attr("r", legendDotPct * radius);

							group.append("text").attr("fill", "white").attr("text-anchor", "middle").attr("dy", legendFontSize / 3).text(circle.legendValue).style("font-size", legendFontSize + "px");
						}
					}
				} catch (err) {
					_didIteratorError2 = true;
					_iteratorError2 = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion2 && _iterator2.return) {
							_iterator2.return();
						}
					} finally {
						if (_didIteratorError2) {
							throw _iteratorError2;
						}
					}
				}
			}
		}]);

		return Circles;
	}();

	exports.default = Circles;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _mainCategories = __webpack_require__(5);

	var _mainCategories2 = _interopRequireDefault(_mainCategories);

	var _subCategories = __webpack_require__(6);

	var _subCategories2 = _interopRequireDefault(_subCategories);

	var _questions = __webpack_require__(7);

	var _questions2 = _interopRequireDefault(_questions);

	var _circles = __webpack_require__(8);

	var _circles2 = _interopRequireDefault(_circles);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Radar2 = function () {
		function Radar2(mainCats, config) {
			_classCallCheck(this, Radar2);

			this.circles = JSON.parse(JSON.stringify(this.constructor.circles));
			this.mainCats = JSON.parse(JSON.stringify(mainCats)); // create clone to avoid messing with the input data

			var cfg = JSON.parse(JSON.stringify(this.constructor.cfg));
			this.cfg = this.prepareConfig(Object.assign(cfg, config));
		}

		_createClass(Radar2, [{
			key: 'prepareConfig',
			value: function prepareConfig(cfg) {
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;

				try {
					for (var _iterator = this.mainCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var mainCat = _step.value;
						var _iteratorNormalCompletion2 = true;
						var _didIteratorError2 = false;
						var _iteratorError2 = undefined;

						try {
							for (var _iterator2 = mainCat.subCats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
								var subCat = _step2.value;

								cfg.questionsNr += subCat.questions.length;
							}
						} catch (err) {
							_didIteratorError2 = true;
							_iteratorError2 = err;
						} finally {
							try {
								if (!_iteratorNormalCompletion2 && _iterator2.return) {
									_iterator2.return();
								}
							} finally {
								if (_didIteratorError2) {
									throw _iteratorError2;
								}
							}
						}
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}

				cfg.centerX = cfg.w / 2;
				cfg.centerY = cfg.h / 2;
				cfg.radius = Math.min(cfg.centerX, cfg.centerY);
				cfg.pixel = cfg.radius / 400;

				return cfg;
			}
		}, {
			key: 'render',
			value: function render(containerId) {
				var cfg = this.cfg;

				d3.select(containerId).select("svg").remove();

				var g = d3.select(containerId).append("svg").attr("width", cfg.w + cfg.ExtraWidthX).attr("height", cfg.h + cfg.ExtraWidthY).append("g").attr("transform", 'translate(' + cfg.TranslateX + ', ' + cfg.TranslateY + ')');

				var c = new _circles2.default(g, cfg, this.circles);

				var subCatTitleInnerRadiusPct = c.circles[10].radiusPct,
				    subCatTitleOuterRadiusPct = c.circles[11].radiusPct,
				    questionsTitleInnerRadiusPct = c.circles[9].radiusPct,
				    questionsTitleOuterRadiusPct = subCatTitleInnerRadiusPct;

				var mc = new _mainCategories2.default(g, cfg, this.mainCats, subCatTitleOuterRadiusPct);

				var subCats = this.mainCats.map(function (mainCat) {
					return mainCat.subCats;
				}).reduce(function (aggregate, next) {
					return aggregate.concat(next);
				});
				var sc = new _subCategories2.default(g, cfg, subCats, subCatTitleInnerRadiusPct, subCatTitleOuterRadiusPct, subCatTitleOuterRadiusPct);

				var questions = subCats.map(function (subCat) {
					return subCat.questions;
				}).reduce(function (aggregate, next) {
					return aggregate.concat(next);
				});
				var q = new _questions2.default(g, cfg, questions, cfg.centerDotSize, questionsTitleInnerRadiusPct, questionsTitleOuterRadiusPct);

				mc.renderTitles();
				sc.renderTitles(true);
				q.renderTitles();

				c.renderCircles("scale");

				q.renderMinMaxs();

				q.renderLines();
				sc.renderLines();
				mc.renderLines();

				c.renderCircles("heading");
				c.renderCenterDot();
				c.renderLegend();

				q.renderAverages();
				q.renderAllDetails();
				q.renderLegend();
			}
		}]);

		return Radar2;
	}();

	exports.default = Radar2;


	Radar2.cfg = {
		w: 800,
		h: 800,
		radians: 2 * Math.PI,
		TranslateX: 80,
		TranslateY: 30,
		ExtraWidthX: 100,
		ExtraWidthY: 100,
		questionsNr: 0,
		turnTextThresholds: [0.25, 0.75],
		backgroundOpacity: 0.1,
		mainCatFontSize: 0.7,
		mainCatLetterSpacing: 5,
		centerDotSize: 0.04,
		subCatFontSize: 0.35,
		questionFontSize: 0.26,
		tooltipFontSize: 7,
		legendDotPct: 0.015,
		mainCatLineWidth: 3,
		subCatLineWidth: 2,
		questionLineWidth: 1,
		showCatMainValues: false,
		minMaxColor: "rgba(128, 128, 128, 0.33)",
		avgLineColors: ["rgba(179,10,10,1)", "rgba(1,10,10,1)", "rgba(27, 86, 166, 1)"]
	};

	Radar2.circles = [{
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 20,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 40,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 60,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		legendValue: 80,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "grey",
		strength: 1,
		type: "scale"
	}, {
		height: 0.07, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}, {
		height: 0.08, // percentage of total radius
		stroke: "black",
		strength: 1,
		type: "heading"
	}];

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	function customOnChange() {
	    return {
	        restrict: 'A',
	        link: function link(scope, element, attrs) {
	            var onChangeHandler = scope.$eval(attrs.customOnChange);
	            var controllerAs = attrs.customOnChange.split('.');
	            if (controllerAs.length == 2) element.bind('change', onChangeHandler.bind(scope[controllerAs[0]], element[0]));else element.bind('change', onChangeHandler);
	        }
	    };
	}

	exports.default = angular.module('directives.customOnChange', []).directive('customOnChange', customOnChange).name;

/***/ },
/* 11 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ExcelService = function () {
	    function ExcelService($q) {
	        _classCallCheck(this, ExcelService);

	        this.$q = $q;
	    }

	    _createClass(ExcelService, [{
	        key: "handleFile",
	        value: function handleFile(e) {
	            var deferred = this.$q.defer();

	            try {
	                var files = e.target.files;

	                var f = files[0];
	                var reader = new FileReader();

	                reader.onload = function (e) {
	                    try {
	                        var data = e.target.result;
	                        var workbook = XLSX.read(data, { type: 'binary' });
	                        deferred.resolve(workbook);
	                    } catch (exception) {
	                        deferred.reject(exception);
	                    }
	                };
	                reader.readAsBinaryString(f);
	            } catch (exception) {
	                deferred.reject(exception);
	            }

	            return deferred.promise;
	        }
	    }, {
	        key: "getMaxDimensionsWorksheet",
	        value: function getMaxDimensionsWorksheet(worksheet) {
	            var refs = worksheet["!ref"].split(":");

	            return {
	                min: this.translateCellName(refs[0]),
	                max: this.translateCellName(refs[1])
	            };
	        }
	    }, {
	        key: "detailParsing",
	        value: function detailParsing(data) {
	            var mainCatColNr = arguments.length <= 1 || arguments[1] === undefined ? -1 : arguments[1];
	            var subCatColNr = arguments.length <= 2 || arguments[2] === undefined ? -1 : arguments[2];
	            var questionColNr = arguments.length <= 3 || arguments[3] === undefined ? -1 : arguments[3];

	            var _this = this;

	            var detailColNr = arguments.length <= 4 || arguments[4] === undefined ? -1 : arguments[4];
	            var valueColNrs = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	            var maxRowNr = data.maxRowNr;
	            var cols = data.cols;

	            var mainCatCol = cols[mainCatColNr],
	                subCatCol = cols[subCatColNr],
	                questionCol = cols[questionColNr],
	                detailCol = cols[detailColNr],
	                valueCols = valueColNrs.map(function (nr) {
	                return cols[nr];
	            }).filter(function (col) {
	                return col !== undefined;
	            });

	            var mainCats = [],
	                mainCat = undefined,
	                subCat = undefined,
	                question = undefined,
	                detail = undefined;

	            var _loop = function _loop(i) {
	                var mainCatCell = mainCatCol === undefined ? undefined : mainCatCol.cells[i],
	                    subCatCell = subCatCol === undefined ? undefined : subCatCol.cells[i],
	                    questionCell = questionCol === undefined ? undefined : questionCol.cells[i],
	                    detailCell = detailCol === undefined ? undefined : detailCol.cells[i],
	                    valueCells = valueCols.map(function (col) {
	                    return col.cells[i];
	                });

	                if (_this.isValidCell(mainCatCell)) {
	                    mainCat = { mainCat: _this.parseTitle(mainCatCell), values: [], subCats: [] };
	                    mainCats.push(mainCat);

	                    subCat = undefined;
	                    question = undefined;
	                    detail = undefined;
	                }
	                if (_this.isValidCell(subCatCell)) {
	                    subCat = { title: _this.parseTitle(subCatCell), values: [], questions: [] };

	                    if (mainCat === undefined) {
	                        mainCat = { mainCat: "", values: [], subCats: [] };
	                        mainCats.push(mainCat);
	                    }

	                    mainCat.subCats.push(subCat);

	                    question = undefined;
	                    detail = undefined;
	                }
	                if (_this.isValidCell(questionCell)) {
	                    question = { title: _this.parseTitle(questionCell), values: [], details: [] };
	                    if (subCat === undefined) {
	                        subCat = { title: "", questions: [] };
	                        mainCat.subCats.push(subCat);
	                    }
	                    subCat.questions.push(question);

	                    detail = undefined;
	                }
	                if (_this.isValidCell(detailCell)) {
	                    detail = { title: _this.parseTitle(detailCell), values: [] };

	                    if (subCat === undefined) {
	                        subCat = { title: "", values: [], questions: [] };
	                        mainCat.subCats.push(subCat);
	                    }
	                    if (question === undefined) {
	                        question = { title: "", values: [], details: [] };
	                        subCat.questions.push(question);
	                    }
	                    question.details.push(detail);
	                }

	                var element = detail !== undefined ? detail : question !== undefined ? question : subCat !== undefined ? subCat : undefined;
	                if (element !== undefined) {
	                    element.values = valueCells.map(function (cell) {
	                        return _this.parseValue(cell);
	                    });
	                }
	            };

	            for (var i = 0; i <= maxRowNr; i++) {
	                _loop(i);
	            }
	            return mainCats;
	        }
	    }, {
	        key: "isValidCell",
	        value: function isValidCell(cell) {
	            return cell !== undefined && cell.v !== undefined && isNaN(cell.v) && cell.v !== '?';
	        }
	    }, {
	        key: "isValueCell",
	        value: function isValueCell(cell) {
	            return cell !== undefined && !isNaN(cell.v);
	        }
	    }, {
	        key: "parseValue",
	        value: function parseValue(cell) {
	            return cell !== undefined && !isNaN(cell.v) ? parseFloat(cell.v) : undefined;
	        }
	    }, {
	        key: "parseTitle",
	        value: function parseTitle(cell) {
	            return cell !== undefined && cell.v !== undefined ? cell.v : "";
	        }
	    }, {
	        key: "restructureWorksheet",
	        value: function restructureWorksheet(worksheet) {
	            var _this2 = this;

	            var colOffset = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	            var rowOffset = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	            if (worksheet === undefined) throw new Error('');

	            var _getMaxDimensionsWork = this.getMaxDimensionsWorksheet(worksheet);

	            var maxCell = _getMaxDimensionsWork.max;

	            var cols = {};
	            Object.keys(worksheet).forEach(function (key) {
	                var _translateCellName = _this2.translateCellName(key);

	                var colNr = _translateCellName.colNr;
	                var rowNr = _translateCellName.rowNr;
	                var colName = _translateCellName.colName;

	                if (colNr >= colOffset && rowNr >= rowOffset) {
	                    if (cols[colNr] === undefined) cols[colNr] = { colName: colName, cells: {} };
	                    cols[colNr].cells[rowNr] = worksheet[key];
	                }
	            });
	            return { maxRowNr: maxCell.rowNr, cols: cols };
	        }
	    }, {
	        key: "translateCellName",
	        value: function translateCellName(cellName) {
	            var columnNrs = [];
	            var colNr = undefined,
	                rowNr = undefined;
	            var colName = "";
	            for (var i = 0; i < cellName.length; i++) {
	                var charCode = cellName.charCodeAt(i);
	                if (charCode > 64 && charCode < 91) {
	                    columnNrs.push(charCode - 65);
	                    colName += cellName[i];
	                } else if (charCode > 48 && charCode < 58) {
	                    rowNr = parseInt(cellName.substr(i)) - 1;
	                    break;
	                }
	            }
	            if (columnNrs.length > 0) {
	                colNr = columnNrs.reduce(function (colNr, next, idx) {
	                    if (next === undefined) {
	                        return colNr;
	                    } else {
	                        return (colNr + 1) * 24 + next;
	                    }
	                });
	            }
	            return { colNr: colNr, rowNr: rowNr, colName: colName };
	        }
	    }]);

	    return ExcelService;
	}();

	exports.default = angular.module('services.excel-service', []).service('excelService', ExcelService).name;

/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var DataService = function () {
	    function DataService() {
	        _classCallCheck(this, DataService);
	    }

	    _createClass(DataService, [{
	        key: 'prepareData',
	        value: function prepareData(parsedData, maxScaleValue) {
	            var data = this.aggregateValues(parsedData, maxScaleValue);
	            data = this.assignColors(data);
	            return data;
	        }
	    }, {
	        key: 'aggregateValues',
	        value: function aggregateValues(mainCats, maxScaleValue) {
	            var _this = this;

	            if (maxScaleValue === undefined) throw new Error("Please provide the value scale's maximum (e.g. 100).");

	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                var _loop = function _loop() {
	                    var mainCat = _step.value;

	                    var subCatValueLists = [];
	                    var _iteratorNormalCompletion2 = true;
	                    var _didIteratorError2 = false;
	                    var _iteratorError2 = undefined;

	                    try {
	                        var _loop2 = function _loop2() {
	                            var subCat = _step2.value;

	                            var questionValueLists = [];
	                            var _iteratorNormalCompletion3 = true;
	                            var _didIteratorError3 = false;
	                            var _iteratorError3 = undefined;

	                            try {
	                                for (var _iterator3 = subCat.questions[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                                    var question = _step3.value;

	                                    var detailValueLists = [];
	                                    var _iteratorNormalCompletion4 = true;
	                                    var _didIteratorError4 = false;
	                                    var _iteratorError4 = undefined;

	                                    try {
	                                        for (var _iterator4 = question.details[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                                            var detail = _step4.value;

	                                            _this.scaleValues(detail, maxScaleValue, detailValueLists);
	                                        }
	                                    } catch (err) {
	                                        _didIteratorError4 = true;
	                                        _iteratorError4 = err;
	                                    } finally {
	                                        try {
	                                            if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                                                _iterator4.return();
	                                            }
	                                        } finally {
	                                            if (_didIteratorError4) {
	                                                throw _iteratorError4;
	                                            }
	                                        }
	                                    }

	                                    if (question.values.length > 0) {
	                                        _this.scaleValues(question, maxScaleValue, questionValueLists);
	                                    } else if (detailValueLists.length > 0) {
	                                        question.values = detailValueLists.map(function (detailValues, i) {
	                                            var avg = _this.roundFloat(detailValues.reduce(function (sum, next) {
	                                                return sum += next;
	                                            }) / detailValues.length);
	                                            questionValueLists[i] = questionValueLists[i] === undefined ? [avg] : questionValueLists[i].concat(avg);
	                                            return avg;
	                                        });
	                                    }
	                                }
	                            } catch (err) {
	                                _didIteratorError3 = true;
	                                _iteratorError3 = err;
	                            } finally {
	                                try {
	                                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                                        _iterator3.return();
	                                    }
	                                } finally {
	                                    if (_didIteratorError3) {
	                                        throw _iteratorError3;
	                                    }
	                                }
	                            }

	                            if (subCat.values.length > 0) {
	                                _this.scaleValues(subCat, maxScaleValue);
	                            } else if (questionValueLists.length > 0) {
	                                subCat.values = questionValueLists.map(function (questionValues, i) {
	                                    var avg = _this.roundFloat(questionValues.reduce(function (sum, next) {
	                                        return sum += next;
	                                    }) / questionValues.length);
	                                    subCatValueLists[i] = subCatValueLists[i] === undefined ? [avg] : subCatValueLists[i].concat(avg);
	                                    return avg;
	                                });
	                            }
	                        };

	                        for (var _iterator2 = mainCat.subCats[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                            _loop2();
	                        }
	                    } catch (err) {
	                        _didIteratorError2 = true;
	                        _iteratorError2 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                                _iterator2.return();
	                            }
	                        } finally {
	                            if (_didIteratorError2) {
	                                throw _iteratorError2;
	                            }
	                        }
	                    }

	                    if (mainCat.values.length > 0) {
	                        _this.scaleValues(mainCat, maxScaleValue);
	                    } else if (subCatValueLists.length > 0) {
	                        mainCat.values = subCatValueLists.map(function (subCatValues) {
	                            return _this.roundFloat(subCatValues.reduce(function (sum, next) {
	                                return sum += next;
	                            }) / subCatValues.length);
	                        });
	                    }
	                };

	                for (var _iterator = mainCats[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    _loop();
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return mainCats;
	        }
	    }, {
	        key: 'scaleValues',
	        value: function scaleValues(element, maxScaleValue) {
	            var elementValueLists = arguments.length <= 2 || arguments[2] === undefined ? [] : arguments[2];

	            for (var i = 0; i < element.values.length; i++) {
	                var value = element.values[i];
	                if (value !== undefined) {
	                    var scaledValue = this.roundFloat(value / maxScaleValue, 3);
	                    element.values[i] = scaledValue;
	                    elementValueLists[i] = elementValueLists[i] === undefined ? [scaledValue] : elementValueLists[i].concat(scaledValue);
	                }
	            }
	        }
	    }, {
	        key: 'roundFloat',
	        value: function roundFloat(float) {
	            var decimals = arguments.length <= 1 || arguments[1] === undefined ? 3 : arguments[1];

	            var pow = Math.pow(10, decimals);
	            return Math.round(float * pow) / pow;
	        }
	    }, {
	        key: 'assignColors',
	        value: function assignColors(mainCats) {
	            var colorScale = [{ r: 59, g: 128, b: 62, a: 1.0 }, { r: 90, g: 80, b: 140, a: 1.0 }, { r: 181, g: 48, b: 60, a: 1.0 }, { r: 27, g: 86, b: 166, a: 1.0 }, { r: 208, g: 89, b: 61, a: 1.0 }],
	                sign = -1;

	            mainCats.forEach(function (mainCat, idx) {
	                var color = colorScale[idx % colorScale.length];
	                mainCat.color = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + color.a + ')';

	                var _iteratorNormalCompletion5 = true;
	                var _didIteratorError5 = false;
	                var _iteratorError5 = undefined;

	                try {
	                    for (var _iterator5 = mainCat.subCats[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                        var _subCat = _step5.value;

	                        var opacity = 0.65 + sign * (Math.random() * 0.25);
	                        sign = sign * -1;
	                        _subCat.color = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';

	                        var _iteratorNormalCompletion6 = true;
	                        var _didIteratorError6 = false;
	                        var _iteratorError6 = undefined;

	                        try {
	                            for (var _iterator6 = _subCat.questions[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                                var question = _step6.value;

	                                question.color = 'rgba(' + color.r + ', ' + color.g + ', ' + color.b + ', ' + opacity + ')';
	                            }
	                        } catch (err) {
	                            _didIteratorError6 = true;
	                            _iteratorError6 = err;
	                        } finally {
	                            try {
	                                if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                                    _iterator6.return();
	                                }
	                            } finally {
	                                if (_didIteratorError6) {
	                                    throw _iteratorError6;
	                                }
	                            }
	                        }
	                    }
	                } catch (err) {
	                    _didIteratorError5 = true;
	                    _iteratorError5 = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                            _iterator5.return();
	                        }
	                    } finally {
	                        if (_didIteratorError5) {
	                            throw _iteratorError5;
	                        }
	                    }
	                }
	            });
	            return mainCats;
	        }
	    }]);

	    return DataService;
	}();

	exports.default = angular.module('services.data-service', []).service('dataService', DataService).name;

/***/ },
/* 13 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Based on https://github.com/NYTimes/svg-crowbar
	 */

	var SVGService = function () {
	    function SVGService($window, $timeout) {
	        _classCallCheck(this, SVGService);

	        this.$window = $window;
	        this.$timeout = $timeout;
	    }

	    _createClass(SVGService, [{
	        key: "downloadSVG",
	        value: function downloadSVG(svgContainerId) {
	            var _this = this;

	            if (svgContainerId === undefined || svgContainerId === null || svgContainerId === "") throw new Error("No SVG container ID provided!");
	            var doc = this.$window.document;

	            var styles = this.getStyles(doc);
	            var svgSource = this.getSource(svgContainerId, styles);

	            if (svgSource) {
	                (function () {
	                    var filename = svgSource.id;
	                    var url = _this.$window.URL.createObjectURL(new Blob(svgSource.source, { "type": "text\/xml" }));

	                    var a = _this.$window.document.createElement("a");
	                    body.appendChild(a);
	                    a.setAttribute("download", filename + ".svg");
	                    a.setAttribute("href", url);
	                    a.style["display"] = "none";
	                    a.click();

	                    var that = _this;
	                    _this.$timeout(function () {
	                        return that.$window.URL.revokeObjectURL(url);
	                    }, 10);
	                })();
	            }
	        }
	    }, {
	        key: "getSource",
	        value: function getSource(svgContainer) {
	            var styles = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];

	            var prefix = {
	                xmlns: "http://www.w3.org/2000/xmlns/",
	                xlink: "http://www.w3.org/1999/xlink",
	                svg: "http://www.w3.org/2000/svg"
	            },
	                doctype = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

	            var svg = this.$window.document.querySelector(svgContainer + " svg");

	            if (!svg) throw new Error("SVG element not found!");

	            svg.setAttribute("version", "1.1");

	            var defsEl = this.$window.document.createElement("defs");
	            svg.insertBefore(defsEl, svg.firstChild); //TODO   .insert("defs", ":first-child")

	            var styleEl = this.$window.document.createElement("style");
	            defsEl.appendChild(styleEl);
	            styleEl.setAttribute("type", "text/css");

	            // removing attributes so they aren't doubled up
	            svg.removeAttribute("xmlns");
	            svg.removeAttribute("xlink");

	            // These are needed for the svg
	            if (!svg.hasAttributeNS(prefix.xmlns, "xmlns")) {
	                svg.setAttributeNS(prefix.xmlns, "xmlns", prefix.svg);
	            }

	            if (!svg.hasAttributeNS(prefix.xmlns, "xmlns:xlink")) {
	                svg.setAttributeNS(prefix.xmlns, "xmlns:xlink", prefix.xlink);
	            }

	            var source = new XMLSerializer().serializeToString(svg).replace('</style>', '<![CDATA[' + styles + ']]></style>');
	            var rect = svg.getBoundingClientRect();

	            return {
	                top: rect.top,
	                left: rect.left,
	                width: rect.width,
	                height: rect.height,
	                class: svg.getAttribute("class"),
	                id: svgContainer.substr(1),
	                childElementCount: svg.childElementCount,
	                source: [doctype + source]
	            };
	        }
	    }, {
	        key: "getStyles",
	        value: function getStyles(doc) {
	            var styles = "";

	            angular.forEach(doc.styleSheets, function (stylesheet) {
	                return processStyleSheet(stylesheet);
	            });

	            function processStyleSheet(ss) {
	                angular.forEach(ss.cssRules, function (rule) {
	                    if (rule.type === 3) {
	                        // Import Rule
	                        processStyleSheet(rule.styleSheet);
	                    } else {
	                        // hack for illustrator crashing on descendent selectors
	                        if (rule.selectorText) {
	                            if (rule.selectorText.indexOf(">") === -1) {
	                                styles += "\n" + rule.cssText;
	                            }
	                        }
	                    }
	                });
	            }
	            return styles;
	        }
	    }]);

	    return SVGService;
	}();

	exports.default = angular.module('services.svg-service', []).service('svgService', SVGService).name;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var JSONService = function () {
	    function JSONService($window, $timeout, $q) {
	        _classCallCheck(this, JSONService);

	        this.$window = $window;
	        this.$timeout = $timeout;
	        this.$q = $q;
	    }

	    _createClass(JSONService, [{
	        key: 'downloadDataConfig',
	        value: function downloadDataConfig(originalData, editedData) {
	            this.downloadJSON(this.assertDiff(originalData, editedData), 'dataConfig');
	        }
	    }, {
	        key: 'downloadConfig',
	        value: function downloadConfig(cfg) {
	            this.downloadJSON(cfg, 'config');
	        }
	    }, {
	        key: 'downloadJSON',
	        value: function downloadJSON(obj, name) {
	            var url = this.$window.URL.createObjectURL(new Blob([JSON.stringify(obj)], { "type": "application/json" }));

	            var a = this.$window.document.createElement("a");
	            body.appendChild(a);
	            a.setAttribute("download", name + ".json");
	            a.setAttribute("href", url);
	            a.style["display"] = "none";
	            a.click();

	            var self = this;
	            this.$timeout(function () {
	                return self.$window.URL.revokeObjectURL(url);
	            }, 10);
	        }
	    }, {
	        key: 'assertDiff',
	        value: function assertDiff(originalData, editedData) {
	            var mainCatDiff = {},
	                subCatDiff = {},
	                questionDiff = {},
	                detailDiff = {};

	            editedData.forEach(function (mainCat, idx) {
	                var origMainCat = originalData[idx];
	                if (mainCat.mainCat !== origMainCat.mainCat) {
	                    mainCatDiff[origMainCat.mainCat] = mainCat.mainCat;
	                }
	                mainCat.subCats.forEach(function (subCat, idx) {
	                    var origSubCat = origMainCat.subCats[idx];
	                    if (subCat.title !== origSubCat.title) {
	                        subCatDiff[origSubCat.title] = subCat.title;
	                    }
	                    subCat.questions.forEach(function (question, idx) {
	                        var origQuestion = origSubCat.questions[idx];
	                        if (question.title !== origQuestion.title) {
	                            questionDiff[origQuestion.title] = question.title;
	                        }
	                        question.details.forEach(function (detail, idx) {
	                            var origDetail = origQuestion.details[idx];
	                            if (detail.title !== origDetail.title) {
	                                detailDiff[origDetail.title] = detail.title;
	                            }
	                        });
	                    });
	                });
	            });

	            return { mainCats: mainCatDiff, subCats: subCatDiff, questions: questionDiff, details: detailDiff };
	        }
	    }, {
	        key: 'handleFile',
	        value: function handleFile(e) {
	            var deferred = this.$q.defer();

	            try {
	                var files = e.target.files;

	                var f = files[0];
	                var reader = new FileReader();

	                reader.onload = function (e) {
	                    try {
	                        var data = e.target.result;
	                        var dataConfig = JSON.parse(data);
	                        deferred.resolve(dataConfig);
	                    } catch (exception) {
	                        deferred.reject(exception);
	                    }
	                };
	                reader.readAsBinaryString(f);
	            } catch (exception) {
	                deferred.reject(exception);
	            }

	            return deferred.promise;
	        }
	    }, {
	        key: 'merge',
	        value: function merge(currentData, _ref) {
	            var mainCats = _ref.mainCats;
	            var subCats = _ref.subCats;
	            var questions = _ref.questions;
	            var details = _ref.details;

	            currentData.forEach(function (mainCat) {
	                var changedMainCat = mainCats[mainCat.mainCat];
	                if (changedMainCat !== undefined) mainCat.mainCat = changedMainCat;
	                mainCat.subCats.forEach(function (subCat) {
	                    var changedSubCat = subCats[subCat.title];
	                    if (changedSubCat !== undefined) subCat.title = changedSubCat;
	                    subCat.questions.forEach(function (question) {
	                        var changedQuestion = questions[question.title];
	                        if (changedQuestion !== undefined) question.title = changedQuestion;
	                        question.details.forEach(function (detail) {
	                            var changedDetail = details[detail.title];
	                            if (changedDetail !== undefined) detail.title = changedDetail;
	                        });
	                    });
	                });
	            });
	        }
	    }]);

	    return JSONService;
	}();

	exports.default = angular.module('services.json-service', []).service('jsonService', JSONService).name;

/***/ }
/******/ ]);