
// Console Output
console.log("From Script> Hello, World!");

// Addon Script
import { DimensionId, AttributeId, Actor, NativeModule, VoidPointer, MinecraftPacketIds } from "bdsx";
const system = server.registerSystem(0, 0);
system.listenForEvent('minecraft:entity_created', ev => {
    console.log('entity created: ' + ev.data.entity.__identifier__);

    // Get extra informations from entity
    const actor = Actor.fromEntity(ev.data.entity);
    if (actor)
    {
        console.log('entity dimension: ' + DimensionId[actor.getDimension()]);
        const level = actor.getAttribute(AttributeId.PlayerLevel);
        console.log('entity level: ' + level);
        
        if (actor.isPlayer())
        {
            const ni = actor.getNetworkIdentifier();
            console.log('player IP: '+ni.getAddress());
        }
    }
});

// Custom Command
import { command, serverControl } from "bdsx";
// this hooks all commands, but it cannot be executed by command blocks
command.hook.on((command, originName)=>{
    if (command.startsWith('/tp '))
    {
        return -1; // block command
    }
    else if (command === '/close')
    {
        serverControl.stop(); // same with the stop command
        return 0;
    }
    if (command.startsWith('/>'))
    {
        try
        {
            console.log(eval(command.substr(2)));
            // run javacript
        }
        catch (err)
        {
            console.error(err.stack);
        }
        return 0;
    }
});

// Chat Listening
import { chat, CANCEL } from '../bdsx';
chat.on(ev => {
    if (ev.message === 'nochat')
    {
        return CANCEL; // canceling
    }
    ev.setMessage(ev.message.toUpperCase() + " YEY!");
});

// Network Hooking: Get login IP and XUID
import { netevent, PacketId } from "bdsx";
import { DeviceOS } from "bdsx/common";
const connectionList = new Map<NetworkIdentifier, string>();
netevent.after(PacketId.Login).on((ptr, networkIdentifier, packetId) => {
    const ip = networkIdentifier.getAddress();
    const connreq = ptr.connreq;
    const cert = connreq.cert;
    const xuid = cert.getXuid();
    const username = cert.getId();
    
    console.log(`${username}> IP=${ip}, XUID=${xuid}, OS=${DeviceOS[connreq.getDeviceOS()] || 'UNKNOWN'}`);
    if (username) connectionList.set(networkIdentifier, username);

    // sendPacket
    setTimeout(()=>{
        const textPacket = TextPacket.create();
        textPacket.message = '[message packet from bdsx]';
        textPacket.sendTo(networkIdentifier);
        textPacket.dispose();
    }, 10000);
});

// Network Hooking: Print all packets
const tooLoudFilter = new Set([
    PacketId.UpdateBlock,
    PacketId.ClientCacheBlobStatus, 
    PacketId.LevelChunk,
    PacketId.ClientCacheMissResponse,
    PacketId.MoveEntityDelta,
    PacketId.SetEntityMotion,
    PacketId.SetEntityData,
    PacketId.NetworkChunkPublisherUpdate,
    PacketId.EntityEvent,
    PacketId.UpdateSoftEnum,
    PacketId.PlayerAuthInput,
]);
for (let i = 2; i <= 0xe1; i++) {
    if (tooLoudFilter.has(i)) continue;
    netevent.raw(i).on((ptr, size, networkIdentifier, packetId) => {
        console.assert(size !== 0, 'invalid packet size');
        console.log(`RECV ${(PacketId[packetId] || '0x'+packetId.toString(16))}: ${hex(ptr.readBuffer(Math.min(16, size)))}`);
    });
    netevent.send<MinecraftPacketIds>(i).on((ptr, networkIdentifier, packetId) => {
        console.log(`SEND ${(PacketId[packetId] || '0x'+packetId.toString(16))}: ${hex(ptr.getBuffer(16))}`);
    });
}

// Network Hooking: disconnected
import { NetworkIdentifier } from "bdsx";
NetworkIdentifier.close.on(networkIdentifier => {
    const id = connectionList.get(networkIdentifier);
    connectionList.delete(networkIdentifier);
    console.log(`${id}> disconnected`);
});

// Call Native Functions
import { RawTypeId } from "bdsx";
const kernel32 = NativeModule.load('Kernel32.dll');
const user32 = NativeModule.load('User32.dll');
const GetConsoleWindow = kernel32.getFunction('GetConsoleWindow', VoidPointer);
const SetWindowText = user32.getFunction('SetWindowTextW', RawTypeId.Void, null, VoidPointer, RawTypeId.StringUtf16);
const wnd = GetConsoleWindow();
SetWindowText(wnd, 'BDSX Window!!!');

