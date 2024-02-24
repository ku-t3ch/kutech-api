function replaceAll(string, search, replace):string {
  return string.split(search).join(replace);
}

export default replaceAll;