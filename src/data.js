const SEPARATOR = '|'

const wordsFromRules =
    'абажур|авангард|авантюра|антагонизм|аналогия|апартеид|акваланг|акварель|акробат|ансамбль|багровый|банальный|бравада|возражать|галантерея|гармония|гастроли|диапазон|ералаш|кабала|кавычки|каламбур|карнавал|катастрофа|крамола|лаконичный|мадонна|магистраль|макулатура|манифестация|махинация|наваждение|натюрморт|палитра|палисадник|паломник|панихида|панацея|панорама|парадокс|пародия|партитура|пацифист|пластилин|прагматизм|предварять|сарказм|сатира|талисман|трафарет|ураган|фаворит|фанатик|фантасмагория|фарватер|фармакология|фаталист|фламинго|шансонье|эвакуация|эмансипация|эскалатор|эстакада|аплодировать|аромат|афоризм|бокал|бордовый|вояж|ворожея|глобальный|гротеск|досконально|дотация|игнорировать|импозантный|импровизация|коалиция|кобура|коварный|когорта|колорит|колье|комбинат|комплимент|компонент|комфорт|конкретный|конкуренция|конопляник|консилиум|контраст|конферансье|конфликт|конфорка|концепция|корифей|корпорация|корректор|коррупция|корыстный|кощунство|лотерея|лояльный|ностальгия|нотариус|обаяние|обоняние|одолеть|оказия|оккупация|олимпиада|оппонент|оптимист|ореол|оригинальный|орнамент|полемика|портьера|солидарность|соната|сонет|спонтанный|стоматология|торшер|тотальный|тротуар|фольклор|хореография|шовинизм|эволюция|эгоист|экспонат|антология|бегемот|бетон|бечевка|вегетарианец|вестибюль|ветеран|геноцид|дебют|дезертир|деликатес|дефект|идеал|иней|интеллект|кенгуру|креветки|кредит|легион|лелеять|мачеха|мегера|мелодрама|меридиан|метель|метеорит|пенаты|периферия|пессимист|плеяда|преамбула|президент|прерогатива|претензия|регламент|резиденция|резонанс|резюме|режиссер|ренегат|репертуар|референдум|сепаратизм|серенада|сувенир|суверенный|темперамент|тенденция|терапевт|увертюра|федеральный|феерия|фейерверк|фельетон|феномен|хрестоматия|целлюлоза|церемония|чеканить|шевелюра|шезлонг|щепетильный|экзаменатор|эксперимент|экспертиза|винегрет|бидон|виртуоз|витрина|гигиена|гипотеза|диверсия|дивиденд|дизайн|дилемма|дилижанс|дирижер|диссонанс|дифирамб|дубликат|иждивенец|инициатива|инцидент|квитанция|криминальный|критерий|кульминация|лабиринт|лилипут|линолеум|миниатюра|нивелировать|нигилист|пирамида|плагиат|привилегия|радиатор|ритуал|сигнал|силуэт|симпозиум|сиять|стипендия|тирания|триада|тривиальный|триумф|ультиматум|уникальный|универсальный|утилитарный|фиаско|филармония|цитадель|цивилизация|цистерна|экипировка|эликсир|эмигрант|шинель|юбилей|энциклопедия|филателия|респектабельный|компрометировать|сентиментальный|экстравагантный|фешенебельный|скомпонованный'
const wordsEmphasis =
    'выгарки|изгарь|пригарь|зоревать|отрасль|росток|Ростов|Ростислав|выросток|ростовщик|полог|равнина|ровесник|уровень|скачок|утварь|пловец|пловчиха|плывуны|сочетать|сочетание|блеснуть|плеснуть|склянка|шествовать|шефствовать|ровесник|косный|яства|фельдъегерь|рассчитать|рассчитывать|расчет|расчетный|расчесть|расчетливый|преамбула|прибор|привет|препятствие|президент|приватный|приоритет|природа|примат|привилегия|престиж|прилежный|презентовать|прерогатива|примитивный|прецедент|превалировать|примадонна|претензия|претендент|взимать|поллитровка|вполголоса|вполоборота|вполглаза|вполуха|пол столовой ложки|пол яблоневого сада|артишок|джонка|жом|жор|изжога|крыжовник|крюшон|мажор|обжора|прожорливый|шоры|чокаться|чопорный|шов|шорох|шок|шомпол|шоркать|шорох|жокей|жонглер|мажордом|шовинизм|шокировать|шоколад|шоссе|шотландский|шофер|герцог|цокотать|цокотуха|цокать|цоколь|чащоба|трещотка|трущоба|ещё|контр-адмирал|перекати-поле|трудодень|уж|замуж|невтерпеж|по двое|по пятеро|действовать в открытую|в насмешку|в рассрочку|в диковинку|сеять|веять|реять|блеять|лаять|таять|чуять|затеять|кашлять|лелеять|надеяться|чаять|каяться|тысяча|миллион|миллиард|двести|триста|четыреста'
