/* Dutch Sentence Builder — A1/A2 Daily Life */

const CATEGORIES = [
  {
    id: "greetings",
    name_zh: "打招呼與介紹",
    name_nl: "Begroetingen",
    icon: "👋",
    color: "#FF6B35",
    sentences: [
      { dutch: "Hoe heet jij?", chinese: "你叫什麼名字？", words: ["Hoe", "heet", "jij"], distractors: ["Ben", "Wat", "heeft", "naam"], tip: "🔑 問句結構：疑問詞 → 動詞 → 主詞。Hoe = 怎麼/如何，heet = 叫做", context: "初次見面" },
      { dutch: "Ik heet Gordon.", chinese: "我叫 Gordon。", words: ["Ik", "heet", "Gordon"], distractors: ["Ben", "heb", "naam", "is"], tip: "🔑 heet 是動詞 heten（叫做）的現在式，主詞 Ik 後面動詞直接接", context: "自我介紹" },
      { dutch: "Hoe gaat het?", chinese: "你好嗎？（近況如何？）", words: ["Hoe", "gaat", "het"], distractors: ["Wat", "is", "ben", "goed"], tip: "🔑 這是荷蘭語最常見的問候語，字面意思「它進行得怎樣？」", context: "見到熟人" },
      { dutch: "Goed, dank je wel.", chinese: "很好，謝謝你。", words: ["Goed", "dank", "je", "wel"], distractors: ["Prima", "niet", "ook", "maar"], tip: "🔑 dank je wel = 謝謝你（非正式）；正式說法是 dank u wel", context: "回答 Hoe gaat het" },
      { dutch: "Goedemorgen!", chinese: "早安！", words: ["Goedemorgen"], distractors: ["Goedemiddag", "Goedenavond", "Welterusten"], tip: "🔑 荷蘭語問候分時段：morgen（早）/ middag（午）/ avond（晚）", context: "早上打招呼" },
      { dutch: "Goedenavond!", chinese: "晚安！（晚上好）", words: ["Goedenavond"], distractors: ["Goedemorgen", "Welterusten", "Slaapwel"], tip: "🔑 Welterusten 是「睡個好覺」，Goedenavond 是晚上見面時說的", context: "晚上見面" },
      { dutch: "Tot ziens!", chinese: "再見！", words: ["Tot", "ziens"], distractors: ["Dag", "morgen", "straks", "later"], tip: "🔑 tot = 直到，ziens = 看見；字面意思「直到再見到你」", context: "正式道別" },
      { dutch: "Doei!", chinese: "掰掰！（非正式）", words: ["Doei"], distractors: ["Dag", "Tot", "ziens", "later"], tip: "🔑 荷蘭語口語再見，非常常用，相當於英文 Bye！", context: "輕鬆道別" },
      { dutch: "Ik kom uit Taiwan.", chinese: "我來自台灣。", words: ["Ik", "kom", "uit", "Taiwan"], distractors: ["ben", "woon", "van", "ga"], tip: "🔑 komen uit = 來自，表示出生地或國籍。wonen in = 居住在", context: "介紹自己" },
      { dutch: "Ik woon in Amsterdam.", chinese: "我住在阿姆斯特丹。", words: ["Ik", "woon", "in", "Amsterdam"], distractors: ["kom", "ben", "ga", "naar"], tip: "🔑 wonen = 居住（非正式），表示目前定居地點", context: "說明居住地" },
      { dutch: "Ik spreek een beetje Nederlands.", chinese: "我說一點點荷蘭語。", words: ["Ik", "spreek", "een", "beetje", "Nederlands"], distractors: ["leer", "goed", "vloeiend", "lees", "Engels"], tip: "🔑 een beetje = 一點點，這句話學習者超常用！不要害羞說出來", context: "說明語言程度" },
      { dutch: "Kunt u dat herhalen?", chinese: "您可以再說一遍嗎？", words: ["Kunt", "u", "dat", "herhalen"], distractors: ["Kan", "jij", "dit", "zeggen", "nog"], tip: "🔑 u 是 jij 的正式版，與長輩或不熟的人說話時使用", context: "沒聽清楚時" },
      { dutch: "Spreekt u Engels?", chinese: "您會說英語嗎？", words: ["Spreekt", "u", "Engels"], distractors: ["Kunt", "jij", "Duits", "Frans", "praat"], tip: "🔑 荷蘭人英語通常很好！但這句話在緊急時很有用", context: "語言困難時" },
      { dutch: "Aangenaam kennis te maken.", chinese: "很高興認識您。", words: ["Aangenaam", "kennis", "te", "maken"], distractors: ["Prettig", "leuk", "ontmoeten", "blij", "Goed"], tip: "🔑 kennis maken = 認識（某人），een beetje formeel（較正式）", context: "正式介紹" },
      { dutch: "Tot morgen!", chinese: "明天見！", words: ["Tot", "morgen"], distractors: ["ziens", "later", "straks", "volgende", "week"], tip: "🔑 tot + 時間 = ...見。例如：Tot straks（待會見）、Tot maandag（週一見）", context: "告別時" },
    ]
  },
  {
    id: "time",
    name_zh: "時間與日期",
    name_nl: "Tijd & Datum",
    icon: "🕐",
    color: "#9B59B6",
    sentences: [
      { dutch: "Hoe laat is het?", chinese: "現在幾點？", words: ["Hoe", "laat", "is", "het"], distractors: ["Wat", "tijd", "zijn", "uur"], tip: "🔑 laat = 晚/時，Hoe laat 字面「多晚了？」就是問時間", context: "詢問時間" },
      { dutch: "Het is drie uur.", chinese: "現在三點鐘。", words: ["Het", "is", "drie", "uur"], distractors: ["zijn", "vier", "half", "laat"], tip: "🔑 uur = 小時，數字 + uur 表示整點", context: "報告時間" },
      { dutch: "Het is half vier.", chinese: "現在三點半。", words: ["Het", "is", "half", "vier"], distractors: ["drie", "kwart", "uur", "vijf"], tip: "🔑 荷蘭語 half vier = 「四點的一半」= 三點半！這是常見陷阱", context: "半點鐘" },
      { dutch: "Het is kwart over drie.", chinese: "現在三點十五分。", words: ["Het", "is", "kwart", "over", "drie"], distractors: ["voor", "half", "tien", "vier", "uur"], tip: "🔑 kwart over = 過一刻，kwart voor = 差一刻", context: "一刻鐘" },
      { dutch: "Hoe oud ben jij?", chinese: "你幾歲？", words: ["Hoe", "oud", "ben", "jij"], distractors: ["Wat", "jaar", "heet", "is", "groot"], tip: "🔑 oud = 老的/歲，ben 是動詞 zijn（是）對 jij 的變化", context: "詢問年齡" },
      { dutch: "Ik ben dertig jaar oud.", chinese: "我三十歲。", words: ["Ik", "ben", "dertig", "jaar", "oud"], distractors: ["heb", "twintig", "woon", "lang", "groot"], tip: "🔑 常見數字：twintig(20) dertig(30) veertig(40) vijftig(50)", context: "說明年齡" },
      { dutch: "Vandaag is het maandag.", chinese: "今天是星期一。", words: ["Vandaag", "is", "het", "maandag"], distractors: ["Morgen", "zijn", "vrijdag", "woensdag", "dinsdag"], tip: "🔑 星期記法：maandag 一、dinsdag 二、woensdag 三、donderdag 四、vrijdag 五", context: "說明日期" },
      { dutch: "Morgen is het dinsdag.", chinese: "明天是星期二。", words: ["Morgen", "is", "het", "dinsdag"], distractors: ["Vandaag", "zijn", "woensdag", "maandag", "overmorgen"], tip: "🔑 morgen = 明天；overmorgen = 後天；gisteren = 昨天", context: "明天的安排" },
      { dutch: "De winkel sluit om zes uur.", chinese: "商店六點關門。", words: ["De", "winkel", "sluit", "om", "zes", "uur"], distractors: ["opent", "gaat", "negen", "dicht", "is", "een"], tip: "🔑 sluit = 關門，opent = 開門，om = 在（表示時間點）", context: "查詢營業時間" },
      { dutch: "De trein vertrekt om tien uur.", chinese: "火車十點出發。", words: ["De", "trein", "vertrekt", "om", "tien", "uur"], distractors: ["bus", "aankomt", "elf", "het", "een", "rijdt"], tip: "🔑 vertrekken = 出發，aankomen = 抵達，這兩個動詞很常用", context: "查詢班次" },
      { dutch: "Ik ben jarig in juli.", chinese: "我的生日在七月。", words: ["Ik", "ben", "jarig", "in", "juli"], distractors: ["heb", "op", "augustus", "verjaardag", "wordt"], tip: "🔑 jarig zijn = 過生日；月份：januari(1) februari(2) maart(3)...december(12)", context: "說生日" },
      { dutch: "Hoeveel is het?", chinese: "總共多少錢？", words: ["Hoeveel", "is", "het"], distractors: ["Wat", "kost", "zijn", "prijs", "dit"], tip: "🔑 hoeveel = 多少（數量），Hoeveel kost dit? = 這個多少錢？", context: "結帳時" },
      { dutch: "Het duurt een uur.", chinese: "需要一個小時。", words: ["Het", "duurt", "een", "uur"], distractors: ["is", "kost", "neemt", "minuten", "twee"], tip: "🔑 duren = 持續/花費（時間），Het duurt... = 需要...（時間）", context: "詢問時長" },
      { dutch: "Tot volgende week!", chinese: "下週見！", words: ["Tot", "volgende", "week"], distractors: ["ziens", "morgen", "maand", "later", "straks"], tip: "🔑 volgende = 下一個；volgende week = 下週，volgende maand = 下個月", context: "道別" },
      { dutch: "Nu meteen!", chinese: "馬上！立刻！", words: ["Nu", "meteen"], distractors: ["morgen", "later", "straks", "even", "snel"], tip: "🔑 nu = 現在，meteen = 立刻；也可以說 direct 或 gelijk", context: "緊急情況" },
    ]
  },
  {
    id: "shopping",
    name_zh: "購物",
    name_nl: "Winkelen",
    icon: "🛍️",
    color: "#E74C3C",
    sentences: [
      { dutch: "Hoeveel kost dit?", chinese: "這個多少錢？", words: ["Hoeveel", "kost", "dit"], distractors: ["Wat", "is", "het", "prijs", "zijn"], tip: "🔑 kost = 花費，dit = 這個，dat = 那個", context: "問價格" },
      { dutch: "Dit is te duur.", chinese: "這太貴了。", words: ["Dit", "is", "te", "duur"], distractors: ["Dat", "zijn", "veel", "goedkoop", "niet"], tip: "🔑 te = 太，duur = 貴，goedkoop = 便宜；te duur = 太貴了", context: "嫌貴" },
      { dutch: "Heeft u dit in een andere maat?", chinese: "你們有其他尺寸嗎？", words: ["Heeft", "u", "dit", "in", "een", "andere", "maat"], distractors: ["kleur", "groot", "klein", "Heeft", "dit"], tip: "🔑 maat = 尺寸，kleur = 顏色；maat M/L/XL 在荷蘭也通用", context: "試衣服" },
      { dutch: "Ik wil dit kopen.", chinese: "我想買這個。", words: ["Ik", "wil", "dit", "kopen"], distractors: ["ben", "neem", "hebben", "dat", "willen"], tip: "🔑 willen = 想要，kopen = 買，nemen = 拿/選擇（也表示購買）", context: "決定購買" },
      { dutch: "Mag ik afrekenen?", chinese: "我可以結帳嗎？", words: ["Mag", "ik", "afrekenen"], distractors: ["Kan", "u", "betalen", "kassa", "dit"], tip: "🔑 Mag ik = 我可以嗎？（禮貌請求），afrekenen = 結帳", context: "結帳" },
      { dutch: "Accepteert u creditcard?", chinese: "你們接受信用卡嗎？", words: ["Accepteert", "u", "creditcard"], distractors: ["Heeft", "betalen", "pin", "contant", "euro"], tip: "🔑 荷蘭人很常用 pinpas（簽帳卡），現金越來越少見", context: "付款方式" },
      { dutch: "Waar is de kassa?", chinese: "收銀台在哪裡？", words: ["Waar", "is", "de", "kassa"], distractors: ["Hoe", "een", "winkel", "hier", "dichtbij"], tip: "🔑 kassa = 收銀台/收銀機，Waar is de... = ...在哪裡？", context: "找收銀台" },
      { dutch: "Ik zoek een jas.", chinese: "我在找一件外套。", words: ["Ik", "zoek", "een", "jas"], distractors: ["heb", "wil", "trui", "broek", "schoenen"], tip: "🔑 zoeken = 尋找，常用衣物：jas(外套) trui(毛衣) broek(褲子) schoenen(鞋)", context: "找衣服" },
      { dutch: "Heeft u dit in het blauw?", chinese: "你們有藍色的嗎？", words: ["Heeft", "u", "dit", "in", "het", "blauw"], distractors: ["rood", "groen", "zwart", "maat", "kleur"], tip: "🔑 顏色：blauw(藍) rood(紅) groen(綠) zwart(黑) wit(白) geel(黃)", context: "詢問顏色" },
      { dutch: "Ik neem dit.", chinese: "我要這個（我決定買這個）。", words: ["Ik", "neem", "dit"], distractors: ["wil", "koop", "dat", "hebben", "een"], tip: "🔑 neem = 拿/選（nemen），在購物語境中就是「我要這個」", context: "做決定" },
      { dutch: "Heeft u een zak?", chinese: "你們有袋子嗎？", words: ["Heeft", "u", "een", "zak"], distractors: ["Mag", "ik", "tas", "plastic", "verpakking"], tip: "🔑 荷蘭超市塑膠袋要付費，通常主動問 Heeft u een zak?", context: "要袋子" },
      { dutch: "Dit past niet.", chinese: "這個不合適（尺寸不對）。", words: ["Dit", "past", "niet"], distractors: ["Dat", "is", "te", "groot", "klein", "goed"], tip: "🔑 passen = 合身，Dit past goed = 這個很合適，niet = 不", context: "試穿後" },
      { dutch: "Kunt u het inpakken?", chinese: "您可以幫我包裝嗎？", words: ["Kunt", "u", "het", "inpakken"], distractors: ["Kan", "dit", "cadeauverpakking", "tas", "aub"], tip: "🔑 inpakken = 包裝，kunt u = 您能否（禮貌問句）", context: "禮品包裝" },
      { dutch: "Ik heb geen kleingeld.", chinese: "我沒有零錢。", words: ["Ik", "heb", "geen", "kleingeld"], distractors: ["ben", "niet", "geld", "pinnen", "contant"], tip: "🔑 geen = 沒有（否定名詞），kleingeld = 零錢；geld = 錢", context: "付款時" },
      { dutch: "De supermarkt is om de hoek.", chinese: "超市就在轉角。", words: ["De", "supermarkt", "is", "om", "de", "hoek"], distractors: ["winkel", "hier", "dichtbij", "naast", "links"], tip: "🔑 om de hoek = 在轉角，vlakbij = 就在附近，naast = 旁邊", context: "告訴方向" },
    ]
  },
  {
    id: "food",
    name_zh: "飲食點餐",
    name_nl: "Eten & Drinken",
    icon: "🍽️",
    color: "#27AE60",
    sentences: [
      { dutch: "Ik wil een koffie, alsjeblieft.", chinese: "我想要一杯咖啡，謝謝。", words: ["Ik", "wil", "een", "koffie", "alsjeblieft"], distractors: ["heb", "thee", "neem", "graag", "bestellen"], tip: "🔑 alsjeblieft = 請/謝謝（非正式），alstublieft = 正式版", context: "點飲料" },
      { dutch: "Heeft u ook thee?", chinese: "你們有茶嗎？", words: ["Heeft", "u", "ook", "thee"], distractors: ["Is", "er", "koffie", "hebben", "alstublieft"], tip: "🔑 ook = 也，Er is ook... = 也有...", context: "詢問飲品" },
      { dutch: "Mag ik de rekening?", chinese: "我可以要帳單嗎？", words: ["Mag", "ik", "de", "rekening"], distractors: ["Kan", "een", "afrekenen", "betalen", "kassa"], tip: "🔑 rekening = 帳單，Mag ik = 我可以嗎？（請求）", context: "結帳" },
      { dutch: "Dit smaakt lekker!", chinese: "這個很好吃！", words: ["Dit", "smaakt", "lekker"], distractors: ["Dat", "is", "niet", "heerlijk", "erg"], tip: "🔑 lekker = 好吃/好喝/好聞，荷蘭語最常見的讚美詞之一！", context: "稱讚食物" },
      { dutch: "Ik ben vegetariër.", chinese: "我是素食者。", words: ["Ik", "ben", "vegetariër"], distractors: ["heb", "eet", "geen", "vlees", "vegan"], tip: "🔑 vegetariër = 素食者，vegan = 純素；ik eet geen vlees = 我不吃肉", context: "飲食限制" },
      { dutch: "Ik heb een allergie voor noten.", chinese: "我對堅果過敏。", words: ["Ik", "heb", "een", "allergie", "voor", "noten"], distractors: ["ben", "allergisch", "gluten", "lactose", "aan"], tip: "🔑 allergie voor = 對...過敏，也可說 Ik ben allergisch voor...", context: "過敏問題" },
      { dutch: "Heeft u een tafel voor twee?", chinese: "你們有兩人桌嗎？", words: ["Heeft", "u", "een", "tafel", "voor", "twee"], distractors: ["Is", "er", "personen", "vrij", "reserveren"], tip: "🔑 voor twee = 兩人用，voor vier personen = 四個人用", context: "進餐廳" },
      { dutch: "Ik wil graag bestellen.", chinese: "我想點餐了。", words: ["Ik", "wil", "graag", "bestellen"], distractors: ["kan", "een", "bestelling", "al", "nu"], tip: "🔑 graag = 很樂意/想要（禮貌語氣），Ik wil graag... 是非常常用的句型", context: "叫服務生" },
      { dutch: "Een broodje kaas, alsjeblieft.", chinese: "一個起司三明治，謝謝。", words: ["Een", "broodje", "kaas", "alsjeblieft"], distractors: ["kroket", "ham", "met", "graag", "en"], tip: "🔑 broodje = 小圓麵包/三明治；荷蘭最經典的午餐就是 broodje kaas！", context: "點餐" },
      { dutch: "Mag ik nog een glas water?", chinese: "我可以再要一杯水嗎？", words: ["Mag", "ik", "nog", "een", "glas", "water"], distractors: ["Kan", "een", "fles", "bier", "bestellen"], tip: "🔑 nog een = 再一個，glas = 玻璃杯，fles = 瓶子", context: "加點飲料" },
      { dutch: "Smakelijk!", chinese: "祝您用餐愉快！", words: ["Smakelijk"], distractors: ["Lekker", "Bedankt", "Eet", "Proost", "Heerlijk"], tip: "🔑 Smakelijk! 是用餐開始時說的，相當於「請慢用」；Proost! = 乾杯！", context: "用餐前" },
      { dutch: "Ik lust geen vlees.", chinese: "我不吃肉。", words: ["Ik", "lust", "geen", "vlees"], distractors: ["eet", "ben", "heb", "vis", "kip"], tip: "🔑 lusten = 喜歡（食物/飲料），Ik lust geen... = 我不喜歡吃...", context: "飲食偏好" },
      { dutch: "Wat zijn de dagspecials?", chinese: "今日特餐有什麼？", words: ["Wat", "zijn", "de", "dagspecials"], distractors: ["Heeft", "u", "menu", "aanbiedingen", "vandaag"], tip: "🔑 dagspecial = 日特餐，zijn = 是（複數），dagmenu = 今日套餐", context: "查看菜單" },
      { dutch: "De koffie is te heet.", chinese: "咖啡太燙了。", words: ["De", "koffie", "is", "te", "heet"], distractors: ["niet", "erg", "koud", "lekker", "warm"], tip: "🔑 te = 太，heet = 燙/熱，koud = 冷；te koud = 太冷", context: "飲料溫度" },
      { dutch: "Ik wil graag een tafel reserveren.", chinese: "我想預訂一張桌子。", words: ["Ik", "wil", "graag", "een", "tafel", "reserveren"], distractors: ["kan", "boeken", "voor", "personen", "vanavond"], tip: "🔑 reserveren = 預約，也用於訂旅館、訂位；een reservering maken 也可以", context: "電話訂位" },
    ]
  },
  {
    id: "transport",
    name_zh: "交通出行",
    name_nl: "Vervoer",
    icon: "🚆",
    color: "#2980B9",
    sentences: [
      { dutch: "Waar is het station?", chinese: "車站在哪裡？", words: ["Waar", "is", "het", "station"], distractors: ["Hoe", "de", "bus", "tram", "hier"], tip: "🔑 station = 火車站，bushalte = 公車站，tramhalte = 電車站", context: "找交通" },
      { dutch: "Hoe kom ik naar de binnenstad?", chinese: "我怎麼去市中心？", words: ["Hoe", "kom", "ik", "naar", "de", "binnenstad"], distractors: ["Waar", "ga", "het", "centrum", "is"], tip: "🔑 binnenstad = 市中心，centrum 也可以；Hoe kom ik naar... = 我怎麼去...？", context: "問路" },
      { dutch: "Ik neem de tram.", chinese: "我搭電車。", words: ["Ik", "neem", "de", "tram"], distractors: ["ga", "met", "bus", "metro", "fiets"], tip: "🔑 nemen = 搭乘，可接 bus / tram / metro / trein。也可說 Ik ga met de tram", context: "說交通方式" },
      { dutch: "Een enkeltje naar Rotterdam, alsjeblieft.", chinese: "一張到鹿特丹的單程票，謝謝。", words: ["Een", "enkeltje", "naar", "Rotterdam", "alsjeblieft"], distractors: ["retour", "ticket", "kaartje", "Amsterdam", "graag"], tip: "🔑 enkeltje = 單程票，retour = 來回票，kaartje = 票/小票", context: "買火車票" },
      { dutch: "Hoe laat vertrekt de trein?", chinese: "火車幾點出發？", words: ["Hoe", "laat", "vertrekt", "de", "trein"], distractors: ["Wanneer", "aankomt", "bus", "het", "rijdt"], tip: "🔑 vertrekken = 出發，aankomen = 到達；兩個都是很重要的交通動詞", context: "查班次時間" },
      { dutch: "Welk perron is het?", chinese: "是哪個月台？", words: ["Welk", "perron", "is", "het"], distractors: ["Waar", "spoor", "station", "welke", "nummer"], tip: "🔑 perron = 月台（荷蘭語），spoor 也常見，車票上通常寫 Spoor 2 等", context: "找月台" },
      { dutch: "Is deze stoel vrij?", chinese: "這個座位有人嗎？（空著嗎？）", words: ["Is", "deze", "stoel", "vrij"], distractors: ["Mag", "ik", "hier", "zitten", "bezet"], tip: "🔑 vrij = 空著/自由，bezet = 被佔用了；deze = 這個", context: "找位子" },
      { dutch: "Ik wil een ov-chipkaart opladen.", chinese: "我想為 OV 晶片卡儲值。", words: ["Ik", "wil", "een", "ov-chipkaart", "opladen"], distractors: ["kopen", "heb", "kaartje", "saldo", "betalen"], tip: "🔑 OV-chipkaart 是荷蘭大眾運輸的感應卡，opladen = 儲值/充值", context: "儲值交通卡" },
      { dutch: "Hoe ver is het lopen?", chinese: "走路要多遠？", words: ["Hoe", "ver", "is", "het", "lopen"], distractors: ["lang", "duur", "minuten", "rijden", "met"], tip: "🔑 ver = 遠，lopen = 走路；Hoe ver is het? = 有多遠？", context: "詢問距離" },
      { dutch: "Ik ben verdwaald.", chinese: "我迷路了。", words: ["Ik", "ben", "verdwaald"], distractors: ["heb", "ga", "mis", "weg", "zoek"], tip: "🔑 verdwaald zijn = 迷路，非常實用的句子！說出來荷蘭人通常很願意幫忙", context: "迷路時" },
      { dutch: "Waar kan ik een fiets huren?", chinese: "哪裡可以租腳踏車？", words: ["Waar", "kan", "ik", "een", "fiets", "huren"], distractors: ["kopen", "lenen", "scooter", "auto", "rijden"], tip: "🔑 huren = 租借，fiets = 腳踏車，荷蘭是單車大國！OV-fiets 很方便", context: "租腳踏車" },
      { dutch: "Het rijdt elke tien minuten.", chinese: "每十分鐘一班。", words: ["Het", "rijdt", "elke", "tien", "minuten"], distractors: ["bus", "gaat", "vijf", "kwartier", "uur"], tip: "🔑 elke = 每，rijden = 行駛；elke tien minuten = 每十分鐘", context: "查詢班次頻率" },
      { dutch: "Ik heb de verkeerde bus genomen.", chinese: "我搭錯公車了。", words: ["Ik", "heb", "de", "verkeerde", "bus", "genomen"], distractors: ["tram", "trein", "richting", "gekregen", "gepakt"], tip: "🔑 verkeerde = 錯誤的，genomen = nemen 的過去分詞，荷蘭語完成時", context: "搭錯車" },
      { dutch: "Kunt u mij helpen?", chinese: "您可以幫助我嗎？", words: ["Kunt", "u", "mij", "helpen"], distractors: ["Kan", "jij", "me", "wat", "doen"], tip: "🔑 helpen = 幫助，mij/me = 我（受格），u 比 jij 更正式", context: "求助" },
      { dutch: "De volgende halte is Centraal.", chinese: "下一站是中央車站。", words: ["De", "volgende", "halte", "is", "Centraal"], distractors: ["station", "stop", "laatste", "ov", "straks"], tip: "🔑 halte = 站，volgende = 下一個，Centraal = 中央車站", context: "搭車中" },
    ]
  },
  {
    id: "directions",
    name_zh: "問路指引",
    name_nl: "De Weg",
    icon: "🗺️",
    color: "#F39C12",
    sentences: [
      { dutch: "Pardon, waar is de supermarkt?", chinese: "不好意思，超市在哪裡？", words: ["Pardon", "waar", "is", "de", "supermarkt"], distractors: ["Excuses", "winkel", "dichtbij", "hoe", "het"], tip: "🔑 Pardon 或 Excuseer me 都是「打擾一下」，比直接說 waar 更有禮貌", context: "問路" },
      { dutch: "Ga rechtdoor.", chinese: "直走。", words: ["Ga", "rechtdoor"], distractors: ["Sla", "links", "rechts", "af", "door"], tip: "🔑 rechtdoor = 直走，是 recht（直）+ door（穿過）合成的方向詞", context: "指路" },
      { dutch: "Sla links af.", chinese: "左轉。", words: ["Sla", "links", "af"], distractors: ["Ga", "rechts", "rechtdoor", "om", "hier"], tip: "🔑 slaan af = 轉彎，links = 左，rechts = 右。很重要的方向詞！", context: "指路" },
      { dutch: "Sla rechts af.", chinese: "右轉。", words: ["Sla", "rechts", "af"], distractors: ["Ga", "links", "rechtdoor", "bij", "hoek"], tip: "🔑 slaan af 是「轉彎」，加方向詞 links/rechts 說明轉哪邊", context: "指路" },
      { dutch: "Het is aan de rechterkant.", chinese: "在右邊。", words: ["Het", "is", "aan", "de", "rechterkant"], distractors: ["links", "kant", "naast", "over", "bij"], tip: "🔑 rechterkant = 右邊，linkerkant = 左邊，kant = 側/邊", context: "位置描述" },
      { dutch: "Het is vlakbij.", chinese: "就在附近。", words: ["Het", "is", "vlakbij"], distractors: ["ver", "dichtbij", "weg", "hier", "niet"], tip: "🔑 vlakbij = 就在旁邊，dichtbij = 附近，ver weg = 很遠", context: "位置描述" },
      { dutch: "Het is ver weg.", chinese: "很遠。", words: ["Het", "is", "ver", "weg"], distractors: ["niet", "dichtbij", "vlakbij", "lopen", "rijden"], tip: "🔑 ver weg = 很遠，也可以說 het is niet dichtbij（離這裡不近）", context: "位置描述" },
      { dutch: "Loop vijf minuten rechtdoor.", chinese: "直走五分鐘。", words: ["Loop", "vijf", "minuten", "rechtdoor"], distractors: ["Ga", "tien", "kwartier", "links", "rechts"], tip: "🔑 Loop = 走路（lopen 的命令式），Rijd = 騎車/開車（rijden 的命令式）", context: "說明距離" },
      { dutch: "Kunt u het op de kaart aanwijzen?", chinese: "您可以在地圖上指給我看嗎？", words: ["Kunt", "u", "het", "op", "de", "kaart", "aanwijzen"], distractors: ["Kan", "tonen", "app", "waar", "laten"], tip: "🔑 aanwijzen = 指出，kaart = 地圖，在手機時代也可以說 op de telefoon", context: "看地圖" },
      { dutch: "Ik zoek het museum.", chinese: "我在找博物館。", words: ["Ik", "zoek", "het", "museum"], distractors: ["ben", "ga", "naar", "centrum", "park"], tip: "🔑 zoeken = 找，museum = 博物館，het 是中性名詞的冠詞", context: "找景點" },
      { dutch: "Is er een apotheek in de buurt?", chinese: "附近有藥局嗎？", words: ["Is", "er", "een", "apotheek", "in", "de", "buurt"], distractors: ["Heeft", "ziekenhuis", "bank", "winkel", "hier"], tip: "🔑 buurt = 附近/社區，apotheek = 藥局，ziekenhuis = 醫院", context: "找藥局" },
      { dutch: "U bent op de verkeerde weg.", chinese: "您走錯路了。", words: ["U", "bent", "op", "de", "verkeerde", "weg"], distractors: ["Jij", "gaat", "richting", "straat", "fout"], tip: "🔑 verkeerde = 錯誤的，weg = 路，verkeerde weg = 走錯路", context: "糾正方向" },
      { dutch: "Ga bij het stoplicht linksaf.", chinese: "在紅綠燈那裡左轉。", words: ["Ga", "bij", "het", "stoplicht", "linksaf"], distractors: ["rechtsaf", "rechtdoor", "hoek", "kruispunt", "licht"], tip: "🔑 stoplicht = 紅綠燈，kruispunt = 十字路口，linksaf/rechtsaf = 向左/右轉", context: "詳細指路" },
      { dutch: "Het is twee straten verder.", chinese: "再過兩條街。", words: ["Het", "is", "twee", "straten", "verder"], distractors: ["één", "drie", "hoeken", "blocks", "weg"], tip: "🔑 verder = 再往前，straten = 街道（複數），straat = 街道", context: "說明距離" },
      { dutch: "Volg de borden naar het centrum.", chinese: "跟著指向市中心的標誌走。", words: ["Volg", "de", "borden", "naar", "het", "centrum"], distractors: ["Ga", "richting", "tekens", "volgen", "bord"], tip: "🔑 volgen = 跟隨，bord/borden = 標誌/告示牌，centrum = 市中心", context: "跟著標示" },
    ]
  },
  {
    id: "family",
    name_zh: "家庭與朋友",
    name_nl: "Familie & Vrienden",
    icon: "👨‍👩‍👧",
    color: "#8E44AD",
    sentences: [
      { dutch: "Dit is mijn man.", chinese: "這是我的丈夫。", words: ["Dit", "is", "mijn", "man"], distractors: ["Dat", "vrouw", "zoon", "dochter", "partner"], tip: "🔑 mijn = 我的；man = 丈夫，vrouw = 妻子（也可以指女人）", context: "介紹伴侶" },
      { dutch: "Dit is mijn vrouw.", chinese: "這是我的妻子。", words: ["Dit", "is", "mijn", "vrouw"], distractors: ["Dat", "man", "zus", "moeder", "partner"], tip: "🔑 荷蘭語中 vrouw 既是「妻子」也是「女性」，情境決定意思", context: "介紹伴侶" },
      { dutch: "Ik heb twee kinderen.", chinese: "我有兩個孩子。", words: ["Ik", "heb", "twee", "kinderen"], distractors: ["ben", "geen", "één", "drie", "broers"], tip: "🔑 kinderen = 孩子們（kind 的複數），heb = hebben（有）的現在式", context: "談論孩子" },
      { dutch: "Mijn moeder heet Anna.", chinese: "我媽媽叫 Anna。", words: ["Mijn", "moeder", "heet", "Anna"], distractors: ["vader", "zus", "broer", "naam", "is"], tip: "🔑 moeder = 媽媽，vader = 爸爸，zus = 姊妹，broer = 兄弟", context: "介紹家人" },
      { dutch: "Heb jij broers of zussen?", chinese: "你有兄弟姊妹嗎？", words: ["Heb", "jij", "broers", "of", "zussen"], distractors: ["Ben", "heeft", "kinderen", "ook", "familieleden"], tip: "🔑 of = 或者；broers = 兄弟們（複數），zussen = 姊妹們（複數）", context: "問兄弟姊妹" },
      { dutch: "Ik heb een oudere broer.", chinese: "我有一個哥哥。", words: ["Ik", "heb", "een", "oudere", "broer"], distractors: ["jongere", "zus", "zuster", "geen", "twee"], tip: "🔑 ouder = 年長，jonger = 年輕；荷蘭語沒有哥哥/弟弟，用 ouder/jonger 區分", context: "談論兄弟" },
      { dutch: "Wij gaan samen uit eten.", chinese: "我們一起去吃飯。", words: ["Wij", "gaan", "samen", "uit", "eten"], distractors: ["Ik", "naar", "restaurant", "altijd", "drinken"], tip: "🔑 samen = 一起，uit eten gaan = 外出用餐（固定片語）", context: "計劃用餐" },
      { dutch: "Ben jij getrouwd?", chinese: "你結婚了嗎？", words: ["Ben", "jij", "getrouwd"], distractors: ["Heb", "je", "kinderen", "samenwonend", "vrijgezel"], tip: "🔑 getrouwd = 已婚，vrijgezel = 單身，samenwonend = 同居", context: "問婚姻狀況" },
      { dutch: "Wij zijn getrouwd.", chinese: "我們結婚了。", words: ["Wij", "zijn", "getrouwd"], distractors: ["Ik", "ben", "niet", "samenwonend", "partners"], tip: "🔑 zijn 是 zijn（是）對 wij 的現在式，wij zijn = 我們是", context: "說明婚姻" },
      { dutch: "Mijn zus is lerares.", chinese: "我姐姐是老師。（女）", words: ["Mijn", "zus", "is", "lerares"], distractors: ["broer", "moeder", "arts", "ingenieur", "werkt"], tip: "🔑 leraar = 男老師，lerares = 女老師；荷蘭語職業有時有性別區分", context: "介紹家人職業" },
      { dutch: "Mijn opa woont in Taiwan.", chinese: "我爺爺住在台灣。", words: ["Mijn", "opa", "woont", "in", "Taiwan"], distractors: ["oma", "vader", "woonde", "bij", "naar"], tip: "🔑 opa = 爺爺/外公，oma = 奶奶/外婆，非正式用法", context: "介紹祖父母" },
      { dutch: "Ik woon samen met mijn vriend.", chinese: "我和男友同居。", words: ["Ik", "woon", "samen", "met", "mijn", "vriend"], distractors: ["vriendin", "partner", "lief", "ga", "ben"], tip: "🔑 vriend = 男友/朋友，vriendin = 女友/女性朋友，partner = 伴侶（中性）", context: "說同居" },
      { dutch: "Hoe is het met je ouders?", chinese: "你父母怎麼樣？", words: ["Hoe", "is", "het", "met", "je", "ouders"], distractors: ["gaat", "jouw", "moeder", "vader", "familie"], tip: "🔑 ouders = 父母（複數），Hoe is het met... = ...怎麼樣？（問候某人）", context: "問候家人" },
      { dutch: "Ik heb een hond en een kat.", chinese: "我有一隻狗和一隻貓。", words: ["Ik", "heb", "een", "hond", "en", "een", "kat"], distractors: ["twee", "geen", "huisdier", "vis", "konijn"], tip: "🔑 hond = 狗，kat = 貓，en = 和；荷蘭是寵物友善國家！", context: "談寵物" },
      { dutch: "We hebben een fijne avond.", chinese: "我們度過了一個美好的夜晚。", words: ["We", "hebben", "een", "fijne", "avond"], distractors: ["Wij", "hadden", "goede", "leuke", "dag"], tip: "🔑 fijn = 好/棒，leuk = 有趣/開心，mooi = 美麗；三個都是正面形容詞", context: "結束聚會" },
    ]
  },
  {
    id: "weather",
    name_zh: "天氣",
    name_nl: "Het Weer",
    icon: "☁️",
    color: "#16A085",
    sentences: [
      { dutch: "Hoe is het weer vandaag?", chinese: "今天天氣怎麼樣？", words: ["Hoe", "is", "het", "weer", "vandaag"], distractors: ["Wat", "buiten", "morgen", "zijn", "temperatuur"], tip: "🔑 weer = 天氣，vandaag = 今天，morgen = 明天；天氣是荷蘭人超愛聊的話題！", context: "開話題" },
      { dutch: "Het regent.", chinese: "下雨了。", words: ["Het", "regent"], distractors: ["Is", "sneeuwt", "waait", "buiten", "nat"], tip: "🔑 regenen = 下雨，荷蘭語天氣句子通常以 Het 開頭", context: "下雨" },
      { dutch: "Het is zonnig.", chinese: "天氣晴朗。", words: ["Het", "is", "zonnig"], distractors: ["mooi", "warm", "bewolkt", "lekker", "koud"], tip: "🔑 zonnig = 晴朗，zon = 太陽；荷蘭人超珍惜晴天！", context: "天晴" },
      { dutch: "Het is bewolkt.", chinese: "天空多雲。", words: ["Het", "is", "bewolkt"], distractors: ["zonnig", "regenachtig", "donker", "grijs", "troebel"], tip: "🔑 bewolkt = 多雲，wolk = 雲（複數 wolken）；荷蘭常見天氣", context: "多雲天" },
      { dutch: "Het is erg koud vandaag.", chinese: "今天非常冷。", words: ["Het", "is", "erg", "koud", "vandaag"], distractors: ["warm", "buiten", "niet", "beetje", "echt"], tip: "🔑 erg = 非常，koud = 冷，warm = 暖，echt = 真的", context: "冷天" },
      { dutch: "Het is warm buiten.", chinese: "外面很暖和。", words: ["Het", "is", "warm", "buiten"], distractors: ["koud", "hot", "erg", "lekker", "zonnig"], tip: "🔑 buiten = 外面，binnen = 裡面；warm 也可以是「溫暖」或「熱」", context: "暖天" },
      { dutch: "Vergeet je paraplu niet.", chinese: "別忘了帶雨傘。", words: ["Vergeet", "je", "paraplu", "niet"], distractors: ["neem", "jas", "vergeten", "mee", "verjaardag"], tip: "🔑 vergeten = 忘記，Vergeet... niet = 別忘了...，paraplu = 雨傘", context: "提醒帶傘" },
      { dutch: "Er staat veel wind.", chinese: "風很大。", words: ["Er", "staat", "veel", "wind"], distractors: ["Is", "waait", "hard", "buiten", "storm"], tip: "🔑 wind = 風，storm = 暴風，Het waait = 風在吹；Er staat veel wind 更口語", context: "颳風" },
      { dutch: "Het wordt morgen beter.", chinese: "明天天氣會好轉。", words: ["Het", "wordt", "morgen", "beter"], distractors: ["vandaag", "slechter", "mooier", "weer", "is"], tip: "🔑 worden = 變得，beter = 更好，slechter = 更差；beter/slechter 是比較級", context: "天氣預報" },
      { dutch: "Het sneeuwt!", chinese: "下雪了！", words: ["Het", "sneeuwt"], distractors: ["Is", "regent", "bevriest", "ijzelt", "sneeuw"], tip: "🔑 sneeuwen = 下雪，荷蘭不常下雪，下雪時大家都很興奮！", context: "下雪" },
      { dutch: "Zet je jas aan, het is koud.", chinese: "穿上外套，天氣很冷。", words: ["Zet", "je", "jas", "aan", "het", "is", "koud"], distractors: ["Doe", "warm", "trui", "buiten", "winter"], tip: "🔑 jas aanzetten = 穿上外套（aanzetten 用於衣物），Doe je jas aan 也可以", context: "提醒穿衣" },
      { dutch: "De zon schijnt.", chinese: "太陽照耀著。", words: ["De", "zon", "schijnt"], distractors: ["maan", "is", "er", "warm", "vandaag"], tip: "🔑 schijnen = 照耀，zon = 太陽，maan = 月亮；De zon schijnt 很詩意", context: "晴天" },
      { dutch: "Ik hou niet van regen.", chinese: "我不喜歡下雨。", words: ["Ik", "hou", "niet", "van", "regen"], distractors: ["ben", "houd", "wel", "sneeuw", "wind"], tip: "🔑 houden van = 喜歡/愛，hou 是口語縮寫。Ik hou van... = 我喜歡...", context: "表達喜好" },
      { dutch: "Het vriest vannacht.", chinese: "今晚會結冰（氣溫零下）。", words: ["Het", "vriest", "vannacht"], distractors: ["regent", "sneeuwt", "vanavond", "morgen", "hard"], tip: "🔑 vriezen = 結冰/零下，vannacht = 今晚，vanavond = 今傍晚", context: "結冰警告" },
      { dutch: "Neem een jas mee!", chinese: "帶件外套去！", words: ["Neem", "een", "jas", "mee"], distractors: ["Pak", "trui", "paraplu", "ook", "vergeet"], tip: "🔑 meenemen = 帶上，mee 是分離動詞的部分，放句尾；jas = 外套", context: "提醒" },
    ]
  },
  {
    id: "work",
    name_zh: "工作與學習",
    name_nl: "Werk & Studie",
    icon: "💼",
    color: "#2C3E50",
    sentences: [
      { dutch: "Wat doe jij voor werk?", chinese: "你是做什麼工作的？", words: ["Wat", "doe", "jij", "voor", "werk"], distractors: ["Hoe", "ben", "uw", "werkt", "beroep"], tip: "🔑 Wat doe jij voor werk? 是最自然的問法，字面「你做什麼為了工作？」", context: "初次認識" },
      { dutch: "Ik ben ingenieur.", chinese: "我是工程師。", words: ["Ik", "ben", "ingenieur"], distractors: ["werk", "heb", "arts", "leraar", "als"], tip: "🔑 常見職業：ingenieur(工程師) arts(醫生) leraar(老師) accountant(會計) programmeur(程式師)", context: "說職業" },
      { dutch: "Ik werk bij een bedrijf.", chinese: "我在一家公司工作。", words: ["Ik", "werk", "bij", "een", "bedrijf"], distractors: ["ga", "ben", "thuis", "kantoor", "voor"], tip: "🔑 bij = 在（某機構）工作時用 bij；bedrijf = 公司/企業", context: "說工作地點" },
      { dutch: "Ik studeer aan de universiteit.", chinese: "我在大學讀書。", words: ["Ik", "studeer", "aan", "de", "universiteit"], distractors: ["werk", "ga", "school", "hogeschool", "naar"], tip: "🔑 studeren = 讀大學，leren = 學習（廣義）；aan de universiteit = 在大學", context: "說學業" },
      { dutch: "Ik leer Nederlands.", chinese: "我在學荷蘭語。", words: ["Ik", "leer", "Nederlands"], distractors: ["spreek", "studeer", "Duits", "Engels", "taal"], tip: "🔑 leren = 學習，很棒！能說這句話的外國人在荷蘭很受歡迎", context: "說語言學習" },
      { dutch: "Mijn werkdag begint om acht uur.", chinese: "我的工作日從八點開始。", words: ["Mijn", "werkdag", "begint", "om", "acht", "uur"], distractors: ["dag", "eindigt", "negen", "tien", "werk"], tip: "🔑 beginnen = 開始，eindigen = 結束；werkdag = 工作日", context: "說工作時間" },
      { dutch: "Ik werk van thuis.", chinese: "我在家工作（遠端工作）。", words: ["Ik", "werk", "van", "thuis"], distractors: ["ga", "ben", "op", "kantoor", "vandaag"], tip: "🔑 van thuis werken = 居家辦公，荷蘭文化很普及的工作方式", context: "說工作模式" },
      { dutch: "We hebben een vergadering om twee uur.", chinese: "我們兩點有個會議。", words: ["We", "hebben", "een", "vergadering", "om", "twee", "uur"], distractors: ["Ik", "heb", "meeting", "drie", "afspraak"], tip: "🔑 vergadering = 會議，afspraak = 約定/預約；meeting 在荷蘭也很常用", context: "說會議" },
      { dutch: "Ik begrijp het niet.", chinese: "我不懂。", words: ["Ik", "begrijp", "het", "niet"], distractors: ["versta", "snap", "weet", "wel", "dat"], tip: "🔑 begrijpen = 理解，verstaan = 聽懂；niet 在有受詞的句子放最後", context: "聽不懂時" },
      { dutch: "Wat betekent dit woord?", chinese: "這個字是什麼意思？", words: ["Wat", "betekent", "dit", "woord"], distractors: ["Hoe", "is", "het", "dat", "zegt"], tip: "🔑 betekenen = 意思是，woord = 字/詞；非常實用的學習句子！", context: "問字義" },
      { dutch: "Ik heb een vraag.", chinese: "我有一個問題。", words: ["Ik", "heb", "een", "vraag"], distractors: ["ben", "stelt", "vraagstuk", "probleem", "punt"], tip: "🔑 vraag = 問題/疑問，probleem = 問題（困難）；區別很重要！", context: "要發問" },
      { dutch: "Kunt u dat nog een keer uitleggen?", chinese: "您可以再解釋一遍嗎？", words: ["Kunt", "u", "dat", "nog", "een", "keer", "uitleggen"], distractors: ["Kan", "jij", "dit", "herhalen", "zeggen"], tip: "🔑 uitleggen = 解釋，keer = 次；nog een keer = 再一次", context: "沒聽懂時" },
      { dutch: "Ik ga op vakantie volgende maand.", chinese: "我下個月要去度假。", words: ["Ik", "ga", "op", "vakantie", "volgende", "maand"], distractors: ["ben", "neem", "week", "vrij", "naar"], tip: "🔑 vakantie = 假期，op vakantie gaan = 去度假；volgende = 下一個", context: "說假期計劃" },
      { dutch: "De les begint om negen uur.", chinese: "課程從九點開始。", words: ["De", "les", "begint", "om", "negen", "uur"], distractors: ["eindigt", "tien", "college", "school", "acht"], tip: "🔑 les = 課，college = 大學課堂，les begint = 課開始了", context: "說上課時間" },
      { dutch: "Ik heb mijn huiswerk gemaakt.", chinese: "我做完作業了。", words: ["Ik", "heb", "mijn", "huiswerk", "gemaakt"], distractors: ["doe", "taken", "af", "klaar", "gedaan"], tip: "🔑 gemaakt 是 maken 的過去分詞，荷蘭語完成時 = heb + 過去分詞", context: "完成作業" },
    ]
  },
  {
    id: "daily",
    name_zh: "日常生活",
    name_nl: "Dagelijks Leven",
    icon: "☀️",
    color: "#D35400",
    sentences: [
      { dutch: "Ik sta om zeven uur op.", chinese: "我七點起床。", words: ["Ik", "sta", "om", "zeven", "uur", "op"], distractors: ["ga", "slaap", "acht", "negen", "bed"], tip: "🔑 opstaan = 起床（分離動詞），op 放句尾；sta op = opstaan 的現在式", context: "說起床時間" },
      { dutch: "Ik ontbijt thuis.", chinese: "我在家吃早餐。", words: ["Ik", "ontbijt", "thuis"], distractors: ["eet", "lunch", "dineer", "buiten", "werk"], tip: "🔑 ontbijten = 吃早餐，lunchen = 吃午餐，dineren = 吃晚餐", context: "說早餐習慣" },
      { dutch: "Ik ga naar het werk met de fiets.", chinese: "我騎腳踏車去上班。", words: ["Ik", "ga", "naar", "het", "werk", "met", "de", "fiets"], distractors: ["tram", "auto", "bus", "trein", "school"], tip: "🔑 met de fiets = 騎腳踏車，met de auto = 開車，met de trein = 搭火車", context: "說通勤方式" },
      { dutch: "Ik ben moe.", chinese: "我累了。", words: ["Ik", "ben", "moe"], distractors: ["heb", "erg", "heel", "ziek", "slaperig"], tip: "🔑 moe = 累，heel moe = 非常累，slaperig = 睡意濃；都是常見狀態", context: "說狀態" },
      { dutch: "Ik ga naar bed.", chinese: "我去睡覺了。", words: ["Ik", "ga", "naar", "bed"], distractors: ["slaap", "thuis", "slapen", "nu", "rest"], tip: "🔑 naar bed gaan = 去睡覺，Welterusten = 晚安（道別時說）", context: "說晚安" },
      { dutch: "Ik doe boodschappen.", chinese: "我去採買（日用品）。", words: ["Ik", "doe", "boodschappen"], distractors: ["ga", "maak", "winkelen", "supermarkt", "haal"], tip: "🔑 boodschappen doen = 採買食物日用品，winkelen = 逛街購物", context: "採買" },
      { dutch: "Ik kook vanavond.", chinese: "我今晚做飯。", words: ["Ik", "kook", "vanavond"], distractors: ["eet", "ben", "gaan", "thuis", "buiten"], tip: "🔑 koken = 煮飯，vanavond = 今傍晚，tonight；往後說 morgenavond = 明晚", context: "說晚餐計劃" },
      { dutch: "Ik heb hoofdpijn.", chinese: "我頭痛。", words: ["Ik", "heb", "hoofdpijn"], distractors: ["ben", "ziek", "buikpijn", "koorts", "moe"], tip: "🔑 pijn = 痛，hoofd = 頭，buik = 肚子；hoofdpijn(頭痛) buikpijn(肚子痛) keelpijn(喉嚨痛)", context: "說身體不適" },
      { dutch: "Ik voel me niet goed.", chinese: "我感覺不舒服。", words: ["Ik", "voel", "me", "niet", "goed"], distractors: ["ben", "heel", "erg", "ziek", "wel"], tip: "🔑 zich voelen = 感覺（身體），me 是反身代詞；Ik voel me goed = 我感覺不錯", context: "身體不舒服" },
      { dutch: "Ik ga sporten.", chinese: "我去運動了。", words: ["Ik", "ga", "sporten"], distractors: ["ben", "loop", "fitnessen", "zwemmen", "wielrennen"], tip: "🔑 sporten = 做運動，fitnessen = 健身，zwemmen = 游泳，hardlopen = 跑步", context: "說運動計劃" },
      { dutch: "We gaan vanavond films kijken.", chinese: "我們今晚看電影。", words: ["We", "gaan", "vanavond", "films", "kijken"], distractors: ["Ik", "television", "netflix", "samen", "thuis"], tip: "🔑 films kijken = 看電影，televisie kijken = 看電視；kijken = 看", context: "說晚上計劃" },
      { dutch: "Ik ga douchen.", chinese: "我去洗澡了。", words: ["Ik", "ga", "douchen"], distractors: ["ben", "neem", "bad", "wassen", "klaar"], tip: "🔑 douchen = 淋浴，een bad nemen = 泡澡；douche = 蓮蓬頭/淋浴間", context: "說日常事務" },
      { dutch: "Ik heb dorst.", chinese: "我渴了。", words: ["Ik", "heb", "dorst"], distractors: ["ben", "drinken", "water", "honger", "heel"], tip: "🔑 dorst = 口渴，honger = 飢餓；Ik heb honger = 我餓了", context: "說口渴" },
      { dutch: "Ik heb honger.", chinese: "我餓了。", words: ["Ik", "heb", "honger"], distractors: ["ben", "eten", "dorst", "erg", "heel"], tip: "🔑 honger hebben = 肚子餓；Ik sterf van de honger！= 我快餓死了！（誇張說法）", context: "說飢餓" },
      { dutch: "Ik ga even een wandeling maken.", chinese: "我去散個步。", words: ["Ik", "ga", "even", "een", "wandeling", "maken"], distractors: ["loop", "buiten", "park", "doen", "fietsen"], tip: "🔑 een wandeling maken = 散步，even = 一下子（輕鬆語氣）；很典型的荷蘭說法", context: "說散步" },
    ]
  },
  {
    id: "health",
    name_zh: "健康與緊急",
    name_nl: "Gezondheid",
    icon: "🏥",
    color: "#C0392B",
    sentences: [
      { dutch: "Ik voel me niet lekker.", chinese: "我感覺身體不太好。", words: ["Ik", "voel", "me", "niet", "lekker"], distractors: ["ben", "heb", "ziek", "goed", "erg"], tip: "🔑 lekker 也用於身體感覺，不只是食物！Niet lekker = 不舒服", context: "說不舒服" },
      { dutch: "Ik heb koorts.", chinese: "我發燒了。", words: ["Ik", "heb", "koorts"], distractors: ["ben", "ziek", "warm", "griep", "verkouden"], tip: "🔑 koorts = 發燒，griep = 流感，verkouden zijn = 感冒", context: "說症狀" },
      { dutch: "Kunt u een dokter bellen?", chinese: "您可以叫醫生嗎？", words: ["Kunt", "u", "een", "dokter", "bellen"], distractors: ["Kan", "arts", "ambulance", "ziekenhuis", "oproepen"], tip: "🔑 dokter/arts = 醫生，bellen = 打電話；緊急時說 Bel een ambulance!", context: "緊急求醫" },
      { dutch: "Waar is de dichtstbijzijnde apotheek?", chinese: "最近的藥局在哪裡？", words: ["Waar", "is", "de", "dichtstbijzijnde", "apotheek"], distractors: ["Hoe", "het", "ziekenhuis", "dichtbij", "hier"], tip: "🔑 dichtstbijzijnde = 最近的（距離），apotheek = 藥局；緊急詞彙", context: "找藥局" },
      { dutch: "Ik heb pijn in mijn rug.", chinese: "我背部疼痛。", words: ["Ik", "heb", "pijn", "in", "mijn", "rug"], distractors: ["ben", "hoofd", "buik", "knie", "schouder"], tip: "🔑 pijn in mijn + 部位 = ...部位疼痛；rug(背) knie(膝蓋) schouder(肩膀)", context: "說疼痛部位" },
      { dutch: "Ik ben allergisch voor penicilline.", chinese: "我對青黴素過敏。", words: ["Ik", "ben", "allergisch", "voor", "penicilline"], distractors: ["heb", "allergie", "aan", "noten", "medicijn"], tip: "🔑 allergisch voor = 對...過敏，在醫療情境很重要的句子", context: "告知過敏" },
      { dutch: "Mag ik een recept?", chinese: "我可以要一張處方箋嗎？", words: ["Mag", "ik", "een", "recept"], distractors: ["Kan", "Heeft", "medicijn", "pillen", "tablets"], tip: "🔑 recept = 處方箋（也是食譜），medicijn = 藥物，pillen = 藥丸", context: "向醫生要處方" },
      { dutch: "Ik heb een ongeluk gehad.", chinese: "我發生意外了。", words: ["Ik", "heb", "een", "ongeluk", "gehad"], distractors: ["ben", "was", "gevallen", "gekregen", "een"], tip: "🔑 ongeluk = 意外/事故，gehad 是 hebben 的過去分詞（完成時）", context: "說意外" },
      { dutch: "Bel een ambulance!", chinese: "叫救護車！", words: ["Bel", "een", "ambulance"], distractors: ["Roep", "politie", "brandweer", "dokter", "hulp"], tip: "🔑 緊急電話：112 是荷蘭的緊急服務號碼（警察/救護/消防）", context: "緊急情況" },
      { dutch: "Ik slaap slecht.", chinese: "我睡得不好。", words: ["Ik", "slaap", "slecht"], distractors: ["ben", "moe", "goed", "weinig", "lang"], tip: "🔑 slecht = 差/壞，goed = 好；slaap goed! = 睡個好覺！", context: "說睡眠" },
      { dutch: "Ik moet rust nemen.", chinese: "我需要休息。", words: ["Ik", "moet", "rust", "nemen"], distractors: ["wil", "heb", "slapen", "liggen", "thuis"], tip: "🔑 moeten = 必須/應該，rust nemen = 休息；rust = 休息/平靜", context: "說需要休息" },
      { dutch: "Hoe lang moet ik wachten?", chinese: "我需要等多久？", words: ["Hoe", "lang", "moet", "ik", "wachten"], distractors: ["laat", "ver", "wil", "kan", "zitten"], tip: "🔑 wachten = 等待，Hoe lang = 多久（時間長度）；候診室超常用", context: "等待時" },
      { dutch: "Ik heb de hele nacht niet geslapen.", chinese: "我整晚沒睡。", words: ["Ik", "heb", "de", "hele", "nacht", "niet", "geslapen"], distractors: ["was", "sliep", "dag", "week", "helemaal"], tip: "🔑 hele = 整個，nacht = 夜晚，geslapen = slapen（睡覺）的過去分詞", context: "說失眠" },
      { dutch: "Drink veel water.", chinese: "多喝水。", words: ["Drink", "veel", "water"], distractors: ["Eet", "neem", "meer", "thee", "sap"], tip: "🔑 命令式：Drink（喝）、Eet（吃）、Neem（拿/吃藥）。很直接的建議說法", context: "給建議" },
      { dutch: "Ik voel me veel beter.", chinese: "我感覺好多了。", words: ["Ik", "voel", "me", "veel", "beter"], distractors: ["ben", "heel", "goed", "lekker", "erg"], tip: "🔑 beter = 更好（比較級），veel beter = 好多了；这是病後回診的好消息！", context: "說康復" },
    ]
  }
];

