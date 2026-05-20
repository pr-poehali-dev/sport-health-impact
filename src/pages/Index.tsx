import { useState } from "react";

const sections = [
  { id: "title", label: "Титульный лист" },
  { id: "contents", label: "Оглавление" },
  { id: "intro", label: "Введение" },
  { id: "ch1", label: "Глава 1" },
  { id: "ch2", label: "Глава 2" },
  { id: "ch3", label: "Глава 3" },
  { id: "conclusion", label: "Заключение" },
  { id: "literature", label: "Литература" },
  { id: "appendix", label: "Приложения" },
];

export default function Index() {
  const [active, setActive] = useState("title");

  const scrollTo = (id: string) => {
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "Times New Roman, serif", background: "#f5f0e8", minHeight: "100vh", display: "flex" }}>

      {/* Боковое меню */}
      <aside style={{
        width: 220,
        background: "#1a1a2e",
        position: "fixed",
        top: 0, left: 0, bottom: 0,
        display: "flex",
        flexDirection: "column",
        padding: "32px 0",
        zIndex: 100,
        boxShadow: "2px 0 12px rgba(0,0,0,0.3)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 32, padding: "0 16px" }}>
          <div style={{ color: "#c8a96e", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>Реферат</div>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: "bold", lineHeight: 1.4 }}>Влияние спорта на здоровье</div>
        </div>
        <nav style={{ flex: 1 }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "10px 24px",
                background: active === s.id ? "rgba(200,169,110,0.18)" : "transparent",
                borderLeft: active === s.id ? "3px solid #c8a96e" : "3px solid transparent",
                color: active === s.id ? "#c8a96e" : "rgba(255,255,255,0.9)",
                fontSize: 13,
                fontFamily: "Arial, sans-serif",
                cursor: "pointer",
                transition: "all 0.2s",
                border: "none",
                borderLeftWidth: 3,
                borderLeftStyle: "solid",
                borderLeftColor: active === s.id ? "#c8a96e" : "transparent",
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>
        <div style={{ padding: "16px 24px", color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "Arial, sans-serif" }}>
          2025 г.
        </div>
      </aside>

      {/* Основной контент */}
      <main style={{ marginLeft: 220, flex: 1, padding: "40px 60px 80px", maxWidth: 860 }}>

        {/* ТИТУЛЬНЫЙ ЛИСТ */}
        <section id="title" style={pageStyle}>
          <div style={{ textAlign: "center", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 14, marginBottom: 4 }}>Министерство образования и науки Российской Федерации</p>
              <p style={{ fontSize: 14, marginBottom: 24 }}>МКОУ Старокриушанская СОШ</p>
              <div style={{ borderTop: "1px solid #333", borderBottom: "1px solid #333", padding: "6px 0", marginBottom: 60 }}>
                <p style={{ fontSize: 13, margin: 0 }}>Предмет: <b>Биология</b></p>
              </div>
            </div>

            <div>
              <p style={{ fontSize: 14, marginBottom: 12, letterSpacing: 1 }}>РЕФЕРАТ</p>
              <p style={{ fontSize: 14, marginBottom: 4 }}>на тему:</p>
              <h1 style={{ fontSize: 22, fontWeight: "bold", lineHeight: 1.5, margin: "0 auto 60px", maxWidth: 480 }}>
                «Влияние спорта на здоровье человека»
              </h1>
            </div>

            <div style={{ textAlign: "right", fontSize: 14, lineHeight: 2 }}>
              <p><b>Выполнил:</b> ученик 10 класса</p>
              <p>Денисенко Богдан Александрович</p>
              <br />
              <p><b>Проверила:</b></p>
              <p>Степовая Елена Васильевна</p>
            </div>

            <div style={{ textAlign: "center", fontSize: 14, marginTop: 40 }}>
              <p>с. Старая Криуша, 2025 г.</p>
            </div>
          </div>
        </section>

        {/* ОГЛАВЛЕНИЕ */}
        <section id="contents" style={pageStyle}>
          <h2 style={chapterTitle}>ОГЛАВЛЕНИЕ</h2>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, lineHeight: 2.2 }}>
            <tbody>
              {[
                ["Введение", "3"],
                ["Глава 1. Влияние спорта на физическое здоровье", "4"],
                ["1.1. Сердечно-сосудистая система", "4"],
                ["1.2. Опорно-двигательный аппарат", "5"],
                ["1.3. Иммунная система", "5"],
                ["Глава 2. Влияние спорта на психическое здоровье", "6"],
                ["2.1. Снижение стресса и тревожности", "6"],
                ["2.2. Улучшение сна и настроения", "7"],
                ["Глава 3. Виды спорта и их польза", "8"],
                ["3.1. Аэробные нагрузки", "8"],
                ["3.2. Силовые тренировки", "9"],
                ["3.3. Йога и растяжка", "9"],
                ["Заключение", "10"],
                ["Список литературы", "11"],
                ["Приложения", "12"],
              ].map(([name, page]) => (
                <tr key={name}>
                  <td style={{ color: "#111" }}>{name}</td>
                  <td style={{ textAlign: "right", color: "#111", whiteSpace: "nowrap", paddingLeft: 8 }}>
                    <span style={{ borderBottom: "1px dotted #999", display: "inline-block", width: "100%", minWidth: 120 }} />
                    {page}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* ВВЕДЕНИЕ */}
        <section id="intro" style={pageStyle}>
          <h2 style={chapterTitle}>ВВЕДЕНИЕ</h2>
          <p style={paraStyle}>
            Здоровье человека является одной из главных ценностей в жизни. В современном мире, когда большинство людей ведёт малоподвижный образ жизни, проблема физической активности становится особенно актуальной. Гиподинамия — одна из главных угроз здоровью XXI века.
          </p>
          <p style={paraStyle}>
            <b>Актуальность темы</b> обусловлена тем, что, по данным Всемирной организации здравоохранения (ВОЗ), более 1,4 миллиарда взрослых людей в мире недостаточно физически активны. Это приводит к развитию хронических заболеваний, снижению продолжительности жизни и ухудшению её качества.
          </p>
          <p style={paraStyle}>
            <b>Цель реферата:</b> изучить влияние регулярной физической активности и занятий спортом на здоровье человека.
          </p>
          <p style={paraStyle}><b>Задачи:</b></p>
          <ol style={{ ...paraStyle, paddingLeft: 32 }}>
            <li>Рассмотреть влияние спорта на физическое здоровье человека.</li>
            <li>Изучить воздействие физической активности на психическое состояние.</li>
            <li>Охарактеризовать основные виды спорта и их пользу для организма.</li>
            <li>Сформулировать выводы и практические рекомендации.</li>
          </ol>
          <p style={paraStyle}>
            <b>Объект исследования:</b> здоровье человека.
          </p>
          <p style={paraStyle}>
            <b>Предмет исследования:</b> влияние спорта и физических упражнений на организм человека.
          </p>
          <p style={paraStyle}>
            <b>Методы исследования:</b> анализ научной и учебной литературы, обобщение и систематизация данных.
          </p>
        </section>

        {/* ГЛАВА 1 */}
        <section id="ch1" style={pageStyle}>
          <h2 style={chapterTitle}>ГЛАВА 1. ВЛИЯНИЕ СПОРТА НА ФИЗИЧЕСКОЕ ЗДОРОВЬЕ</h2>

          <h3 style={subTitle}>1.1. Сердечно-сосудистая система</h3>
          <p style={paraStyle}>
            Регулярные физические упражнения оказывают выраженное положительное воздействие на сердечно-сосудистую систему. При систематических тренировках сердечная мышца укрепляется, увеличивается ударный объём крови, снижается частота сердечных сокращений в состоянии покоя. У тренированных людей пульс в покое составляет 50–60 ударов в минуту, тогда как у нетренированных — 70–80 ударов.
          </p>
          <p style={paraStyle}>
            По данным ВОЗ, регулярная физическая активность снижает риск развития ишемической болезни сердца на 35%, риск инсульта — на 25%. Физические нагрузки способствуют нормализации артериального давления, улучшению состава крови и укреплению стенок сосудов.
          </p>

          <h3 style={subTitle}>1.2. Опорно-двигательный аппарат</h3>
          <p style={paraStyle}>
            Спортивные нагрузки оказывают значительное влияние на состояние костной и мышечной ткани. Под воздействием регулярных упражнений повышается минеральная плотность костей, что снижает риск остеопороза и переломов. Мышечная масса увеличивается, улучшается координация движений и гибкость суставов.
          </p>
          <p style={paraStyle}>
            Особенно важна физическая активность в период роста — у детей и подростков. В этом возрасте закладывается основа опорно-двигательного аппарата, формируются осанка и правильные двигательные стереотипы.
          </p>

          <h3 style={subTitle}>1.3. Иммунная система</h3>
          <p style={paraStyle}>
            Умеренные физические нагрузки существенно укрепляют иммунитет. При регулярных занятиях спортом увеличивается количество иммунных клеток — Т-лимфоцитов и натуральных киллеров, повышается активность иммунного ответа. Исследования показывают, что люди, занимающиеся спортом 3–5 раз в неделю, болеют простудными заболеваниями в 2 раза реже, чем ведущие малоподвижный образ жизни.
          </p>
          <p style={paraStyle}>
            Важно, однако, соблюдать меру: чрезмерные перегрузки, напротив, могут временно ослаблять иммунную защиту организма.
          </p>
        </section>

        {/* ГЛАВА 2 */}
        <section id="ch2" style={pageStyle}>
          <h2 style={chapterTitle}>ГЛАВА 2. ВЛИЯНИЕ СПОРТА НА ПСИХИЧЕСКОЕ ЗДОРОВЬЕ</h2>

          <h3 style={subTitle}>2.1. Снижение стресса и тревожности</h3>
          <p style={paraStyle}>
            Физические упражнения являются одним из наиболее эффективных способов борьбы со стрессом. Во время нагрузки в организме выделяются эндорфины — нейромедиаторы, вызывающие ощущение радости и эйфории. Этот феномен получил название «эйфория бегуна». Помимо этого, физическая активность снижает уровень кортизола — гормона стресса.
          </p>
          <p style={paraStyle}>
            Регулярные занятия спортом уменьшают симптомы тревожного расстройства и депрессии. По данным ряда исследований, эффективность физических упражнений при лёгкой и умеренной депрессии сопоставима с эффективностью медикаментозного лечения. При этом спорт лишён побочных эффектов лекарственных препаратов.
          </p>

          <h3 style={subTitle}>2.2. Улучшение сна и настроения</h3>
          <p style={paraStyle}>
            Люди, регулярно занимающиеся физическими упражнениями, засыпают быстрее, спят глубже и просыпаются более отдохнувшими. Физическая активность нормализует циркадные ритмы организма, снижает возбудимость нервной системы и способствует более полноценному восстановлению во сне.
          </p>
          <p style={paraStyle}>
            Доказано также, что спорт повышает самооценку и уверенность в себе. Достижение спортивных результатов, улучшение физической формы и внешнего вида формируют позитивное отношение к себе и своим возможностям.
          </p>
          <p style={paraStyle}>
            Помимо индивидуальных занятий, командные виды спорта развивают коммуникативные навыки, учат работать в коллективе и преодолевать трудности сообща, что благоприятно сказывается на общем психологическом климате.
          </p>
        </section>

        {/* ГЛАВА 3 */}
        <section id="ch3" style={pageStyle}>
          <h2 style={chapterTitle}>ГЛАВА 3. ВИДЫ СПОРТА И ИХ ПОЛЬЗА</h2>

          <h3 style={subTitle}>3.1. Аэробные нагрузки</h3>
          <p style={paraStyle}>
            К аэробным (кардио) нагрузкам относятся бег, плавание, езда на велосипеде, ходьба, танцы. Они характеризуются длительной работой с умеренной интенсивностью при достаточном поступлении кислорода. Основная польза аэробных упражнений — тренировка сердечно-сосудистой и дыхательной систем.
          </p>
          <p style={paraStyle}>
            ВОЗ рекомендует взрослым людям выполнять не менее 150 минут аэробной нагрузки умеренной интенсивности или 75 минут интенсивной аэробной активности в неделю. Для подростков норма составляет не менее 60 минут ежедневно.
          </p>
          <p style={paraStyle}>
            Плавание является одним из наиболее физиологичных видов спорта: оно задействует все группы мышц, снимает нагрузку с суставов и позвоночника, эффективно развивает дыхательный аппарат.
          </p>

          <h3 style={subTitle}>3.2. Силовые тренировки</h3>
          <p style={paraStyle}>
            Силовые упражнения (работа с отягощениями, упражнения с собственным весом) направлены на развитие мышечной силы и выносливости. Они способствуют росту мышечной массы, повышению плотности костей, ускорению обмена веществ. Ускоренный метаболизм сохраняется в течение нескольких часов после окончания тренировки.
          </p>
          <p style={paraStyle}>
            Силовые тренировки особенно важны в пожилом возрасте, когда естественная потеря мышечной массы (саркопения) снижает качество жизни и повышает риск падений и травм. Регулярные силовые нагрузки позволяют замедлить этот процесс.
          </p>

          <h3 style={subTitle}>3.3. Йога и растяжка</h3>
          <p style={paraStyle}>
            Йога сочетает в себе физические упражнения, дыхательные практики и элементы медитации. Регулярные занятия йогой развивают гибкость, улучшают осанку, укрепляют мышцы-стабилизаторы, снижают уровень стресса. Растяжка помогает предотвратить травмы, ускоряет восстановление мышц после нагрузок.
          </p>
          <p style={paraStyle}>
            Исследования подтверждают, что занятия йогой снижают уровень тревожности на 40–50%, улучшают качество сна и повышают общее самочувствие. Данный вид физической активности доступен людям всех возрастов и уровней физической подготовки.
          </p>
        </section>

        {/* ЗАКЛЮЧЕНИЕ */}
        <section id="conclusion" style={pageStyle}>
          <h2 style={chapterTitle}>ЗАКЛЮЧЕНИЕ</h2>
          <p style={paraStyle}>
            В ходе написания реферата были изучены основные аспекты влияния спорта и физической активности на здоровье человека. Проведённый анализ позволяет сделать следующие выводы.
          </p>
          <p style={paraStyle}>
            Во-первых, регулярная физическая активность оказывает комплексное положительное воздействие на физическое здоровье человека: укрепляет сердечно-сосудистую систему, опорно-двигательный аппарат и иммунитет, снижает риск развития хронических заболеваний.
          </p>
          <p style={paraStyle}>
            Во-вторых, спорт является эффективным средством поддержания психического здоровья: снижает уровень стресса и тревожности, улучшает качество сна, повышает самооценку и настроение.
          </p>
          <p style={paraStyle}>
            В-третьих, различные виды физической активности — аэробные нагрузки, силовые тренировки, йога — дополняют друг друга и позволяют комплексно воздействовать на организм.
          </p>
          <p style={paraStyle}>
            Таким образом, занятия спортом являются одним из наиболее доступных и эффективных способов сохранения и укрепления здоровья. Физическая активность должна стать неотъемлемой частью образа жизни каждого человека вне зависимости от возраста.
          </p>
          <p style={paraStyle}>
            Для школьников и подростков особенно важно выработать привычку к регулярным физическим нагрузкам именно в период роста и формирования организма — это станет залогом здоровья на долгие годы.
          </p>
        </section>

        {/* ЛИТЕРАТУРА */}
        <section id="literature" style={pageStyle}>
          <h2 style={chapterTitle}>СПИСОК ЛИТЕРАТУРЫ</h2>
          <ol style={{ ...paraStyle, paddingLeft: 28, lineHeight: 2.2 }}>
            <li>Амосов Н. М. Раздумья о здоровье. — М.: Физкультура и спорт, 1987. — 64 с.</li>
            <li>Виленский М. Я., Горшков А. Г. Физическая культура и здоровый образ жизни студента. — М.: КноРус, 2013. — 240 с.</li>
            <li>Всемирная организация здравоохранения. Глобальные рекомендации по физической активности для здоровья. — Женева: ВОЗ, 2010. — 60 с.</li>
            <li>Дубровский В. И. Спортивная медицина. — М.: Владос, 2002. — 512 с.</li>
            <li>Купер К. Аэробика для хорошего самочувствия. — М.: Физкультура и спорт, 1989. — 224 с.</li>
            <li>Лищук В. А., Мосткова Е. В. Основы здоровья. — М.: РАМН, 1994. — 134 с.</li>
            <li>Матвеев Л. П. Теория и методика физической культуры. — М.: Физкультура и спорт, 1991. — 543 с.</li>
            <li>Твой друг — физкультура / под ред. Гришиной Г. А. — М.: Просвещение, 2005. — 128 с.</li>
          </ol>
        </section>

        {/* ПРИЛОЖЕНИЯ */}
        <section id="appendix" style={pageStyle}>
          <h2 style={chapterTitle}>ПРИЛОЖЕНИЯ</h2>

          <p style={{ ...paraStyle, textIndent: 0, marginBottom: 32, color: "#111" }}>
            В данном разделе представлены иллюстративные материалы, дополняющие основное содержание реферата.
          </p>

          {/* Приложение 1 */}
          <div style={appendixBlock}>
            <p style={appendixLabel}>Приложение 1</p>
            <p style={appendixCaption}>
              Рисунок 1. Строение сердечно-сосудистой системы человека и влияние физических нагрузок на её работу
            </p>
            <div style={imgWrap}>
              <img
                src="https://cdn.poehali.dev/projects/8028e71d-fc26-45fc-8bdd-b51de853d2b9/files/1a86444e-7379-41e8-9bb0-8b1ed9fb820c.jpg"
                alt="Сердечно-сосудистая система"
                style={imgStyle}
              />
            </div>
            <p style={appendixDesc}>
              Регулярные физические нагрузки укрепляют миокард, снижают частоту сердечных сокращений в покое и нормализуют артериальное давление. У тренированных людей объём сердца на 30–40% больше, чем у нетренированных.
            </p>
          </div>

          {/* Приложение 2 */}
          <div style={appendixBlock}>
            <p style={appendixLabel}>Приложение 2</p>
            <p style={appendixCaption}>
              Рисунок 2. Основные виды физической активности и охватываемые группы мышц
            </p>
            <div style={imgWrap}>
              <img
                src="https://cdn.poehali.dev/projects/8028e71d-fc26-45fc-8bdd-b51de853d2b9/files/5dee3725-e6fb-4683-8585-eb24bc7a47b8.jpg"
                alt="Виды спорта"
                style={imgStyle}
              />
            </div>
            <p style={appendixDesc}>
              Различные виды спорта воздействуют на разные группы мышц и системы организма. Для гармоничного развития рекомендуется сочетать аэробные нагрузки, силовые упражнения и упражнения на гибкость.
            </p>
          </div>

          {/* Приложение 3 */}
          <div style={{ ...appendixBlock, borderBottom: "none", paddingBottom: 0 }}>
            <p style={appendixLabel}>Приложение 3</p>
            <p style={appendixCaption}>
              Рисунок 3. Статистика снижения риска заболеваний при регулярных занятиях спортом (по данным ВОЗ, 2022)
            </p>
            <div style={imgWrap}>
              <img
                src="https://cdn.poehali.dev/projects/8028e71d-fc26-45fc-8bdd-b51de853d2b9/files/1a77b77d-4636-4d82-a25f-e39372c14b2a.jpg"
                alt="Статистика здоровья"
                style={imgStyle}
              />
            </div>
            <p style={appendixDesc}>
              По данным Всемирной организации здравоохранения, регулярная физическая активность снижает риск сердечно-сосудистых заболеваний на 35%, сахарного диабета 2 типа — на 40%, некоторых видов онкологических заболеваний — на 20–30%.
            </p>
          </div>

          {/* Таблица */}
          <div style={{ marginTop: 48 }}>
            <p style={appendixLabel}>Приложение 4</p>
            <p style={appendixCaption}>
              Таблица 1. Рекомендуемый объём физической активности для разных возрастных групп (ВОЗ)
            </p>
            <table style={tableStyle}>
              <thead>
                <tr style={{ background: "#f0f0f0" }}>
                  <th style={thStyle}>Возраст</th>
                  <th style={thStyle}>Вид активности</th>
                  <th style={thStyle}>Норма в неделю</th>
                  <th style={thStyle}>Примечание</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["5–17 лет", "Умеренная и интенсивная", "≥ 60 мин/день", "Включая силовые 3 р/нед."],
                  ["18–64 года", "Умеренная аэробная", "≥ 150–300 мин", "Или 75–150 мин интенсивной"],
                  ["18–64 года", "Силовые упражнения", "≥ 2 раза в неделю", "Все группы мышц"],
                  ["65+ лет", "Умеренная аэробная", "≥ 150 мин", "Упражнения на баланс 3 р/нед."],
                ].map(([age, type, norm, note], i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}>
                    <td style={tdStyle}>{age}</td>
                    <td style={tdStyle}>{type}</td>
                    <td style={tdStyle}>{norm}</td>
                    <td style={tdStyle}>{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p style={{ fontSize: 12, color: "#333", marginTop: 8, fontStyle: "italic", fontFamily: "Times New Roman, serif" }}>
              Источник: ВОЗ. Глобальные рекомендации по физической активности для здоровья. — Женева, 2022.
            </p>
          </div>
        </section>

      </main>
    </div>
  );
}

const pageStyle: React.CSSProperties = {
  background: "#fff",
  minHeight: 900,
  marginBottom: 40,
  padding: "80px 80px 60px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.10)",
  borderRadius: 2,
  position: "relative",
};

const chapterTitle: React.CSSProperties = {
  fontSize: 16,
  fontWeight: "bold",
  textAlign: "center",
  textTransform: "uppercase",
  letterSpacing: 1,
  marginBottom: 28,
  marginTop: 0,
};

const subTitle: React.CSSProperties = {
  fontSize: 15,
  fontWeight: "bold",
  marginTop: 28,
  marginBottom: 12,
};

const paraStyle: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 2,
  textAlign: "justify",
  textIndent: 36,
  marginBottom: 14,
  color: "#111",
};

const appendixBlock: React.CSSProperties = {
  borderBottom: "1px dashed #ccc",
  paddingBottom: 40,
  marginBottom: 40,
};

const appendixLabel: React.CSSProperties = {
  fontFamily: "Times New Roman, serif",
  fontSize: 14,
  fontWeight: "bold",
  color: "#333",
  marginBottom: 4,
  marginTop: 0,
};

const appendixCaption: React.CSSProperties = {
  fontFamily: "Times New Roman, serif",
  fontSize: 13,
  fontStyle: "italic",
  color: "#111",
  textAlign: "center",
  marginBottom: 16,
  marginTop: 0,
};

const imgWrap: React.CSSProperties = {
  border: "1px solid #ddd",
  borderRadius: 4,
  overflow: "hidden",
  marginBottom: 12,
  textAlign: "center",
  background: "#fafafa",
};

const imgStyle: React.CSSProperties = {
  width: "100%",
  maxHeight: 360,
  objectFit: "cover",
  display: "block",
};

const appendixDesc: React.CSSProperties = {
  fontFamily: "Times New Roman, serif",
  fontSize: 13,
  lineHeight: 1.8,
  color: "#111",
  textAlign: "justify",
  textIndent: 36,
  margin: 0,
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  fontFamily: "Times New Roman, serif",
  marginTop: 12,
};

const thStyle: React.CSSProperties = {
  border: "1px solid #bbb",
  padding: "8px 12px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: 13,
};

const tdStyle: React.CSSProperties = {
  border: "1px solid #bbb",
  padding: "7px 12px",
  textAlign: "center",
  fontSize: 13,
};