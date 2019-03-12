const xapi = require('xapi');
var payload;
var sendjsondata;
var data;

//  ---- STEP 3 -----   Do what needs to be done: API call to Home automation system
function homeAPIcall(data) {
   xapi.command('HttpClient Post', {
            Header: "Content-Type: application/json",
            Url: 'http://homeautomationserverip/api/v1'
         }, data)
      .then((result) => { console.log("-- homeAPIcall result code:" + result.StatusCode) })
      .catch((err) => { console.log("-- homeAPIcall error: " + err.message) });
}

 // ---- STEP 2 -----   WHICH BUTTON WAS PRESSED?
function onGui(event) {
   // Show WHAT happened in console log
   console.log('--- STARTED MACRO onGui -- eventType: ' + event.Type + ' -- WidgetId: ' + event.WidgetId);
   // Stop code if something other than 'clicked' or 'pressed' happened
   if (event.Type !== 'clicked' && event.Type !== 'pressed') return;
   // Actions per 'widget_name'
   switch (event.WidgetId) {
      case 'widget_officelamp_on': // Office Lamp Ceiling ON
         homeAPIcall("{'controldevice' : '159', 'action' : 'on'}");
         break;
      case 'widget_officelamp_off': // Office Lamp Ceiling OFF
         homeAPIcall("{'controldevice' : '159', 'action' : 'off'}");
         break;
      case 'widget_desklamp_on': // Desk Lamp ON
         homeAPIcall("{'controldevice' : '331', 'action' : 'on'}");
         break;
      case 'widget_desklamp_off': // Desk Lamp OFF
         homeAPIcall("{'controldevice' : '331', 'action' : 'off'}");
         break;
      case 'widget_desklamp_brightness': // Desk Lamp BRIGHTNESSS slider value (0-255)
         homeAPIcall("{'controldevice' : '331', 'value' : '" + event.Value + "'}");
         break;
      default:
         // do nothing
   }
}

// ---- STEP 1 -----   LISTEN TO BUTTONS BEING PRESSED
xapi.event.on('UserInterface Extensions Widget Action', onGui);