const CORRECT_MSGS = ["太棒了！🎉", "完美！✨", "做得好！👏", "沒錯！🙌", "厲害！🌟"];
const WRONG_MSGS = ["再試試看！💪", "沒關係，繼續練習！", "快了！加油！🔥", "這句有點難，記起來！"];

class DutchApp {
  constructor() {
    this.currentCategory = null;
    this.sentences = [];
    this.index = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.selectedWords = [];
    this.bankWords = [];
    this.hintUsed = false;
    this._lastDutch = '';
    this._voices = [];
    this._loadVoices();
    this.init();
  }

  _loadVoices() {
    if (!('speechSynthesis' in window)) return;
    const update = () => { this._voices = window.speechSynthesis.getVoices(); };
    update();
    window.speechSynthesis.onvoiceschanged = update;
  }

  _dutchVoice() {
    return this._voices.find(v => v.lang === 'nl-NL')
        || this._voices.find(v => v.lang === 'nl_NL')
        || this._voices.find(v => v.lang.toLowerCase().startsWith('nl'));
  }

  init() {
    this.bindGlobal();
    this.renderHome();
  }

  bindGlobal() {
    document.getElementById("btn-back").onclick   = () => this.showHome();
    document.getElementById("btn-hint").onclick   = () => this.useHint();
    document.getElementById("btn-clear").onclick  = () => this.clearAnswer();
    document.getElementById("btn-check").onclick  = () => this.checkAnswer();
    document.getElementById("btn-next").onclick   = () => this.nextSentence();
    document.getElementById("btn-retry").onclick  = () => this.startCategory(this.currentCategory.id);
    document.getElementById("btn-home").onclick   = () => this.showHome();
    document.getElementById("btn-replay").onclick = () => this.speak(this._lastDutch);
  }

