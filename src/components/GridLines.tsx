/** Тонкая сетка линий на весь экран (5 колонок, 3 ряда), как каркас интерфейса. */
export function GridLines() {
  return (
    <div className="grid-lines" aria-hidden="true">
      <i style={{ left: '15.3%' }} /><i style={{ left: '38.4%' }} /><i style={{ left: '61.5%' }} /><i style={{ left: '84.7%' }} />
      <b style={{ top: '31.5%' }} /><b style={{ top: '68.5%' }} />
    </div>
  )
}
