export default class Parse {
  constructor(response) {
    this.body = response;
  }

  do() {
    // console.log('PARSE', this.body)
    const availablityPageMatch = this.body.match(/riName=(\d*)/gi);
    if (availablityPageMatch === null) return [];
    const availableIds = availablityPageMatch.map(availString => availString.split('=')[1]);
    return availableIds;
  }
}
