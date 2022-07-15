function calcResearchForts(items) {
    let val = 0;
    let totalFortitude = 0;
    let totalResistance = 0;
    let totalTechnology = 0;
    let totalOffence = 0;
    for (const [key, value] of Object.entries(items)) {
        if (value.templateId.startsWith("Stat:") && !value.templateId.includes("phoenix")) {
            
            val += value.quantity;

            if(value.templateId.includes("fortitude")) totalFortitude += value.quantity;
            if(value.templateId.includes("resistance")) totalResistance += value.quantity;
            if(value.templateId.includes("technology")) totalTechnology += value.quantity;
            if(value.templateId.includes("offense")) totalOffence += value.quantity;
        }
    }
    return [val, totalFortitude, totalResistance, totalTechnology, totalOffence];
}

function calcVentureResearchForts(items) {
    let val = 0;
    for (const [key, value] of Object.entries(items)) {
        if (value.templateId.startsWith("Stat:offense_team_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:resistance_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:technology_team_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:technology_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:offense_team_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:resistance_team_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:offense_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:fortitude_team_phoenix")) {
            val += value.quantity;
        }

        if (value.templateId.startsWith("Stat:fortitude_phoenix")) {
            val += value.quantity;
        }
    }
    return val;
}

function leadBonus(item) {
    let leaderMatch = item.attributes.managerSynergy.split(".")[2];
    if (leadSynergy[`${item.attributes.squad_id.split("_")[3]}`] == leaderMatch) {
        return returnSurvivorPl(item); //there is a bonus
    } else {
        return 0; // no bonuses
    }
}

function srvBonus(lead, survivor) {
    let leadPersonality = lead.attributes.personality.split(".")[3];
    let survivorPersonality = survivor.attributes.personality.split(".")[3];
    let leadRarity = lead.templateId.split(":")[1].split("_")[1];

    if (survivorPersonality == leadPersonality) {
        if (leadRarity == "sr") return 8; //mythic
        if (leadRarity == "vr") return 5; //legendary
        if (leadRarity == "r") return 4; //epic
        if (leadRarity == "uc") return 3; //rare
        if (leadRarity == "c") return 2; //uncommon
    } else {
        //penalty if mythic
        if (leadRarity == "sr") {
            if (returnSurvivorPl(survivor) <= 2) return 0; //when taking into account the common survivors which is pl 1 and if you are going to subtract 2 this will leave you with -1, so we return 0.
            return -2;
        }
        return 0;
    }
}



let leadSynergy = {
    trainingteam: "IsTrainer",
    fireteamalpha: "IsSoldier",
    closeassaultsquad: "IsMartialArtist",
    thethinktank: "IsInventor",
    emtsquad: "IsDoctor",
    corpsofengineering: "IsEngineer",
    scoutingparty: "IsExplorer",
    gadgeteers: "IsGadgeteer",
};

async function returnWorkerItems(items) {
    let arr = [];
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Worker:") && value.attributes.squad_slot_idx !== -1 && value.attributes.squad_id.length !== 0) {
            arr.push(value);
        }
    }
    return arr;
}

