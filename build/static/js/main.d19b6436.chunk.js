(this["webpackJsonpcarcode-poc"]=this["webpackJsonpcarcode-poc"]||[]).push([[0],{15:function(e,t,n){"use strict";n.r(t);var r=n(2),c=n(3),o=n(5),a=n(4),i=n(6),s=n(0),u=n.n(s),l=n(8),p=n(1);Object(p.configure)("ATe9mAw1EtL1CJWafEMhAHUqNSa2FUaEOT8azX98wlg5FtBLp2NYqkV/SOGje4DK9FMe/4puTgYOCoTapFaDF6tzH/07f+t+0xXCEPAmT9YyPj8zCSq5ZxMO4w18HC16ajAsB9LnGuG2JPJAEbZTLrxVmEy/mizAlj1WICYYxF+E0l65BV1GJn4nXykmBefYkP0rF+47lGrmrEF75wwW8emT5Fx4oyCViUJqbntL0BNr9HnTQn9QyM1xRZE1xWHtU5HaSJRI9DeZiT8AFB1mHmeKc8jGte+WEOQk+rME3wMDmDx4oI78KImYscUOuzbT0g0C1hlz4pQW6GlKpIusdE2TuvbaXPNxKikcHk3WM9lfAugZbdbt6dJ4qngKUbwxRWleNC6RE1fneZ72u9+vlTgXeTi6+N/nnxCkCshHJ8SciqlFvCM88d60bewIPOV9+JLuaE59WljKuYsA97gIFwjD0JC43m5GUaFfexinj/EqfhL5impVf7DZuMH6zztsXlygNbWs6ndxX9jNmoQILlnOA2GtlnOQh9Yk/mg4Bsc5IbsFMHTvQCx6/HpKui0n19pG+HRy9LLUCCnWh2pmrn18VAQpujCDrBhfC+zK+1tCnMSrFUIX5Pwbu4/ZRWW52JMX/4RPl0Hks27Q/Pk3MHdxPk4jtLSzO5tOy7CUWCu9dJtNIk8qjPG9K0ohMs2lORt9bSvSYZtQgquEGakfOCSviItr3gK2QDWSviK5eTlKWNGd+3H0zj0GaMstkFpl1yhrH3WLxJSj0YksYsJ8xRMzMDcUcooEAGwwFj6x").catch((function(e){alert(e)}));var b={position:"absolute",top:"0",bottom:"0",left:"0",right:"0",margin:"auto",maxWidth:"1280px",maxHeight:"80%"},d=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(o.a)(this,Object(a.a)(t).call(this,e))).ref=u.a.createRef(),n}return Object(i.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;p.BarcodePicker.create(this.ref.current,this.props).then((function(t){e.barcodePicker=t,null!=e.props.onScan&&t.on("scan",e.props.onScan),null!=e.props.onError&&t.on("scanError",e.props.onError)}))}},{key:"componentWillUnmount",value:function(){null!=this.barcodePicker&&this.barcodePicker.destroy()}},{key:"componentDidUpdate",value:function(e){JSON.stringify(e.scanSettings)!==JSON.stringify(this.props.scanSettings)&&this.barcodePicker.applyScanSettings(this.props.scanSettings),e.visible!==this.props.visible&&this.barcodePicker.setVisible(this.props.visible)}},{key:"render",value:function(){return u.a.createElement("div",{ref:this.ref,style:b})}}]),t}(s.Component),m=function(e){function t(){return Object(r.a)(this,t),Object(o.a)(this,Object(a.a)(t).apply(this,arguments))}return Object(i.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){return u.a.createElement(u.a.Fragment,null,u.a.createElement("div",{id:"scandit-barcode-result",className:"result-text"}),u.a.createElement(d,{playSoundOnScan:!0,vibrateOnScan:!0,scanSettings:new p.ScanSettings({enabledSymbologies:["qr","ean8","ean13","upca","upce","code128","code39","code93","itf","pdf417"],codeDuplicateFilter:1e3}),onScan:function(e){document.getElementById("scandit-barcode-result").innerHTML=e.barcodes.reduce((function(e,t){return e+p.Barcode.Symbology.toHumanizedName(t.symbology)+": "+t.data+"<br>"}),"")},onError:function(e){console.error(e.message)}}))}}]),t}(s.Component);Object(l.render)(u.a.createElement(m,null),document.querySelector("#root"))},9:function(e,t,n){e.exports=n(15)}},[[9,1,2]]]);
//# sourceMappingURL=main.d19b6436.chunk.js.map