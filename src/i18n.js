export const LOCALE_STORAGE_KEY = 'vertex-media-locale'
export const LOCALES = ['ru', 'kk', 'uz']

function formatMoney(n) {
  return new Intl.NumberFormat('kk-KZ').format(n)
}

const PRICING_META = [
  { id: 'basic', price: 80000, popular: false, custom: false },
  { id: 'pro', price: 160000, popular: true, custom: false },
  { id: 'max', price: 250000, popular: false, custom: false },
  { id: 'ind', price: null, popular: false, custom: true },
]

export function getPlans(locale) {
  const L = I18N[locale] || I18N.ru
  return PRICING_META.map((m) => ({
    ...m,
    name: L.pricing[m.id].name,
    desc: L.pricing[m.id].desc,
    features: L.pricing[m.id].features,
  }))
}

export function buildWhatsAppUrl(plan, locale) {
  const L = I18N[locale] || I18N.ru
  const base = 'https://wa.me/77056248557'
  let msg
  if (plan.custom) {
    msg = L.waCustom
  } else {
    msg = L.waPlan.replace('{name}', plan.name).replace('{price}', formatMoney(plan.price))
  }
  return `${base}?text=${encodeURIComponent(msg)}`
}

const I18N = {
  ru: {
    htmlLang: 'ru',
    dir: 'ltr',
    langPickerTitle: 'Выберите язык',
    langPickerSubtitle: 'Сайт откроется на выбранном языке. Позже язык можно сменить в шапке.',
    langRu: 'Русский',
    langKk: 'Қазақша',
    langUz: "O'zbekcha",
    langSwitch: 'Язык',
    navLabel: 'Основная навигация',
    navMobile: 'Мобильное меню',
    navHomeSr: 'Vertex.media — на главную',
    ctaOrder: 'Заказать видео',
    menuOpen: 'Открыть меню',
    menuClose: 'Закрыть меню',
    close: 'Закрыть',
    nav: [
      { href: '#features', key: 'features' },
      { href: '#stats', key: 'stats' },
      { href: '#how', key: 'how' },
      { href: '#pricing', key: 'pricing' },
      { href: '#faq', key: 'faq' },
    ],
    navLabels: {
      features: 'Преимущества',
      stats: 'Результаты',
      how: 'Процесс',
      pricing: 'Тарифы',
      faq: 'FAQ',
    },
    heroBadge:
      'Видео для стартапов и бизнеса · Контент‑план · Стратегия',
    heroTitle1: 'Видео, которые',
    heroTitleGrad: 'продают вас',
    heroTitle2: 'стартапам и предпринимателям',
    heroLead:
      'Продаём только видеопакеты: полный контент‑план, стратегия и готовые ролики под соцсети. Вы выбираете объём — от 10 до 30+ видео или индивидуальный формат «всё залетает».',
    heroCtaPricing: 'Смотреть тарифы',
    heroCtaHow: 'Как мы работаем',
    featuresTitle1: 'Почему команды выбирают',
    featuresTitleBrand: 'Vertex Media',
    featuresSub:
      'Один подрядчик на стратегию и продакшн — вы получаете план и ролики, которые можно сразу выкладывать.',
    features: [
      {
        title: 'Контент‑план и стратегия',
        text: 'Полный план публикаций и позиционирование: о чём говорить, в каком формате и зачем зрителю.',
      },
      {
        title: 'Видео под задачу',
        text: 'Reels, Shorts, ролики для соцсетей и сайта — упаковка экспертности и продукта в динамичный формат.',
      },
      {
        title: 'Продакшн «под ключ»',
        text: 'Сценарий, съёмка, монтаж, титры и звук — вы получаете готовые файлы, остаётся только выложить.',
      },
      {
        title: 'Подкаст‑форматы',
        text: 'В старших тарифах — отдельные подкаст‑видео: доверие, длинный контакт и удержание аудитории.',
      },
      {
        title: 'Для стартапов и бизнеса',
        text: 'Говорим на языке предпринимателей: стартапы, малый и средний бизнес, личные бренды.',
      },
      {
        title: 'Фокус на результат',
        text: 'От «Индивидуального» пакета — упор на залетающий контент: хуки, структура, триггеры удержания.',
      },
    ],
    stats: [
      { end: 200, suffix: '+', label: 'отданных видео клиентам', decimals: 0 },
      { end: 4.9, suffix: '', label: 'средняя оценка заказчиков', decimals: 1 },
      { end: 50, suffix: '+', label: 'предпринимателей и стартапов', decimals: 0 },
      { end: 4, suffix: '', label: 'тарифа, включая индивидуальный', decimals: 0 },
    ],
    howTitle1: 'Как',
    howTitleGrad: 'это работает',
    howSub:
      'От брифа до готовых файлов — понятный процесс и сроки без лишней бюрократии.',
    steps: [
      {
        title: 'Бриф и стратегия',
        text: 'Разбираем продукт, ЦА и цели. Формируем полный контент‑план и согласуем форматы роликов.',
      },
      {
        title: 'Производство видео',
        text: 'Сценарии, съёмка или сборка материалов, монтаж — согласовываем тон и подачу на каждом этапе.',
      },
      {
        title: 'Сдача и рост',
        text: 'Передаём готовые файлы под площадки. В тарифе «Максимум» подключаем привлечение клиентов.',
      },
    ],
    testTitle1: 'Клиенты',
    testTitleGrad: 'о нас',
    testSub:
      'Предприниматели и основатели — о пакетах видео, стратегии и ощущении от сотрудничества.',
    testNps: '4.9 / 5 средний NPS',
    testimonials: [
      {
        initials: 'СД',
        hue: 'from-fuchsia-500 to-violet-600',
        name: 'Севинч Даниярова',
        role: 'Директорша, Kadi Home · мебельная компания',
        quote:
          'Мне нужна была сильная подача личного бренда: не образ «директорши в костюме», а я как живая экспертка по мебели и интерьеру. Собрали для меня линию Reels и сторис — в ленте меня узнают, после роликов чаще пишут в директ, клиентам спокойнее доверять компании.',
      },
      {
        initials: 'АД',
        hue: 'from-indigo-500 to-cyan-500',
        name: 'Абдукадиров Дилмурод',
        role: 'Основатель, dm_service · тёплые полы и отопление',
        quote:
          'Заказали пакет на 30 видео: от простых объяснений «как устроен тёплый пол» до кейсов и ответов на типовые вопросы. Контент-план и монтаж на профессиональном уровне — перестали снимать на телефон между объектами, заявки из соцсетей стали ровнее и предсказуемее.',
      },
    ],
    pricingTitle1: 'Тарифы',
    pricingTitleGrad: 'на видео',
    pricingSub:
      'Четыре пакета в тенге: фиксированная цена, понятный состав. Выберите объём роликов под свой этап.',
    popular: 'Популярный',
    priceRequest: 'По запросу',
    priceCustomHint: 'индивидуальная стоимость',
    packagePrice: 'цена пакета',
    btnWa: 'Заказать в WhatsApp',
    btnWaDiscuss: 'Написать в WhatsApp',
    pricing: {
      basic: {
        name: 'Базовый',
        desc: 'Старт для стартапов и предпринимателей',
        features: [
          'Полный контент‑план',
          'Стратегия продвижения и подачи',
          '10 готовых видео под ваш бизнес',
        ],
      },
      pro: {
        name: 'Про',
        desc: 'То же, что в Базовом — больше объём',
        features: [
          'Всё, что входит в тариф «Базовый»',
          '20 видео вместо 10',
        ],
      },
      max: {
        name: 'Максимум',
        desc: 'Максимальный пакет с лидогенерацией',
        features: [
          'Всё, что в тарифах «Базовый» и «Про»',
          '30 видео',
          '3 подкаст‑видео',
          'Привлечение клиентов (лидогенерация)',
        ],
      },
      ind: {
        name: 'Индивидуальный',
        desc: 'Мало роликов — максимум «залёта»',
        features: [
          '15 премиум‑видео',
          'Каждый ролик заточен под охваты и виральность',
          'Индивидуальная подача под ваш продукт и ЦА',
        ],
      },
    },
    faqTitle1: 'Вопросы',
    faqTitleGrad: 'и ответы',
    faqSub:
      'Коротко о процессе, сроках и том, как мы встраиваемся в вашу команду.',
    faq: [
      {
        q: 'Кому подходят пакеты?',
        a: 'Стартапам, предпринимателям и действующему бизнесу, которым нужны регулярные видео и понятная стратегия в соцсетях — без найма штатной студии.',
      },
      {
        q: 'Что именно я получаю в «Базовом»?',
        a: 'Полный контент‑план, стратегию подачи и 10 готовых видео в согласованных форматах (Reels, Shorts и т.д.) — сценарий, съёмка/сборка, монтаж.',
      },
      {
        q: 'Чем отличается «Индивидуальный» от «Максимум»?',
        a: '«Максимум» — много роликов + подкасты + привлечение клиентов. «Индивидуальный» — 15 видео с упором на залетающий контент: сильные хуки и упаковка под охваты.',
      },
      {
        q: 'Сколько длится производство?',
        a: 'Сроки зависят от пакета и сложности, обычно обсуждаем календарь на брифе: чтобы вы знали даты сдачи каждой партии роликов.',
      },
      {
        q: 'Можно ли доработать сценарии?',
        a: 'Да. Согласовываем тон, тезисы и призывы до съёмки или монтажа — вы в курсе, что именно скажете аудитории.',
      },
      {
        q: 'Работаете по договору и предоплате?',
        a: 'Фиксируем состав пакета и стоимость в договоре. Условия оплаты (предоплата / этапы) обсуждаем индивидуально при бронировании слота.',
      },
    ],
    bottomHintBefore: 'Остались вопросы? Напишите нам в',
    bottomHintAfter: '.',
    footerAbout:
      'Видеопакеты для стартапов и бизнеса: контент‑план, стратегия и готовые ролики — от базового объёма до «залетающего» индивидуального формата.',
    footerColServices: 'Услуги',
    footerColCompany: 'Компания',
    footerColResources: 'Ресурсы',
    footerColLegal: 'Правовая информация',
    footerServices: ['Видеопакеты', 'Контент‑план', 'Подкаст‑видео', 'Привлечение клиентов'],
    footerCompany: ['О нас', 'Карьера', 'Кейсы', 'Контакты'],
    footerResources: ['Блог', 'Гайды', 'Вебинары', 'Медиакит'],
    footerLegal: ['Политика конфиденциальности', 'Оферта', 'Cookies'],
    footerCopyright: 'Все права защищены.',
    footerTagline: 'Видео под стартапы и предпринимателей',
    orderModalTitle: 'Выберите тариф',
    orderModalSub:
      'Нажмите на пакет — откроется WhatsApp (+7 705 624 8557) с уже заполненным сообщением о выбранном тарифе.',
    orderModalCloseOverlay: 'Закрыть окно выбора тарифа',
    orderModalOrder: 'Заказать этот тариф',
    waCustom:
      'Здравствуйте! Интересует индивидуальный тариф Vertex.media (15 премиум-видео, фокус на охваты).',
    waPlan:
      'Здравствуйте! Хочу заказать пакет видео — тариф «{name}», {price} ₸.',
  },

  kk: {
    htmlLang: 'kk',
    dir: 'ltr',
    langPickerTitle: 'Тілді таңдаңыз',
    langPickerSubtitle:
      'Сайт таңдалған тілде ашылады. Кейін жоғарыдағы мәзірден тілді өзгертуге болады.',
    langRu: 'Орысша',
    langKk: 'Қазақша',
    langUz: "Өзбекше (Lotin)",
    langSwitch: 'Тіл',
    navLabel: 'Негізгі мәзір',
    navMobile: 'Мобильді мәзір',
    navHomeSr: 'Vertex.media — басты бетке',
    ctaOrder: 'Бейне тапсырыс беру',
    menuOpen: 'Мәзірді ашу',
    menuClose: 'Жабу',
    close: 'Жабу',
    nav: [
      { href: '#features', key: 'features' },
      { href: '#stats', key: 'stats' },
      { href: '#how', key: 'how' },
      { href: '#pricing', key: 'pricing' },
      { href: '#faq', key: 'faq' },
    ],
    navLabels: {
      features: 'Артықшылықтар',
      stats: 'Нәтижелер',
      how: 'Процесс',
      pricing: 'Тарифтер',
      faq: 'FAQ',
    },
    heroBadge:
      'Стартаптар мен бизнес үшін бейне · Контент-жоспар · Стратегия',
    heroTitle1: 'Сізді сататын',
    heroTitleGrad: 'бейнелер',
    heroTitle2: 'стартаптарға және кәсіпкерлерге',
    heroLead:
      'Тек бейне пакеттер сатамыз: толық контент-жоспар, стратегия және әлеуметтік желілерге дайын роликтер. Көлемді таңдаңыз — 10-нан 30+ бейнеге дейін немесе жеке «вирал» формат.',
    heroCtaPricing: 'Тарифтерді көру',
    heroCtaHow: 'Қалай жұмыс істейміз',
    featuresTitle1: 'Неге командалар таңдайды',
    featuresTitleBrand: 'Vertex Media',
    featuresSub:
      'Стратегия және продакшн үшін бір подрядчик — жоспар мен дереу жариялайтын роликтер аласыз.',
    features: [
      {
        title: 'Контент-жоспар және стратегия',
        text: 'Жариялау жоспары және позициялау: не туралы, қандай форматта және көрерменге не үшін керек.',
      },
      {
        title: 'Міндетке сай бейне',
        text: 'Reels, Shorts, әлеуметтік желілер мен сайтқа арналған роликтер — эксперттік пен өнімді динамикалық форматта.',
      },
      {
        title: '«Кілтті» продакшн',
        text: 'Сценарий, түсірілім, монтаж, титрлер мен дыбыс — дайын файлдарды аласыз, тек жариялау қалады.',
      },
      {
        title: 'Подкаст форматтары',
        text: 'Жоғары тарифтерде — жеке подкаст-бейнелер: сенім, ұзақ контакт және аудиторияны ұстау.',
      },
      {
        title: 'Стартаптар мен бизнес үшін',
        text: 'Кәсіпкерлер тілінде сөйлейміз: стартаптар, шағын және орта бизнес, жеке брендтер.',
      },
      {
        title: 'Нәтижеге назар',
        text: '«Жеке» пакеттен — вирал контентке басымдық: хук, құрылым, ұстау триггерлері.',
      },
    ],
    stats: [
      { end: 200, suffix: '+', label: 'клиенттерге берілген бейне', decimals: 0 },
      { end: 4.9, suffix: '', label: 'тапсырыс берушілердің орташа бағасы', decimals: 1 },
      { end: 50, suffix: '+', label: 'кәсіпкер мен стартап', decimals: 0 },
      { end: 4, suffix: '', label: 'тариф, жеке пакет қоса', decimals: 0 },
    ],
    howTitle1: 'Бұл',
    howTitleGrad: 'қалай жұмыс істейді',
    howSub:
      'Брифтен дайын файлдарға дейін — түсінікті процесс және мерзімдер, артық бюрократия жоқ.',
    steps: [
      {
        title: 'Бриф және стратегия',
        text: 'Өнім, ЦА және мақсаттарды талдаймыз. Толық контент-жоспар құрамыз және ролик форматтарын келісеміз.',
      },
      {
        title: 'Бейне өндірісі',
        text: 'Сценарийлер, түсірілім немесе материалдарды жинау, монтаж — әр қадамда тон мен подачаны келісеміз.',
      },
      {
        title: 'Тапсыру және өсу',
        text: 'Платформаларға дайын файлдарды береміз. «Максимум» тарифінде клиенттерді тартуды қосамыз.',
      },
    ],
    testTitle1: 'Клиенттер',
    testTitleGrad: 'біз туралы',
    testSub:
      'Кәсіпкерлер мен негізін қалаушылар — бейне пакеттер, стратегия және ынтымақтастық туралы.',
    testNps: '4.9 / 5 орташа NPS',
    testimonials: [
      {
        initials: 'СД',
        hue: 'from-fuchsia-500 to-violet-600',
        name: 'Севинч Даниярова',
        role: 'Директор, Kadi Home · жиһаз компаниясы',
        quote:
          'Жеке брендті мықты ұсыну керек еді: «костюмдегі директор» емес, жиһаз бен интерьер бойынша тірі сарапшы ретінде. Reels және сторис желісін жинақтады — лентада танимын, роликтерден кейін жиірек direct жазады, клиенттер компанияға сенімдірек.',
      },
      {
        initials: 'АД',
        hue: 'from-indigo-500 to-cyan-500',
        name: 'Абдукадиров Дилмурод',
        role: 'Негізін қалаушы, dm_service · жылы пол және жылу',
        quote:
          '30 бейнелік пакет тапсырдық: жылы пол қалай жасалатынының қарапайым түсіндіруінен бастап кейстер мен типтік сұрақтарға жауапқа дейін. Контент-жоспар мен кәсіби монтаж — объектілер арасында телефонға түсірмейміз, әлеуметтік желілерден өтінімдер тұрақтырақ.',
      },
    ],
    pricingTitle1: 'Бейне',
    pricingTitleGrad: 'тарифтері',
    pricingSub:
      'Теңгемен төрт пакет: бекітілген баға, түсінікті құрам. Кезеңіңізге сай ролик көлемін таңдаңыз.',
    popular: 'Танымал',
    priceRequest: 'Сұраныс бойынша',
    priceCustomHint: 'жеке баға',
    packagePrice: 'пакет бағасы',
    btnWa: 'WhatsApp арқылы тапсырыс',
    btnWaDiscuss: 'WhatsApp жазу',
    pricing: {
      basic: {
        name: 'Негізгі',
        desc: 'Стартаптар мен кәсіпкерлерге старт',
        features: [
          'Толық контент-жоспар',
          'Жарнама және подача стратегиясы',
          'Бизнесіңізге 10 дайын бейне',
        ],
      },
      pro: {
        name: 'Про',
        desc: 'Негізгідегінің барлығы — көбірек көлем',
        features: ['«Негізгі» тарифтегі барлық нәрсе', '10 орнына 20 бейне'],
      },
      max: {
        name: 'Максимум',
        desc: 'Лидогенерациямен максималды пакет',
        features: [
          '«Негізгі» және «Про» тарифтеріндегі барлығы',
          '30 бейне',
          '3 подкаст-бейне',
          'Клиенттерді тарту (лидогенерация)',
        ],
      },
      ind: {
        name: 'Жеке',
        desc: 'Аз ролик — максималды «вирал»',
        features: [
          '15 премиум бейне',
          'Әр ролик охват пен виралдыққа бейімделген',
          'Өніміңіз бен ЦА-ңызға жеке подача',
        ],
      },
    },
    faqTitle1: 'Сұрақтар',
    faqTitleGrad: 'және жауаптар',
    faqSub: 'Процесс, мерзімдер және командаңызға қалай енетініміз туралы қысқаша.',
    faq: [
      {
        q: 'Пакеттер кімге сәйкес келеді?',
        a: 'Стартаптарға, кәсіпкерлерге және тұрақты бейне мен әлеуметтік желілерде түсінікті стратегия қажет шағын бизнеске — штаттық студиясыз.',
      },
      {
        q: '«Негізгі» тарифте не аламын?',
        a: 'Толық контент-жоспар, подача стратегиясы және келісілген форматта 10 дайын бейне (Reels, Shorts т.б.) — сценарий, түсірілім/жинау, монтаж.',
      },
      {
        q: '«Жеке» «Максимумнан» несімен ерекшеленеді?',
        a: '«Максимум» — көп ролик + подкасттар + клиенттерді тарту. «Жеке» — 15 бейне, вирал контентке басымдық: күшті хук және охватқа упаковка.',
      },
      {
        q: 'Өндіріс қанша уақыт алады?',
        a: 'Мерзімдер пакет пен күрделілікке байланысты, әдетте брифте кестені талқылаймыз: әр ролик партиясының тапсыру күндерін білесіз.',
      },
      {
        q: 'Сценарийлерді өзгертуге бола ма?',
        a: 'Иә. Тон, тезистер мен шақыруларды түсірілім немесе монтажға дейін келісеміз — аудиторияға не айтатындығыңызды білесіз.',
      },
      {
        q: 'Шарт және алдын ала төлем бойынша жұмыс істейсіздер ме?',
        a: 'Пакет құрамы мен бағаны шартта бекітеміз. Төлем шарттарын (алдын ала / кезеңдер) слот брондау кезінде жеке талқылаймыз.',
      },
    ],
    bottomHintBefore: 'Сұрақтарыңыз бар ма? Бізге жазыңыз',
    bottomHintAfter: ' арқылы.',
    footerAbout:
      'Стартаптар мен бизнес үшін бейне пакеттер: контент-жоспар, стратегия және дайын роликтер — базалық көлемнен жеке «вирал» форматына дейін.',
    footerColServices: 'Қызметтер',
    footerColCompany: 'Компания',
    footerColResources: 'Ресурстар',
    footerColLegal: 'Құқықтық ақпарат',
    footerServices: ['Бейне пакеттер', 'Контент-жоспар', 'Подкаст-бейне', 'Клиенттерді тарту'],
    footerCompany: ['Біз туралы', 'Мансап', 'Кейстер', 'Байланыс'],
    footerResources: ['Блог', 'Гайдтар', 'Вебинарлар', 'Медиакит'],
    footerLegal: ['Құпиялылық саясаты', 'Оферта', 'Cookies'],
    footerCopyright: 'Барлық құқықтар қорғалған.',
    footerTagline: 'Стартаптар мен кәсіпкерлерге арналған бейне',
    orderModalTitle: 'Тарифті таңдаңыз',
    orderModalSub:
      'Пакетті басыңыз — таңдалған тариф туралы дайын хабарламамен WhatsApp (+7 705 624 8557) ашылады.',
    orderModalCloseOverlay: 'Тарифті таңдау терезесін жабу',
    orderModalOrder: 'Осы тарифті тапсырыс беру',
    waCustom:
      'Сәлеметсіз бе! Vertex.media жеке тарифі қызықтырады (15 премиум бейне, охватқа назар).',
    waPlan:
      'Сәлеметсіз бе! Бейне пакет тапсырғым келеді — «{name}» тарифі, {price} ₸.',
  },

  uz: {
    htmlLang: 'uz',
    dir: 'ltr',
    langPickerTitle: 'Tilni tanlang',
    langPickerSubtitle:
      'Sayt tanlangan tilda ochiladi. Keyinroq tilni yuqoridagi menyudan o‘zgartirishingiz mumkin.',
    langRu: 'Ruscha',
    langKk: 'Qazaqsha',
    langUz: "O'zbekcha",
    langSwitch: 'Til',
    navLabel: 'Asosiy navigatsiya',
    navMobile: 'Mobil menyu',
    navHomeSr: 'Vertex.media — bosh sahifaga',
    ctaOrder: 'Video buyurtma qilish',
    menuOpen: 'Menyuni ochish',
    menuClose: 'Yopish',
    close: 'Yopish',
    nav: [
      { href: '#features', key: 'features' },
      { href: '#stats', key: 'stats' },
      { href: '#how', key: 'how' },
      { href: '#pricing', key: 'pricing' },
      { href: '#faq', key: 'faq' },
    ],
    navLabels: {
      features: 'Afzalliklar',
      stats: 'Natijalar',
      how: 'Jarayon',
      pricing: 'Tariflar',
      faq: 'FAQ',
    },
    heroBadge:
      'Startaplar va biznes uchun video · Kontent-reja · Strategiya',
    heroTitle1: 'Sizni sotadigan',
    heroTitleGrad: 'videolar',
    heroTitle2: 'startaplar va tadbirkorlarga',
    heroLead:
      'Faqat video-paketlar sotamiz: to‘liq kontent-reja, strategiya va ijtimoiy tarmoqlar uchun tayyor rolliklar. Hajmni tanlang — 10 dan 30+ videogacha yoki individual «viral» format.',
    heroCtaPricing: 'Tariflarni ko‘rish',
    heroCtaHow: 'Qanday ishlaymiz',
    featuresTitle1: 'Jamoa nima uchun tanlaydi',
    featuresTitleBrand: 'Vertex Media',
    featuresSub:
      'Strategiya va prodakshn uchun bitta podryadchi — reja va darhol joylashtirish mumkin bo‘lgan rolliklar.',
    features: [
      {
        title: 'Kontent-reja va strategiya',
        text: 'Nashr rejasi va pozitsiyalash: nimani, qanday formatda va tomoshabin uchun nima uchun aytish.',
      },
      {
        title: 'Vazifaga mos video',
        text: 'Reels, Shorts, ijtimoiy tarmoq va sayt uchun rolliklar — ekspertiza va mahsulotni dinamik formatda.',
      },
      {
        title: '«Kalit tayyor» prodakshn',
        text: 'Senariy, suratga olish, montaj, titrlar va ovoz — tayyor fayllar, faqat joylashtirish qoladi.',
      },
      {
        title: 'Podkast formatlari',
        text: 'Yuqori tariflarda — alohida podkast-videolar: ishonch, uzoq kontakt va auditoriyani ushlab turish.',
      },
      {
        title: 'Startaplar va biznes uchun',
        text: 'Tadbirkorlar tilida gapiramiz: startaplar, kichik va o‘rta biznes, shaxsiy brendlar.',
      },
      {
        title: 'Natijaga e’tibor',
        text: '«Individual» paketdan — viral kontentga urg‘u: hook, struktura, ushlab turish triggerlari.',
      },
    ],
    stats: [
      { end: 200, suffix: '+', label: 'mijozlarga berilgan video', decimals: 0 },
      { end: 4.9, suffix: '', label: 'buyurtmachilarning o‘rtacha bahosi', decimals: 1 },
      { end: 50, suffix: '+', label: 'tadbirkor va startap', decimals: 0 },
      { end: 4, suffix: '', label: 'tarif, individual paket bilan', decimals: 0 },
    ],
    howTitle1: 'Bu',
    howTitleGrad: 'qanday ishlaydi',
    howSub:
      'Brifdan tayyor fayllargacha — tushunarli jarayon va muddatlar, ortiqcha byurokratiyasiz.',
    steps: [
      {
        title: 'Brif va strategiya',
        text: 'Mahsulot, CA va maqsadlarni tahlil qilamiz. To‘liq kontent-reja tuzamiz va rollik formatlarini kelishamiz.',
      },
      {
        title: 'Video ishlab chiqarish',
        text: 'Senariylar, suratga olish yoki materiallarni yig‘ish, montaj — har bosqichda ton va podachani kelishamiz.',
      },
      {
        title: 'Topshirish va o‘sish',
        text: 'Platformalar uchun tayyor fayllarni beramiz. «Maksimum» tarifida mijozlarni jalb qilishni ulaymiz.',
      },
    ],
    testTitle1: 'Mijozlar',
    testTitleGrad: 'biz haqimizda',
    testSub:
      'Tadbirkorlar va asoschilar — video paketlar, strategiya va hamkorlik tajribasi haqida.',
    testNps: '4.9 / 5 o‘rtacha NPS',
    testimonials: [
      {
        initials: 'СД',
        hue: 'from-fuchsia-500 to-violet-600',
        name: 'Sevinch Daniyarova',
        role: 'Direktor, Kadi Home · mebel kompaniyasi',
        quote:
          'Shaxsiy brendni kuchli yetkazish kerak edi: «kostyumdagi direktor» emas, mebel va interyer bo‘yicha jonli ekspert sifatida. Reels va storis liniyasini yig‘ishdi — lentada meni taniydilar, rolliklardan keyin tez-tez direct yozishadi, mijozlar kompaniyaga ishonchliroq.',
      },
      {
        initials: 'АД',
        hue: 'from-indigo-500 to-cyan-500',
        name: 'Abduqodirov Dilmurod',
        role: 'Asoschi, dm_service · issiq pol va isitish',
        quote:
          '30 ta videoli paket buyurtma qildik: issiq pol qanday ishlaydi oddiy tushuntirishdan tortib keys va tipik savollarga javobgacha. Kontent-reja va professional montaj — obyektlar orasida telefonga suratga olmaymiz, ijtimoiy tarmoqlardan arizalar barqarorroq.',
      },
    ],
    pricingTitle1: 'Video',
    pricingTitleGrad: 'tariflari',
    pricingSub:
      'To‘rtta paket tengeda: aniq narx, tushunarli tarkib. Bosqichingizga mos rollik hajmini tanlang.',
    popular: 'Mashhur',
    priceRequest: 'So‘rov bo‘yicha',
    priceCustomHint: 'individual narx',
    packagePrice: 'paket narxi',
    btnWa: 'WhatsApp orqali buyurtma',
    btnWaDiscuss: 'WhatsAppga yozish',
    pricing: {
      basic: {
        name: 'Bazaviy',
        desc: 'Startaplar va tadbirkorlar uchun start',
        features: [
          'To‘liq kontent-reja',
          'Reklama va podacha strategiyasi',
          'Biznesingiz uchun 10 ta tayyor video',
        ],
      },
      pro: {
        name: 'Pro',
        desc: 'Bazaviydagi hamma narsa — ko‘proq hajm',
        features: ['«Bazaviy» tarifidagi hamma narsa', '10 o‘rniga 20 video'],
      },
      max: {
        name: 'Maksimum',
        desc: 'Lidogeneratsiya bilan maksimal paket',
        features: [
          '«Bazaviy» va «Pro» tariflaridagi hamma narsa',
          '30 video',
          '3 ta podkast-video',
          'Mijozlarni jalb qilish (lidogeneratsiya)',
        ],
      },
      ind: {
        name: 'Individual',
        desc: 'Kam rollik — maksimal «viral»',
        features: [
          '15 ta premium video',
          'Har bir rollik qamrov va viral uchun',
          'Mahsulotingiz va CA uchun individual podacha',
        ],
      },
    },
    faqTitle1: 'Savollar',
    faqTitleGrad: 'va javoblar',
    faqSub: 'Jarayon, muddatlar va jamoangizga qanday kirishimiz haqida qisqacha.',
    faq: [
      {
        q: 'Paketlar kimga mos?',
        a: 'Startaplarga, tadbirkorlarga va muntazam video hamda ijtimoiy tarmoqlarda tushunarli strategiya kerak bo‘lgan biznesga — shtat studiyasiz.',
      },
      {
        q: '«Bazaviy»da nimani olaman?',
        a: 'To‘liq kontent-reja, podacha strategiyasi va kelishilgan formatlarda 10 ta tayyor video (Reels, Shorts va hok.) — senariy, suratga olish/yig‘ish, montaj.',
      },
      {
        q: '«Individual» «Maksimum»dan nimasi bilan farq qiladi?',
        a: '«Maksimum» — ko‘p rollik + podkastlar + mijozlarni jalb qilish. «Individual» — 15 video, viral kontentga urg‘u: kuchli hook va qamrovga upakovka.',
      },
      {
        q: 'Ishlab chiqarish qancha davom etadi?',
        a: 'Muddatlar paket va murakkablikka bog‘liq, odatda brifda jadvalni muhokama qilamiz: har bir rollik partiyasining topshirish sanalarini bilasiz.',
      },
      {
        q: 'Senariylarni o‘zgartirish mumkinmi?',
        a: 'Ha. Ton, tezislar va chaqiriqlarni suratga olish yoki montajdan oldin kelishamiz — auditoriyaga nima aytishingizni bilasiz.',
      },
      {
        q: 'Shartnoma va oldindan to‘lov bilan ishlaysizlarmi?',
        a: 'Paket tarkibi va narxni shartnomada qayd etamiz. To‘lov shartlarini (oldindan / bosqichma-bosqich) slot bron qilishda alohida muhokama qilamiz.',
      },
    ],
    bottomHintBefore: 'Savollar qoldimi? Bizga yozing',
    bottomHintAfter: ' orqali.',
    footerAbout:
      'Startaplar va biznes uchun video-paketlar: kontent-reja, strategiya va tayyor rolliklar — bazaviy hajmdan individual «viral» formatgacha.',
    footerColServices: 'Xizmatlar',
    footerColCompany: 'Kompaniya',
    footerColResources: 'Resurslar',
    footerColLegal: 'Huquqiy ma’lumot',
    footerServices: ['Video paketlar', 'Kontent-reja', 'Podkast-video', 'Mijozlarni jalb qilish'],
    footerCompany: ['Biz haqimizda', 'Karyera', 'Keyslar', 'Kontaktlar'],
    footerResources: ['Blog', 'Qo‘llanmalar', 'Vebinarlar', 'Media-kit'],
    footerLegal: ['Maxfiylik siyosati', 'Oferta', 'Cookies'],
    footerCopyright: 'Barcha huquqlar himoyalangan.',
    footerTagline: 'Startaplar va tadbirkorlar uchun video',
    orderModalTitle: 'Tarifni tanlang',
    orderModalSub:
      'Paketni bosing — tanlangan tarif haqida tayyor xabar bilan WhatsApp (+7 705 624 8557) ochiladi.',
    orderModalCloseOverlay: 'Tarif tanlash oynasini yopish',
    orderModalOrder: 'Shu tarifni buyurtma qilish',
    waCustom:
      'Assalomu alaykum! Vertex.media individual tarifi qiziq (15 ta premium video, qamrovga e’tibor).',
    waPlan:
      'Assalomu alaykum! Video paket buyurtma qilmoqchiman — «{name}» tarifi, {price} ₸.',
  },
}

export function getCopy(locale) {
  return I18N[locale] || I18N.ru
}

export { formatMoney }
