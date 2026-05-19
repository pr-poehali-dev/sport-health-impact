import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/8028e71d-fc26-45fc-8bdd-b51de853d2b9/files/3dbbbbbe-3150-4b82-adf8-0050adf3e296.jpg";
const SPORTS_IMG = "https://cdn.poehali.dev/projects/8028e71d-fc26-45fc-8bdd-b51de853d2b9/files/dc1a806d-fb6f-48a2-943f-e1dda778573b.jpg";
const GYM_IMG = "https://cdn.poehali.dev/projects/8028e71d-fc26-45fc-8bdd-b51de853d2b9/files/9929d082-9e45-46b6-915e-eaeffea26c7c.jpg";

const benefits = [
  { icon: "Heart", title: "Здоровье сердца", desc: "Регулярные тренировки снижают риск сердечно-сосудистых заболеваний на 35%. Сердце становится сильнее, пульс в покое — ниже.", color: "#E63030" },
  { icon: "Brain", title: "Работа мозга", desc: "Спорт увеличивает выработку нейромедиаторов, улучшает память и концентрацию. После тренировки мозг работает эффективнее на 20%.", color: "#FF6B00" },
  { icon: "Zap", title: "Энергия и сила", desc: "Физическая активность повышает уровень энергии, укрепляет мышцы и кости. Вы чувствуете себя бодрее с каждой тренировкой.", color: "#FFB800" },
  { icon: "Moon", title: "Качество сна", desc: "Тренирующиеся засыпают быстрее и спят глубже. Сон становится более восстанавливающим уже через 2 недели регулярных занятий.", color: "#6B8CFF" },
  { icon: "Shield", title: "Иммунитет", desc: "Умеренные нагрузки укрепляют иммунную систему, снижают частоту ОРВИ и ускоряют восстановление организма.", color: "#4CAF50" },
  { icon: "Smile", title: "Настроение", desc: "При физической нагрузке выделяются эндорфины — гормоны радости. Депрессия и тревожность снижаются уже после первой тренировки.", color: "#FF6B9D" },
];

const sports = [
  {
    name: "Бег",
    emoji: "🏃",
    benefit: "Кардио и похудение",
    desc: "Самый доступный вид спорта. Укрепляет сердце, сжигает калории, улучшает выносливость. Достаточно 30 минут 3 раза в неделю для ощутимого эффекта.",
    stats: [
      { label: "Калорий/час", value: "~600" },
      { label: "Мышечных групп", value: "12+" },
    ],
  },
  {
    name: "Плавание",
    emoji: "🏊",
    benefit: "Полная нагрузка",
    desc: "Задействует все группы мышц, не нагружает суставы. Идеально для людей с травмами или избыточным весом. Развивает дыхательную систему.",
    stats: [
      { label: "Калорий/час", value: "~700" },
      { label: "Мышечных групп", value: "25+" },
    ],
  },
  {
    name: "Велоспорт",
    emoji: "🚴",
    benefit: "Выносливость и ноги",
    desc: "Укрепляет ноги и сердечно-сосудистую систему. Можно кататься на природе или заниматься на велотренажёре. Минимальная нагрузка на суставы.",
    stats: [
      { label: "Калорий/час", value: "~500" },
      { label: "Снижение стресса", value: "40%" },
    ],
  },
  {
    name: "Йога",
    emoji: "🧘",
    benefit: "Гибкость и спокойствие",
    desc: "Развивает гибкость, баланс и силу. Снижает уровень кортизола — гормона стресса. Помогает при болях в спине и улучшает осанку.",
    stats: [
      { label: "Гибкость", value: "+60%" },
      { label: "Снижение стресса", value: "45%" },
    ],
  },
  {
    name: "Силовые",
    emoji: "🏋️",
    benefit: "Мышцы и метаболизм",
    desc: "Увеличивают мышечную массу, ускоряют метаболизм. Тело сжигает больше калорий даже в покое. Укрепляют кости и суставы.",
    stats: [
      { label: "Рост метаболизма", value: "+15%" },
      { label: "Калорий/час", value: "~450" },
    ],
  },
  {
    name: "Футбол",
    emoji: "⚽",
    benefit: "Командный дух",
    desc: "Развивает координацию, скорость и выносливость. Командная игра улучшает социальные навыки и поднимает настроение. Полная кардионагрузка.",
    stats: [
      { label: "Калорий/час", value: "~800" },
      { label: "Дистанция за игру", value: "10 км" },
    ],
  },
];

