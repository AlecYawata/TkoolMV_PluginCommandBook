// ================================================================
// CommonEventOnAttacked.js
// スキルを食らったらコモンイベント
// ================================================================
// ◆制作        by ナムアニクラウド(@NumAniCloud)
// ◆公式サイト  http://numani.info
// ----------------------------------------------------------------
// Copyright (c) 2019 NumAniCloud
// このプログラムは MIT ライセンスで配布されます。
// http://opensource.org/licenses/mit-license.php

/*:
 * @plugindesc 攻撃を受けた際にコモンイベントを実行できるようにするプラグインです。
 * @author NumAniCloud
 * 
 * @help
 * アクターや敵ののメモ欄にコモンイベントの番号を以下のように書いてください。
 * 　<CommonEv:3>
 * スキルの対象となった後にコモンイベントを呼び出すことができます。 
 * 
 * # プラグインコマンド
 * このプラグインで呼び出されたコモンイベントだけで有効です。
 * 
 *  CurrentElementId x
 *      x番の変数に、攻撃に使われた属性のIDを格納します。
 * 
 * # ライセンス
 * 作者に無断で改変・再配布が可能です。
 * プラグインそのものの販売を除き商用利用が可能です。
 * 性的・残酷描写のあるアプリケーションにも利用できます。
 */

(function(){
    var eventOnAttacked_currentSkillElementId = 0;
    var eventOnAttacked_currentAttackeeId = 0;

    // プラグインコマンドを受け取って処理する
    var Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        Game_Interpreter_pluginCommand.call(this, command, args);
        if (command == "CurrentElementId") {
            $gameVariables.setValue(args[0], eventOnAttacked_currentSkillElementId);
        }
    };

    // バトラーがスキルの効果を受けたときに呼ばれる関数
    Game_BattlerBase.prototype.onSkillApplied = function(subject, item){
        eventOnAttacked_currentSkillElementId = item.damage.elementId;

        // 敵の場合・プレイヤーの場合それぞれでメタ情報を読み取る
        var commonEventNumber = 0;
        if(this instanceof Game_Enemy) {
            eventOnAttacked_currentAttackeeId = this._enemyId;
            var meta = $dataEnemies[this._enemyId].meta["CommonEv"];
            commonEventNumber = Number(meta);
        } else if(this instanceof Game_Actor) {
            eventOnAttacked_currentAttackeeId = this._actorId;
            var meta = $dataActors[this._actorId].meta["CommonEv"];
            commonEventNumber = Number(meta);
        }

        // コモンイベントを実際に実行
        $gameTemp.reserveCommonEvent(commonEventNumber);
    };

    var Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function(subject, action, targets) {
        Window_BattleLog_startAction.call(this, subject, action, targets);
        if(action.isSkill()){
            targets.forEach(t => {
                t.onSkillApplied(subject, item);
            });
        }
    };
})();