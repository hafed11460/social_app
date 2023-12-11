import { AppAction } from 'main';
import { Dispatch, useEffect, useState } from 'react';

const useToggleStylesheet = (isDark:boolean,isOverflow:boolean, configDispatch: Dispatch<AppAction>,) => {
  const [isLoaded, setIsLoaded] = useState(false);

  // useEffect(() => {
  //   setIsLoaded(false);
  //   Array.from(document.getElementsByClassName('theme-stylesheet')).forEach(
  //     link => link.remove()
  //   );
  //   console.log(process.env.PUBLIC_URL)
  //   const link = document.createElement('link');
  //   link.href = `${process.env.PUBLIC_URL}/css/theme${
  //     isRTL ? '-rtl' : ''
  //   }.min.css`;
  //   link.type = 'text/css';
  //   link.rel = 'stylesheet';
  //   link.className = 'theme-stylesheet';
  //   link.onload = () => {
  //     setIsLoaded(true);
  //   };

  //   document.getElementsByTagName('head')[0].appendChild(link);
  //   document
  //     .getElementsByTagName('html')[0]
  //     .setAttribute('dir', isRTL ? 'rtl' : 'ltr');
  // }, [isRTL]);
  useEffect(() => {
   
    // 👇️ set style on body element
    document.body.style.overflowY = 'hidden';

  
  }, [isOverflow]);

  
  useEffect(() => {
    // document.documentElement.classList[isDark ? 'add' : 'remove']('dark');
    document.body.classList.remove(!isDark ? 'theme-dark' : 'theme-light',);
    document.body.classList.add(isDark ? 'theme-dark' : 'theme-light',);
    configDispatch({
      type: 'REFRESH',
      payload:null
    });
  }, [isDark]);

  return { isLoaded };
};

export default useToggleStylesheet;
