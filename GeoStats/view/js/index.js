!function t(e,n,r){function o(a,c){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!c&&u)return u(a,!0);if(i)return i(a,!0);var s=new Error("Cannot find module '"+a+"'");throw s.code="MODULE_NOT_FOUND",s}var l=n[a]={exports:{}};e[a][0].call(l.exports,function(t){var n=e[a][1][t];return o(n?n:t)},l,l.exports,t,e,n,r)}return n[a].exports}for(var i="function"==typeof require&&require,a=0;a<r.length;a++)o(r[a]);return o}({1:[function(t,e,n){function r(){l=!1,c.length?s=c.concat(s):f=-1,s.length&&o()}function o(){if(!l){var t=setTimeout(r);l=!0;for(var e=s.length;e;){for(c=s,s=[];++f<e;)c&&c[f].run();f=-1,e=s.length}c=null,l=!1,clearTimeout(t)}}function i(t,e){this.fun=t,this.array=e}function a(){}var c,u=e.exports={},s=[],l=!1,f=-1;u.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];s.push(new i(t,e)),1!==s.length||l||setTimeout(o,0)},i.prototype.run=function(){this.fun.apply(null,this.array)},u.title="browser",u.browser=!0,u.env={},u.argv=[],u.version="",u.versions={},u.on=a,u.addListener=a,u.once=a,u.off=a,u.removeListener=a,u.removeAllListeners=a,u.emit=a,u.binding=function(t){throw new Error("process.binding is not supported")},u.cwd=function(){return"/"},u.chdir=function(t){throw new Error("process.chdir is not supported")},u.umask=function(){return 0}},{}],2:[function(t,e,n){(function(t){!function(n){"use strict";function r(t){p(function(){throw t})}function o(t){return this.then(t,n)}function i(t){return this.then(n,t)}function a(t,e){return this.then(function(e){return g(t)?t.apply(null,h(e)?e:[e]):j.onlyFuncs?e:t},e||n)}function c(t){function e(){t()}return this.then(e,e),this}function u(t){return this.then(function(e){return g(t)?t.apply(null,h(e)?e.splice(0,0,void 0)&&e:[void 0,e]):j.onlyFuncs?e:t},function(e){return t(e)})}function s(t){return this.then(n,t?function(e){throw t(e),e}:r)}function l(t,e){var n=v(t);if(1===n.length&&h(n[0])){if(!n[0].length)return j.fulfilled([]);n=n[0]}var r=[],o=j(),i=n.length;if(i)for(var a=function(t){n[t]=j.promisify(n[t]),n[t].then(function(a){r[t]=e?n[t]:a,--i||o.resolve(r)},function(a){e?(r[t]=n[t],--i||o.resolve(r)):o.reject(a)})},c=0,u=i;u>c;c++)a(c);else o.resolve(r);return o.promise}function f(t,e){return t.then(g(e)?e:function(){return e})}function d(t){var e=v(t);1===e.length&&h(e[0])&&(e=e[0]);for(var n=j(),r=0,o=e.length,i=j.resolved();o>r;r++)i=f(i,e[r]);return n.resolve(i),n.promise}var p,g=function(t){return"function"==typeof t},h=function(t){return Array.isArray?Array.isArray(t):t instanceof Array},y=function(t){return!(!t||!(typeof t).match(/function|object/))},m=function(t){return t===!1||t===n||null===t},v=function(t,e){return[].slice.call(t,e)},w="undefined",x=typeof TypeError===w?Error:TypeError;if(typeof t!==w&&t.nextTick)p=t.nextTick;else if(typeof MessageChannel!==w){var b=new MessageChannel,A=[];b.port1.onmessage=function(){A.length&&A.shift()()},p=function(t){A.push(t),b.port2.postMessage(0)}}else p=function(t){setTimeout(t,0)};var j=function(t){function e(){if(0!==h){var t,e=v,n=0,r=e.length,o=~h?0:1;for(v=[];r>n;n++)(t=e[n][o])&&t(f)}}function r(t){function n(t){return function(e){return o?void 0:(o=!0,t(e))}}var o=!1;if(h)return this;try{var i=y(t)&&t.then;if(g(i)){if(t===w)throw new x("Promise can't resolve itself");return i.call(t,n(r),n(l)),this}}catch(a){return n(l)(a),this}return d(function(){f=t,h=1,e()}),this}function l(t){return h||d(function(){try{throw t}catch(n){f=n}h=-1,e()}),this}var f,d=(n!==t?t:j.alwaysAsync)?p:function(t){t()},h=0,v=[],w={then:function(t,n){var r=j();return v.push([function(e){try{m(t)?r.resolve(e):r.resolve(g(t)?t(e):j.onlyFuncs?e:t)}catch(n){r.reject(n)}},function(t){if((m(n)||!g(n)&&j.onlyFuncs)&&r.reject(t),n)try{r.resolve(g(n)?n(t):n)}catch(e){r.reject(e)}}]),0!==h&&d(e),r.promise},success:o,error:i,otherwise:i,apply:a,spread:a,ensure:c,nodify:u,rethrow:s,isPending:function(){return 0===h},getStatus:function(){return h}};return w.toSource=w.toString=w.valueOf=function(){return f===n?this:f},{promise:w,resolve:r,fulfill:r,reject:l}};if(j.deferred=j.defer=j,j.nextTick=p,j.alwaysAsync=!0,j.onlyFuncs=!0,j.resolved=j.fulfilled=function(t){return j(!0).resolve(t).promise},j.rejected=function(t){return j(!0).reject(t).promise},j.wait=function(t){var e=j();return setTimeout(e.resolve,t||0),e.promise},j.delay=function(t,e){var n=j();return setTimeout(function(){try{n.resolve(g(t)?t.apply(null):t)}catch(e){n.reject(e)}},e||0),n.promise},j.promisify=function(t){return t&&g(t.then)?t:j.resolved(t)},j.all=function(){return l(arguments,!1)},j.resolveAll=function(){return l(arguments,!0)},j.sequence=function(){return d(arguments)},j.nodeCapsule=function(t,e){return e||(e=t,t=void 0),function(){var n=j(),r=v(arguments);r.push(function(t,e){t?n.reject(t):n.resolve(arguments.length>2?v(arguments,1):e)});try{e.apply(t,r)}catch(o){n.reject(o)}return n.promise}},"function"==typeof define&&define.amd)define("D.js",[],function(){return j});else if(typeof e!==w&&e.exports)e.exports=j;else if(typeof window!==w){var T=window.D;j.noConflict=function(){return window.D=T,j},window.D=j}}()}).call(this,t("_process"))},{_process:1}],3:[function(t,e,n){function r(t){var e=o();return $.ajax({type:"POST",url:"/coords/",data:t,success:function(t){t=JSON.parse(t),e.resolve(t)},error:function(t,e,n){console.log("text status "+e+", err "+n)}}),e.promise}var o=t("d.js");e.exports=r},{"d.js":2}],4:[function(t,e,n){function r(t,e,n){var r=Math.pow(2,i.getZoom()),o=(new google.maps.LatLng(i.getBounds().getNorthEast().lat(),i.getBounds().getSouthWest().lng()),i.getProjection().fromLatLngToPoint(t)),a=new google.maps.Point(e/r||0,n/r||0),c=new google.maps.Point(o.x-a.x,o.y+a.y),u=i.getProjection().fromPointToLatLng(c);i.setCenter(u)}function o(t){i=new google.maps.Map(document.getElementById("map-canvas"),{center:{lat:41.850033,lng:-87.6500523},zoom:4});var e=document.getElementById("searchTextField"),n={componentRestrictions:{country:"us"}};autocomplete=new google.maps.places.Autocomplete(e,n);var o=new google.maps.InfoWindow({maxWidth:700}),a=new google.maps.Marker({map:i});a.addListener("click",function(t){o.open(i,a)}),autocomplete.addListener("place_changed",function(){o.close();var e=autocomplete.getPlace();if(e.geometry){console.log("place:",e),console.log(e.address_components);var n={lat:e.geometry.location.lat(),lng:e.geometry.location.lng(),type:e.address_components[0].types[0]};console.log(n.type,"Place Geometry",e.geometry.location),e.geometry.viewport?i.fitBounds(e.geometry.viewport):(r(e.geometry.location,0,-700),i.setZoom(17)),a.setPlace({placeId:e.place_id,location:e.geometry.location}),a.setVisible(!0),o.setContent("<div><strong>"+e.name+"</strong><br>"+e.formatted_address+"<br><br><strong>Race</strong><br><div class='race' style='height:350; width:900 ; display: inline-block;'><table class='left'></table></div><br><br><strong>Gender and Age</strong><br><div class='genderAge' style='height:350; display: inline-block;'><table class='left'></table></div></div>"),o.open(i,a),t(n)}}),console.log(o)}var i;e.exports=o},{}],5:[function(t,e,n){function r(t){var e=d3.select(".total"),n=d3.select(".race"),r=d3.select(".genderAge"),i=t.race.total,a=t.race,u=t.femaleAge,s=t.maleAge;console.log(s),c?o():c=!0,l(e,i),f(n,a),d(r,[s,u])}function o(){d3.select(".total").select("h3").remove(),d3.select(".race").select("table").selectAll("tr").remove(),d3.select(".race").select("svg").remove(),d3.select(".genderAge").select("svg").remove()}function i(t){s(t).then(function(t){console.log(t),a=r.bind(null,t),r(t)})}var a,c,u=t("./initMap"),s=t("./ajax"),l=t("./plotTotal"),f=t("./plotRace"),d=t("./plotGenderAge");$(window).resize(function(){a()}),console.log(typeof u),$(document).ready(function(){u(i)})},{"./ajax":3,"./initMap":4,"./plotGenderAge":6,"./plotRace":7,"./plotTotal":8}],6:[function(t,e,n){function r(t,e){function n(t,e){"stack"===this.type?(e(),this.type="group"):(t(),this.type="stack")}function r(t,e,n,r,o,i){t.domain([0,e]),r.transition().duration(500).delay(function(t,e){return 10*e}).attr("x",function(t,e,r){return n(i[t.x])+n.rangeBand()/a*r}).attr("width",n.rangeBand()/a).transition().attr("y",function(e){return t(e.y)}).attr("height",function(e){return o-t(e.y)})}function o(t,e,n,r,o){t.domain([0,e]),r.transition().duration(500).delay(function(t,e){return 10*e}).attr("y",function(e){return t(e.y0+e.y)}).attr("height",function(e){return t(e.y0)-t(e.y0+e.y)}).transition().attr("x",function(t){return n(o[t.x])}).attr("width",n.rangeBand())}var i=Object.keys(e[0]);i.shift(),console.log(i),console.log("Age",e[0][i[3]]),console.log(e);var a=2,c=d3.layout.stack(),u=c(d3.range(a).map(function(t){return i.map(function(n,r){return{x:r,y:Math.max(0,parseInt(e[t][n]))}})})),s=d3.max(u,function(t){return d3.max(t,function(t){return t.y})}),l=d3.max(u,function(t){return d3.max(t,function(t){return t.y0+t.y})}),f=(t.node().parentElement,d3.scale.linear().domain([0,a-1]).range(["#aad","#556"])),d=t.select("table").selectAll("tr").data(i),p=d.enter().append("tr"),g=p.selectAll("td").data(function(t,n){return n?[t,e[0][t],e[1][t]]:["Ages","Males","Females"]});g.enter().append("td").text(function(t,e){return console.log(t),t}),t.node().type="stack",console.log(t,t.node().type);var h={top:40,right:40,bottom:70,left:10},y=200-h.left-h.right,m=200-h.top-h.bottom,v=d3.scale.ordinal().domain(i).rangeRoundBands([0,y],.08),w=d3.scale.linear().domain([0,l]).range([m,0]),x=d3.svg.axis().scale(v).tickSize(1).tickPadding(6).orient("bottom"),b=t.append("svg").attr("width",y+h.left+h.right).attr("height",m+h.top+h.bottom).append("g").attr("transform","translate("+h.left+","+h.top+")"),A=b.selectAll(".layer").data(u).enter().append("g").attr("class","layer").style("fill",function(t,e){return f(e)}),j=A.selectAll("rect").data(function(t){return t}).enter().append("rect").attr("x",function(t){return console.log(v,v(i[t.x]),t.x,t),v(i[t.x])}).attr("y",m).attr("width",v.rangeBand()).attr("height",0);j.transition().delay(function(t,e){return 10*e}).attr("y",function(t){return w(t.y0+t.y)}).attr("height",function(t){return w(t.y0)-w(t.y0+t.y)}),b.append("g").attr("class","x axis").attr("transform","translate(0,"+m+")").call(x).selectAll("text").attr("y",0).attr("x",9).attr("dy",".35em").attr("transform","rotate(60)").style("text-anchor","start");setTimeout(function(){d3.select('input[value="grouped"]').property("checked",!0).each(n)},2e3);t.on("click",n.bind(t.node(),o.bind(null,w,l,v,j,i),r.bind(null,w,s,v,j,m,i)))}e.exports=r},{}],7:[function(t,e,n){function r(t,e){var n=Object.keys(e).splice(1),r=n.filter(function(t){return"total"!==t}).map(function(t){return e[t]}),o=d3.scale.category20(),i=t.select("table").selectAll("tr").data(n),a=i.enter().append("tr");a.append("td").text("HH").style("background",function(t,e){return o(e)}).style("color",function(t,e){return o(e)}),a.append("td").text(function(t,n){var r=t.split(" ").map(function(t){return t[0].toUpperCase()+t.slice(1)}).join(" ");return" "+r+": "+e[t]});var c=(t.node().parentElement,175),u=175,s=u/2-30,l=s/3,f=d3.svg.arc().innerRadius(l).outerRadius(s),d=d3.layout.pie(),p=d3.ease("cubic-in-out"),g=2500,h=t.append("svg").attr("width",c).attr("height",u).append("g").attr("transform","translate("+c/2+","+u/2+")"),y=h.selectAll("path").data(r).enter().append("path").style("fill",function(t,e){return o(e)});d3.timer(function(t){var e=p(1-2*Math.abs(t%g/g-.5)),n=d.padAngle(.06*e)(r);y.data(n).attr("d",f)})}e.exports=r},{}],8:[function(t,e,n){function r(t,e){t.append("h3").text(function(){return"Total Population: "+e})}e.exports=r},{}]},{},[5]);
//# sourceMappingURL=index.js.map