const wordsDoubled =
    'кристалл|кристаллический|кристальный|финн|финка|финский|пятитонка|оперетта|оперетка|агрессор|дистиллированный|перрон|аккумулятор|класс|пессимизм|аннулировать|коллегия|пресса|апелляция|коллектив|программа|аппарат|коллоквиум|прогресс|аппетит|колонна|пропеллер|ассистент|профессия|ассоциация|колосс|процесс|аттестат|комиссия|режиссёр|аттракцион|комментарий|репрессия|баллада|коммунизм|рессора|баллон|коммюнике|сумма|ссора|поссориться|рассориться|компрессор|суррогат|баррикада|компромисс|телеграмма|бассейн|конгресс|теннис|бацилла|концессия|терраса|беллетристика|корреспондент|территория|бюллетень|кристалл|террор|ванна|тонна|группа|трасса|дискуссия|кросс|троллейбус|диссертация|масса|труппа|металл|туннель|миллион|хоккей|иллюзия|миссия|целлулоид|иллюминация|кристаллический|оккупация|целлюлоза|иллюстрация|оппозиция|шасси|иммунитет|оппонент|шоссе|интеллигенция|параллель|экспрессия|ирригация|пассажир|эссенция|касса|пассивный|эффект|дифференциация|aгрегат|алюминий|атрибут|бакалавр|балюстрада|вернисаж|волейбол|галерея|десант|десерт|дилетант|импресарио|карикатура|лилипут|нивелир|тротуар|привилегия|продюсер|пудинг|ресурс|кавалерия|унисон'
const wordsWithN =
    'подлинный|искренний|странный|надменный|стеклянный|оловянный|деревянный|ветреный|фазаний|вороний|кабаний|свиной|павлиний|желанный|священный|нечаянный|невиданный|неслыханный|нежданный|неожиданный|недреманный|несчитанный|нетленный|окаянный|деланный|жеманный|чванный|чеканный|штукатуренный|обещанный|негаданный|медленный|долгожданный|обещанный|названый брат|посаженый отец|смышленый мальчик|конченый человек|прощеное воскресенье|приданое невесты|раненый солдат|жеваный|кованый|клеваный|масляное пятно|масленая каша|латаный-перелатаный|штопаный-перештопаный|дружинник|именинник|малинник|мошенник|осинник|рябинник|бесприданница|бессонница|звонница|поленница|гривенник|болезненность|взволнованность|доверенность|жеманница|избалованность|избранник|изгнанник|конница|лиственница|нечаянность|образованность|общественник|организованность|пленник|посланник|привилегированность|производственник|ремесленник|родственник|священник|семенник|собственник|современник|согласованность|туманность|вареник|ветреность|ветреник|ветреница|гостиница|дровяник|конопляник|копчености|костяника|масленица|мудреностъ|торфяник|смышленость'
