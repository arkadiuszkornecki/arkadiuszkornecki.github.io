import "./styles.css";
import { NavLink, Route, Routes, useSearchParams } from "react-router-dom";

const translations = {
  pl: {
    heroTitle: "Rava",
    heroSubtitle:
      "Rava to lekki, autorski język programowania stworzony z myślą o czytelności kodu i prostocie.",
    download: "Pobierz język",
    editor: "Rozszerzenie VS Code",
    sidebarTitle: "Zawartość",
    sidebarNote:
      "Rava jest to fantazyjny projekt języka programowania, którego dalszy rozwój nie jest pewny",
    overview: "Przegląd",
    install: "Instalacja",
    start: "Start coding",
    types: "Typy danych, zmienne i stałe",
    arrays: "Tablice",
    loops: "Pętle",
    comments: "Komentarze",
    fstring: "F-string",
    functions: "Funkcje",
    overviewIntro:
      "Rava ma prostą składnię, która pozwala skupić się na logice zamiast na skomplikowanym zapisie.",
    overviewMore:
      "Kompilator Rava przetwarza kod źródłowy i generuje kod Swift z prostym środowiskiem wykonawczym. Obsługuje typy podstawowe, stałe, tablice i interpolację tekstu oraz pętle for i while.",
    installTitle: "Instalacja",
    installText:
      "Na ten moment Rava nie jest jeszcze dostępna do pobrania. Kiedy będzie gotowa, znajdziesz tutaj instrukcje instalacji.",
    typesTitle: "Typy danych, zmienne i stałe",
    typesText:
      "W Rava każda deklaracja musi zawierać typ. Zmienną definiujesz słowem let, a stałą słowem var. Stałe są niemodyfikowalne po przypisaniu.",
    typesDataTypes: "Dostępne typy danych:",
    typesList: "string, int, double, bool",
    typesVarExample: `let licznik: int = 0;`,
    typesConstExample: `var pi: double = 3.14;`,
    typesUnknownExample: `let licznik: unknown = 0;`,
    arrayTitle: "Tablice",
    arrayText:
      "Tablica to struktura przechowująca wiele wartości tego samego typu. W Rava deklarujesz ją przez let i określasz typ elementów w nawiasach kwadratowych.",
    arrayExample: `let tab: [string] = ["Zero", "Jeden", "Dwa", "Trzy"];`,
    arrayExample2: `let tab: [int] = [0, 1, 2, 3];`,
    arrayExampleDescription:
      "Tablice pozwalają przechowywać zestaw elementów tego samego typu i operować na nich za pomocą pętli oraz indeksów.",
    startTitle: "Start coding",
    startText:
      "Podstawowym poleceniem wejścia/wyjścia w Rava jest funkcja print(). Użyj jej do wyświetlania wartości.",
    printExample: `print("Witaj w Rava");`,
    loopsTitle: "Pętle",
    loopsText:
      "Rava wspiera pętle for i while. For iteruje po zakresie lub kolekcji, while powtarza kod dopóki warunek jest prawdziwy.",
    forRangeExample: `for i in 1..10 {\n  print(i);\n}`,
    forArrayExample: `let tablica = [1, 2, 3, 4, 5];\nfor i in tablica {\n  print(i);\n}`,
    whileExample: `let x = 5;\nwhile (x > 0) {\n  print(x);\n  x = x - 1;\n}`,
    commentsTitle: "Komentarze",
    commentsText:
      "W Rava można używać komentarzy jedno- i wielowierszowych do opisywania kodu lub tymczasowego wyłączania fragmentów.",
    singleCommentExample: `// To jest komentarz jednoliniowy
print("Witaj w Rava");`,
    blockCommentExample: `/*
  To jest komentarz wielowierszowy.
  Możesz opisać tutaj dłuższy fragment.
*/
print("Rava");`,
    fstringTitle: "F-string",
    fstringText:
      "Rava obsługuje interpolację tekstu w stringach za pomocą składni \\().",
    fstringExample: `var lang: string = "Rava";
print("Czesc, jestem \\(lang) nowy język programowania");`,
    examplesTitle: "Przykłady",
    examplesText: "Poniżej przykład użycia pętli i komentarzy w Rava.",
    examplesCode: `let tablica = [1, 2, 3, 4, 5];

for i in tablica {
  // Wypisz elementy tablicy
  print(i);
}

let x = 3;
while (x > 0) {
  print("Zostało: " + x);
  x = x - 1;
}`,
    notesTitle: "Uwaga",
    notesText:
      "Język Rava nie ma jeszcze wielu rzeczy. Materiały na tej stronie przedstawiają aktualny stan składni i plany rozwoju.",
    comingSoon: "W przygotowaniu",
    mathfunctions: "Wbudowane funkcje matematyczne",
    mathfunctionsText:
      "Rava wspiera podstawowe funkcje matematyczne, takie jak pow(), sqrt(), abs(), round(), roundup(), rounddown().",
    powdefinition:
      "Funkcja pow() służy do podnoszenia liczby do potęgi. Funkcja ta przyjmuje dwa argumenty: liczbę i wykładnik potęgi.",
    powexamplecode: `let liczba: double = 2.0;
let potega: double = 3.0;
let wynik: double = pow(liczba, potega);
print("Wynik: \\(wynik)");`,
    sqrtdefinition:
      "Funkcja sqrt() oblicza pierwiastek kwadratowy. Funkcja ta przyjmuje jeden argument: liczbę, dla której ma obliczyć pierwiastek. ",
    sqrtexamplecode: `let liczba: double = 2.0;
let wynik: double = sqrt(liczba);
print("Wynik: \\(wynik)");`,
    absdefinition:
      "Funkcja abs() zwraca wartość bezwzględną. Funkcja ta przyjmuje jeden argument: liczbę z której ma wyliczyć wartość bezwzględną. ",
    absexamplecode: `let liczba: double = -2.52;
let wynik: double = abs(liczba);
print("Wynik: \\(wynik)");`,
    rounddefinition:
      "Funkcja round() zaokrągla liczbę do podanej liczby miejsc po przecinku. Funkcja ta przyjmuje dwa argumenty: liczbę i wartość która okresla ilość miejsc po przecinku.",
    roundexamplecode: `let liczba: double = 2.52;
let wynik: double = round(liczba, 2);
print("Wynik: \\(wynik)");`,
    roundupdefinition:
      "Funkcja roundup() zaokrągla liczbę w górę kiedy ostatnia liczba jest większa od 0. Funkcja ta przyjmuje dwa argumenty: liczbę i wartość która okresla ilość miejsc po przecinku.",
    roundupexamplecode: `let liczba: double = 2.52;
let wynik: double = roundup(liczba, 1);
print("Wynik: \\(wynik)");`,
    rounddowndefinition:
      "Funkcja rounddown() zaokrągla liczbę w dół kiedy ostatnia liczba jest większa od 0. Funkcja ta przyjmuje dwa argumenty: liczbę i wartość która okresla ilość miejsc po przecinku.",
    rounddownexamplecode: `let liczba: double = 2.52;
let wynik: double = rounddown(liczba, 1);
print("Wynik: \\(wynik)");`,
  },
  en: {
    heroTitle: "Rava",
    heroSubtitle:
      "Rava is a lightweight, custom programming language designed for readable code and simplicity.",
    download: "Download language",
    editor: "VS Code extension",
    sidebarTitle: "Contents",
    sidebarNote:
      "Rava is a fancy programming language project whose further development is not certain",
    overview: "Overview",
    install: "Installation",
    start: "Start coding",
    types: "Data types, variables, and constants",
    arrays: "Arrays",
    loops: "Loops",
    comments: "Comments",
    fstring: "F-string",
    functions: "Functions",
    overviewIntro:
      "Rava has a simple syntax that helps you focus on logic instead of complex notation.",
    overviewMore:
      "The Rava compiler translates source files into Swift with a small runtime environment. It supports basic types, constants, arrays, string interpolation, and both for and while loops.",
    installTitle: "Installation",
    installText:
      "At the moment Rava is not yet available for download. When ready, installation instructions will appear here.",
    typesTitle: "Data types, variables, and constants",
    typesText:
      "In Rava every declaration must include a type. Variables use let, and constants use var. Constants are immutable after assignment.",
    typesDataTypes: "Available data types:",
    typesList: "string, int, double, bool",
    typesVarExample: `let counter: int = 0;`,
    typesConstExample: `var pi: double = 3.14;`,
    typesUnknownExample: `let counter: unknown = 0;`,
    arrayTitle: "Arrays",
    arrayText:
      "Arrays are defined with let and specify element types in square brackets.",
    arrayExample: `let tab: [string] = ["Zero", "One", "Two", "Three"];`,
    arrayExample2: `let tab: [int] = [0, 1, 2, 3];`,
    arrayExampleDescription:
      "Arrays let you group same-typed values and iterate over them using loops or access elements by index.",
    startTitle: "Start coding",
    startText:
      "The primary I/O command in Rava is print(). Use it to display values.",
    printExample: `print("Hello Rava");`,
    loopsTitle: "Loops",
    loopsText:
      "Rava supports for and while loops. For iterates over ranges or collections, while repeats code while a condition is true.",
    forRangeExample: `for i in 1..10 {\n  print(i);\n}`,
    forArrayExample: `let array = [1, 2, 3, 4, 5];\nfor i in array {\n  print(i);\n}`,
    whileExample: `let x = 5;\nwhile (x > 0) {\n  print(x);\n  x = x - 1;\n}`,
    commentsTitle: "Comments",
    commentsText:
      "In Rava you can use single-line and block comments to describe code or temporarily disable sections.",
    singleCommentExample: `// This is a single-line comment
print("Hello Rava");`,
    blockCommentExample: `/*
  This is a block comment.
  You can describe a longer section here.
*/
print("Rava");`,
    fstringTitle: "F-string",
    fstringText: "Rava supports string interpolation using the \\() syntax.",
    fstringExample: `var lang: string = "Rava";
print("Hello, I am \\(lang) new programming language");`,
    examplesTitle: "Examples",
    examplesText: "Below is an example showing loops and comments in Rava.",
    examplesCode: `let array = [1, 2, 3, 4, 5];

for i in array {
  // Print each element
  print(i);
}

let x = 3;
while (x > 0) {
  print("Remaining: " + x);
  x = x - 1;
}`,
    notesTitle: "Note",
    notesText:
      "Rava still lacks many things.. The materials here describe the current syntax and future plans.",
    comingSoon: "Coming soon",
    mathfunctions: "Built-in mathematical functions",
    mathfunctionsText:
      "Rava supports basic mathematical functions such as pow(), sqrt(), abs(), round(), roundup(), and rounddown().",
    powdefinition:
      "The pow() function is used to raise a number to a power. This function takes two arguments: the base and the exponent.",
    powexamplecode: `let base: double = 2.0;
let exponent: double = 3.0;
let result: double = pow(base, exponent);
print("Result: \\(result)");`,
    sqrtdefinition:
      "The sqrt() function calculates the square root. This function takes one argument: the number for which the square root is to be calculated.",
    sqrtexamplecode: `let number: double = 2.0;
let result: double = sqrt(number);
print("Result: \\(result)");`,
    absdefinition:
      "The abs() function returns the absolute value. This function takes one argument: the number for which the absolute value is to be calculated.",
    absexamplecode: `let number: double = -2.52;
let result: double = abs(number);
print("Result: \\(result)");`,
    rounddefinition:
      "The round() function rounds a number to a specified number of decimal places. This function takes two arguments: the number and a value specifying the number of decimal places.",
    roundexamplecode: `let number: double = 2.52;
let result: double = round(number, 2);
print("Result: \\(result)");`,
    roundupdefinition:
      "The roundup() function rounds a number up to a specified number of decimal places. This function takes two arguments: the number and a value specifying the number of decimal places.",
    roundupexamplecode: `let number: double = 2.52;
let result: double = roundup(number, 1);
print("Result: \\(result)");`,
    rounddowndefinition:
      "The rounddown() function rounds a number down when the last digit is greater than 0. This function takes two arguments: the number and a value specifying the number of decimal places.",
    rounddownexamplecode: `let number: double = 2.52;
let result: double = rounddown(number, 1);
print("Result: \\(result)");`,
  },
};

