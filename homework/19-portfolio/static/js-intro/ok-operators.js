var taxUa = 0.17;
var taxUs = 0.2;
var priceUa = 100;
var priceUs = 10;
 
var description;

// Amount of the purchase
var calculated_Us;
var calculated_Ua;

// Variables for text messages
var Message_Us = "You're about to spend ";
var Message_Ua = "Вы сейчас потратите ";

var Currency_Us = " dollars";
var Currency_Ua = " гривен";

// Calculation of the final amount of the purchase

calculated_Us = priceUs+priceUs*taxUs; // Pay attention to calculate the amount -
calculated_Ua = priceUa+priceUa*taxUa; // by the project management not confirmed the accuracy!

description = Message_Us+calculated_Us+Currency_Us+"\n"+Message_Ua+calculated_Ua+Currency_Ua+"\n";

//alert(description);