const wordsAdverbs =
    'вблизи|вбок|вброд|ввек|вверх|вверху|ввечеру|вволю|ввысь|вглубь|вдалеке|вдали|вдаль|вдвое|вдвоем|вдвойне|вдобавок|вдоволь|вдогонку|вдоль|вдосталь|вдребезги|вдруг|вдрызг|взад|взаем|взаймы|взамен|взаперти|взаправду|взапуски|взасос|взатяжку|взашей|вконец|вкось|вкратце|вкривь|вкрутую|вкупе|влево|влет|вместе|вмиг|внакидку|внаклад|внакладку|вначале|вниз|внизу|вничью|внове|вновь|внутри|внутрь|вовек|вовеки|вовремя|вовсе|вовсю|воедино|воистину|вокруг|вообще|воочию|восвояси|вослед|впервые|вперебой|вперевалку|вперегиб|вперегонки|вперед|впереди|вперемежку|вперемешку|вперехват|вплавь|вповалку|вполголоса|вполне|вполоборота|вполовину|вполпути|впопыхах|впору|впоследствии|впотьмах|вправду|вправе|вправо|вприглядку|вприкуску|вприпрыжку|вприсядку|впроголодь|впрок|впросак|впросонок|впрочем|впрямь|впустую|враз|вразбивку|вразброд|вразброс|вразвалку|вразнобой|вразнос|вразрез|вразрядку|врасплох|врассыпную|врастяжку|вровень|врозь|врукопашную|вряд ли|всерьез|всецело|вскачь|вскользь|вскоре|вскорости|всласть|вслед|вслепую|всмятку|встарь|всухомятку|всюду|втайне|втемную|втихомолку|второпях|втридорога|втрое|втроем|вчетверо|вчетвером|вчерне|вчистую|вчуже|вширь|въявь|добела|доверху|доколь|докуда|донельзя|донизу|доныне|допьяна|доселе|досуха|досюда|дотла|дотоле|дотуда|дочиста|задаром|задолго|заживо|зазря|замертво|замуж|замужем|заново|заодно|запанибрата|зараз|затем|зачастую|зачем|извне|издавна|издалека|издали|изжелта|изнутри|изредка|искони|искоса|искрасна|исподволь|исподлобья|исподтишка|испокон|иссиня|исстари|кверху|кзади|книзу|кряду|кстати|набекрень|набело|набок|навек|навеки|наверно|наверное|наверняка|наверх|наверху|навеселе|навечно|навзничь|навзрыд|навряд ли|навсегда|навстречу|навыворот|навыкат|навыкате|навылет|навынос|навыпуск|навырез|навытяжку|наглухо|наголо|наголову|наготове|надвое|надолго|наедине|назавтра|назад|назади|наземь|назло|назубок|наизготове|наизнанку|наизусть|наискосок|наискось|накануне|наконец|накрепко|налево|налегке|налицо|намедни|намного|наоборот|наобум|наотмашь|наотрез|направо|наперебой|наперевес|наперегонки|наперед|наперекор| наперекрест|наперерез|наперерыв|наперехват|наперечет|наповал|наподхват|напоказ|наполовину|напоследок|направо|например|напрокат|напролет|напролом|напропалую|напротив|напрямик|наравне|нараспашку|нараспев|нарасхват|наружу|наряду|насилу|насквозь|насколько|наскоро|насмарку|насмерть|наспех|настежь|настолько|настороже|настрого|насухо|натощак|наугад|наудалую|наудачу|наутек|наутро|нацело|начеку|начерно|начисто|начистоту|наяву|невдалеке|невдомек|невзначай|невмоготу|невмочь|невпопад|невпроворот|невтерпеж|недаром|незадолго|незачем|некстати|ненадолго|неоднократно|неохота|неспроста|оземь|отколе|отнюдь|отроду|отселе|отсюда|оттого|оттуда|отчасти|отчего|поближе|поблизости|побоку|поверх|поверху|повзводно|повсюду|подавно|поделом|подешевле|подобру-поздорову|подолгу|подольше|подряд|подчас|подчистую|позавчера|позади|поистине|покамест|помаленьку|помалу|помимо|помногу|понапрасну|понаслышке|поневоле|понемногу|понизу|поныне|поодаль|поодиночке|поочередно|попарно|поперек|пополам|пополудни|пополуночи|попросту|попусту|поровну|поротно|посейчас|поскольку|послезавтра|посотенно|посреди|посредине|посему|постатейно|постольку|посуху|потихоньку|потом|потому|поутру|почем|почему|поэтому|сбоку|сверх|сверху|свысока|сгоряча|сдуру|сейчас|сзади|слева|слишком|смолоду|снаружи|сначала|снизу|снова|совсем|сослепу|сперва|спервоначала|спереди|сплеча|спозаранку|справа|спросонок|спросонья|спроста|спьяну|сразу|сродни|сроду|сряду|стремглав|сыздавна|сыздетства|сызмала|сызмальства|сызнова|тотчас|чересчур|ез ведома|без запроса|без обиняков|без оглядки|без отказа|без просвета|без просыпу|без разбору|без спросу|без толку|без удержу|без умолку|без устали|бок о бок|в виде|в головах|в диковинку|в добавление|в заключение|в конце концов|в корне|в лоск|в меру|в насмешку|в ногах|в обмен|в обнимку|в одиночку|во избежание|во сто крат|в открытую|в отместку|в охапку|в прах|в противовес|в рассрочку|в розницу|в ряд|в сердцах|в складчину|в срок|в старину|в сторону|в струнку|в тиши|в три погибели|в тупик|в упор|до востребования|до зарезу|до крайности|до неузнаваемости|до отвала|до отказа|до свидания|до сих пор|до смерти|до упаду|за глаза|за границей|за границу|за полночь|за упокой|за что про что|из-за границы|из-под мышек|из-под мышки|из-под спуда|как раз|на авось|на бегу|на боковую|на веки веков|на веки вечные|на вес|на весу|на вид|на виду|на вкус|на время|на выбор|на глаз|на глазах|на глазок|на грех|на диво|на днях|на дом|на дому|на дыбы|на зависть|на запятки|на запятках|на излете|на измор|на износ|на износе|на исходе|на карачках|на карачки|на корточках|на корточки|на лад|на лету|на манер|на миг|на мировую|на нет|на отлете|на отлично|на ощупь|на память|на плаву|на попятную|на попятный|на поруках|на поруки|на прицел|на редкость|на руку|на рысях|на скаку|на славу|на смех|на сносях|на совесть|на страже|на убой|на ура|на ходу|на хорошо|на цыпочках|на цыпочки|на часах (на карауле)|на четвереньках|на четвереньки|не в духе|не в зачет|не в меру|не в пример|не даром (не бесплатно)|не за что|не к добру|не к спеху|не к чему|не по вкусу|не под силу|не по зубам|не по нутру|не по плечу|не прочь|не с руки|ни за что|ни за грош|ни на йоту|нога в ногу|один на один|от мала до велика|по временам|под боком|под вечер|под гору|по дешевке|под исход|под конец|под ложечкой|под ложечку|под мышками|под мышки|под мышкой|под силой|под спуд|под спудом|под стать|по двое|под шумок|под уздцы|под уклон|по крайней мере|по нутру|по одному|по очереди|по преимуществу|по совести|по старинке|по трое|про себя|с боку на бок|с ведома|с виду|с глазу на глаз|с кондачка|слово в слово|слово за слово|с маху|с налета|с наскока|с начала до конца|со всем тем|с панталыку сбиться|с разбегу|с разгона|с размаху|с ходу|с часу на час|час от часу'