type TranslationKey = keyof (typeof translations)["pl"];

const pages: Array<{ id: string; key: TranslationKey }> = [
  { id: "overview", key: "overview" },
  { id: "install", key: "install" },
  { id: "start", key: "start" },
  { id: "types", key: "types" },
  { id: "arrays", key: "arrays" },
  { id: "loops", key: "loops" },
  { id: "comments", key: "comments" },
  { id: "fstring", key: "fstring" },
  { id: "functions", key: "functions" },
  { id: "mathfunctions", key: "mathfunctions" },
];

function SectionContainer({ children }: { children: React.ReactNode }) {
  return <section className="section">{children}</section>;
}

function OverviewPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.overview}</div>
      <p>{t.overviewIntro}</p>
      <p>{t.overviewMore}</p>
    </SectionContainer>
  );
}

function InstallPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.installTitle}</div>
      <p>{t.installText}</p>
    </SectionContainer>
  );
}

function StartPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.startTitle}</div>
      <p>{t.startText}</p>
      <pre>
        <code>{t.printExample}</code>
      </pre>
    </SectionContainer>
  );
}

function TypesPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.typesTitle}</div>
      <p>{t.typesText}</p>
      <div className="syntax-grid">
        <div>
          <h3>{t.typesDataTypes}</h3>
          <pre>
            <code>{t.typesList}</code>
          </pre>
        </div>
        <div>
          <h3>{lang === "pl" ? "Zmienna" : "Variable"}</h3>
          <pre>
            <code>{t.typesVarExample}</code>
          </pre>
        </div>
        <div>
          <h3>{lang === "pl" ? "Stała" : "Constant"}</h3>
          <pre>
            <code>{t.typesConstExample}</code>
          </pre>
        </div>
      </div>
      <div className="section-subtitle">
        {lang === "pl" ? "Nieznany typ" : "Unknown type"}
      </div>
      <pre>
        <code>{t.typesUnknownExample}</code>
      </pre>
    </SectionContainer>
  );
}

function ArraysPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.arrayTitle}</div>
      <p>{t.arrayText}</p>
      <p>{t.arrayExampleDescription}</p>
      <div className="syntax-grid">
        <div>
          <h3>{lang === "pl" ? "Tablica stringów" : "String array"}</h3>
          <pre>
            <code>{t.arrayExample}</code>
          </pre>
        </div>
        <div>
          <h3>{lang === "pl" ? "Tablica liczb" : "Integer array"}</h3>
          <pre>
            <code>{t.arrayExample2}</code>
          </pre>
        </div>
      </div>
    </SectionContainer>
  );
}

function LoopsPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.loopsTitle}</div>
      <p>{t.loopsText}</p>
      <div className="syntax-grid">
        <div>
          <h3>for</h3>
          <pre>
            <code>{t.forRangeExample}</code>
          </pre>
        </div>
        <div>
          <h3>for</h3>
          <pre>
            <code>{t.forArrayExample}</code>
          </pre>
        </div>
      </div>
      <div className="section-subtitle">while</div>
      <pre>
        <code>{t.whileExample}</code>
      </pre>
    </SectionContainer>
  );
}

function CommentsPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.comments}</div>
      <p>{t.commentsText}</p>
      <div className="syntax-grid">
        <div>
          <h3>
            {lang === "pl" ? "Komentarz jednoliniowy" : "Single-line comment"}
          </h3>
          <pre>
            <code>{t.singleCommentExample}</code>
          </pre>
        </div>
        <div>
          <h3>
            {lang === "pl" ? "Komentarz wielowierszowy" : "Block comment"}
          </h3>
          <pre>
            <code>{t.blockCommentExample}</code>
          </pre>
        </div>
      </div>
    </SectionContainer>
  );
}

function FStringPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.fstringTitle}</div>
      <p>{t.fstringText}</p>
      <pre>
        <code>{t.fstringExample}</code>
      </pre>
    </SectionContainer>
  );
}

function MathFunctionsPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.mathfunctions}</div>
      <p>{t.mathfunctionsText}</p>
      <div className="syntax-grid">
        <div>
          <h3>{t.powdefinition}</h3>
          <pre>
            <code>{t.powexamplecode}</code>
          </pre>
        </div>
        <div>
          <h3>{t.sqrtdefinition}</h3>
          <pre>
            <code>{t.sqrtexamplecode}</code>
          </pre>
        </div>
        <div>
          <h3>{t.absdefinition}</h3>
          <pre>
            <code>{t.absexamplecode}</code>
          </pre>
        </div>
        <div>
          <h3>{t.rounddefinition}</h3>
          <pre>
            <code>{t.roundexamplecode}</code>
          </pre>
        </div>
        <div>
          <h3>{t.roundupdefinition}</h3>
          <pre>
            <code>{t.roundupexamplecode}</code>
          </pre>
        </div>
        <div>
          <h3>{t.rounddowndefinition}</h3>
          <pre>
            <code>{t.rounddownexamplecode}</code>
          </pre>
        </div>
      </div>
    </SectionContainer>
  );
}

