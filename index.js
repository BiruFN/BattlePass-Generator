const axios = require("axios");
const fs = require("fs");

(async ()=>{
    const battlepass = await axios.get("https://shifts.tk/v1/fortnite/battlepass/24");

    var items = {};

    battlepass.data.forEach(pass =>{
        if (pass.Name.includes("AthenaSeasonItemEntryReward_")) {
            var OfferId = pass.Properties.BattlePassOffer.OfferId;
            var bIsFreePassReward = pass.Properties.bIsFreePassReward;
            var ObjectName = pass.Properties.BattlePassPreviewInfoList[0].PreviewParams.ItemDefWeWishToView.ObjectName;
            var Quantity = pass.Properties.BattlePassPreviewInfoList[0].PreviewParams.Quantity;

            var category = ObjectName.split("'")[0];
            var id = ObjectName.split("'")[1].split("'")[0].toLowerCase();
        
            var itemAdd = false;

            if (bIsFreePassReward == undefined) {
                bIsFreePassReward = false
            }

            switch (category) {
                case "AthenaPickaxeItemDefinition":
                    itemAdd = true;
                    category = "AthenaPickaxe";
                    break;
                case "AthenaDanceItemDefinition":
                    itemAdd = true;
                    category = "AthenaDance";
                    break;
                case "AthenaEmojiItemDefinition":
                    itemAdd = true;
                    category = "AthenaDance";
                    break;
                case "AthenaSprayItemDefinition":
                    itemAdd = true;
                    category = "AthenaDance";
                    break;
                case "AthenaToyItemDefinition":
                    itemAdd = true;
                    category = "AthenaDance";
                    break;
                case "AthenaGliderItemDefinition":
                    itemAdd = true;
                    category = "AthenaGlider";
                    break;
                case "AthenaCharacterItemDefinition":
                    itemAdd = true;
                    category = "AthenaCharacter";
                    break;
                case "AthenaBackpackItemDefinition":
                    itemAdd = true;
                    category = "AthenaBackpack";
                    break;
                case "AthenaItemWrapDefinition":
                    itemAdd = true;
                    category = "AthenaItemWrap";
                    break;
                case "AthenaLoadingScreenItemDefinition":
                    itemAdd = true;
                    category = "AthenaLoadingScreen";
                    break;
                case "AthenaMusicPackItemDefinition":
                    itemAdd = true;
                    category = "AthenaMusicPack";
                    break;
                case "AthenaSkyDiveContrailItemDefinition":
                    itemAdd = true;
                    category = "AthenaSkyDiveContrail";
                    break;
                case "FortHomebaseBannerIconItemDefinition":
                    itemAdd = true;
                    category = "HomebaseBannerIcon";
                    break;
                case "FortHomebaseBannerColorItemDefinition":
                    itemAdd = true;
                    category = "HomebaseBannerColor";
                    break;
                case "FortCurrencyItemDefinition":
                    itemAdd = true;
                    category = "Currency";
                    break;
                default:
                    itemAdd = false;
                    break;
            }

            if (itemAdd == true) {
                items[OfferId] = {
                    "ItemId": category + ":" + id,
                    "OfferId": OfferId,
                    "FreePassReward": bIsFreePassReward,
                    "Quantity": Quantity
                }
            }
        }
    })

    fs.writeFileSync(`./AthenaSeason24.json`, JSON.stringify(items, null, 4));
})();