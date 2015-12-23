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
 * バイブレーション(English:Vibration)
 *  実行中のAndroid端末を振動させます。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　振動するフレーム数(1/60秒単位)
 *    振動が完了するまでウェイト(ウェイトあり or ウェイトなし)
 *    　デフォルトは「ウェイトなし」
 *
 *  使用例
 *  バイブレーション 60 ウェイトあり
 *  Vibration 120
 * ===========================================================================
 * 指定位置の通行情報取得(English:Get_Location_Pass)
 *  指定した座標のマップ通行情報を取得して、変数に格納します。
 *  製作者 トリアコンタン
 *
 *  以下の法則に従って格納されます。
 *  上方向へ通行可能：千の位が 1、上方向へ通行不可能：千の位が 0
 *  右方向へ通行可能：百の位が 1、右方向へ通行不可能：百の位が 0
 *  下方向へ通行可能：十の位が 1、下方向へ通行不可能：十の位が 0
 *  左方向へ通行可能：一の位が 1、左方向へ通行不可能：一の位が 0
 *
 *  パラメータ
 *  　結果を格納する変数の番号
 *    X座標
 *    Y座標
 *
 *  使用例
 *  指定位置の通行情報取得 1 17 13
 *  Get_Location_Pass 2 \V[1] \V[2]
 * ===========================================================================
 * 変数の初期化(English:Init_Variables)
 *  全ての変数を初期化します。（例外指定可能）
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　初期化したくない変数番号（半角スペースで区切って複数指定可能）
 *
 *  使用例
 *  変数の初期化
 *  Init_Variables 1 2 \V[3]
 * ===========================================================================
 * スイッチの初期化(English:Init_Switches)
 *  全てのスイッチを初期化します。（例外指定可能）
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　初期化したくないスイッチ番号（半角スペースで区切って複数指定可能）
 *
 *  使用例
 *  スイッチの初期化
 *  Init_Switches 1 2 \V[3]
 * ===========================================================================
 * セルフスイッチの初期化(English:Init_Self_Switch)
 *  全てのセルフスイッチを初期化します。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　なし
 *
 *  使用例
 *  セルフスイッチの初期化
 *  Init_Self_Switch
 * ===========================================================================
 * セルフスイッチの遠隔操作(English:Remote_Control_Self_Switch)
 *  マップID、イベントID、種別（A, B, C, D）を指定してセルフスイッチを操作します。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　マップID
 *  　イベントID
 *  　種別（A, B, C, D）
 *  　設定値（ON or OFF）
 *
 *  使用例
 *  セルフスイッチの遠隔操作 1 3 A ON
 *  Remote_Control_Self_Switch 1 3 D OFF
 * ===========================================================================
 * ピクチャの読み込み(English:Load_Picture)
 *  指定したファイル名のピクチャを事前に読み込んでキャッシュに保存します。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　ファイル名（拡張子は指定しないでください）
 *
 *  使用例
 *  ピクチャの読み込み filename
 *  Load_Picture filename
 * ===========================================================================
 * 戦闘アニメの読み込み(English:Load_Animation)
 *  指定したファイル名の戦闘アニメを事前に読み込んでキャッシュに保存します。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　ファイル名（拡張子は指定しないでください）
 *  　色相（0-360）
 *
 *  使用例
 *  戦闘アニメの読み込み filename
 *  Load_Animation filename
 * ===========================================================================
 * シャットダウン(English:Shutdown)
 *  ゲームウィンドウを閉じて強制終了します。
 *  この操作はブラウザ実行、スマホ実行では無効です。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　なし
 *
 *  使用例
 *  シャットダウン
 *  Shutdown
 * ===========================================================================
 * ウェブサイト起動(English:Startup_Website)
 *  別ウィンドウで指定されたURLのウェブサイトを起動します。
 *  この操作はブラウザ実行、スマホ実行では無効です。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　表示したいサイトのURL
 *  　ウィンドウのX座標（指定しなかった場合は0）
 *  　ウィンドウのY座標（指定しなかった場合は0）
 *  　ウィンドウの横幅（指定しなかった場合はゲーム画面と同じサイズ）
 *  　ウィンドウの高さ（指定しなかった場合はゲーム画面と同じサイズ）
 *
 *  使用例
 *  ウェブサイト起動 https://www.google.co.jp/
 *  Startup_Website https://www.google.co.jp/
 * ===========================================================================
 * 変数の操作(English:ControlVariable)
 * 指定の変数の値を操作(代入、加算、減算、乗算、除算、剰余)します。
 * 変数の指定について、イベントエディタのコマンドと同じ#0001なども使用できます。
 * プラグインコマンドで[変数の操作]もしくは[ControlVariable]か[ConVar]を記述して使用します。
 * 
 * パラメータ：
 *  引数1：操作する変数
 *  引数2：操作する内容 [代入：=  加算:+=  減算：-=  乗算：*=  除算：/=  剰余：%=]
 *                                                or
 *                     [代入：set  加算:add  減算：sub  乗算：mult  除算：div  剰余：mod]
 *  引数3：操作用の値
 * 
 * 使用例：
 *   変数の操作 #0001 += \V[2] //変数1に変数2の値を加算
 *   変数の操作 \V[2] = \V[3]  //変数2の値と同番号の変数に変数3の値を代入
 *   変数の操作 1 mod \V[2]    //変数1を変数2の値で除算した余りを代入
 *   変数の操作 1 = \In[\V[2]] //変数1に変数2のアイテム番号の名前を代入
 *   ControlVariable 1 += 2   //変数1に2を加算
 *   ConVar 1 mult \V[5]      //変数1を変数5の値で乗算
 *
 * ===========================================================================
 * タッチ座標の取得(English:Get_Touch_Info)
 *  タッチ位置のX座標とY座標を指定された変数に格納します。
 *  画面上の実座標とマップ上のタイル座標の二種類が取得できます。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　X座標が格納される変数の番号
 *  　Y座標が格納される変数の番号
 *  　取得タイプ（画面座標 or マップ座標）※指定しない場合は画面座標
 *
 *  使用例
 *  タッチ座標の取得 1 2
 *  Get_Touch_Info \V[1] \V[2] マップ座標
 * ===========================================================================
 * マップタッチ禁止の変更(English:Change_Map_Touch)
 *  マップタッチによるプレイヤーの移動禁止を変更します。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　設定値（禁止 or 許可）
 *
 *  使用例
 *  マップタッチ禁止の変更 禁止
 *  Change_Map_Touch 許可
 * ===========================================================================
 * マップタッチ移動中判定(English:Get_Map_Touch_Moving)
 *  マップタッチによるプレイヤーの移動中かどうかを
 *  指定されたスイッチに格納します。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　結果が格納されるスイッチの番号
 *
 *  使用例
 *  マップタッチ移動中判定 1
 *  Get_Map_Touch_Moving \V[1]
 * ===========================================================================
 * マップタッチ移動(English:Map_Touch_Move)
 *  マップをタッチしたのと同じ要領で指定位置にプレイヤーを移動します。
 *  障害物やキー入力により移動は中断されます。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　移動先X座標
 *  　移動先Y座標
 *
 *  使用例
 *  マップタッチ移動 17 13
 *  Map_Touch_Move \V[1] \V[2]
 * ===========================================================================
 * ピクチャの移動(English:Move_Picture)
 *  イベントコマンド「ピクチャの移動」と同じ動作をします。
 *  それぞれのパラメータを制御文字で変数指定できるのが特徴で減算合成も可能です。
 *  製作者 トリアコンタン
 *
 *  パラメータ
 *  　ピクチャ番号（0-100）
 *  　原点（左上 or 中央）
 *  　移動先X座標
 *  　移動先Y座標
 *  　X方向拡大率（マイナス値で画像反転）
 *  　Y方向拡大率（マイナス値で画像反転）
 *  　不透明度（0-255）
 *  　合成方法（通常 or 加算 or 減算）
 *  　移動フレーム数
 *  　移動完了までウェイト（指定する場合「ウェイトあり」）
 *
 *  使用例
 *  ピクチャの移動 1 左上 300 200 200 200 128 減算 240 ウェイトあり
 *  Move_Picture \V[1] 中央 \V[2] \V[3] \V[4] \V[5] \V[6] 減算 \V[7]
 * ===========================================================================
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
    };

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
                return getActorName(parseInt(wstringToString(arguments[1]), 10));
            }.bind(this));
            text = text.replace(/\x1bP\[([０-９\d]+)\]/gi, function() {
                return getPartyMemberName(parseInt(wstringToString(arguments[1]), 10));
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

    var getActorName = function(n) {
        var actor = n >= 1 ? $gameActors.actor(n) : null;
        return actor ? actor.name() : '';
    };

    var getPartyMemberName = function(n) {
        var actor = n >= 1 ? $gameParty.members()[n - 1] : null;
        return actor ? actor.name() : '';
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

            'バイブレーション' : function() {
                if(typeof navigator !== 'undefined' && navigator.vibrate) {
                    var frame = parseInt(args[0], 10);
                    navigator.vibrate(Math.floor(frame * 1000 / 60));
                    var wait = (args[1] || '').toUpperCase();
                    if (wait === 'ウェイトあり' || wait === 'WAIT') this.wait(frame);
                }
            },
            'Vibration' : function() {
                commandMap['バイブレーション'].call(this);
            },

            '指定位置の通行判定取得' : function() {
                var x = parseInt(args[1], 10);
                var y = parseInt(args[2], 10);
                var value = 0;
                value += $gamePlayer.isMapPassable(x, y, 8) ? 1000 : 0;
                value += $gamePlayer.isMapPassable(x, y, 6) ? 100  : 0;
                value += $gamePlayer.isMapPassable(x, y, 2) ? 10   : 0;
                value += $gamePlayer.isMapPassable(x, y, 4) ? 1    : 0;
                $gameVariables.setValue(args[0], value);
            },
            'Get_Location_Pass' : function() {
                commandMap['指定位置の通行判定取得'].call(this);
            },

            'スイッチの初期化' : function() {
                var exceptionValues = [];
                args.forEach(function(arg) {
                    arg = parseInt(arg, 10);
                    exceptionValues[arg] = $gameSwitches.value(arg);
                });
                $gameSwitches.clear();
                args.forEach(function(arg) {
                    arg = parseInt(arg, 10);
                    $gameSwitches.setValue(arg, exceptionValues[arg]);
                });
            },
            'Init_Switches' : function() {
                commandMap['スイッチの初期化'].call(this);
            },

            '変数の初期化' : function() {
                var exceptionValues = [];
                args.forEach(function(arg) {
                    arg = parseInt(arg, 10);
                    exceptionValues[arg] = $gameVariables.value(arg);
                });
                $gameVariables.clear();
                args.forEach(function(arg) {
                    arg = parseInt(arg, 10);
                    $gameVariables.setValue(arg, exceptionValues[arg]);
                });
            },
            'Init_Variables' : function() {
                commandMap['変数の初期化'].call(this);
            },

            'セルフスイッチの初期化' : function() {
                $gameSelfSwitches.clear();
            },
            'Init_Self_Switch' : function() {
                commandMap['セルフスイッチの初期化'].call(this);
            },

            'セルフスイッチの遠隔操作' : function() {
                var mapId   = Math.max(parseInt(args[0], 10), 1);
                var eventId = Math.max(parseInt(args[1], 10), 1);
                var type  = args[2].toUpperCase();
                var value = args[3].toUpperCase();
                $gameSelfSwitches.setValue([mapId, eventId, type], value === 'ON');
            },
            'Remote_Control_Self_Switch' : function() {
                commandMap['セルフスイッチの遠隔操作'].call(this);
            },

            'ピクチャの読み込み' : function() {
                ImageManager.loadPicture(args[0], 0);
            },
            'Load_Picture' : function() {
                commandMap['ピクチャの読み込み']();
            },

            '戦闘アニメの読み込み' : function() {
                var hue = parseInt(args[1], 10).clamp(0, 360);
                ImageManager.loadAnimation(args[0], hue);
            },
            'Load_Animation' : function() {
                commandMap['戦闘アニメの読み込み'].call(this);
            },

            'シャットダウン' : function() {
                SceneManager.terminate();
            },
            'Shutdown' : function() {
                commandMap['シャットダウン'].call(this);
            },

            'ウェブサイト起動' : function() {
                if (Utils.isNwjs()) {
                    var newWindow = require('nw.gui').Window.open(args[0]);
                    var x = parseInt(args[1], 10) || 0;
                    var y = parseInt(args[2], 10) || 0;
                    var width = parseInt(args[3], 10) || Graphics.width;
                    var height = parseInt(args[4], 10) || Graphics.height;
                    newWindow.moveTo(x, y);
                    newWindow.resizeTo(width, height);
                }
            },
            'Startup_Website' : function() {
                commandMap['ウェブサイト起動'].call(this);
            },
            
            '変数の操作' : function() {
                args[0]=args[0].replace('#' ,'');
                var VarId1   = parseInt(args[0],10);
                var Var1 = args[2];
                var Var2 = $gameVariables.value(VarId1);
                if (!isFinite(VarId1)) return;
                args[1]=args[1].replace('set','=');
                args[1]=args[1].replace('add','+=');
                args[1]=args[1].replace('sub','-=');
                args[1]=args[1].replace('mult','*=');
                args[1]=args[1].replace('div','/=');
                args[1]=args[1].replace('mod','%=');   
                if (args[1]=='=') {
                    $gameVariables.setValue(VarId1,Var1);
                }
                if (!isFinite(Var1)) return;
                if (!isFinite(Var2)) return;
                Var1 = parseInt(Var1,10);
                Var2 = parseInt(Var2,10);
                if (args[1]=='+=') {
                   $gameVariables.setValue(VarId1,Var2+Var1);
                }
                if (args[1]=='-=') {
                   $gameVariables.setValue(VarId1,Var2-Var1);
                }
                if (args[1]=='*=') {
                   $gameVariables.setValue(VarId1,Var2*Var1);
                }
                if (args[1]=='/=') {
                   $gameVariables.setValue(VarId1,(Var2-(Var2%Var1))/Var1);
                }
                if (args[1]=='%=') {
                   $gameVariables.setValue(VarId1,Var2%Var1);
                }
            },
            'ControlVariable' : function() {
                commandMap['変数の操作']();
            },
            'ConVar' : function() {
                commandMap['変数の操作']();
            },

            'タッチ座標の取得' : function() {
                var x, y;
                if (TouchInput.isPressed()) {
                    if (args[2] === 'マップ座標' || args[2] === 'Map') {
                        x = $gameMap.canvasToMapX(TouchInput.x);
                        y = $gameMap.canvasToMapY(TouchInput.y);
                    } else {
                        x = TouchInput.x;
                        y = TouchInput.y;
                    }
                } else {
                    x = -1;
                    y = -1;
                }
                $gameVariables.setValue(parseInt(args[0], 10), x);
                $gameVariables.setValue(parseInt(args[1], 10), y);
            },
            'Get_Touch_Info' : function() {
                commandMap['タッチ座標の取得'].call(this);
            },

            'マップタッチ禁止の変更' : function() {
                $gameSystem._mapTouchDisable = (args[0] === '禁止' || args[0] === 'Disable');
            },
            'Change_Map_Touch' : function() {
                commandMap['マップタッチ禁止の変更'].call(this);
            },

            'マップタッチ移動中判定' : function() {
                $gameSwitches.setValue(parseInt(args[0], 10), $gameTemp.isDestinationValid());
            },
            'Get_Map_Touch_Moving' : function() {
                commandMap['マップタッチ移動中判定'].call(this);
            },

            'マップタッチ移動' : function() {
                $gameTemp.setDestination(parseInt(args[0], 10), parseInt(args[1], 10));
            },
            'Map_Touch_Move' : function() {
                commandMap['マップタッチ移動'].call(this);
            },

            'ピクチャの移動' : function() {
                var pictureId = parseInt(args[0], 10);
                var origin = args[1] === '左上' || args[1] === 'Upper_Left' ? 0 : 1;
                var x = parseInt(args[2], 10);
                var y = parseInt(args[3], 10);
                var scaleX = parseInt(args[4], 10);
                var scaleY = parseInt(args[5], 10);
                var opacity = parseInt(args[6], 10);
                var blendMode;
                switch ((args[7] || '').toUpperCase()) {
                    case '加算':
                    case 'ADDITIVE':
                        blendMode = 1;
                        break;
                    case '減算':
                    case 'SUBTRACTIVE':
                        blendMode = 2;
                        break;
                    default :
                        blendMode = 0;
                        break;
                }
                var duration = parseInt(args[8], 10);
                $gameScreen.movePicture(pictureId, origin, x, y, scaleX, scaleY, opacity, blendMode, duration);
                var wait = (args[9] || '').toUpperCase();
                if (wait === 'ウェイトあり' || wait === 'WAIT') this.wait(duration);
            },

            'Move_Picture' : function() {
                commandMap['ピクチャの移動'].call(this);
            },
        };

        // コマンドチェック
        if (!(command in commandMap)) {
            return;
        }

        // コマンドの実行
        try {
            commandMap[command].call(this);
        } catch (e) {
            if ($gameTemp.isPlaytest() && Utils.isNwjs()) {
                var window = require('nw.gui').Window.get();
                var devTool = window.showDevTools();
                devTool.moveTo(0, 0);
                devTool.resizeTo(Graphics.width, Graphics.height);
                window.focus();
            }
            console.log('プラグインコマンドの実行中にエラーが発生しました。');
            console.log('- コマンド名 　: ' + command);
            console.log('- コマンド引数 : ' + args);
            console.log('- エラー原因   : ' + e.toString());
        }
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

    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._mapTouchDisable = false;
    };

    var _Scene_Map_isMapTouchOk = Scene_Map.prototype.isMapTouchOk;
    Scene_Map.prototype.isMapTouchOk = function() {
        return (!$gameSystem._mapTouchDisable || $gameTemp.isDestinationValid()) && _Scene_Map_isMapTouchOk.call(this);
    };
})();