type WorkoutEntry = {
  id: number;
  date: string;
  sport: string;
  duration: number;
  note: string;
};

const sportsOptions = ["Бег", "Плавание", "Велоспорт", "Йога", "Силовые", "Футбол", "Другое"];

const navLinks = [
  { id: "home", label: "Главная" },
  { id: "benefits", label: "Преимущества" },
  { id: "sports", label: "Виды спорта" },
  { id: "tracker", label: "Трекер" },
];

const sportEmoji: Record<string, string> = {
  "Бег": "🏃",
  "Плавание": "🏊",
  "Велоспорт": "🚴",
  "Йога": "🧘",
  "Силовые": "🏋️",
  "Футбол": "⚽",
  "Другое": "💪",
};

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [workouts, setWorkouts] = useState<WorkoutEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("sport_workouts") || "[]");
    } catch { return []; }
  });
  const [form, setForm] = useState({ sport: "Бег", duration: "", note: "" });
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    localStorage.setItem("sport_workouts", JSON.stringify(workouts));
  }, [workouts]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMenuOpen(false);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); });
      },
      { threshold: 0.4 }
    );
    navLinks.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const addWorkout = () => {
    if (!form.duration) return;
    const entry: WorkoutEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString("ru-RU"),
      sport: form.sport,
      duration: Number(form.duration),
      note: form.note,
    };
    setWorkouts([entry, ...workouts]);
    setForm({ sport: "Бег", duration: "", note: "" });
    setFormVisible(false);
  };

  const removeWorkout = (id: number) => {
    setWorkouts(workouts.filter((w) => w.id !== id));
  };

  const totalMinutes = workouts.reduce((a, w) => a + w.duration, 0);
  const totalSessions = workouts.length;
  const weekSessions = workouts.filter((w) => {
    const parts = w.date.split(".");
    const d = new Date(+parts[2], +parts[1] - 1, +parts[0]);
    const now = new Date();
    const diff = (now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24);
    return diff <= 7;
  }).length;
  const goalProgress = Math.min((weekSessions / 3) * 100, 100);

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-gradient">СПОРТ</span>
            <span className="font-display text-xl font-bold text-white">ЗДОРОВЬЕ</span>
          </button>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`nav-link font-body text-sm font-medium transition-colors ${activeSection === link.id ? "text-[#FF6B00] active" : "text-white/60 hover:text-white"}`}
              >
                {link.label}
              </button>
            ))}
          </div>
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Icon name={menuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden bg-[#141414] border-t border-white/5 px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-left text-white/80 hover:text-[#FF6B00] transition-colors py-1"
              >
                {link.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F0F0F]/60 via-[#0F0F0F]/40 to-[#0F0F0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0F0F0F]/80 via-transparent to-[#0F0F0F]/20" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-16 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/15 border border-[#FF6B00]/30 rounded-full px-4 py-1.5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] pulse-orange block" />
              <span className="font-body text-sm text-[#FF6B00] font-medium">Твой путь к здоровью начинается здесь</span>
            </div>

            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl font-bold leading-none mb-6 animate-slide-up stagger-1">
              СПОРТ —<br />
              <span className="text-gradient">ЛУЧШЕЕ</span><br />
              ЛЕКАРСТВО
            </h1>

            <p className="font-body text-lg text-white/60 leading-relaxed mb-10 animate-fade-in stagger-3 max-w-lg">
              Узнайте, как физическая активность трансформирует здоровье, продлевает жизнь и делает каждый день ярче
            </p>

            <div className="flex flex-wrap gap-4 animate-fade-in stagger-4">
              <button
                onClick={() => scrollTo("benefits")}
                className="gradient-orange text-white font-display text-sm font-semibold px-8 py-4 rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95"
              >
                УЗНАТЬ БОЛЬШЕ
              </button>
              <button
                onClick={() => scrollTo("tracker")}
                className="border border-white/20 text-white font-display text-sm font-semibold px-8 py-4 rounded-full hover:bg-white/10 transition-all"
              >
                МОЙ ТРЕКЕР
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 animate-bounce">
          <Icon name="ChevronDown" size={28} className="text-white/40" />
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bg-[#1A1A1A]/80 backdrop-blur-md border border-white/10 rounded-t-2xl px-6 py-5 grid grid-cols-3 gap-4">
              {[
                { value: "35%", label: "снижение риска болезней сердца" },
                { value: "20%", label: "улучшение работы мозга" },
                { value: "10 лет", label: "дополнительной жизни" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-gradient">{stat.value}</div>
                  <div className="font-body text-xs text-white/40 mt-1 leading-tight">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section id="benefits" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-[#FF6B00] text-sm font-medium tracking-widest uppercase">Научные факты</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">
              ПРЕИМУЩЕСТВА <span className="text-gradient">СПОРТА</span>
            </h2>
            <p className="font-body text-white/50 max-w-lg mx-auto leading-relaxed">
              Каждая тренировка — это инвестиция в своё здоровье. Вот что происходит с вашим телом и разумом
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div
                key={b.title}
                className={`card-glow bg-[#1A1A1A] border border-white/8 rounded-2xl p-6 animate-fade-in stagger-${Math.min(i + 1, 6)}`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: b.color + "22", border: `1px solid ${b.color}44` }}
                >
                  <Icon name={b.icon} fallback="Star" size={22} style={{ color: b.color }} />
                </div>
                <h3 className="font-display text-lg font-semibold mb-3 text-white">{b.title}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
            <img src={GYM_IMG} alt="Тренировка" className="w-full md:w-64 h-48 object-cover rounded-xl" />
            <div>
              <div className="font-body text-[#FF6B00] text-sm font-medium tracking-wider uppercase mb-3">Факт дня</div>
              <h3 className="font-display text-3xl font-bold mb-4">150 МИНУТ В НЕДЕЛЮ</h3>
              <p className="font-body text-white/60 leading-relaxed">
                Всемирная организация здравоохранения рекомендует не менее 150 минут умеренной физической активности в неделю.
                Это всего лишь 21 минута в день — и ваше здоровье кардинально изменится.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* SPORTS */}
      <section id="sports" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-[#FF6B00] text-sm font-medium tracking-widest uppercase">Для каждого</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">
              ВИДЫ <span className="text-gradient">СПОРТА</span>
            </h2>
            <p className="font-body text-white/50 max-w-lg mx-auto leading-relaxed">
              Выберите то, что подходит именно вам. Каждый вид спорта уникален и несёт свою пользу
            </p>
          </div>

          <div className="mb-12">
            <img src={SPORTS_IMG} alt="Виды спорта" className="w-full h-64 sm:h-80 object-cover rounded-2xl" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sports.map((s, i) => (
              <div
                key={s.name}
                className={`card-glow bg-[#1A1A1A] border border-white/8 rounded-2xl p-6 animate-fade-in stagger-${Math.min(i + 1, 6)}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{s.emoji}</span>
                  <span className="font-body text-xs text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20 rounded-full px-3 py-1">
                    {s.benefit}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold mb-3">{s.name}</h3>
                <p className="font-body text-sm text-white/50 leading-relaxed mb-5">{s.desc}</p>
                <div className="flex gap-4 pt-4 border-t border-white/8">
                  {s.stats.map((st) => (
                    <div key={st.label}>
                      <div className="font-display text-lg font-bold text-[#FF6B00]">{st.value}</div>
                      <div className="font-body text-xs text-white/40">{st.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TRACKER */}
      <section id="tracker" className="py-24 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="font-body text-[#FF6B00] text-sm font-medium tracking-widest uppercase">Личный дневник</span>
            <h2 className="font-display text-5xl sm:text-6xl font-bold mt-3 mb-4">
              ТРЕКЕР <span className="text-gradient">ПРОГРЕССА</span>
            </h2>
            <p className="font-body text-white/50 max-w-lg mx-auto leading-relaxed">
              Фиксируйте каждую тренировку и наблюдайте за своим ростом день за днём
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            {[
              { icon: "Dumbbell", label: "Всего тренировок", value: totalSessions, unit: "шт", color: "#FF6B00" },
              { icon: "Clock", label: "Общее время", value: totalMinutes, unit: "мин", color: "#6B8CFF" },
              { icon: "TrendingUp", label: "На этой неделе", value: weekSessions, unit: "из 3 цели", color: "#4CAF50" },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#1A1A1A] border border-white/8 rounded-2xl p-6 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: stat.color + "22" }}
                >
                  <Icon name={stat.icon} fallback="Star" size={22} style={{ color: stat.color }} />
                </div>
                <div>
                  <div className="font-display text-3xl font-bold" style={{ color: stat.color }}>
                    {stat.value}
                    <span className="text-sm text-white/40 font-body font-normal ml-1">{stat.unit}</span>
                  </div>
                  <div className="font-body text-xs text-white/40 mt-0.5">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Goal progress */}
          <div className="bg-[#1A1A1A] border border-white/8 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-display text-lg font-semibold">Цель недели</div>
                <div className="font-body text-sm text-white/40">3 тренировки в неделю</div>
              </div>
              <div className="font-display text-2xl font-bold text-gradient">{Math.round(goalProgress)}%</div>
            </div>
            <div className="h-3 bg-white/10 rounded-full overflow-hidden">
              <div className="progress-bar h-full" style={{ width: `${goalProgress}%` }} />
            </div>
            <div className="mt-3 font-body text-sm text-white/40">
              {weekSessions >= 3
                ? "🎉 Цель выполнена! Отличная работа!"
                : `Ещё ${3 - weekSessions} тренировки до выполнения цели`}
            </div>
          </div>

          {/* Add button */}
          <div className="mb-6">
            <button
              onClick={() => setFormVisible(!formVisible)}
              className="gradient-orange text-white font-display text-sm font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              <Icon name={formVisible ? "X" : "Plus"} size={16} />
              {formVisible ? "ОТМЕНА" : "ДОБАВИТЬ ТРЕНИРОВКУ"}
            </button>
          </div>

          {/* Form */}
          {formVisible && (
            <div className="bg-[#1A1A1A] border border-[#FF6B00]/20 rounded-2xl p-6 mb-6 animate-fade-in">
              <h3 className="font-display text-xl font-semibold mb-5">Новая тренировка</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="font-body text-xs text-white/50 uppercase tracking-wider block mb-2">Вид спорта</label>
                  <select
                    value={form.sport}
                    onChange={(e) => setForm({ ...form, sport: e.target.value })}
                    className="w-full bg-[#0F0F0F] border border-white/15 rounded-xl px-4 py-3 font-body text-sm text-white focus:border-[#FF6B00] focus:outline-none transition-colors"
                  >
                    {sportsOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-body text-xs text-white/50 uppercase tracking-wider block mb-2">Длительность (мин)</label>
                  <input
                    type="number"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="60"
                    className="w-full bg-[#0F0F0F] border border-white/15 rounded-xl px-4 py-3 font-body text-sm text-white focus:border-[#FF6B00] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                </div>
                <div>
                  <label className="font-body text-xs text-white/50 uppercase tracking-wider block mb-2">Заметка</label>
                  <input
                    type="text"
                    value={form.note}
                    onChange={(e) => setForm({ ...form, note: e.target.value })}
                    placeholder="Хорошо потренировался!"
                    className="w-full bg-[#0F0F0F] border border-white/15 rounded-xl px-4 py-3 font-body text-sm text-white focus:border-[#FF6B00] focus:outline-none transition-colors placeholder:text-white/30"
                  />
                </div>
              </div>
              <button
                onClick={addWorkout}
                disabled={!form.duration}
                className="gradient-orange text-white font-display text-sm font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                СОХРАНИТЬ
              </button>
            </div>
          )}

          {/* Workouts list */}
          {workouts.length === 0 ? (
            <div className="bg-[#1A1A1A] border border-white/8 rounded-2xl p-12 text-center">
              <div className="text-5xl mb-4">🏋️</div>
              <div className="font-display text-xl font-semibold mb-2">Пока нет записей</div>
              <div className="font-body text-white/40 text-sm">Добавьте первую тренировку и начните отслеживать прогресс!</div>
            </div>
          ) : (
            <div className="space-y-3">
              {workouts.map((w) => (
                <div
                  key={w.id}
                  className="bg-[#1A1A1A] border border-white/8 rounded-xl px-5 py-4 flex items-center justify-between hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl">{sportEmoji[w.sport] || "💪"}</div>
                    <div>
                      <div className="font-display text-base font-semibold">{w.sport}</div>
                      <div className="font-body text-xs text-white/40 mt-0.5">
                        {w.date} · {w.duration} мин{w.note ? ` · ${w.note}` : ""}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-lg font-bold text-[#FF6B00]">{w.duration}<span className="text-xs text-white/30 ml-1">мин</span></span>
                    <button
                      onClick={() => removeWorkout(w.id)}
                      className="text-white/20 hover:text-red-400 transition-colors p-1"
                    >
                      <Icon name="Trash2" size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/8 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-gradient">СПОРТ</span>
            <span className="font-display text-lg font-bold text-white">ЗДОРОВЬЕ</span>
          </div>
          <p className="font-body text-sm text-white/30 text-center">
            Движение — это жизнь. Начни сегодня.
          </p>
          <div className="flex gap-6">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-body text-xs text-white/30 hover:text-white/70 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}