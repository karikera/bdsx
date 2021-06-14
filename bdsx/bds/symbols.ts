import { pdb } from "bdsx/core";
import { UNDNAME_NAME_ONLY } from "../common";

const symbols = [
    'ScriptEngine::~ScriptEngine',
    'ScriptEngine::startScriptLoading',
    'MinecraftServerScriptEngine::onServerThreadStarted',
    'std::thread::_Invoke<std::tuple<<lambda_8914ed82e3ef519cb2a85824fbe333d8> >,0>',
    'ConsoleInputReader::getLine',
    '<lambda_8914ed82e3ef519cb2a85824fbe333d8>::operator()',
    'ScriptEngine::initialize',
    'ScriptEngine::shutdown',
    'Level::createDimension',
    'Level::fetchEntity',
    'Level::getActivePlayerCount',
    'Crypto::Random::generateUUID',
    'Player::attack',
    'Player::drop',
    'Player::getCarriedItem',
    'Player::getPlayerGameType',
    'Player::getSupplies',
    'Player::setName',
    'Player::take',
    'Player::_crit',
    'Player::teleportTo',
    'Player::startCooldown',
    'Player::getPlayerPermissionLevel',
    'Player::jumpFromGround',
    'Player::useItem',
    'Player::isSleeping',
    'Player::setSleeping',
    'Player::isJumping',
    'Player::setSize',
    'EnderChestContainer::startOpen',
    'EnderChestContainer::stopOpen',
    'ServerNetworkHandler::_getServerPlayer',
    'ServerNetworkHandler::allowIncomingConnections',
    'ServerNetworkHandler::disconnectClient',
    'ServerNetworkHandler::updateServerAnnouncement',
    'ServerPlayer::changeDimension',
    'ServerPlayer::openInventory',
    'ServerPlayer::sendInventory',
    'ServerPlayer::sendNetworkPacket',
    'std::_Allocate<16,std::_Default_allocate_traits,0>',
    'MinecraftCommands::executeCommand',
    "ServerPlayer::`vftable'",
    'Actor::getHealth',
    'Actor::getMaxHealth',
    'Actor::addTag',
    'Actor::getNameTag',
    'Actor::getOffhandSlot',
    'Actor::getPos',
    'Actor::getRegionConst',
    'Actor::getUniqueID',
    'Actor::hasTag',
    'Actor::removeTag',
    'Actor::setNameTag',
    'Actor::hurt',
    'Actor::getArmor',
    'Actor::burn',
    'Actor::setSneaking',
    'ExtendedCertificate::getXuid',
    'ExtendedCertificate::getIdentityName',
    'ExtendedCertificate::getIdentity',
    'MinecraftPackets::createPacket',
    'NetworkHandler::onConnectionClosed#1',
    'BedrockLogOut',
    'DedicatedServer::stop',
    'NetworkIdentifier::operator==',
    'CommandOutputSender::send',
    'ServerInstance::ServerInstance',
    'ServerInstance::disconnectAllClientsWithMessage',
    'NetworkHandler::_getConnectionFromId',
    'NetworkHandler::send',
    'LoopbackPacketSender::sendToClients',
    'NetworkHandler::_sortAndPacketizeEvents',
    'NetworkHandler::_sendInternal',
    'PacketViolationHandler::_handleViolation',
    'Level::removeEntityReferences',
    'Actor::~Actor',
    'ScriptEngine::_processSystemInitialize',
    'NetworkIdentifier::getHash',
    'BatchedNetworkPeer::sendPacket',
    'Json::Value::isMember',
    'Json::Value::~Value',
    'Json::Value::getMemberNames',
    'Json::Value::size',
    'MinecraftServerScriptEngine::onServerUpdateEnd',
    'printf',
    "ServerCommandOrigin::`vftable'",
    'Minecraft::getLevel',
    'std::basic_string<char,std::char_traits<char>,std::allocator<char> >::_Tidy_deallocate',
    "std::_Ref_count_obj2<CommandContext>::`vftable'",
    'CommandContext::CommandContext',
    'CommandVersion::CurrentVersion',
    'ServerCommandOrigin::ServerCommandOrigin',
    'ScriptApi::ScriptFramework::registerConsole',
    'ConsoleInputReader::ConsoleInputReader',
    'ConsoleInputReader::~ConsoleInputReader',
    'ConsoleInputReader::unblockReading',
    'Item::allowOffhand',
    'Item::isDamageable',
    'Item::isFood',
    'Item::getCreativeCategory',
    'Item::setAllowOffhand',
    'ItemStackBase::getId',
    'ItemStackBase::getItem',
    'ItemStackBase::getName',
    'ItemStackBase::getUserData',
    'ItemStackBase::hasCustomHoverName',
    'ItemStackBase::isBlock',
    'ItemStackBase::isNull',
    'ItemStackBase::setCustomName',
    'ItemStackBase::getEnchantValue',
    'ItemStackBase::isEnchanted',
    'ItemStackBase::setCustomLore',
    'ItemStackBase::setDamageValue',
    'ItemStackBase::startCoolDown',
    'ItemStackBase::load',
    'ItemStackBase::sameItem',
    'ItemStackBase::isStackedByData',
    'ItemStackBase::isStackable',
    'ItemStackBase::isWearableItem',
    'ItemStackBase::isPotionItem',
    'ItemStackBase::isPattern',
    'ItemStackBase::isMusicDiscItem',
    'ItemStackBase::isLiquidClipItem',
    'ItemStackBase::isHorseArmorItem',
    'ItemStackBase::isGlint',
    'ItemStackBase::isFullStack',
    'ItemStackBase::isFireResistant',
    'ItemStackBase::isExplodable',
    'ItemStackBase::isDamaged',
    'ItemStackBase::isDamageableItem',
    'ItemStackBase::isArmorItem',
    'ItemStackBase::getComponentItem',
    'ItemStackBase::getMaxDamage',
    'ItemStackBase::getDamageValue',
    'ItemStackBase::getAttackDamage',
    'Item::getCommandNames',
    'PlayerInventory::add',
    'PlayerInventory::clearSlot',
    'PlayerInventory::getContainerSize',
    'PlayerInventory::getFirstEmptySlot',
    'PlayerInventory::getHotbarSize',
    'PlayerInventory::getItem',
    'PlayerInventory::getSelectedItem',
    'PlayerInventory::getSlotWithItem',
    'PlayerInventory::getSlots',
    'PlayerInventory::removeItem',
    'PlayerInventory::selectSlot',
    'PlayerInventory::setItem',
    'PlayerInventory::setSelectedItem',
    'PlayerInventory::swapSlots',
    'CommandRegistry::registerCommand',
    'CommandRegistry::registerAlias',
    'CommandRegistry::findCommand',
    'CommandRegistry::registerOverloadInternal',
    'BlockSource::getBlock',
    'BlockSource::mayPlace',
    'GameMode::_creativeDestroyBlock',
    'SurvivalMode::destroyBlock',
    'Block::getName',
    'BlockLegacy::getCreativeCategory',
    'BlockLegacy::setDestroyTime',
    'BlockLegacy::getCommandNames',
    'RakNetServerLocator::announceServer',
    'HealthAttributeDelegate::change',
    'MinecraftCommands::getRegistry',
    'CommandSelectorBase::CommandSelectorBase',
    'CommandSelectorBase::~CommandSelectorBase',
    'CommandSelectorBase::newResults',
    'ScriptServerActorEventListener::onActorSneakChanged',
    'ScriptServerActorEventListener::onActorCreated',
    'ScriptServerActorEventListener::onActorDeath',
    'ScriptServerActorEventListener::onActorRemoved',
    'Dimension::getDimensionId',
    'TeleportCommand::computeTarget',
    'TeleportCommand::applyTarget',
    'ActorCommandOrigin::ActorCommandOrigin',
    "MinecraftCommands::`vftable'",
    "CommandOutputSender::`vftable'",
    "Minecraft::`vftable'",
    'Actor::getCommandPermissionLevel',
    'Player::getCommandPermissionLevel',
    'Actor::getDimension',
    'Actor::getDimensionId',
    'Actor::getAttributes',
    'Actor::getRuntimeID',
] as const;

