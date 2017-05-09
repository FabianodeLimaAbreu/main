/**
*@fileOverview Init's component
* @module Init
*
*/

/**
* Teste Function
* @exports Init
* @constructor
*/
function Init(){
	/**
  	* Start Method
  	* @memberOf Init#
  	* @param {String} txt - value to be alerted
  	*/
	this.start=function(txt){
		alert(txt);
	};	
}



var init= new Init();
// init.start("Testando");