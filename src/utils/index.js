  export const calcGridSize = (containerSelector, cardSelector) => {


      const columns = Array.from(document.querySelectorAll('.grid-col'));


      let height = 0;
      columns.forEach(ele => {
          if (ele.offsetHeight > height) {
              height = ele.offsetHeight
          }
      }) 
      const g = document.querySelector(containerSelector);
      g.style.height = height + 'px';
  }

  export const getNumColumns = () => {
      if (window.innerWidth < 977) {
          return 1

      } else if (window.innerWidth < 1448 ) {
          return 2
      }
      return 3;
  }
