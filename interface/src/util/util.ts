export function capitalize(text:string):string {
  if(text){
    const arrayText = text.split(" ");
    const textFormatted = arrayText.map(text => text.charAt(0).toUpperCase() + text.slice(1)).join(' ')
    return textFormatted
  }
  return text
}