function FunctionsPage({ lang }: { lang: "pl" | "en" }) {
  const t = translations[lang];
  return (
    <SectionContainer>
      <div className="section-title">{t.functions}</div>
      <p>{t.comingSoon}</p>
    </SectionContainer>
  );
}

export default function RavaDocs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lang = searchParams.get("lang") === "en" ? "en" : "pl";

  const changeLanguage = (nextLang: "pl" | "en") => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      lang: nextLang,
    });
  };

  const currentSearch = `?lang=${lang}`;

  return (
    <div id="rava-docs">
      <section className="hero">
        <div className="hero-content">
          <div className="eyebrow">{translations[lang].heroTitle}</div>
          <h1>{translations[lang].heroTitle}</h1>
          <p>{translations[lang].heroSubtitle}</p>
          <div className="hero-actions">
            <a
              href="https://github.com/arkadiuszkornecki/rava-lang"
              className="button button-primary"
            >
              {translations[lang].download}
            </a>
            <a
              href="https://github.com/arkadiuszkornecki/rava-lang/releases/download/v1.0.0/rava-extension.zip"
              className="button button-secondary"
            >
              {translations[lang].editor}
            </a>
          </div>
          <div className="language-switch">
            <button
              className={
                lang === "pl" ? "language-button active" : "language-button"
              }
              onClick={() => changeLanguage("pl")}
            >
              PL
            </button>
            <button
              className={
                lang === "en" ? "language-button active" : "language-button"
              }
              onClick={() => changeLanguage("en")}
            >
              EN
            </button>
          </div>
        </div>
      </section>

      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-title">{translations[lang].sidebarTitle}</div>
          <nav>
            <ul>
              {pages.map((page) => (
                <li key={page.id}>
                  <NavLink
                    to={`/rava/${page.id}${currentSearch}`}
                    className={({ isActive }) =>
                      isActive ? "active-link" : ""
                    }
                  >
                    {translations[lang][page.key]}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="sidebar-card">
            <p>{translations[lang].sidebarNote}</p>
          </div>
        </aside>

        <article className="content">
          <Routes>
            <Route index element={<OverviewPage lang={lang} />} />
            <Route path="overview" element={<OverviewPage lang={lang} />} />
            <Route path="install" element={<InstallPage lang={lang} />} />
            <Route path="start" element={<StartPage lang={lang} />} />
            <Route path="types" element={<TypesPage lang={lang} />} />
            <Route path="arrays" element={<ArraysPage lang={lang} />} />
            <Route path="loops" element={<LoopsPage lang={lang} />} />
            <Route path="comments" element={<CommentsPage lang={lang} />} />
            <Route path="fstring" element={<FStringPage lang={lang} />} />
            <Route
              path="mathfunctions"
              element={<MathFunctionsPage lang={lang} />}
            />
            <Route path="functions" element={<FunctionsPage lang={lang} />} />
            <Route path="*" element={<OverviewPage lang={lang} />} />
          </Routes>
        </article>
      </div>
    </div>
  );
}
