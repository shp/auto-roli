import fs from "node:fs";

const POST_INTERVAL_IN_MINUTES = 30;

const ROLIMONS_URL = "https://api.rolimons.com/tradeads/v1/createad";

const expectedConfig = `\n{\n\t"ROLIVERIFICATION":"INPUT ROLIMON COOKIE",\n\t"USER_ID":1234567\n}`;

async function sleep(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}
(async () => {
    const configText = fs.readFileSync(`config.json`);
    const config = await JSON.parse(configText);

    const adsText = fs.readFileSync(`ads.json`);
    const ads =  await JSON.parse(adsText);

    const userId = config.USER_ID;
    const roliVerification = config.ROLIVERIFICATION;
    
    if (!userId) throw new Error(`Missing userid number, expected config: ${expectedConfig}`);
    if (!roliVerification) throw new Error(`Missing ROLIVERIFICATION cookie, expected config: ${expectedConfig}`);

    const cookies = `_RoliVerification=${roliVerification}`;
    const headers = {
        "Cookie": cookies,
        "Content-Type": "application/json"
    };

    const adAmount = ads.length;
    for (let i = 0; i<adAmount; i++) {
        const ad = ads[i];
        ad.player_id = userId;
        ad.offer_item_ids = ad.offer_item_ids ?? [];
        ad.request_item_ids = ad.request_item_ids ?? [];
        ad.request_tags = ad.request_tags ?? [];
        ads[i] = JSON.stringify(ad);
    }

    while (true) {
         for (let i = 0; i<ads.length; i++) {
            const ad = ads[i];
            console.log(ad);
            try {
                const res = await fetch(ROLIMONS_URL, {
                    method: "POST",
                    body: ad,
                    headers: headers
                });
                if (res.status == 201) {
                    console.log(`[#${String(i+1)}/${adAmount}] Posted trade ad`);
                } else {
                    console.error(`[#${String(i+1)}/${adAmount}] Post failed\nStatus Code: ${res.status}\nStatus Text: ${res.statusText}`);
                }
            } catch(err) {
                console.error(err)
            }
            await sleep(POST_INTERVAL_IN_MINUTES * 60 * 1000);
         }
    }
})();