import { Skeleton, ArcRotateCamera, Vector3, Mesh, Scene, AnimationGroup, Sound } from "babylonjs";
export declare class CharacterController {
    private _avatar;
    private _skeleton;
    private _camera;
    private _scene;
    getScene(): Scene;
    private _gravity;
    private _minSlopeLimit;
    private _maxSlopeLimit;
    private _sl1;
    private _sl2;
    private _stepOffset;
    private _vMoveTot;
    private _vMovStartPos;
    private _actionMap;
    private _cameraElastic;
    private _cameraTarget;
    private _noFirstPerson;
    setSlopeLimit(minSlopeLimit: number, maxSlopeLimit: number): void;
    setStepOffset(stepOffset: number): void;
    setWalkSpeed(n: number): void;
    setRunSpeed(n: number): void;
    setBackSpeed(n: number): void;
    setBackFastSpeed(n: number): void;
    setJumpSpeed(n: number): void;
    setLeftSpeed(n: number): void;
    setLeftFastSpeed(n: number): void;
    setRightSpeed(n: number): void;
    setRightFastSpeed(n: number): void;
    setTurnSpeed(n: number): void;
    setTurnFastSpeed(n: number): void;
    setGravity(n: number): void;
    setAnimationGroups(agMap: {}): void;
    setAnimationRanges(arMap: {}): void;
    setActionMap(inActMap: ActionMap): string;
    getActionMap(): ActionMap;
    getSettings(): CCSettings;
    setSettings(ccs: CCSettings): void;
    private _setAnim;
    enableBlending(n: number): void;
    disableBlending(): void;
    setWalkAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setRunAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setWalkBackAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setWalkBackFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setSlideBackAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setIdleAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnRightAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnRightFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnLeftAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setTurnLeftFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeRightAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeRightFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeLeftAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setStrafeLeftFastAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setIdleJumpAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setRunJumpAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    setFallAnim(rangeName: string | AnimationGroup, rate: number, loop: boolean): void;
    _stepSound: Sound;
    setSound(sound: Sound): void;
    setWalkKey(key: string): void;
    setWalkBackKey(key: string): void;
    setTurnLeftKey(key: string): void;
    setTurnRightKey(key: string): void;
    setStrafeLeftKey(key: string): void;
    setStrafeRightKey(key: string): void;
    setJumpKey(key: string): void;
    setCameraElasticity(b: boolean): void;
    setElasticiSteps(n: number): void;
    makeObstructionInvisible(b: boolean): void;
    setCameraTarget(v: Vector3): void;
    cameraCollisionChanged(): void;
    setNoFirstPerson(b: boolean): void;
    private _checkAnimRanges;
    private _checkFastAnims;
    private _copySlowAnims;
    private _mode;
    private _saveMode;
    setMode(n: number): void;
    getMode(): number;
    setTurningOff(b: boolean): void;
    isTurningOff(): boolean;
    private _isLHS_RHS;
    private _signLHS_RHS;
    private _setRHS;
    private _ffSign;
    private _rhsSign;
    private _ff;
    private _av2cam;
    setFaceForward(b: boolean): void;
    isFaceForward(): boolean;
    private checkAGs;
    private _containsAG;
    private _getRoot;
    private _started;
    start(): void;
    stop(): void;
    private _stopAnim;
    pauseAnim(): void;
    resumeAnim(): void;
    private _prevActData;
    private _avStartPos;
    private _grounded;
    private _freeFallDist;
    private _fallFrameCountMin;
    private _fallFrameCount;
    private _inFreeFall;
    private _wasWalking;
    private _wasRunning;
    private _moveVector;
    private _isAvFacingCamera;
    private _moveAVandCamera;
    private _soundLoopTime;
    private _sndId;
    private _jumpStartPosY;
    private _jumpTime;
    private _doJump;
    private _calcJumpDist;
    private _endJump;
    private _areVectorsEqual;
    private _verticalSlope;
    private _movFallTime;
    private _sign;
    private _isTurning;
    private _noRot;
    private _doMove;
    private _rotateAV2C;
    private _rotateAVnC;
    private _endFreeFall;
    private _idleFallTime;
    private _doIdle;
    private _groundFrameCount;
    private _groundFrameMax;
    private _groundIt;
    private _unGroundIt;
    private _savedCameraCollision;
    private _inFP;
    private _updateTargetValue;
    private _ray;
    private _rayDir;
    private _cameraSkin;
    private _prevPickedMeshes;
    private _pickedMeshes;
    private _makeInvisible;
    private _elasticSteps;
    private _alreadyInvisible;
    private _handleObstruction;
    private _isSeeAble;
    private _move;
    anyMovement(): boolean;
    private _onKeyDown;
    private _onKeyUp;
    private _ekb;
    isKeyBoardEnabled(): boolean;
    enableKeyBoard(b: boolean): void;
    walk(b: boolean): void;
    walkBack(b: boolean): void;
    walkBackFast(b: boolean): void;
    run(b: boolean): void;
    turnLeft(b: boolean): void;
    turnLeftFast(b: boolean): void;
    turnRight(b: boolean): void;
    turnRightFast(b: boolean): void;
    strafeLeft(b: boolean): void;
    strafeLeftFast(b: boolean): void;
    strafeRight(b: boolean): void;
    strafeRightFast(b: boolean): void;
    jump(): void;
    idle(): void;
    private _act;
    private _renderer;
    private _handleKeyUp;
    private _handleKeyDown;
    private _isAG;
    isAg(): boolean;
    private _findSkel;
    private _root;
    setAvatar(avatar: Mesh, faceForward?: boolean): boolean;
    getAvatar(): Mesh;
    setAvatarSkeleton(skeleton: Skeleton): void;
    private _skelDrivenByAG;
    getSkeleton(): Skeleton;
    private _hasAnims;
    private _hasCam;
    constructor(avatar: Mesh, camera: ArcRotateCamera, scene: Scene, actionMap?: {}, faceForward?: boolean);
}
export declare class ActionData {
    id: string;
    speed: number;
    ds: number;
    sound: Sound;
    key: string;
    dk: string;
    name: string;
    ag: AnimationGroup;
    loop: boolean;
    rate: number;
    exist: boolean;
    constructor(id?: string, speed?: number, key?: string);
    reset(): void;
}
export declare class ActionMap {
    walk: ActionData;
    walkBack: ActionData;
    walkBackFast: ActionData;
    idle: ActionData;
    idleJump: ActionData;
    run: ActionData;
    runJump: ActionData;
    fall: ActionData;
    turnLeft: ActionData;
    turnLeftFast: ActionData;
    turnRight: ActionData;
    turnRightFast: ActionData;
    strafeLeft: ActionData;
    strafeLeftFast: ActionData;
    strafeRight: ActionData;
    strafeRightFast: ActionData;
    slideBack: ActionData;
    reset(): void;
}
export declare class CCSettings {
    faceForward: boolean;
    gravity: number;
    minSlopeLimit: number;
    maxSlopeLimit: number;
    stepOffset: number;
    cameraElastic: boolean;
    elasticSteps: number;
    makeInvisble: boolean;
    cameraTarget: Vector3;
    noFirstPerson: boolean;
    topDown: boolean;
    turningOff: boolean;
    keyboard: boolean;
    sound: Sound;
}
