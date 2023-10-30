export const titleCase = (x: string) =>{
  const y = x.split("");
  const z: string[] = [];
  let newWord = false;

  y.forEach((element, i) => {
    if(i == 0 || newWord) {
      newWord = false;
      // console.log('hhh', element.toUpperCase())
      z.push(element.toUpperCase());
    }else{
      if(element == " ") {
        // console.log('uuuuu')
        newWord = true;}

      z.push(element);
    }
  });

  return z.join("");
};
