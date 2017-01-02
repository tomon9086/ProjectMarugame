var Slack = require('./libs/node-slack-sdk-master/');

// slack setting
var token = '*************'; //Slack BotsのAPI Tokenをいれる
var autoReconnect = true;
var autoMark = true;

var slack = new Slack(token, autoReconnect, autoMark);

/**
 * 起動した時
 */
slack.on('open', function(){
    console.log('open');
});

/**
 * 投稿された時
 */
slack.on("message", function(message){
    // message.channelに入っているチャンネルIDからチャンネル情報の取得
    var channel = slack.getChannelGroupOrDMByID(message.channel);
    // message.userに入っているユーザーIDからユーザー情報の取得
    var user = slack.getUserByID(message.user);

    // メッセージ本文
    var text = message.text;

    if (/おはようございます/.test(text)) {
        // ここでAirpoの出勤APIを叩く
        req.post({ ... },function(){
            channel.send( "<@" + user.id + ">さん、出勤スタンプを押しました！" );
        });
    }

    if (/おつかれさまでした/.test(text)) {
        // ここでAirpoの退勤APIを叩く
        req.post({ ... },function(){
            channel.send( "<@" + user.id + ">さん、退勤スタンプを押しました！" );
        });
    }

    if (/誰がいる/.test(text)) {
        // ここでAirpoの出勤状況確認APIを叩く
        req.post({ ... },function(){
            channel.send( "◯◯さん,✕✕さんがお仕事中みたいですよ！" );
        });
    }
});

/**
 * エラー
 */
slack.on('error', function(error){
    console.error('Error: %s', error);
});

/**
 * ログイン
 */
slack.login();