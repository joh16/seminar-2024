import { CalendarIcon } from '@radix-ui/react-icons';
import { ReactNode, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import { ThemeToggle } from '@/components/ThemeToggle';
import { Separator } from '@/designsystem/ui/separator';
import { Home } from '@/pages/home';
import { Lecture0 } from '@/pages/lecture0';

const pages: (
  | { type: 'index'; path: string; element: ReactNode }
  | {
      type: 'lecture';
      title: string;
      path: string;
      description: string;
      element: ReactNode;
      date: Date;
    }
)[] = [
  { type: 'index', path: '/', element: <Home /> },
  {
    type: 'lecture',
    title: 'OT',
    description: '세미나 목표, 방식, 과제, 평가',
    date: new Date('2024-09-11'),
    path: '/ot',
    element: <Lecture0 />,
  },
  {
    type: 'lecture',
    title: '개발환경 세팅',
    description: 'eslint, prettier, ci',
    date: new Date('2024-09-11'),
    path: '/environment',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '웹, html, css, js',
    description: 'html, css, js의 역할과 동작',
    date: new Date('2024-09-25'),
    path: '/web-html-css-js',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '타입스크립트',
    description: 'typescript 기초',
    date: new Date('2024-09-25'),
    path: '/typescript',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '리액트',
    description: '리액트의 철학, props와 state, hooks',
    date: new Date('2024-10-02'),
    path: '/react-basic',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '스타일링',
    description: 'inline style, css-in-js, css modules, atomic css',
    date: new Date('2024-10-16'),
    path: '/styling',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '비동기',
    description: 'callback, Promise, event loop',
    date: new Date('2024-11-06'),
    path: '/async',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: 'SSR 프레임워크',
    description: 'Next.js',
    date: new Date('2024-11-20'),
    path: '/SSR',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '프론트엔드 인프라',
    description: '',
    date: new Date('2024-11-20'),
    path: '/infrastructure',
    element: <div>TBD</div>,
  },
  {
    type: 'lecture',
    title: '마무리',
    description: '',
    date: new Date('2024-11-20'),
    path: '/end',
    element: <div>TBD</div>,
  },
];

export const App = () => {
  return (
    <div className="flex h-screen max-h-screen">
      <Sidebar />
      <Separator orientation="vertical" />
      <main className="flex-1 overflow-y-scroll p-4">
        <Routes>
          {Object.entries(pages).map(([key, { path, element }]) => (
            <Route key={key} path={path} element={element} />
          ))}
        </Routes>
      </main>
    </div>
  );
};

const useTheme = () => {
  type Theme = 'light' | 'dark';
  const themeKey = 'theme';

  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem(themeKey);
    if (savedTheme === 'dark') return 'dark';
    if (savedTheme === 'light') return 'light';

    if (window.matchMedia('(prefere-color-scheme: dark)').matches)
      return 'dark';

    return 'light';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    window.document.documentElement.classList.remove('light', 'dark');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    window.document.documentElement.classList.add(newTheme);
    localStorage.setItem(themeKey, newTheme);
  };

  return { theme, toggleTheme };
};

const Sidebar = () => {
  const { toggleTheme } = useTheme();

  return (
    <div className="flex w-52 flex-col py-4 bg-blend-darken">
      <Link to="/">
        <h1 className="text-center text-3xl font-bold">Lecture</h1>
      </Link>
      <nav className="mt-4 flex-1 overflow-y-scroll px-4 text-xl">
        <ul className="flex flex-col gap-2 pt-4">
          {pages.flatMap((page) =>
            page.type === 'index' ? (
              []
            ) : (
              <li
                key={page.path}
                className="rounded-sm px-4 py-2 transition-colors hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <Link to={page.path} className="flex flex-col gap-1">
                  <h3>{page.title}</h3>
                  <p className="text-xs text-slate-400">{page.description}</p>
                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <CalendarIcon /> {page.date.getMonth() + 1}월{' '}
                    {page.date.getDate()}일
                  </p>
                </Link>
              </li>
            ),
          )}
        </ul>
      </nav>
      <div className="px-4 pt-4">
        <ThemeToggle toggleTheme={toggleTheme} />
      </div>
    </div>
  );
};