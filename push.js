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
   "endpoint": "https://fcm.googleapis.com/fcm/send/e4_cMqrPpEA:APA91bFwYe5izvFPaOnjnEwRVbKmcPSUVkQoraGIZVYmsn5ZHb4lBYKrOnwwejL70FwYqvhPPKso8CeIGn3NkCW36agRDxrVsnAPgwH41yx9VA4IwWnPKtu37GCS_jX1gFZyDYy0rzhP",
   "keys": {
       "p256dh": "BDeAFGo0KO6IMogoE+3bre+KjUUT3itYFqGsGG4Pi4oaTshEd6sBwIY7d4GzgWTJzHJWPA1bCKmyxiaK58JEJDg=",
       "auth": "in70do3eB3eO00K+5FbC4w=="
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