function returnSurvivorPl(item) {
    let BASEPOWER, LVL, LVLCONSTANT, STARLVL, EVOCONSTANT, rarity;

    if (!item.attributes.squad_slot_idx == 0) {
        let special = false;
        if (item.templateId.startsWith("Worker:worker_halloween_troll")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_halloween_lobber")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_leprechaun")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[2], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_halloween_smasher")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_karolina")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[2], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_joel")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[2], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_halloween_husky_")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_halloween_husk_")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_halloween_husky")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (item.templateId.startsWith("Worker:worker_halloween_pitcher_")) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[3], false);
            special = true;
        }
        if (!special) {
            rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[1], false);
        }

        BASEPOWER = returnBasePower(rarity);
        // rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[1], false);
        LVLCONSTANT = returnLvlConstant(rarity, false);
        STARLVL = parseInt(item.templateId.slice(-1));
        EVOCONSTANT = returnEVOConstant(rarity, false);
        LVL = item.attributes.level;
    } else {
        rarity = returnSurvivorRarity(item.templateId.split(":")[1].split("_")[1], true);
        BASEPOWER = returnLeadBasePower(rarity);
        LVLCONSTANT = returnLvlConstant(rarity, true);
        STARLVL = parseInt(item.templateId.slice(-1));
        EVOCONSTANT = returnEVOConstant(rarity, true);
        LVL = item.attributes.level;
    }

    // console.log(rarity, BASEPOWER, LVLCONSTANT, STARLVL, EVOCONSTANT, LVL);
    // return `${BASEPOWER + (LVL - 1) * LVLCONSTANT + (STARLVL - 1) * EVOCONSTANT} ${item.templateId} ${rarity} ${BASEPOWER} ${LVLCONSTANT} ${STARLVL} ${EVOCONSTANT} ${LVL}`;
    // return BASEPOWER + (LVL - 1) * LVLCONSTANT + (STARLVL - 1) * EVOCONSTANT;
    return Math.round(BASEPOWER + (LVL - 1) * LVLCONSTANT + (STARLVL - 1) * EVOCONSTANT);
}

function returnSurvivorRarity(rarity, lead) {
    if (!lead) {
        return rarity == "ur" ? 6 : rarity == "sr" ? 5 : rarity == "vr" ? 4 : rarity == "r" ? 3 : rarity == "uc" ? 2 : rarity == "c" ? 1 : null;
    } else {
        return rarity == "sr" ? 5 : rarity == "vr" ? 4 : rarity == "r" ? 3 : rarity == "uc" ? 2 : rarity == "c" ? 1 : null;
    }
}

function returnBasePower(rarity) {
    if (rarity == 1) return 1;
    if (rarity == 2) return 5;
    if (rarity == 3) return 10;
    if (rarity == 4) return 15;
    if (rarity == 5) return 20;
    if (rarity == 6) return 25;
}

function returnLeadBasePower(rarity) {
    if (rarity == 1) return 5;
    if (rarity == 2) return 10;
    if (rarity == 3) return 15;
    if (rarity == 4) return 20;
    if (rarity == 5) return 25;
}

function returnEVOConstant(rarity, lead) {
    //normal survivors
    if (!lead) {
        if (rarity == 1) return 5;
        if (rarity == 2) return 6.35;
        if (rarity == 3) return 7;
        if (rarity == 4) return 8;
        if (rarity == 5) return 9;
        if (rarity == 6) return 9.85;
    } 
    //leaders
    else {
        if (rarity == 1) return 5;
        if (rarity == 2) return 6.35;
        if (rarity == 3) return 7;
        if (rarity == 4) return 8;
        if (rarity == 5) return 9;
    }
}

function returnLvlConstant(rarity, lead) {
    //leaders
    if (lead) {
        if (rarity == 1) return 1; //uncommon
        if (rarity == 2) return 1.08; //rare
        if (rarity == 3) return 1.245; //epic
        if (rarity == 4) return 1.374; //legendary
        if (rarity == 5) return 1.5; //mythic
    }
    //survivors
    if (!lead) {
        if (rarity == 1) return 1;//common
        if (rarity == 2) return 1.08;//uncommon
        if (rarity == 3) return 1.245;//rare
        if (rarity == 4) return 1.374;//epic
        if (rarity == 5) return 1.5;//legendary
        if (rarity == 6) return 1.645;//Mythic
    }
}

module.exports = {
    calcVentureResearchForts,
    calcResearchForts,
    leadBonus,
    srvBonus,
    returnWorkerItems,
    returnSurvivorPl,
    returnSurvivorRarity,
    returnBasePower,
    returnLeadBasePower,
    returnEVOConstant,
    returnLvlConstant,
};