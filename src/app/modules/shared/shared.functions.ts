export function clone(obj:any){
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Crea una fecha con los dias de mas o menos indicados
 * @param days dias indicados
 * @returns
 */
export function datePlusDays(date: Date, days: number) {
  return new Date(date.setDate(date.getDate() + days));
}
