//=============================================================================
// TkoolMV_PluginCommandBook.js
// https://github.com/AlecYawata/TkoolMV_PluginCommandBook
//=============================================================================
//
// Copyright (c) 2015 Alec
// This software is released under the MIT License.
// http://opensource.org/licenses/mit-license.php
//
//=============================================================================
/*:
 * @plugindesc プラグインコマンド集
 * @author 有志の皆さん
 *
 * @param Dummy
 * @desc まだ設定の必要なコマンドがないので。作ったら消してね
 * Default: 1
 * @default 1
 *
 * @help
 *  Copyright (c) 2015 Alec
 *  This software is released under the MIT License.
 *  http://opensource.org/licenses/mit-license.php
 *
 * このプラグインは有志によるプラグインコマンド集です。
 * 商用利用、年齢制限のあるゲームへの使用、改変が可能です。
 * クレジットは不要です。
 *
 * ■使い方
 * イベントのコマンド追加からプラグインコマンドを選択し、
 * 以下のプラグインコマンドから好きなモノを選んで入力して下さい。
 *
 * ■パラメータについて
 * プラグインコマンドの右に空白をつけてパラメータを追記することができます。
 * パラメータは数字、英数字、日本語、記号など以外にも以下の制御文字が使えます
 * \V[n] 変数n番目の値に置き換えられます
 * \N[n] アクターn番の名前に置き換えられます
 * \P[n] パーティメンバーn番の値に置き換えられます
 * \G 　　通貨単位に置き換えられます
 * \In[n] アイテムn番の名前に置き換えられます
 * \Ip[n] アイテムn番の価格に置き換えられます
 * \Sn[n] スキルn番の名前に置き換えられます
 *
 * ■プラグインコマンド
 *
 * ===========================================================================
 * 「名前の変更」
 *  主人公の名前を変更する
 *  製作者 アレク
 *
 *  使用例
 *  名前の変更 1 ライアン　　（アクター0001の名前をライアンに変更
 *  名前の変更 2 \V[1]　　　（アクター0002の名前を変数0001の内容に変更
 *
 * ===========================================================================
 *
 */


(function(){

    var unescape = function(text) {
        var prevText = "";
        text = text.replace(/\\/g, '\x1b');
        while (prevText != text) {
            prevText = text;
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(/\x1bV\[(\d+)\]/gi, function() {
                return $gameVariables.value(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bN\[(\d+)\]/gi, function() {
                return this.actorName(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bP\[(\d+)\]/gi, function() {
                return this.partyMemberName(parseInt(arguments[1]));
            }.bind(this));
            text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
            text = text.replace(/\x1bIn\[(\d+)\]/gi, function() {
                return $dataItems[parseInt(arguments[1], 10)].name;
            }.bind(this));
            text = text.replace(/\x1bIp\[(\d+)\]/gi, function() {
                return $dataItems[parseInt(arguments[1], 10)].price;
            }.bind(this));
            text = text.replace(/\x1bSn\[(\d+)\]/gi, function() {
                return $dataSkills[parseInt(arguments[1], 10)].name;
            }.bind(this));
        }
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    };

    var _Game_Interpreter_pluginCommand      = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        _Game_Interpreter_pluginCommand.call(this, command, args);

        if (command.length == 0) {
            return;
        }


        // 引数パラメータの制御文字での変換
        for (var i=0; i<args.length; i++) {
            args[i] = unescape(args[i]);
        }

        var commandMap = {

            /**
             * 名前の変更
             *  主人公の名前を変更する
             *  製作者 アレク
             *
             *  使用例
             *  名前の変更 1 ライアン　　（アクター0001の名前をライアンに変更
             *  名前の変更 2 \V[1]　　　（アクター0002の名前を変数0001の内容に変更
             */
            '名前の変更' : function() {
                var actorId = args[0]; // アクターID
                var name = args[1]; // 名前
                $gameActors.actor(actorId).setName(name);
            },

        };

        // コマンドチェック
        if (!(command in commandMap)) {
            // ツクラーさんにエラーの通知をしたい（そのうちエラーのあったマップ、イベント、コマンドの行数辺りまで出力したいなぁ）
            window.alert("「"+command+"」というプラグインコマンドはありません");
            return;
        }

        // コマンドの実行
        commandMap[command]();
    };

})();
