function returnStats(items) {
    let roadTripTickets = 0;
    let gold = 0;
    let venturesxp = 0;
    let reperk = 0;
    let legflux = 0;
    let epicflux = 0;
    let rareflux = 0;
    let ampup = 0;
    let frostup = 0;
    let fireup = 0;
    let legPerkup = 0;
    let epicPerkup = 0;
    let rarePerkup = 0;
    let uncommonPerkup = 0;
    let pdor = 0;
    let liab = 0;
    let eots = 0;
    let stormShard = 0;
    let coreReperk = 0;
    let trainingManuals = 0;
    let trapManuals = 0;
    let weaponDesign = 0;
    let weaponVouchers = 0;
    let heroVouchers = 0;
    let schematicxp = 0;
    let survivorxp = 0;
    let heroxp = 0;
    let minillamas = 0;
    let heroSuperchargers = 0;
    let survivorSuperchargers = 0;
    let weaponSuperchargers = 0;
    let trapsSuperchargers = 0;
    let goldenLlamas = 0;
    let normalLlamas = 0;
    let playerXPBoost = 0;
    let giftXP = 0;
    let xraytickets = 0;

    theArray = Object.entries(items);
    for (const [key, value] of theArray) {
        
            //road trip tickets
            if (value.templateId === "AccountResource:eventcurrency_roadtrip") {
                roadTripTickets = value.quantity;
            }
            //gold
            if (value.templateId === "AccountResource:eventcurrency_scaling") {
                gold = value.quantity;
            }
            //venture xp
            if (value.templateId === "AccountResource:phoenixxp") {
                venturesxp = value.quantity;
            }
            //reperk
            if (value.templateId === "AccountResource:reagent_alteration_generic") {
                reperk = value.quantity;
            }
            //legendary flux
            if (value.templateId === "AccountResource:reagent_evolverarity_sr") {
                legflux = value.quantity;
            }
            //epic flux
            if (value.templateId === "AccountResource:reagent_evolverarity_vr") {
                epicflux = value.quantity;
            }
            //rare flux
            if (value.templateId === "AccountResource:reagent_evolverarity_r") {
                rareflux = value.quantity;
            }
            //ampup
            if (value.templateId === "AccountResource:reagent_alteration_ele_nature") {
                ampup = value.quantity;
            }
            //frost up
            if (value.templateId === "AccountResource:reagent_alteration_ele_water") {
                frostup = value.quantity;
            }
            //fire up
            if (value.templateId === "AccountResource:reagent_alteration_ele_fire") {
                fireup = value.quantity;
            }
            //legendary perkup
            if (value.templateId === "AccountResource:reagent_alteration_upgrade_sr") {
                legPerkup = value.quantity;
            }
            //epic perkup
            if (value.templateId === "AccountResource:reagent_alteration_upgrade_vr") {
                epicPerkup = value.quantity;
            }
            //rare perkup
            if (value.templateId === "AccountResource:reagent_alteration_upgrade_r") {
                rarePerkup = value.quantity;
            }
            //uncommon perkup
            if (value.templateId === "AccountResource:reagent_alteration_upgrade_uc") {
                uncommonPerkup = value.quantity;
            }
            //pdor
            if (value.templateId === "AccountResource:reagent_c_t01") {
                pdor = value.quantity;
            }
            //liab
            if (value.templateId === "AccountResource:reagent_c_t02") {
                liab = value.quantity;
            }
            //eots
            if (value.templateId === "AccountResource:reagent_c_t03") {
                eots = value.quantity;
            }
            //storm shard
            if (value.templateId === "AccountResource:reagent_c_t04") {
                stormShard = value.quantity;
            }
            //core reperk
            if (value.templateId === "AccountResource:reagent_alteration_gameplay_generic") {
                coreReperk = value.quantity;
            }
            //training manuals
            if (value.templateId === "AccountResource:reagent_people") {
                trainingManuals = value.quantity;
            }
            //trap manuals
            if (value.templateId === "AccountResource:reagent_traps") {
                trapManuals = value.quantity;
            }
            //weapon design
            if (value.templateId === "AccountResource:reagent_weapons") {
                weaponDesign = value.quantity;
            }
            //weapon vouchers
            if (value.templateId === "AccountResource:voucher_item_buyback") {
                weaponVouchers = value.quantity;
            }
            //hero vouchers
            if (value.templateId === "AccountResource:voucher_herobuyback") {
                heroVouchers = value.quantity;
            }
            //schematic xp
            if (value.templateId === "AccountResource:schematicxp") {
                schematicxp = value.quantity;
            }
            //survivor xp
            if (value.templateId === "AccountResource:personnelxp") {
                survivorxp = value.quantity;
            }
            //hero xp
            if (value.templateId === "AccountResource:heroxp") {
                heroxp = value.quantity;
            }
            //minillamas
            if (value.templateId === "AccountResource:voucher_basicpack") {
                minillamas = value.quantity;
            }
            //hero superchargers
            if (value.templateId === "AccountResource:reagent_promotion_heroes") {
                heroSuperchargers = value.quantity;
            }
            //survivor superchargers
            if (value.templateId === "AccountResource:reagent_promotion_survivors") {
                survivorSuperchargers = value.quantity;
            }
            //weapon superchargers
            if (value.templateId === "AccountResource:reagent_promotion_weapons") {
                weaponSuperchargers = value.quantity;
            }
            //traps superchargers
            if (value.templateId === "AccountResource:reagent_promotion_traps") {
                trapsSuperchargers = value.quantity;
            }
            //golden llamas
            if (value.templateId === "AccountResource:voucher_cardpack_jackpot") {
                goldenLlamas = value.quantity;
            }
            //normal/upgrade llamas
            if (value.templateId === "AccountResource:voucher_cardpack_bronze") {
                normalLlamas = value.quantity;
            }
            //player xp boost
            if (value.templateId === "ConsumableAccountItem:smallxpboost") {
                playerXPBoost = value.quantity;
            }
            //gift xp boost
            if (value.templateId === "ConsumableAccountItem:smallxpboost_gift") {
                giftXP = value.quantity;
            }
            //xray llama tickets
            if (value.templateId === "AccountResource:currency_xrayllama") {
                xraytickets = value.quantity;
            }
        
    }

    return [
        roadTripTickets, //0
        gold, //1
        venturesxp, //2
        reperk, //3
        legflux, //4
        epicflux, //5
        rareflux, //6
        ampup, //7
        frostup, //8
        fireup, //9
        legPerkup, //10
        epicPerkup, //11
        rarePerkup, //12
        uncommonPerkup, //13
        pdor, //14
        liab, //15
        eots, //16
        stormShard, //17
        coreReperk, //18
        trainingManuals, //19
        trapManuals, //20
        weaponDesign, //21
        weaponVouchers, //22
        heroVouchers, //23
        schematicxp, //24
        survivorxp, //25
        heroxp, //26
        minillamas, //27
        heroSuperchargers, //28
        survivorSuperchargers, //29
        weaponSuperchargers, //30
        trapsSuperchargers, //31
        goldenLlamas, //32
        normalLlamas, //33
        playerXPBoost, //34
        giftXP, //35
        xraytickets, //36
    ];
}

module.exports = {
    returnStats,
};
