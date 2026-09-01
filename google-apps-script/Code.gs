const CONFIG = {
  spreadsheetId: 'PUT_YOUR_GOOGLE_SHEET_ID_HERE',
  apiKey: 'CHANGE_TO_THE_SAME_SECRET_AS_GOOGLE_SHEETS_API_KEY',
  sheets: {
    programs: ['id','level','name','description','duration','sort_order'],
    teachers: ['id','name','position','image_url','sort_order'],
    news: ['id','title','slug','excerpt','content','cover_url','published','published_at','created_at'],
    applicants: ['id','full_name','citizen_id','phone','email','level','prev_school','gpa','status','created_at']
  }
};

function doGet(e) {
  try {
    const sheet = String(e.parameter.sheet || '');
    assertSheet_(sheet);
    return json_({ ok: true, data: readRows_(sheet) });
  } catch (error) { return json_({ ok: false, error: error.message }); }
}

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents || '{}');
    assertSheet_(body.sheet);
    if (!(body.sheet === 'applicants' && body.action === 'create') && body.apiKey !== CONFIG.apiKey) throw new Error('Unauthorized');
    const result = mutate_(body.sheet, body.action, body.data || {});
    return json_({ ok: true, data: result });
  } catch (error) { return json_({ ok: false, error: error.message }); }
}

function setupSheets() {
  const ss = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  Object.keys(CONFIG.sheets).forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
    const headers = CONFIG.sheets[name];
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight('bold').setBackground('#111827').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  });
  seedData_();
}

function readRows_(name) {
  const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(name);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const values = sheet.getDataRange().getValues();
  const headers = values.shift().map(String);
  return values.filter(row => row.some(v => v !== '')).map(row => Object.fromEntries(headers.map((h, i) => [h, row[i] instanceof Date ? row[i].toISOString() : row[i]])));
}

function mutate_(name, action, data) {
  const lock = LockService.getScriptLock(); lock.waitLock(10000);
  try {
    const sheet = SpreadsheetApp.openById(CONFIG.spreadsheetId).getSheetByName(name);
    const headers = CONFIG.sheets[name];
    if (action === 'create') {
      data.id = data.id || Utilities.getUuid();
      const now = new Date().toISOString();
      if (headers.includes('created_at')) data.created_at = data.created_at || now;
      if (name === 'news' && data.published && !data.published_at) data.published_at = now;
      if (name === 'applicants') data.status = 'pending';
      sheet.appendRow(headers.map(h => data[h] ?? ''));
      return data;
    }
    const ids = sheet.getRange(2, 1, Math.max(sheet.getLastRow() - 1, 0), 1).getValues().flat().map(String);
    const index = ids.indexOf(String(data.id));
    if (index < 0) throw new Error('ไม่พบข้อมูล');
    const rowNumber = index + 2;
    if (action === 'delete') { sheet.deleteRow(rowNumber); return { id: data.id }; }
    if (action !== 'update') throw new Error('คำสั่งไม่ถูกต้อง');
    const old = sheet.getRange(rowNumber, 1, 1, headers.length).getValues()[0];
    sheet.getRange(rowNumber, 1, 1, headers.length).setValues([headers.map((h, i) => data[h] === undefined ? old[i] : data[h])]);
    return data;
  } finally { lock.releaseLock(); }
}

function seedData_() {
  if (readRows_('programs').length) return;
  mutate_('programs', 'create', { level:'ปวช.', name:'เทคโนโลยีธุรกิจดิจิทัล', description:'สร้างพื้นฐานซอฟต์แวร์ เว็บไซต์ สื่อดิจิทัล ข้อมูล และธุรกิจสมัยใหม่ผ่านโครงงานจริง', duration:'3 ปี', sort_order:1 });
  mutate_('programs', 'create', { level:'ปวส.', name:'เทคโนโลยีธุรกิจดิจิทัล', description:'ต่อยอดการพัฒนาระบบ AI การวิเคราะห์ข้อมูล อีคอมเมิร์ซ และนวัตกรรมดิจิทัล', duration:'2 ปี', sort_order:2 });
}

function assertSheet_(name) { if (!CONFIG.sheets[name]) throw new Error('ไม่อนุญาตให้เข้าถึงชีตนี้'); }
function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
