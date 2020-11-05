var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BEW0zNXATBTg5VVebmbxt4jIImZZFr1K_z2dY0NC22vUO85zoHgMPIyKPXKe4WBPxrh0VGlqFOOK4D10y1Uer0w",
   "privateKey": "RqhPdKm9LVSZIvE5QXG9JTRPlWTGSCsBl8p-hrlClhk"
};

webPush.setVapidDetails(
   'mailto:muftizh@gmail.com',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dpylEkn7bIk:APA91bFodmWnpF6X_RrwR_7TlyEAVAIKQ_9M6DycveZFlhxRnpl456uVJ8g27NoN_3xeNLA5WE4gF_tgTxIQx7Fc6jL36a0GZ16K8rZKTRveWkcgkhYlwGFpeR_gYXvTL6BB4yvcV91c",
   "keys": {
       "p256dh": "BN/oOHrEBLt/C8MlqMrd5JkVenxibv3mMlSosctHl6Ed1kxKZ/xP9RPMiTSc0czGuD5H2kvfn59xF2wTLDyB2No=",
       "auth": "DnpQ9ypoTIUl+l8XmBYs9w=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '1086834623204',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);