// Parse raw packet
// referenced from https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/network/mcpe/protocol/MovePlayerPacket.php
import { bin } from "bdsx";
netevent.raw(PacketId.MovePlayer).on((ptr, size, ni)=>{
    console.log(`Packet Id: ${ptr.readUint8()}`);
    
    const runtimeId = ptr.readVarBin();
    const x = ptr.readFloat32();
    const y = ptr.readFloat32();
    const z = ptr.readFloat32();
    const pitch = ptr.readFloat32();
    const yaw = ptr.readFloat32();
    const headYaw = ptr.readFloat32();
    const mode = ptr.readUint8();
    const onGround = ptr.readUint8() !== 0;
    console.log(`move: ${bin.toString(runtimeId, 16)} ${x.toFixed(1)} ${y.toFixed(1)} ${z.toFixed(1)} ${pitch.toFixed(1)} ${yaw.toFixed(1)} ${headYaw.toFixed(1)} ${mode} ${onGround}`);
});
// referenced from https://github.com/pmmp/PocketMine-MP/blob/stable/src/pocketmine/network/mcpe/protocol/CraftingEventPacket.php
netevent.raw(PacketId.CraftingEvent).on((ptr, size, ni)=>{
    console.log(`Packet Id: ${ptr.readUint8()}`);
    
    const windowId = ptr.readUint8();
    const type = ptr.readVarInt();

    const uuid1 = ptr.readUint32();
    const uuid2 = ptr.readUint32();
    const uuid3 = ptr.readUint32();
    const uuid4 = ptr.readUint32();

    console.log(`crafting: ${windowId} ${type} ${uuid1} ${uuid2} ${uuid3} ${uuid4}`);
    const size1 = ptr.readVarUint();
    // need to parse more
});

// Global Error Listener
import { bedrockServer } from "bdsx/launcher";
import { TextPacket } from "bdsx/bds/packets";
import { hex } from "bdsx/util";
import colors = require('colors');
console.log('error handling>');
bedrockServer.error.on(err => {
    console.log('ERRMSG Example> ' + err.message + colors.brightYellow(' // this is just a example'));
    // return false; // Suppress default error outputs
});
system.initialize = ()=>{
    eval("undefined_identifier");
};

// Transfer Server
import { TransferPacket } from "bdsx/bds/packets";

function transferServer(networkIdentifier:NetworkIdentifier, address:string, port:number):void {
    const transferPacket = TransferPacket.create();
    transferPacket.address = address;
    transferPacket.port = port;
    transferPacket.sendTo(networkIdentifier);
    transferPacket.dispose();
}

// Low Level - API Hooking
import { ProcHacker } from "bdsx/prochacker";
import { NativePointer, pdb } from "bdsx/core";
import { BlockPos } from "bdsx/bds/blockpos";
import { SYMOPT_UNDNAME } from "bdsx/common";
import { GameMode } from "bdsx/bds/gamemode";
import { capi } from "bdsx";


if (!capi.isRunningOnWine()) // Skip for Linux, pdb is not working on Wine.
{
    pdb.setOptions(SYMOPT_UNDNAME); // use undecorated symbol names
    const procHacker = ProcHacker.load('../pdbcache_by_example.ini', ['GameMode::destroyBlock']);
    pdb.setOptions(0); // reset the option
    pdb.close(); // close the pdb to reduce the resource usage.
    
    let halfMiss = false;
    function onDestroyBlock(gameMode:GameMode, blockPos:BlockPos, v:number):boolean
    {
        halfMiss = !halfMiss;
        const ni = gameMode.actor.getNetworkIdentifier();
        const packet = TextPacket.create();
        console.log(ni.hash());
        console.log(ni.getAddress());
        packet.message = `${halfMiss ? 'missed' : 'destroyed'}: ${blockPos.x} ${blockPos.y} ${blockPos.z} ${v}`;
        packet.sendTo(ni);
        packet.dispose();
    
        if (halfMiss) return false;
        return originalFunc(gameMode, blockPos, v);
    }
    
    // bool GameMode::destroyBlock(BlockPos&,unsigned char); // it can be dug with the disassembler.
    const originalFunc = procHacker.hooking('GameMode::destroyBlock', RawTypeId.Boolean, null, GameMode, BlockPos, RawTypeId.Int32)(onDestroyBlock);
}


// Low Level - define C++ class or structure
import { NativeClass } from "bdsx/nativeclass";
import { int8_t, int16_t, int32_t } from "bdsx/nativetype";
class SampleStructure extends NativeClass
{
    a:int32_t;
    b:int16_t;
    c:int8_t;
    d:int32_t;
}
SampleStructure.define({
    a:int32_t,
    b:int16_t,
    c:int8_t,
    d:int32_t,
});
/**
 * struct SampleStructure
 * {
 *     int32_t a;
 *     int16_t b;
 *     int8_t c;
 *     int32_t d;
 * };
 */

/**
 * it allocates itself if it's received 'true'
 */
const obj = new SampleStructure(true);
const pointer = new NativePointer(obj);

// full bits is -1
obj.a = 0xffffffff;
console.assert(obj.a === -1);

// &obj.a == (address of obj + 0);
console.assert(obj.a === pointer.getInt32(0));

// truncated without 8bits
obj.c = 0xffffff01;
console.assert(obj.c === 1 && obj.c === pointer.getInt8(6));

// &obj.d == (address of obj + 8);
// alignment test
obj.d = 123;
console.assert(obj.d === pointer.getInt32(8));


// Low Level - Writing Machine Codes
import { asm, Register } from "bdsx/assembler";
import { proc } from "bdsx/bds/proc";

const asmmain = asm()
.sub_r_c(Register.rsp, 0x28) // make stack frame
.mov_r_c(Register.rcx, asm.const_str('Hello World!\n')) // rcx = "Hello World!\n";
.call64(proc['printf'], Register.rax) // printf(rcx);
.add_r_c(Register.rsp, 0x28) // remove stack frame
.ret() // return
.make(RawTypeId.Void); // make as the js function

asmmain();