const wordsWithPrepositions =
    'ввиду|вроде|вместо|вследствие|наподобие|насчет|между|среди|вдоль|поперек|напротив|позади|мимо|вокруг|через|спустя|согласно|кроме|около|подобно|в виде|по мере|в течение|в силу|в сравнении с|по сравнению с|в продолжение|на протяжении|в отличие от|в заключение|в связи с|в случае|несмотря на|невзирая на|вслед за|по случаю|по поводу|по причине|из-за|из-под|по-над|по-за'

export const CATEGORIES = {
    ALL: 'all',
    RULES: 'rules',
    EMPHASIS: 'emphasis',
    DOUBLED: 'doubled',
    DOUBLED_N: 'doubled-n',
    ADVERBS: 'adverbs',
    PREPOSITIONS: 'prepositions',
}
const DEFAULT_WORDS = [
    {
        category: CATEGORIES.RULES,
        title: 'Исключения из правил',
        words: wordsFromRules.split(SEPARATOR),
    },
    {
        category: CATEGORIES.EMPHASIS,
        title: 'Ударения',
        words: wordsEmphasis.split(SEPARATOR),
    },
    {
        category: CATEGORIES.DOUBLED,
        title: 'Удвоенные согласные',
        words: wordsDoubled.split(SEPARATOR),
    },
    {
        category: CATEGORIES.DOUBLED_N,
        title: '"Н" или "НН"',
        words: wordsWithN.split(SEPARATOR),
    },
    {
        category: CATEGORIES.ADVERBS,
        title: 'Наречия',
        words: wordsAdverbs.split(SEPARATOR),
    },
    {
        category: CATEGORIES.PREPOSITIONS,
        title: 'Слова с предлогами',
        words: wordsWithPrepositions.split(SEPARATOR),
    },
]

export default DEFAULT_WORDS
