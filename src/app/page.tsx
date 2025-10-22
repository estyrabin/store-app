import Header from "./componets/Header/Header";
import Card from "./componets/Card/Card";

const SAMPLE_PRODUCTS = [
  {
    title: "חולצת כותנה לבנה",
    description: "חולצה לבנה קלאסית עשויה 100% כותנה, נושמת ונעימה למגע מתאימה לכל עונה ולכל סגנון לבוש.",
    price: 89,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "גברים",
    type: "חולצה",
  },
  {
    title: "חולצת כותנה שחורה עם הדפס לנשים",
    description: "חולצת כותנה איכותית בצבע שחור עם הדפס אופנתי  מושלמת למראה יומיומי או ערב קליל.",
    price: 159,
    image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb",
    category: "נשים",
    type: "חולצה",
  },
  {
    title: "ג׳קט ג׳ינס",
    description: "ג׳קט ג׳ינס אופנתי בגזרה מודרנית, מושלם לשכבות בימים קרירים.",
    price: 129,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9",
    category: "גברים",
    type: "ג׳קט",
  },
  {
    title: "שעון יד אלגנטי",
    description: "שעון יד בעיצוב יוקרתי עם רצועת עור איכותית משדר סגנון ואלגנטיות.",
    price: 199,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "אקססוריז",
    type: "שעון",
  },
  {
    title: "ג׳ינס שחור",
    description: "ג׳ינס שחור קלאסי עם מתיחה קלה לנוחות מרבית מתאים לכל סגנון לבוש.",
    price: 79,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
    category: "גברים",
    type: "מכנס",
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-[1152px] mx-auto px-8 pb-8">
        <section className="grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {SAMPLE_PRODUCTS.map((item, i) => (
            <Card key={i} {...item} />
          ))}
        </section>
      </main>
    </>
  );
}
