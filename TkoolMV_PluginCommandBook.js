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
 * @param 制御文字の拡張
 * @desc このプラグインで使えるパラメータの制御文字を
 * 通常のメッセージなどで使用できるようにするか(はい/いいえ)
 * Default: はい
 * @default はい
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
 * （各数字部分には全角数字も使えます）
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
 *  製作者 Alec
 *
 *  使用例
 *  名前の変更 1 ライアン　　（アクター0001の名前をライアンに変更
 *  名前の変更 2 \V[1]　　　（アクター0002の名前を変数0001の内容に変更
 *
 * ===========================================================================
 * 呼び出し元アイテム取得
 *  コモンイベントを呼び出したアイテムのIDを変数に入れる
 *  製作者 Alec
 *
 *  使用例
 *  呼び出し元アイテム取得 1　　（変数0001にコモンイベントを呼び出したアイテムIDを入れる
 *
 * ===========================================================================
 * 呼び出し元スキル取得
 *  コモンイベントを呼び出したスキルのIDを変数に入れる
 *  製作者 Alec
 *
 *  使用例
 *  呼び出し元スキル取得 1　　（変数0001にコモンイベントを呼び出したスキルIDを入れる
 *
 * ===========================================================================
 * レベルの変更
 *  アクターのレベルを変更します。増減ではなく変更後のレベルを指定できます。
 *  製作者 Alec
 *
 *  パラメータ
 *  　アクターのID（もし0なら全員）
 *    変更後のレベル
 *    レベルアップをメッセージで表示するかどうか（表示・非表示）
 *
 *  使用例
 *  レベルの変更 1 50 表示　　（アクター0001のレベルを50に変更
 *  レベルの変更 0 10 非表示　（仲間全員のレベルを10に変更、レベルアップは表示しない
 *
 * ===========================================================================
 *
 */


(function(){

    /*
     * 全角数字を半角数字に変換する
     */
    var wstringToString = function(text) {
        text = text.replace(/[０-９]/g, function(c) {
            return String.fromCharCode(c.charCodeAt(0) - 0xFEE0);
        });
        return text;
    }

    /*
     * 制御文字の拡張
     */
    var unescape = function(text) {
        var prevText = "";
        text = text.replace(/\\/g, '\x1b');
        while (prevText != text) {
            prevText = text;
            text = text.replace(/\x1b\x1b/g, '\\');
            text = text.replace(/\x1bV\[([０-９\d]+)\]/gi, function() {
                return $gameVariables.value(parseInt(wstringToString(arguments[1]), 10));
            }.bind(this));
            text = text.replace(/\x1bN\[([０-９\d]+)\]/gi, function() {
                return this.actorName(parseInt(wstringToString(arguments[1]), 10));
            }.bind(this));
            text = text.replace(/\x1bP\[([０-９\d]+)\]/gi, function() {
                return this.partyMemberName(parseInt(wstringToString(arguments[1]), 10));
            }.bind(this));
            text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
            text = text.replace(/\x1bIn\[([０-９\d]+)\]/gi, function() {
                return $dataItems[parseInt(wstringToString(arguments[1]), 10)].name;
            }.bind(this));
            text = text.replace(/\x1bIp\[([０-９\d]+)\]/gi, function() {
                return $dataItems[parseInt(wstringToString(arguments[1]), 10)].price;
            }.bind(this));
            text = text.replace(/\x1bSn\[([０-９\d]+)\]/gi, function() {
                return $dataSkills[parseInt(wstringToString(arguments[1]), 10)].name;
            }.bind(this));
        }
        text = text.replace(/\x1bG/gi, TextManager.currencyUnit);
        return text;
    };

    var parameters = PluginManager.parameters('TkoolMV_PluginCommandBook');

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
             *  製作者 Alec
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

            /**
             * 呼び出し元アイテム取得
             *  コモンイベントを呼び出したアイテムのIDを変数に入れる
             *  製作者 Alec
             *
             *  使用例
             *  呼び出し元アイテム取得 1　　（変数0001にコモンイベントを呼び出したアイテムIDを入れる
             */
            '呼び出し元アイテム取得' : function() {
                var varId = parseInt(args[0]); // 変数ID

                // アイテムを使ってなかったら
                if (!$gameParty.lastItem()) {
                    return;
                }
                $gameVariables.setValue(varId, $gameParty.lastItem().id);
            },

            /**
             * 呼び出し元スキル取得
             *  コモンイベントを呼び出したスキルのIDを変数に入れる
             *  製作者 Alec
             *
             *  使用例
             *  呼び出し元スキル取得 1　　（変数0001にコモンイベントを呼び出したスキルIDを入れる
             */
            '呼び出し元スキル取得' : function() {
                if (eval(String(parameters['呼び出し元スキルの記録を使わない']||'false'))) {
                    window.alert("「呼び出し元スキル取得」を使うにはプラグインマネージャーから「TkoolMV_PluginCommandBook.js」の「呼び出し元スキルの記録を使わない」を「はい」してください");
                    return;
                }
                var varId = parseInt(args[0]); // 変数ID
                var skillId = 0;
                if ($gameParty.inBattle()) {
                    skillId = BattleManager._subject.lastBattleSkill().id;
                } else {
                    skillId = $gameParty.menuActor().lastMenuSkill().id;
                }
                $gameVariables.setValue(varId, skillId);
            },

            /**
             * レベルの変更
             *  アクターのレベルを変更します。増減ではなく変更後のレベルを指定できます。
             *  製作者 Alec
             *
             *  パラメータ
             *  　アクターのID（もし0なら全員）
             *    変更後のレベル
             *    レベルアップをメッセージで表示するかどうか（表示・非表示）
             *
             *  使用例
             *  レベルの変更 1 50 表示　　（アクター0001のレベルを50に変更
             *  レベルの変更 0 10 非表示　（仲間全員のレベルを10に変更、レベルアップは表示しない
             */
            'レベルの変更' : function() {
                var actorId = parseInt(args[0], 10);
                var level = parseInt(args[1], 10) || 1;
                var show = {"表示":true,"非表示":false,"はい":true,"いいえ":false}[args[2]||'表示'];
                show = show === null ? false : show;
                console.log(show);
                if (actorId == 0) {
                    $gameParty.members().forEach(function(actor){
                        var exp = actor.expForLevel(level);
                        actor.changeExp(exp, show);
                    });
                } else {
                    var actor = $gameActors.actor(actorId);
                    if (!actor) {
                        return;
                    }
                    var exp = actor.expForLevel(level);
                    actor.changeExp(exp, show);
                }
            },

        };

        // コマンドチェック
        if (!(command in commandMap)) {
            return;
        }

        // コマンドの実行
        commandMap[command]();
    };

    /*
     * ここからはプラグインコマンドの実装のために必要な関数などを追加する
     */
    var はい = true;
    var いいえ = false;

    /*
     * 制御文字の拡張
     *  このプラグインで使っている制御文字の拡張を通常のウィンドウにも適用します
     *  製作者 Alec
     */
    console.log(eval(String(parameters['制御文字の拡張']||'false')));
    if (eval(String(parameters['制御文字の拡張']||'false'))) {
        (function () {
            var Window_Base_convertEscapeCharacters = Window_Base.prototype.convertEscapeCharacters;
            Window_Base.prototype.convertEscapeCharacters = function(text) {
                text = unescape(text);
                return Window_Base_convertEscapeCharacters.call(this, text);
            };
        })();
    }

})();
