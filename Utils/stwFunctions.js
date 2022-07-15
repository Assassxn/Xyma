const fs = require("fs");

function returnSchematics(items) {
    let arr = [];
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Schematic:")) {
            arr.push(value);
        }
    }
    return arr;
}

function checkMythicLaunchers(items) {
    let num = 0;
    items.forEach((item) => {
        if (item.templateId.startsWith("Schematic:sid_explosive_stormking_")) {
            num++;
        }
    });
    return num;
}

function checkMythicPistols(items) {
    let num = 0;
    items.forEach((item) => {
        if (item.templateId.startsWith("Schematic:sid_pistol_stormking_")) {
            num++;
        }
    });
    return num;
}

function checkMythicScourge(items) {
    let num = 0;
    items.forEach((item) => {
        if (item.templateId.startsWith("Schematic:sid_assault_stormking_")) {
            num++;
        }
    });
    return num;
}

function checkMythicRavager(items) {
    let num = 0;
    items.forEach((item) => {
        if (item.templateId.startsWith("Schematic:sid_edged_sword_stormking_")) {
            num++;
        }
    });
    return num;
}

function checkMythicFury(items) {
    let num = 0;
    items.forEach((item) => {
        if (item.templateId.startsWith("Schematic:sid_blunt_hammer_stormking_")) {
            num++;
        }
    });
    return num;
}

function returnMSKItems(items) {
    let arr = [];
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Quest:stw_stormkinghard_")) {
            arr.push(value);
        }
    }
    return arr;
}

function returnHeroLoadoutCount(items) {
    let num = 0;
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("CampaignHeroLoadout")) {
            num++;
        }
    }
    return num;
}

function returnHeroCount(items, minimumLevel) {
    let num = 0;
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Hero:") && value.attributes.level >= minimumLevel) {
            num++;
        }
    }
    return num;
}

function returnDefenderCount(items, minimumLevel) {
    let num = 0;
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Defender:") && value.attributes.level >= minimumLevel) {
            num++;
        }
    }
    return num;
}

function returnSurvivorCount(items, minimumLevel) {
    let num = 0;
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Worker:") && value.attributes.level >= minimumLevel) {
            num++;
        }
    }
    return num;
}

function returnSchematicsCount(items, minimumLevel) {
    let num = 0;
    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        if (value.templateId.startsWith("Schematic:") && value.attributes.level >= minimumLevel) {
            num++;
        }
    }
    return num;
}

function returnMSKStatus(items) {
    theArray = Object.entries(items);
    let index = 0;
    let foundActive = false;

    //Need to do SSD 5 Twine or doesn't own STW ...
    if (theArray.length === 0) {
        return [0];
    }
    // already done their MSK this week
    for (const [key, value] of theArray) {
        if (value.attributes.quest_state === "Active") {
            foundActive = true;
        }
        if (!foundActive && ++index == theArray.length - 1) {
            return [1];
        }
    }
    //everything else
    for (const [key, value] of theArray) {
        //King Me
        if (value.templateId.startsWith("Quest:stw_stormkinghard_kingme") && value.attributes.quest_state === "Active") {
            return [2, value.attributes.completion_stw_stormkinghard_kingme];
        }
        //Regicide aka First Mythic
        if (value.templateId.startsWith("Quest:stw_stormkinghard_firsttakedown") && value.attributes.quest_state === "Active") {
            return [3, value.attributes.completion_stw_stormkinghard_firsttakedown];
        }
        //Weekly MSK Quest
        if (value.templateId.startsWith("Quest:stw_stormkinghard_weekly_showdown") && value.attributes.quest_state === "Active") {
            return [4, value.attributes.completion_stw_stormkinghard_weekly_showdown];
        }
        //Strom Chest
        if (value.templateId.startsWith("Quest:stw_stormkinghard_weekly_002") && value.attributes.quest_state === "Active") {
            return [5, value.attributes.completion_stw_stormkinghard_weekly_002];
        }
        //Minibosses
        if (value.templateId.startsWith("Quest:stw_stormkinghard_weekly_003") && value.attributes.quest_state === "Active") {
            return [6, value.attributes.completion_stw_stormkinghard_weekly_003];
        }
        //Mist Monsters
        if (value.templateId.startsWith("Quest:stw_stormkinghard_weekly_004") && value.attributes.quest_state === "Active") {
            return [7, value.attributes.completion_stw_stormkinghard_weekly_004];
        }
        //Survivors
        if (value.templateId.startsWith("Quest:stw_stormkinghard_weekly_005") && value.attributes.quest_state === "Active") {
            return [8, value.attributes.completion_stw_stormkinghard_weekly_005];
        }
        //Elementals
        if (value.templateId.startsWith("Quest:stw_stormkinghard_weekly_007") && value.attributes.quest_state === "Active") {
            return [9, value.attributes.completion_stw_stormkinghard_weekly_007];
        }
    }
}

function returnSSDs(items) {
    theArray = Object.entries(items);
    let sw = 0;
    let pt = 0;
    let cv = 0;
    let tp = 0;
    let maxsw = false;
    let maxpt = false;
    let maxcv = false;
    let maxtp = false;
    for (const [key, value] of theArray) {
        if (!maxsw) {
            if (value.templateId.startsWith("Quest:outpostquest_t1") && value.attributes.quest_state == "Claimed") {
                curSSD = parseInt(value.templateId.slice(value.templateId.length - 1, value.templateId.length));
                if (curSSD > sw) sw = curSSD;
                if (value.templateId == "Quest:outpostquest_t1_l10") {
                    maxsw = true;
                    sw = 10;
                }
            }
        }

        if (!maxpt) {
            if (value.templateId.startsWith("Quest:outpostquest_t2") && value.attributes.quest_state == "Claimed") {
                curSSD = parseInt(value.templateId.slice(value.templateId.length - 1, value.templateId.length));
                if (curSSD > pt) pt = curSSD;
                if (value.templateId == "Quest:outpostquest_t2_l10") {
                    maxpt = true;
                    pt = 10;
                }
            }
        }
        if (!maxcv) {
            if (value.templateId.startsWith("Quest:outpostquest_t3") && value.attributes.quest_state == "Claimed") {
                curSSD = parseInt(value.templateId.slice(value.templateId.length - 1, value.templateId.length));
                if (curSSD > cv) cv = curSSD;
                if (value.templateId == "Quest:outpostquest_t3_l10") {
                    maxcv = true;
                    cv = 10;
                }
            }
        }
        if (!maxtp) {
            if (value.templateId.startsWith("Quest:outpostquest_t4") && value.attributes.quest_state == "Claimed") {
                curSSD = parseInt(value.templateId.slice(value.templateId.length - 1, value.templateId.length));
                if (curSSD > tp) tp = curSSD;
                if (value.templateId == "Quest:outpostquest_t4_l10") {
                    maxtp = true;
                    tp = 10;
                }
            }
        }
    }
    return [sw, pt, cv, tp];
}

module.exports = {
    returnSchematics,
    checkMythicLaunchers,
    checkMythicPistols,
    checkMythicScourge,
    checkMythicRavager,
    checkMythicFury,
    returnMSKItems,
    returnHeroLoadoutCount,
    returnHeroCount,
    returnDefenderCount,
    returnSurvivorCount,
    returnSchematicsCount,
    returnMSKStatus,
    returnSSDs,
};
