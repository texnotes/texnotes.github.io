$(function () {
	'use strict';
	
//Проверка на Internet Explorer 8 и подгрузка highlight.js только для современных браузеров 	
function getInternetExplorerVersion()
// Returns the version of Internet Explorer or a -1
// (indicating the use of another browser).
// http://msdn.microsoft.com/en-us/library/ms537509%28v=vs.85%29.aspx
{
  var rv = -1; // Return value assumes failure.
  if (navigator.appName == 'Microsoft Internet Explorer')
  {
    var ua = navigator.userAgent;
    var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
    if (re.exec(ua) != null)
      rv = parseFloat( RegExp.$1 );
  }
  return rv;
}
function checkVersion()
{
 // You're not using Internet Explorer.
  var ver = getInternetExplorerVersion();

  if ( ver > -1 )
  {
    if ( ver >= 9.0 ) {
//You're using a recent copy of Internet Explorer
	}
    else{
	window.hljs=null;
		return;
//You should upgrade your copy of Internet Explorer
		}
  }
  

 $.getScript( "js/lib/highlight.pack.js", function() {
hljs.tabReplace = '   '; 
hljs.initHighlightingOnLoad();
}); 

};

checkVersion();

	var myPortfolio = new Portfolio('.pf-container');
	window.myPortfolio = myPortfolio;
});