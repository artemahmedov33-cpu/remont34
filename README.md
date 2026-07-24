# Уют-Сервис — сайт строительной компании

Статический многостраничный сайт компании **«Уют-Сервис» (ООО «РАН»)** — ремонт и
отделка квартир, домов, офисов и магазинов под ключ в Волгограде и Волжском.

Редизайн сайта [remont34.pro](https://remont34.pro/) — стиль komanda-r
(оливково-сейдж палитра, шрифт Inter, скругления), 25 страниц на общем движке.

## Структура

```
├── index.html                 # Главная
├── repair-apartments.html     # Ремонт квартир
├── home-repair.html           # Ремонт домов
├── office-repair.html         # Ремонт офисов и магазинов
├── cosmetic.html / budget.html / euro.html / designer.html / decorative.html
├── interior-design.html       # Дизайн интерьера
├── online-estimates.html      # Онлайн-смета
├── prices.html                # Прайс
├── contract-warranty.html     # Договор и гарантии
├── insurance.html / ceilings.html / installments.html / partners.html
├── faq.html / reviews.html / stock.html
├── portfolio.html             # Портфолио
├── apartments-photo.html / home-photo.html / office-photo.html  # Галереи объектов
├── contacts.html              # Контакты
├── assets/
│   ├── style.css              # Единые стили (дизайн-движок)
│   └── app.js                 # Меню, модалка, слайдер, FAQ, лайтбокс галерей
├── img/                       # Фото страниц + img/obj/ — реальные объекты портфолио
├── sitemap.xml
├── robots.txt
├── CNAME                      # Домен для GitHub Pages (remont34.pro)
└── .nojekyll                  # Отключает обработку Jekyll на GitHub Pages
```

## Деплой на GitHub Pages

1. Создать репозиторий на GitHub и запушить содержимое этой папки:
   ```bash
   git remote add origin https://github.com/<user>/<repo>.git
   git push -u origin main
   ```
2. В настройках репозитория: **Settings → Pages → Source: Deploy from a branch**,
   ветка `main`, папка `/ (root)`.
3. Кастомный домен `remont34.pro` уже задан в файле `CNAME`. В настройках DNS домена
   добавить записи:
   - `A` записи на IP GitHub Pages: `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - либо `CNAME` на `<user>.github.io`
   Если домен не нужен — удалить файл `CNAME`.

Сайт полностью статический, сборка не требуется — GitHub Pages отдаёт файлы как есть.

## Что нужно доделать перед продакшеном

- **Форма заявки** (`assets/app.js`, функция `submitLead`) сейчас показывает
  «Заявка отправлена», но **никуда не отправляет данные**. Подключить к бэкенду /
  почте / Telegram / CRM (например, [Formspree](https://formspree.io) или свой обработчик).
- Страницы «Бюджетный / Евро / Дизайнерский ремонт» используют нейтральные фото —
  на сайте-источнике у них своих фото не было. Добавить реальные при наличии.
- Отзывы на `reviews.html` — реальные сканы благодарностей; текстовые отзывы на
  главной иллюстративные.

## Контакты компании

- Телефон: 8 (906) 409-00-06
- Email: remo34@yandex.ru
- Города: Волгоград, Волжский
