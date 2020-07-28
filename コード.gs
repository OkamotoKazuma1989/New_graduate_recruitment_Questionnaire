function autoReply() {
 var sheet = SpreadsheetApp.getActiveSheet();
 var row = sheet.getLastRow();
 var name     = sheet.getRange(row, 2).getValue();
 var address  = sheet.getRange(row, 3).getValue();
 var mobile   = sheet.getRange(row, 4).getValue();
 var mail     = sheet.getRange(row, 5).getValue();
 var bank     = sheet.getRange(row, 6).getValue();
 var megabank;
 
 /* ドキュメント「メール本文テスト」を取得する（ベースの文書） */
 var docReply=DocumentApp.openById("ドキュメントID"); //ドキュメントをIDで取得
 var strdocReply=docReply.getBody().getText(); //ドキュメントの内容を取得
 
 /* ドキュメント「メール本文テスト」を取得する（はい（アプリでの口座開設）） */
 var docReply1=DocumentApp.openById("ドキュメントID"); //ドキュメントをIDで取得
 var strdocReply1=docReply1.getBody().getText(); //ドキュメントの内容を取得
 
 /* ドキュメント「メール本文テスト」を取得する（いいえ（書類郵送での口座開設）） */
 var docReply2=DocumentApp.openById("ドキュメントID"); //ドキュメントをIDで取得
 var strdocReply2=docReply2.getBody().getText(); //ドキュメントの内容を取得
 
 /* ドキュメント「メール本文テスト」を取得する（既に●●銀行口座を持っている（口座開設の必要なし）） */
 var docReply3=DocumentApp.openById("ドキュメントID"); //ドキュメントをIDで取得
 var strdocReply3=docReply3.getBody().getText(); //ドキュメントの内容を取得
 
 /* アンケートの回答によって差込文書を変更 */
 if (bank == 'はい（アプリでの口座開設）')
 {mizuho = strdocReply1;}
 if (bank == 'いいえ（書類郵送での口座開設）')
 {mizuho = strdocReply2;}
 if (bank == '既に●●銀行の口座を持っている（口座開設の必要なし）')
 {mizuho = strdocReply3;}

 /* ドキュメント「メール本文テスト」の差し込みデータ */
 var strBody=strdocReply.replace(/{氏名}/g,name).replace(/{住所}/g,address).replace(/{携帯}/g,mobile).
 replace(/{メール}/g,mail).replace(/{口座開設}/g,megabank); 
 
 /* 返信メールの件名及びメールアドレス */
 var title = "【重要】2019年4月入社準備について";//メールタイトル
 var From="メールアドレス"; //From
 var Sender="メールアドレス"; //差出人
 var CC ="メールアドレス";
 
  /* アンケートの回答によってGoogle Driveからファイル名で、ファイルを取得する */
 if (bank == 'はい（アプリでの口座開設）')
 {var report = DriveApp.getFilesByName('口座開設のご案内.pdf').next();}
 
 if (bank == 'はい（アプリでの口座開設）')
 {GmailApp.sendEmail(
 mail,//to
 title,//件名
 strBody,//本文
 {
 from:From,//fromアドレス
 //cc:CC,//CCアドレス
 attachments: [report]
  }
    );
    }else{
 {GmailApp.sendEmail(
 mail,//to
 title,//件名
 strBody,//本文
 {
 from:From});//fromアドレス
 //cc:CC,//CCアドレス
 }
 }
 }
