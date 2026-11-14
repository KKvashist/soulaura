/** Soulaura enquiry backend. Deploy as a Web app (Execute as: Me, Access: Anyone). */
var SHEET_ID = '1oBq0txMGLGHWWPtCopPIETlOU_k_Nn8JpzbXC1frRC4';
var HEADERS = ['Submission ID','Timestamp','Full name','Mobile','Email','Age','Gender','Interested service','Fitness goal','Experience','Frequency','Preferred time','Training preference','Message','Consent','Source page'];

function json_(o){ return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON); }
function sheet_(ss, name, headers){
  var sh = ss.getSheetByName(name);
  if (!sh) { sh = ss.insertSheet(name); sh.appendRow(headers); sh.setFrozenRows(1); }
  return sh;
}
function clean_(v, max){ v = String(v == null ? '' : v).trim().substring(0, max || 200); return /^[=+\-@]/.test(v) ? "'" + v : v; } // blocks formula injection
function validate_(d){
  var e = [];
  if (clean_(d.name).length < 2) e.push('name');
  var ph = String(d.phone || '').replace(/[\s-]/g,'').replace(/^(\+91|91|0)(?=\d{10}$)/,'');
  if (!/^[6-9]\d{9}$/.test(ph)) e.push('phone');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email || ''))) e.push('email');
  var a = Number(d.age); if (!(a >= 14 && a <= 100 && a % 1 === 0)) e.push('age');
  ['gender','service','goal','experience','frequency','time','preference'].forEach(function(k){ if (!d[k]) e.push(k); });
  if (d.consent !== true) e.push('consent');
  return e;
}

function doPost(e){
  var lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    var d = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(SHEET_ID);
    if (d.type === 'newsletter') {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(d.email || ''))) return json_({ok:false,error:'Invalid email'});
      sheet_(ss,'Newsletter',['Timestamp','Email']).appendRow([new Date(), clean_(d.email)]);
      return json_({ok:true});
    }
    var errs = validate_(d);
    if (errs.length) return json_({ok:false,error:'Validation failed',fields:errs});
    var id = Utilities.getUuid();
    sheet_(ss,'Enquiries',HEADERS).appendRow([id, new Date(), clean_(d.name), "'" + String(d.phone).replace(/[^\d+]/g,''), clean_(d.email), Number(d.age), clean_(d.gender), clean_(d.service), clean_(d.goal), clean_(d.experience), clean_(d.frequency), clean_(d.time), clean_(d.preference), clean_(d.message,600), 'Yes', clean_(d.source)]);
    return json_({ok:true,id:id});
  } catch (err) {
    return json_({ok:false,error:'Server error'});
  } finally { try { lock.releaseLock(); } catch (x) {} }
}
function doGet(){ return json_({ok:true,service:'Soulaura enquiry endpoint'}); }