// decorated symbols
const symbols2 = [
    '?ToString@SystemAddress@RakNet@@QEBAX_NPEADD@Z',
    '??0?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@QEAA@XZ',
    '??_7ServerInstance@@6BEnableNonOwnerReferences@Bedrock@@@',
    '??_7NetworkHandler@@6BIGameConnectionInfoProvider@Social@@@',
    '??_7RakNetInstance@@6BConnector@@@',
    '??_7RakPeer@RakNet@@6BRakPeerInterface@1@@',
    '??AValue@Json@@QEAAAEAV01@H@Z',
    '??AValue@Json@@QEAAAEAV01@PEBD@Z',
    '??$getline@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@YAAEAV?$basic_istream@DU?$char_traits@D@std@@@0@$$QEAV10@AEAV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@0@D@Z',
    '??_7MinecraftServerScriptEngine@@6BScriptFramework@ScriptApi@@@',
    '??_7MinecraftServerScriptEngine@@6B@',
    '?computeHash@HashedString@@SA_KAEBV?$basic_string@DU?$char_traits@D@std@@V?$allocator@D@2@@std@@@Z',
    '?getMutableInstance@BaseAttributeMap@@QEAAPEAVAttributeInstance@@I@Z',
    '?_spawnMovingBlocks@PistonBlockActor@@AEAAXAEAVBlockSource@@@Z',
    '??_7OverworldDimension@@6BLevelListener@@@',
    '??_7ServerLevel@@6BILevel@@@',
    'sprintf',
    'vsnprintf',
] as const;


export const proc = pdb.getList(pdb.coreCachePath, {}, symbols, false, UNDNAME_NAME_ONLY);
/** @deprecated use typeof proc */
export type proc = typeof proc;

export const proc2 = pdb.getList(pdb.coreCachePath, {}, symbols2);
/** @deprecated use typeof proc2 */
export type proc2 = typeof proc2;

pdb.close();
