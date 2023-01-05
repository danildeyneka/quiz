export const optionsCreator = (arr: Array<any>) => {
  return arr.map(obj => <option value={ Object.keys(obj)[0] }
                              key={ Object.keys(obj)[0] }>
    { Object.values(obj) }
  </option>)
}