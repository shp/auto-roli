
# auto rolimon ad poster

Cycles through trade ads and post automatically on [rolimons](https://rolimons.com)

## install

```bash
git clone https://github.com/shp/auto-roli
```

## run

```
node index.js
```

## config

### config.json

```json
{
    "ROLIVERIFICATION": "_RoliVerification cookie",
    "USER_ID": 1234567
}
```

#### ROLIVERIFICATION

- type: string
- desc: go to [rolimons](https://rolimons.com) and get the _RoliVerification cookie and put there

#### USER_ID

- type: number
- desc: go to your [roblox profile](https://roblox.com/profile), then go to the URL and copy and paste your roblox user id

### ads.json

```json
[
    {
        "offer_item_ids": [1, 2, 3],
        "request_item_ids": [4, 5, 6],
        "request_tags": ["demand"]
    }
]
```

> This is an array of objects so that you can put multiple ads and have it cycle through.

### offer_item_ids

- type: array of numbers
- desc: go to your roblox or your rolimons profile and copy the item id of the items you want to offer

#### request_item_ids

- type: array of numbers
- desc: go to roblox or rolimons and find limiteds and put their ids in

#### request_tags

- type: array of strings
- desc: put in the tags you want from the list below

```json
[
    "demand",
    "rares",
    "robux",
    "any",
    "upgrade",
    "downgrade",
    "rap",
    "wishlist",
    "projecteds",
    "adds"
]
```