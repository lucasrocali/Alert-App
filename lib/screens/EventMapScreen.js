Object.defineProperty(exports,"__esModule",{value:true});exports.default=undefined;var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _dec,_class,_jsxFileName='app/screens/EventMapScreen.js';var _react=require('react');var _react2=_interopRequireDefault(_react);var _expo=require('expo');var _reactRedux=require('react-redux');var _store=require('../store');var _store2=_interopRequireDefault(_store);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var regeneratorRuntime=require('regenerator-runtime');var GEOLOCATION_OPTIONS={enableHighAccuracy:true,timeout:20000,maximumAge:1000};var EventMap=(_dec=(0,_reactRedux.connect)(function(state){return{events:state.events,loading:state.loading};},function(dispatch){return{refresh:function refresh(){return dispatch({type:'GET_EVENTS'});}};}),_dec(_class=function(_React$Component){_inherits(EventMap,_React$Component);function EventMap(){var _ref,_this2=this;var _temp,_this,_ret;_classCallCheck(this,EventMap);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=EventMap.__proto__||Object.getPrototypeOf(EventMap)).call.apply(_ref,[this].concat(args))),_this),_this.state={mapRegion:{latitude:37.78825,longitude:-122.4324,latitudeDelta:0.0922,longitudeDelta:0.0421},locationResult:null,location:{coords:{latitude:37.78825,longitude:-122.4324}}},_this._handleMapRegionChange=function(mapRegion){console.log("_handleMapRegionChange ");},_this._getLocationAsync=function _callee(){var _ref2,status,location;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap(_expo.Permissions.askAsync(_expo.Permissions.LOCATION));case 2:_ref2=_context.sent;status=_ref2.status;if(status!=='granted'){_this.setState({locationResult:'Permission to access location was denied',location:location});}_context.next=7;return regeneratorRuntime.awrap(_expo.Location.getCurrentPositionAsync({}));case 7:location=_context.sent;_this.setState({locationResult:JSON.stringify(location),location:location});case 9:case'end':return _context.stop();}}},null,_this2);},_this.locationChanged=function(location){region={latitude:location.coords.latitude,longitude:location.coords.longitude,latitudeDelta:0.001,longitudeDelta:0.005},_this.setState({location:location,region:region});},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(EventMap,[{key:'componentDidMount',value:function componentDidMount(){this._getLocationAsync();_store2.default.dispatch({type:'GET_EVENTS'});}},{key:'render',value:function render(){console.log(this.props);var _props=this.props,events=_props.events,loading=_props.loading,refresh=_props.refresh;return _react2.default.createElement(_expo.MapView,{style:{flex:1},region:{latitude:this.state.location.coords.latitude,longitude:this.state.location.coords.longitude,latitudeDelta:0.0922,longitudeDelta:0.0421},onRegionChange:this._handleMapRegionChange,__source:{fileName:_jsxFileName,lineNumber:62}},_react2.default.createElement(_expo.MapView.Marker,{coordinate:this.state.location.coords,title:'My Marker',description:'Some description',__source:{fileName:_jsxFileName,lineNumber:67}}),events&&events.map(function(event,index){return _react2.default.createElement(_expo.MapView.Marker,{coordinate:{latitude:event.location.lat,longitude:event.location.lon},title:event.category.name,description:'Some description',__source:{fileName:_jsxFileName,lineNumber:74}});}));}}]);return EventMap;}(_react2.default.Component))||_class);exports.default=EventMap;