  showHome() {
    window.speechSynthesis && window.speechSynthesis.cancel();
    this.renderHome();
  }

  speak(text) {
    if (!text || !('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    const nlVoice = this._dutchVoice();
    if (this._voices.length > 0 && !nlVoice) {
      document.getElementById("voice-hint").style.display = "";
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang  = 'nl-NL';
    utter.rate  = 0.88;
    utter.pitch = 1;
    if (nlVoice) utter.voice = nlVoice;

    const btn = document.getElementById("btn-replay");
    utter.onstart = () => btn && btn.classList.add("playing");
    utter.onend   = () => btn && btn.classList.remove("playing");
    utter.onerror = () => btn && btn.classList.remove("playing");
    window.speechSynthesis.speak(utter);
  }

  renderHome() {
    this.showScreen("home");
    const grid = document.getElementById("categories-grid");
    grid.innerHTML = CATEGORIES.map(cat => `
      <button class="category-card" style="--card-color:${cat.color}" data-id="${cat.id}">
        <span class="card-icon">${cat.icon}</span>
        <div class="card-name">${cat.name_zh}</div>
        <div class="card-nl">${cat.name_nl}</div>
        <div class="card-count">${cat.sentences.length} 句</div>
      </button>
    `).join("");
    grid.querySelectorAll(".category-card").forEach(btn => {
      btn.onclick = () => this.startCategory(btn.dataset.id);
    });
  }

  startCategory(id) {
    this.currentCategory = CATEGORIES.find(c => c.id === id);
    if (!this.currentCategory) return;
    this.sentences = this.shuffle([...this.currentCategory.sentences]);
    this.index = 0;
    this.score = 0;
    this.streak = 0;
    this.maxStreak = 0;
    this.showScreen("exercise");
    document.getElementById("ex-category-label").textContent = `${this.currentCategory.icon} ${this.currentCategory.name_zh}`;
    this.renderSentence();
  }

  renderSentence() {
    const s = this.sentences[this.index];
    this.hintUsed = false;
    this.selectedWords = [];
    const all = this.shuffle([...s.words, ...(s.distractors || [])]);
    this.bankWords = all.map((w, i) => ({ word: w, id: i }));

    document.getElementById("chinese-prompt").textContent = s.chinese;
    document.getElementById("ex-counter").textContent = `第 ${this.index + 1} / ${this.sentences.length} 句`;

    const fill = document.getElementById("progress-fill");
    fill.style.width = `${(this.index / this.sentences.length) * 100}%`;

    document.getElementById("streak-badge").textContent = `🔥 ${this.streak}`;
    document.getElementById("btn-check").disabled = true;

    this.renderAnswerArea();
    this.renderWordBank();
  }

  renderAnswerArea() {
    const el = document.getElementById("answer-words");
    el.innerHTML = this.selectedWords.map((item, i) => `
      <button class="word-chip in-answer" data-idx="${i}">${item.word}</button>
    `).join("");
    el.querySelectorAll(".word-chip").forEach(btn => {
      btn.onclick = () => this.removeWord(parseInt(btn.dataset.idx));
    });
    document.getElementById("btn-check").disabled = this.selectedWords.length === 0;
  }

  renderWordBank() {
    const el = document.getElementById("word-bank");
    el.innerHTML = this.bankWords.map((item, i) => `
      <button class="word-chip in-bank ${item.hint ? 'hint-chip' : ''}" data-idx="${i}">${item.word}</button>
    `).join("");
    el.querySelectorAll(".word-chip").forEach(btn => {
      btn.onclick = () => this.addWord(parseInt(btn.dataset.idx));
    });
  }

  addWord(bankIdx) {
    const item = this.bankWords[bankIdx];
    if (!item) return;
    this.selectedWords.push(item);
    this.bankWords.splice(bankIdx, 1);
    this.renderAnswerArea();
    this.renderWordBank();
  }

  removeWord(answerIdx) {
    const item = this.selectedWords[answerIdx];
    if (!item) return;
    this.selectedWords.splice(answerIdx, 1);
    this.bankWords.push(item);
    this.renderAnswerArea();
    this.renderWordBank();
  }

  clearAnswer() {
    this.bankWords = [...this.bankWords, ...this.selectedWords];
    this.selectedWords = [];
    this.renderAnswerArea();
    this.renderWordBank();
  }

  useHint() {
    if (this.hintUsed) return;
    const s = this.sentences[this.index];
    const firstWord = s.words[0];
    const bankIdx = this.bankWords.findIndex(item => item.word === firstWord);
    if (bankIdx === -1) return;
    this.hintUsed = true;
    this.bankWords[bankIdx].hint = true;
    this.renderWordBank();
    const btn = document.getElementById("btn-hint");
    btn.textContent = "💡 (已用)";
    btn.disabled = true;
  }

  checkAnswer() {
    const s = this.sentences[this.index];
    const userAnswer = this.selectedWords.map(item => item.word.toLowerCase());
    const correct = s.words.map(w => w.toLowerCase());
    const isCorrect = JSON.stringify(userAnswer) === JSON.stringify(correct);

    if (isCorrect) {
      this.score++;
      this.streak++;
      this.maxStreak = Math.max(this.maxStreak, this.streak);
    } else {
      this.streak = 0;
    }

    document.getElementById("streak-badge").textContent = `🔥 ${this.streak}`;
    this.showFeedback(isCorrect, s);
  }

  showFeedback(isCorrect, sentence) {
    this._lastDutch = sentence.dutch;
    const panel = document.getElementById("feedback-panel");
    panel.className = `feedback-panel ${isCorrect ? "correct" : "wrong"}`;

    document.getElementById("feedback-icon").textContent = isCorrect ? "✅" : "❌";
    document.getElementById("feedback-msg").textContent = isCorrect
      ? CORRECT_MSGS[Math.floor(Math.random() * CORRECT_MSGS.length)]
      : WRONG_MSGS[Math.floor(Math.random() * WRONG_MSGS.length)];

    document.getElementById("correct-sentence").textContent = sentence.dutch;

    const tipBox = document.getElementById("tip-box");
    if (sentence.tip) {
      tipBox.textContent = sentence.tip;
      tipBox.style.display = "";
    } else {
      tipBox.style.display = "none";
    }

    document.getElementById("feedback-overlay").classList.remove("hidden");
    setTimeout(() => this.speak(sentence.dutch), 500);
  }

  nextSentence() {
    document.getElementById("feedback-overlay").classList.add("hidden");
    document.getElementById("btn-hint").textContent = "💡 提示";
    document.getElementById("btn-hint").disabled = false;
    this.index++;
    if (this.index >= this.sentences.length) {
      this.showCompletion();
    } else {
      this.renderSentence();
    }
  }

  showCompletion() {
    this.showScreen("completion");
    const total = this.sentences.length;
    const pct = Math.round((this.score / total) * 100);
    let grade = pct >= 80 ? "good" : pct >= 50 ? "ok" : "";

    document.getElementById("completion-category").textContent =
      `${this.currentCategory.icon} ${this.currentCategory.name_zh}`;

    document.getElementById("completion-stats").innerHTML = `
      <div class="stat-row">
        <span class="stat-label">答對題數</span>
        <span class="stat-value ${grade}">${this.score} / ${total}</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">正確率</span>
        <span class="stat-value ${grade}">${pct}%</span>
      </div>
      <div class="stat-row">
        <span class="stat-label">最長連勝</span>
        <span class="stat-value">${this.maxStreak} 句 🔥</span>
      </div>
    `;
  }

  showScreen(name) {
    document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
    document.getElementById(`screen-${name}`).classList.add("active");
  }

  shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
}

document.addEventListener("DOMContentLoaded", () => new DutchApp());
